from fastapi import APIRouter, HTTPException
from schemas import UserCreate, UserLogin, Token
from auth import register_user, login_user

router = APIRouter()

@router.post("/register", response_model=Token)
def register(user: UserCreate):
    return register_user(user)

@router.post("/login", response_model=Token)
def login(user: UserLogin):
    return login_user(user)
