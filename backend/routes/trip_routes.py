"""
Trip routes — full CRUD operations plus search.
All endpoints require JWT authentication.
"""

from fastapi import APIRouter, HTTPException, Depends, Query, status
from typing import List, Optional

from models.trip import TripCreate, TripUpdate, TripResponse
from auth.utils import get_current_user
from data.store import trips_db, next_trip_id

router = APIRouter(prefix="/api/trips", tags=["Trips"])


# ── GET /api/trips/search?q=... ──────────────────────────────────────────────
# NOTE: This route MUST be defined BEFORE /api/trips/{trip_id}
# to prevent FastAPI from interpreting "search" as a trip_id.

@router.get(
    "/search",
    response_model=List[TripResponse],
    summary="Search trips by destination or tags",
    responses={
        200: {"description": "Matching trips returned"},
    },
)
def search_trips(
    q: str = Query(..., min_length=1, description="Search query for destination or tags"),
    current_user: dict = Depends(get_current_user),
):
    """
    Search trips by destination name or tags.
    Only returns trips belonging to the authenticated user.
    Case-insensitive partial matching.
    """
    query = q.lower()
    user_trips = [t for t in trips_db if t["user_id"] == current_user["id"]]

    results = []
    for trip in user_trips:
        # Match against destination
        if query in trip["destination"].lower():
            results.append(trip)
            continue
        # Match against tags
        if any(query in tag.lower() for tag in trip.get("tags", [])):
            results.append(trip)
            continue
        # Match against activities
        if any(query in act.lower() for act in trip.get("activities", [])):
            results.append(trip)

    return results


# ── GET /api/trips ────────────────────────────────────────────────────────────

@router.get(
    "",
    response_model=List[TripResponse],
    summary="List all trips for the current user",
    responses={
        200: {"description": "List of trips returned"},
    },
)
def list_trips(
    status_filter: Optional[str] = Query(None, alias="status", description="Filter by status"),
    current_user: dict = Depends(get_current_user),
):
    """
    Return all trips belonging to the authenticated user.
    Optionally filter by trip status (planning, confirmed, completed, cancelled).
    """
    user_trips = [t for t in trips_db if t["user_id"] == current_user["id"]]

    if status_filter:
        user_trips = [t for t in user_trips if t["status"] == status_filter]

    return user_trips


# ── GET /api/trips/{trip_id} ──────────────────────────────────────────────────

@router.get(
    "/{trip_id}",
    response_model=TripResponse,
    summary="Get a single trip by ID",
    responses={
        200: {"description": "Trip found and returned"},
        404: {"description": "Trip not found"},
    },
)
def get_trip(trip_id: str, current_user: dict = Depends(get_current_user)):
    """
    Return a single trip by its ID.
    Only accessible if the trip belongs to the authenticated user.
    """
    trip = next(
        (t for t in trips_db if t["id"] == trip_id and t["user_id"] == current_user["id"]),
        None,
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Trip with id '{trip_id}' not found",
        )
    return trip


# ── POST /api/trips ───────────────────────────────────────────────────────────

@router.post(
    "",
    response_model=TripResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new trip",
    responses={
        201: {"description": "Trip created successfully"},
        400: {"description": "Validation error"},
    },
)
def create_trip(trip_data: TripCreate, current_user: dict = Depends(get_current_user)):
    """
    Create a new trip for the authenticated user.
    All required fields must be provided in the request body.
    """
    new_trip = {
        "id": next_trip_id(),
        "destination": trip_data.destination,
        "duration": trip_data.duration,
        "budget": trip_data.budget,
        "eco_score": trip_data.eco_score,
        "status": trip_data.status.value,
        "date": trip_data.date,
        "tags": trip_data.tags,
        "activities": trip_data.activities,
        "image": trip_data.image,
        "user_id": current_user["id"],
    }
    trips_db.append(new_trip)
    return new_trip


# ── PUT /api/trips/{trip_id} ──────────────────────────────────────────────────

@router.put(
    "/{trip_id}",
    response_model=TripResponse,
    summary="Update an existing trip",
    responses={
        200: {"description": "Trip updated successfully"},
        404: {"description": "Trip not found"},
    },
)
def update_trip(
    trip_id: str,
    trip_data: TripUpdate,
    current_user: dict = Depends(get_current_user),
):
    """
    Update an existing trip. Only the provided fields will be modified.
    Only the trip owner can update the trip.
    """
    trip = next(
        (t for t in trips_db if t["id"] == trip_id and t["user_id"] == current_user["id"]),
        None,
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Trip with id '{trip_id}' not found",
        )

    # Update only the fields that were provided (not None)
    update_data = trip_data.model_dump(exclude_none=True)
    if "status" in update_data:
        update_data["status"] = update_data["status"].value

    trip.update(update_data)
    return trip


# ── DELETE /api/trips/{trip_id} ───────────────────────────────────────────────

@router.delete(
    "/{trip_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a trip",
    responses={
        204: {"description": "Trip deleted successfully"},
        404: {"description": "Trip not found"},
    },
)
def delete_trip(trip_id: str, current_user: dict = Depends(get_current_user)):
    """
    Delete a trip by ID.
    Only the trip owner can delete the trip.
    Returns 204 No Content on success.
    """
    trip = next(
        (t for t in trips_db if t["id"] == trip_id and t["user_id"] == current_user["id"]),
        None,
    )
    if not trip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Trip with id '{trip_id}' not found",
        )

    trips_db.remove(trip)
    return None
