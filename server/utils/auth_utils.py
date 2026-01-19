import os
import logging
from datetime import datetime, timedelta
from typing import Optional

import jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session

from db import get_db, User

# ---------- Config ----------
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
ALGORITHM = "HS256"
TOKEN_EXPIRE_DAYS = 30
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() == "true"

# ---------- Logging ----------
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("auth_utils")

# ---------- Password hashing ----------
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


# ---------- JWT ----------
def create_jwt_token(user_id: int) -> str:
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=TOKEN_EXPIRE_DAYS),
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    if isinstance(token, bytes):
        token = token.decode("utf-8")
    return token


def normalize_email(email: str) -> str:
    return email.strip().lower()


def set_auth_cookie(response: Response, token: str) -> None:
    response.set_cookie(
        key="token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=COOKIE_SECURE,
        path="/",
        max_age=TOKEN_EXPIRE_DAYS * 24 * 60 * 60,
    )


# ---------- Current user ----------
def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
) -> User:
    token: Optional[str] = request.cookies.get("token")
    if not token:
        logger.warning("Authentication failed: No token provided")
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")
    except jwt.ExpiredSignatureError:
        logger.warning("Authentication failed: Token expired")
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        logger.warning("Authentication failed: Invalid token")
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        logger.warning(f"Authentication failed: User not found (id={user_id})")
        raise HTTPException(status_code=401, detail="User not found")

    return user

