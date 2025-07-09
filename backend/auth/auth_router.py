# backend/auth/auth_router.py
from fastapi import APIRouter, HTTPException
from .models import RegisterRequest, LoginRequest, TokenResponse
from .utils import hash_password, verify_password, create_access_token, fake_users_db

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register", response_model=TokenResponse)
def register(user: RegisterRequest):
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists.")
    
    hashed = hash_password(user.password)
    fake_users_db[user.email] = hashed

    token = create_access_token({"sub": user.email})
    return TokenResponse(access_token=token)

@router.post("/login", response_model=TokenResponse)
def login(user: LoginRequest):
    hashed = fake_users_db.get(user.email)
    if not hashed or not verify_password(user.password, hashed):
        raise HTTPException(status_code=401, detail="Invalid credentials.")
    
    token = create_access_token({"sub": user.email})
    return TokenResponse(access_token=token)
