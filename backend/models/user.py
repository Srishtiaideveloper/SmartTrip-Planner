"""
Pydantic models for User authentication.
Handles registration, login, and JWT token schemas.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserCreate(BaseModel):
    """Schema for user registration request."""
    name: str = Field(..., min_length=2, max_length=100, examples=["Srishti Sharma"])
    email: str = Field(..., min_length=5, max_length=255, examples=["srishti@example.com"])
    password: str = Field(..., min_length=6, max_length=128, examples=["securePass123"])


class UserLogin(BaseModel):
    """Schema for user login request."""
    email: str = Field(..., examples=["srishti@example.com"])
    password: str = Field(..., examples=["securePass123"])


class UserResponse(BaseModel):
    """Schema for user data returned in responses (no password)."""
    id: str
    name: str
    email: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": "user-001",
                "name": "Srishti Sharma",
                "email": "srishti@example.com",
            }
        }


class Token(BaseModel):
    """Schema for JWT token response."""
    access_token: str
    token_type: str = "bearer"
    user: UserResponse
