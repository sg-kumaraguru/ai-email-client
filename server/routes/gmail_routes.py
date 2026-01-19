from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import get_db, User, GmailAccount, GmailToken
from utils.auth_utils import get_current_user
from utils.gmail_utils import (
    build_gmail_auth_url,
    exchange_code_for_tokens,
    fetch_google_profile,
    revoke_gmail_token,
    create_oauth_state,
    verify_oauth_state,
)

router = APIRouter(prefix="/gmail", tags=["gmail"])


@router.post("/connect")
def connect_gmail(current_user: User = Depends(get_current_user)):
    state = create_oauth_state(user_id=current_user.id)
    auth_url = build_gmail_auth_url(state=state)
    return {"auth_url": auth_url}


@router.get("/callback")
def gmail_callback(code: str, state: str, db: Session = Depends(get_db)):
    payload = verify_oauth_state(state)
    user_id = payload.get("user_id")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(400, "Invalid OAuth state")

    token_data = exchange_code_for_tokens(code)
    profile = fetch_google_profile(token_data["access_token"])

    google_email = profile.get("email")
    if not google_email:
        raise HTTPException(400, "Failed to fetch Google account email")

    existing = (
        db.query(GmailAccount)
        .filter(
            GmailAccount.user_id == user_id,
            GmailAccount.google_email == google_email,
        )
        .first()
    )
    if existing:
        return {"status": "already_connected"}

    gmail_account = GmailAccount(user_id=user_id, google_email=google_email)
    db.add(gmail_account)
    db.commit()
    db.refresh(gmail_account)

    gmail_token = GmailToken(
        gmail_account_id=gmail_account.id,
        access_token=token_data["access_token"],
        refresh_token=token_data["refresh_token"],
        expires_at=token_data["expires_at"],
    )
    db.add(gmail_token)
    db.commit()

    return {"status": "connected", "email": google_email}


@router.post("/disconnect")
def disconnect_gmail(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    gmail = db.query(GmailAccount).filter(GmailAccount.user_id == current_user.id).first()
    if not gmail:
        raise HTTPException(404, "No Gmail account connected")

    if gmail.token:
        revoke_gmail_token(gmail.token.refresh_token)

    db.delete(gmail)
    db.commit()
    return {"status": "disconnected"}


@router.get("/status")
def gmail_status(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    gmail = db.query(GmailAccount).filter(GmailAccount.user_id == current_user.id).first()
    if not gmail:
        return {"connected": False}

    return {"connected": True, "email": gmail.google_email}

