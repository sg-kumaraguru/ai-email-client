from fastapi import APIRouter, Depends, HTTPException, Response
from pydantic import BaseModel, EmailStr, Field
from sqlalchemy.orm import Session

from db import get_db, User
from utils.auth_utils import (
    hash_password,
    verify_password,
    create_jwt_token,
    get_current_user,
    normalize_email,
    set_auth_cookie,
)

router = APIRouter()


# ---------- Schemas ----------
class SignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UpdateUserRequest(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr


# ---------- Routes ----------
@router.post("/signup")
def signup(payload: SignupRequest, response: Response, db: Session = Depends(get_db)):
    email = normalize_email(payload.email)

    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=payload.name.strip(),
        email=email,
        password_hash=hash_password(payload.password),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_jwt_token(user.id)
    set_auth_cookie(response, token)

    return {"status": "ok"}


@router.post("/login")
def login(payload: LoginRequest, response: Response, db: Session = Depends(get_db)):
    email = normalize_email(payload.email)

    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_jwt_token(user.id)
    set_auth_cookie(response, token)

    return {"status": "ok"}


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(key="token", path="/")
    return {"status": "ok"}


@router.get("/me")
def me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
    }

@router.put("/update-user")
def update_user(payload: UpdateUserRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    email = normalize_email(payload.email)

    existing = db.query(User).filter(User.email == email, User.id != current_user.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already in use")

    current_user.name = payload.name.strip()
    current_user.email = email

    db.commit()
    db.refresh(current_user)

    return {
        "status": "ok",
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email
        }
    }


