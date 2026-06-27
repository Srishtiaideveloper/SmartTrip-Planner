"""
Pydantic models for Trip data.
Handles trip creation, updates, and API responses.
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from enum import Enum


class TripStatus(str, Enum):
    """Allowed trip status values."""
    planning = "planning"
    confirmed = "confirmed"
    completed = "completed"
    cancelled = "cancelled"


class TripCreate(BaseModel):
    """Schema for creating a new trip."""
    destination: str = Field(..., min_length=2, max_length=200, examples=["Bali, Indonesia"])
    duration: str = Field(..., examples=["7 days"])
    budget: str = Field(..., examples=["$1,200"])
    eco_score: int = Field(..., ge=0, le=100, examples=[94])
    status: TripStatus = Field(default=TripStatus.planning, examples=["planning"])
    date: str = Field(..., examples=["Jun 2026"])
    tags: List[str] = Field(default=[], examples=[["Beach", "Culture"]])
    activities: List[str] = Field(default=[], examples=[["Temple Visits", "Street Food Tour"]])
    image: str = Field(default="🌍", examples=["🏖️"])


class TripUpdate(BaseModel):
    """Schema for updating an existing trip. All fields optional."""
    destination: Optional[str] = Field(None, min_length=2, max_length=200)
    duration: Optional[str] = None
    budget: Optional[str] = None
    eco_score: Optional[int] = Field(None, ge=0, le=100)
    status: Optional[TripStatus] = None
    date: Optional[str] = None
    tags: Optional[List[str]] = None
    activities: Optional[List[str]] = None
    image: Optional[str] = None


class TripResponse(BaseModel):
    """Schema for trip data returned in API responses."""
    id: str
    destination: str
    duration: str
    budget: str
    eco_score: int
    status: TripStatus
    date: str
    tags: List[str]
    activities: List[str]
    image: str
    user_id: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": "trip-001",
                "destination": "Bali, Indonesia",
                "duration": "7 days",
                "budget": "$1,200",
                "eco_score": 94,
                "status": "completed",
                "date": "Dec 2025",
                "tags": ["Beach", "Culture"],
                "activities": ["Temple Visits", "Snorkeling"],
                "image": "🏖️",
                "user_id": "user-001",
            }
        }
