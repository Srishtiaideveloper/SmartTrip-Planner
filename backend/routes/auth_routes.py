"""
Authentication routes — register, login, and get current user.
"""

from fastapi import APIRouter, HTTPException, Depends, status

from models.user import UserCreate, UserLogin, UserResponse, Token
from auth.utils import hash_password, verify_password, create_access_token, get_current_user
from data.store import users_db, next_user_id

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


# ── POST /api/auth/register ──────────────────────────────────────────────────

@router.post(
    "/register",
    response_model=Token,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user",
    responses={
        201: {"description": "User created successfully"},
        400: {"description": "Email already registered"},
    },
)
def register(user_data: UserCreate):
    """
    Register a new user account.

    - Validates that the email is not already in use.
    - Hashes the password with bcrypt.
    - Returns a JWT access token for immediate login.
    """
    # Check if email already exists
    existing = next((u for u in users_db if u["email"] == user_data.email), None)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists",
        )

    # Create user
    new_user = {
        "id": next_user_id(),
        "name": user_data.name,
        "email": user_data.email,
        "hashed_password": hash_password(user_data.password),
    }
    users_db.append(new_user)

    # Generate JWT token
    access_token = create_access_token(data={"sub": new_user["email"]})

    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=new_user["id"],
            name=new_user["name"],
            email=new_user["email"],
        ),
    )


# ── POST /api/auth/login ─────────────────────────────────────────────────────

@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_200_OK,
    summary="Login and receive JWT token",
    responses={
        200: {"description": "Login successful"},
        401: {"description": "Invalid email or password"},
    },
)
def login(credentials: UserLogin):
    """
    Authenticate a user with email and password.

    - Verifies the email exists and password matches.
    - Returns a JWT access token on success.
    """
    user = next((u for u in users_db if u["email"] == credentials.email), None)
    if not user or not verify_password(credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(data={"sub": user["email"]})

    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user["id"],
            name=user["name"],
            email=user["email"],
        ),
    )


# ── GET /api/auth/me ──────────────────────────────────────────────────────────

@router.get(
    "/me",
    response_model=UserResponse,
    summary="Get current user profile",
    responses={
        200: {"description": "Current user data"},
        401: {"description": "Not authenticated"},
    },
)
def get_me(current_user: dict = Depends(get_current_user)):
    """
    Return the currently authenticated user's profile.
    Requires a valid JWT token in the Authorization header.
    """
    return UserResponse(
        id=current_user["id"],
        name=current_user["name"],
        email=current_user["email"],
    )
