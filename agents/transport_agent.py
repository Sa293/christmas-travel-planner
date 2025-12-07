"""
Transport Agent - Provides transportation options and recommendations.
"""
import logging
from typing import List

from data import MARKET_PROFILES

logger = logging.getLogger(__name__)


class TransportAgent:
    """Agent responsible for transportation recommendations."""

    def __init__(self, _=None):
        self.market_profiles = MARKET_PROFILES

    def get_transport_options(self, itinerary: dict, user_preferences: dict) -> dict:
        """Return transport guidance using curated rail and flight tips."""
        try:
            plan = self._build_transport_plan(user_preferences)
            return {
                "transport_options": plan,
                "raw_response": plan,
                "preferences": user_preferences,
            }
        except Exception as exc:
            logger.error("Error getting transport options: %s", exc)
            return self._get_fallback_transport(user_preferences)

    # ------------------------------------------------------------------ helpers
    def _build_transport_plan(self, preferences: dict) -> str:
        markets: List[str] = preferences.get("recommended_markets", [])
        if not markets:
            markets = list(self.market_profiles.keys())[:3]

        departure = preferences.get("departure_city", "your city")
        first_profile = self.market_profiles.get(markets[0], {})

        lines = [
            f"Arriving from {departure}:",
            first_profile.get(
                "transport", {}
            ).get(
                "arrival",
                f"Book a flight into the nearest major airport for {markets[0]} and connect by rail.",
            ),
            "",
            "Inter-city connections:",
        ]

        for i in range(len(markets) - 1):
            step = self._connection_text(markets[i], markets[i + 1])
            lines.append(f"- {step}")

        lines.extend(
            [
                "",
                "Local transport tips:",
            ]
        )

        for city in markets:
            profile = self.market_profiles.get(city, {})
            local_tip = profile.get("transport", {}).get(
                "local", "Compact old town — walk everywhere."
            )
            lines.append(f"• {city}: {local_tip}")

        lines.extend(
            [
                "",
                "Booking tips:",
                "- Lock in long-distance rail tickets 60-90 days out for the best fares.",
                "- Use a regional rail pass (Eurail, German Rail Pass) if you plan 4+ train segments.",
                "- Keep €1-2 coins for lockers and tram tickets at market entrances.",
            ]
        )

        return "\n".join(lines)

    def _connection_text(self, current_city: str, next_city: str) -> str:
        profile = self.market_profiles.get(current_city, {})
        connections = profile.get("transport", {}).get("connections", [])

        for conn in connections:
            if current_city in conn and next_city in conn:
                return conn

        return f"{current_city} → {next_city}: Regional train or FlixBus (1-3h depending on service)."

    def _get_fallback_transport(self, preferences: dict) -> dict:
        """Provide fallback transport information."""
        text = (
            f"Recommended transportation from {preferences.get('departure_city', 'your city')}:\n"
            "- Flights: Check major airlines for European destinations\n"
            "- Trains: Consider Eurail pass for multiple cities\n"
            "- Local: Use public transportation in each city"
        )
        return {
            "transport_options": text,
            "raw_response": text,
            "preferences": preferences,
        }
