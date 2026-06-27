"""
Pydantic models for Dashboard statistics and analytics.
"""

from pydantic import BaseModel
from typing import List


class StatItem(BaseModel):
    """A single dashboard statistic card."""
    label: str
    value: str
    change: str
    trend: str  # "up" or "down"


class DashboardStats(BaseModel):
    """Aggregated dashboard statistics."""
    total_trips: int
    total_destinations: int
    co2_saved: float
    eco_score: int
    stats_cards: List[StatItem]


class ActivityDataPoint(BaseModel):
    """Monthly activity data for charts."""
    month: str
    trips: int
    eco: int


class SustainabilityItem(BaseModel):
    """Sustainability breakdown item for pie chart."""
    name: str
    value: int
    color: str


class DashboardActivity(BaseModel):
    """Complete dashboard activity and sustainability data."""
    activity: List[ActivityDataPoint]
    sustainability: List[SustainabilityItem]
