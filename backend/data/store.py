"""
In-memory data store for development.
Seeded with realistic data matching the frontend's current mock data.
This will be replaced by a PostgreSQL database in Week 5.
"""

from auth.utils import hash_password

# ── Users Database ────────────────────────────────────────────────────────────
# Each user is a dict with: id, name, email, hashed_password

users_db = [
    {
        "id": "user-001",
        "name": "Srishti",
        "email": "srishti@example.com",
        "hashed_password": hash_password("password123"),
    },
]

# ── Trips Database ────────────────────────────────────────────────────────────
# Each trip is a dict matching the TripResponse schema

trips_db = [
    {
        "id": "trip-001",
        "destination": "Bali, Indonesia",
        "duration": "7 days",
        "budget": "$1,200",
        "eco_score": 94,
        "status": "completed",
        "date": "Dec 2025",
        "tags": ["Beach", "Culture"],
        "activities": ["Temple Visits", "Snorkeling", "Rice Terrace Walk"],
        "image": "🏖️",
        "user_id": "user-001",
    },
    {
        "id": "trip-002",
        "destination": "Swiss Alps, Switzerland",
        "duration": "5 days",
        "budget": "$2,100",
        "eco_score": 88,
        "status": "completed",
        "date": "Nov 2025",
        "tags": ["Adventure", "Nature"],
        "activities": ["Hiking", "Cable Car", "Cheese Tasting"],
        "image": "🏔️",
        "user_id": "user-001",
    },
    {
        "id": "trip-003",
        "destination": "Kyoto, Japan",
        "duration": "6 days",
        "budget": "$1,800",
        "eco_score": 96,
        "status": "completed",
        "date": "Oct 2025",
        "tags": ["Heritage", "Culture"],
        "activities": ["Bamboo Forest", "Tea Ceremony", "Shrine Visits"],
        "image": "⛩️",
        "user_id": "user-001",
    },
    {
        "id": "trip-004",
        "destination": "Costa Rica",
        "duration": "8 days",
        "budget": "$1,500",
        "eco_score": 97,
        "status": "completed",
        "date": "Sep 2025",
        "tags": ["Eco-Tourism", "Wildlife"],
        "activities": ["Rainforest Trek", "Zip-lining", "Turtle Watching"],
        "image": "🌿",
        "user_id": "user-001",
    },
    {
        "id": "trip-005",
        "destination": "Tokyo, Japan",
        "duration": "7 days",
        "budget": "$2,400",
        "eco_score": 91,
        "status": "confirmed",
        "date": "Jun 25 – Jul 1, 2026",
        "tags": ["Culture", "Food"],
        "activities": ["Temple Visits", "Street Food Tour", "Mt. Fuji Day Trip"],
        "image": "🗼",
        "user_id": "user-001",
    },
    {
        "id": "trip-006",
        "destination": "Patagonia, Chile",
        "duration": "10 days",
        "budget": "$3,200",
        "eco_score": 95,
        "status": "planning",
        "date": "Jul 15 – Jul 24, 2026",
        "tags": ["Adventure", "Nature"],
        "activities": ["Glacier Trekking", "Wildlife Safari", "Camping"],
        "image": "🏔️",
        "user_id": "user-001",
    },
]

# ── Counter for generating IDs ────────────────────────────────────────────────
id_counter = {"user": 1, "trip": 6}


def next_user_id() -> str:
    """Generate the next unique user ID."""
    id_counter["user"] += 1
    return f"user-{id_counter['user']:03d}"


def next_trip_id() -> str:
    """Generate the next unique trip ID."""
    id_counter["trip"] += 1
    return f"trip-{id_counter['trip']:03d}"


# ── Dashboard Seed Data ──────────────────────────────────────────────────────

activity_data = [
    {"month": "Jan", "trips": 2, "eco": 78},
    {"month": "Feb", "trips": 1, "eco": 82},
    {"month": "Mar", "trips": 3, "eco": 85},
    {"month": "Apr", "trips": 2, "eco": 88},
    {"month": "May", "trips": 4, "eco": 90},
    {"month": "Jun", "trips": 3, "eco": 92},
    {"month": "Jul", "trips": 5, "eco": 89},
    {"month": "Aug", "trips": 2, "eco": 91},
    {"month": "Sep", "trips": 4, "eco": 93},
    {"month": "Oct", "trips": 3, "eco": 95},
    {"month": "Nov", "trips": 1, "eco": 94},
    {"month": "Dec", "trips": 2, "eco": 92},
]

sustainability_breakdown = [
    {"name": "Transport", "value": 35, "color": "#10b981"},
    {"name": "Accommodation", "value": 25, "color": "#14b8a6"},
    {"name": "Activities", "value": 20, "color": "#06b6d4"},
    {"name": "Food", "value": 20, "color": "#0ea5e9"},
]
