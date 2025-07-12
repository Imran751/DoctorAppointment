from fastapi import HTTPException
from schemas import UserCreate, UserLogin, Token
from utils import hash_password, verify_password, create_access_token

fake_users_db = {}

def register_user(user: UserCreate) -> Token:
    if user.email in fake_users_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pw = hash_password(user.password)
    fake_users_db[user.email] = {
        "email": user.email,
        "hashed_password": hashed_pw,
        "role": user.role,
    }

    token = create_access_token({"sub": user.email, "role": user.role})
    return Token(access_token=token)

def login_user(user: UserLogin) -> Token:
    db_user = fake_users_db.get(user.email)
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user["email"], "role": db_user["role"]})
    return Token(access_token=token)
