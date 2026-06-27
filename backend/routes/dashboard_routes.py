"""
Dashboard routes — aggregated statistics and analytics data.
"""

from fastapi import APIRouter, Depends

from models.stats import DashboardStats, DashboardActivity, StatItem
from auth.utils import get_current_user
from data.store import trips_db, activity_data, sustainability_breakdown

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


# ── GET /api/dashboard/stats ──────────────────────────────────────────────────

@router.get(
    "/stats",
    response_model=DashboardStats,
    summary="Get dashboard statistics",
    responses={
        200: {"description": "Dashboard stats returned"},
    },
)
def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    """
    Return aggregated dashboard statistics for the authenticated user.
    Computes totals from the user's trip data.
    """
    user_trips = [t for t in trips_db if t["user_id"] == current_user["id"]]

    total_trips = len(user_trips)
    unique_destinations = len(set(t["destination"] for t in user_trips))
    avg_eco = (
        round(sum(t["eco_score"] for t in user_trips) / total_trips)
        if total_trips > 0
        else 0
    )
    # Simulated CO2 saved: ~0.1 tonnes per trip * eco_score multiplier
    co2_saved = round(sum(t["eco_score"] * 0.025 for t in user_trips), 1)

    stats_cards = [
        StatItem(
            label="Total Trips",
            value=str(total_trips),
            change="+12%",
            trend="up",
        ),
        StatItem(
            label="Destinations",
            value=str(unique_destinations),
            change="+8%",
            trend="up",
        ),
        StatItem(
            label="CO₂ Saved",
            value=f"{co2_saved}t",
            change="+23%",
            trend="up",
        ),
        StatItem(
            label="Eco Score",
            value=str(avg_eco),
            change="+5pt",
            trend="up",
        ),
    ]

    return DashboardStats(
        total_trips=total_trips,
        total_destinations=unique_destinations,
        co2_saved=co2_saved,
        eco_score=avg_eco,
        stats_cards=stats_cards,
    )


# ── GET /api/dashboard/activity ───────────────────────────────────────────────

@router.get(
    "/activity",
    response_model=DashboardActivity,
    summary="Get monthly activity and sustainability data",
    responses={
        200: {"description": "Activity and sustainability data returned"},
    },
)
def get_dashboard_activity(current_user: dict = Depends(get_current_user)):
    """
    Return monthly trip activity data and sustainability breakdown
    for the dashboard charts.
    """
    return DashboardActivity(
        activity=activity_data,
        sustainability=sustainability_breakdown,
    )
