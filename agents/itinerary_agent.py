"""
Itinerary Agent - Creates optimized travel plans and day-by-day itineraries.
"""
from datetime import datetime, timedelta
from typing import List
import logging

from data import MARKET_PROFILES

logger = logging.getLogger(__name__)


class ItineraryAgent:
    """Agent responsible for creating travel itineraries."""

    def __init__(self, _=None):
        self.market_profiles = MARKET_PROFILES

    def create_itinerary(self, user_preferences: dict, recommended_markets: list) -> dict:
        """Create a detailed travel itinerary using curated market data."""
        try:
            itinerary_text = self._build_structured_itinerary(
                user_preferences,
                recommended_markets,
            )
            return {
                "itinerary": itinerary_text,
                "raw_response": itinerary_text,
                "preferences": user_preferences,
            }
        except Exception as exc:
            logger.error("Error creating itinerary: %s", exc)
            return self._get_fallback_itinerary(user_preferences, recommended_markets)

    # ------------------------------------------------------------------ helpers
    def _build_structured_itinerary(
        self,
        preferences: dict,
        markets: List[str],
    ) -> str:
        """Build a readable itinerary leveraging our static market profiles."""
        if not markets:
            markets = list(self.market_profiles.keys())[:3]

        total_days = preferences.get("duration_days") or max(3, len(markets))
        total_days = max(3, min(total_days, 10))

        try:
            current_date = (
                datetime.strptime(preferences.get("start_date"), "%Y-%m-%d")
                if preferences.get("start_date")
                else None
            )
        except Exception:
            current_date = None

        day_sections: List[str] = []

        for index in range(total_days):
            city = markets[index % len(markets)]
            profile = self.market_profiles.get(city, {})
            next_city = markets[(index + 1) % len(markets)] if index + 1 < total_days else None

            day_lines = [f"Day {index + 1}: {city}"]
            if current_date:
                day_lines.append(current_date.strftime("%A, %B %d, %Y"))

            day_lines.extend(self._build_day_schedule(city, profile, preferences))

            if next_city and next_city != city:
                connection = self._connection_line(city, next_city)
                if connection:
                    day_lines.append(connection)

            tip = profile.get("culture", {}).get("tips", [])
            if tip:
                day_lines.append(f"Tip: {tip[index % len(tip)]}")

            day_sections.append("\n".join(day_lines))

            if current_date:
                current_date += timedelta(days=1)

        return "\n\n".join(day_sections)

    def _build_day_schedule(self, city: str, profile: dict, preferences: dict) -> List[str]:
        """Create a morning-afternoon-evening plan for a single day."""
        signature = profile.get("signature_market", f"{city} Christmas Market")
        highlights = profile.get("highlights", [])
        foods = profile.get("foods", [])
        experiences = profile.get("experiences", [])
        accommodations = profile.get("accommodations", [])
        side_trip = profile.get("side_trip")

        def safe_list(lst: List[str], fallback: str) -> str:
            return lst[0] if lst else fallback

        morning_food = safe_list(
            foods, "local pastries and a mug of mulled wine"
        )
        afternoon_highlight = safe_list(
            highlights, "Explore festive streets and artisan huts"
        )
        evening_activity = safe_list(
            experiences, f"Evening wander through {signature}"
        )
        stay = accommodations[0]["name"] if accommodations else f"Cozy hotel in {city}"
        stay_note = accommodations[0]["note"] if accommodations else "Stay near the old town for easy walks."

        schedule = [
            self._format_activity(
                "09:00",
                f"Arrive at {signature}",
                f"Ease into the day with {morning_food} and capture the first light on the stalls.",
            ),
            self._format_activity(
                "11:30",
                "Local lunch",
                f"Grab a seat near the main square and sample seasonal specials inspired by {morning_food}.",
            ),
            self._format_activity(
                "14:30",
                "Afternoon highlights",
                afternoon_highlight,
            ),
        ]

        if side_trip:
            schedule.append(
                self._format_activity(
                    "16:00",
                    "Side adventure",
                    side_trip,
                )
            )
        else:
            schedule.append(
                self._format_activity(
                    "16:00",
                    "Warm-up break",
                    "Step inside a café for hot chocolate and people watching.",
                )
            )

        schedule.extend(
            [
                self._format_activity(
                    "18:30",
                    "Golden hour magic",
                    evening_activity,
                ),
                self._format_activity(
                    "20:30",
                    f"Check into {stay}",
                    stay_note,
                ),
            ]
        )

        return schedule

    def _format_activity(self, time: str, title: str, description: str) -> str:
        """Helper to keep activity formatting consistent."""
        return f"{time} {title} - {description}"

    def _connection_line(self, current_city: str, next_city: str) -> str:
        """Look up suggested transport between two cities."""
        profile = self.market_profiles.get(current_city, {})
        connections = profile.get("transport", {}).get("connections", [])

        for conn in connections:
            if current_city in conn and next_city in conn:
                return f"21:30 Travel - {conn}"

        return f"21:30 Travel - Evening transfer to {next_city} (book tickets in advance)."

    def _get_fallback_itinerary(self, preferences: dict, markets: list) -> dict:
        """Provide a fallback itinerary."""
        markets = markets or list(self.market_profiles.keys())[:3]
        sections = []
        for idx, market in enumerate(markets[:3], start=1):
            sections.append(
                f"Day {idx}: {market}\n"
                f"09:00 Explore the main Christmas market and sample local treats.\n"
                f"13:00 Visit nearby museums and warm cafés.\n"
                f"18:00 Enjoy evening lights before settling into your hotel."
            )

        itinerary = "\n\n".join(sections)
        return {
            "itinerary": itinerary,
            "raw_response": itinerary,
            "preferences": preferences,
        }
