"""
Accommodation Agent - Suggests hotels, hostels, and apartment-style stays.
"""
import logging
from typing import List

from data import MARKET_PROFILES

logger = logging.getLogger(__name__)


class AccommodationAgent:
    """Agent responsible for accommodation recommendations."""

    def __init__(self, _=None):
        self.market_profiles = MARKET_PROFILES

    def get_accommodation_recommendations(self, itinerary: dict, user_preferences: dict) -> dict:
        """Return curated accommodation ideas for each city."""
        try:
            recommendations = self._build_accommodation_summary(user_preferences)
            return {
                "accommodations": recommendations,
                "raw_response": recommendations,
                "preferences": user_preferences,
            }
        except Exception as exc:
            logger.error("Error getting accommodation recommendations: %s", exc)
            return self._get_fallback_accommodations(user_preferences)

    # ------------------------------------------------------------------ helpers
    def _build_accommodation_summary(self, preferences: dict) -> str:
        markets: List[str] = preferences.get("recommended_markets", [])
        if not markets:
            markets = list(self.market_profiles.keys())[:3]

        budget = preferences.get("budget", "Mid-range")

        lines = [f"Stay suggestions ({budget} focus):", ""]

        for city in markets:
            profile = self.market_profiles.get(city, {})
            lines.append(f"{city}:")

            accommodations = profile.get("accommodations", [])
            if not accommodations:
                lines.append("  - Stay inside the old town walls for quick market access.")
                lines.append("")
                continue

            for option in accommodations:
                lines.append(
                    f"  - {option['name']} ({option['price']}): {option['type']}. {option['note']}"
                )

            lines.append("")

        lines.extend(
            [
                "Booking tips:",
                "- Reserve cancellable rates 3-4 months ahead; markets fill fast.",
                "- Choose properties within the pedestrian zone so you can warm up between stalls.",
                "- If traveling with friends, look for serviced apartments to split costs.",
            ]
        )

        return "\n".join(lines).strip()

    def _get_fallback_accommodations(self, preferences: dict) -> dict:
        """Provide fallback accommodation recommendations."""
        markets = preferences.get("recommended_markets", [])
        text = (
            f"Accommodation recommendations for {', '.join(markets) if markets else 'your destinations'}:\n"
            "- Hotels: Check Booking.com or Expedia for options near city centers\n"
            "- Hostels: Hostelworld for budget-friendly dorms close to tram stops\n"
            "- Apartments: Airbnb/Plum Guide for longer stays or families\n"
            "- Book early during Christmas market season (late November - December)"
        )
        return {
            "accommodations": text,
            "raw_response": text,
            "preferences": preferences,
        }

