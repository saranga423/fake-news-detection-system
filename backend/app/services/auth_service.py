from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.crud_user import create_user, get_user_by_email
from app.security import hash_password, verify_password, create_access_token


def register_user(db: Session, full_name: str, email: str, password: str):
    existing = get_user_by_email(db, email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = create_user(
        db,
        full_name=full_name,
        email=email,
        hashed_password=hash_password(password),
    )
    return user


def login_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token = create_access_token(str(user.id))
    return {"access_token": token, "token_type": "bearer"}