"""
Cultural Agent - Provides local insights, food recommendations, events, and cultural tips.
"""
import logging
from typing import List

from data import MARKET_PROFILES

logger = logging.getLogger(__name__)


class CulturalAgent:
    """Agent responsible for cultural information and local insights."""

    def __init__(self, _=None):
        self.market_profiles = MARKET_PROFILES

    def get_cultural_insights(self, recommended_markets: list, user_preferences: dict) -> dict:
        """Return cultural notes and insider tips for each market."""
        try:
            insights = self._build_cultural_notes(recommended_markets)
            return {
                "cultural_insights": insights,
                "raw_response": insights,
                "preferences": user_preferences,
            }
        except Exception as exc:
            logger.error("Error getting cultural insights: %s", exc)
            return self._get_fallback_cultural_info(recommended_markets)

    # ------------------------------------------------------------------ helpers
    def _build_cultural_notes(self, markets: List[str]) -> str:
        if not markets:
            markets = list(self.market_profiles.keys())[:3]

        lines = ["Cultural snapshots to keep your trip effortless:", ""]

        for city in markets:
            profile = self.market_profiles.get(city, {})
            culture = profile.get("culture", {})
            foods = profile.get("foods", [])
            experiences = profile.get("experiences", [])

            lines.append(f"{city}:")

            if foods:
                lines.append(f"  • Must-try bites: {', '.join(foods[:2])}.")

            customs = culture.get("customs", [])
            if customs:
                lines.append(f"  • Local tradition: {customs[0]}")

            tips = culture.get("tips", [])
            if tips:
                lines.append(f"  • Insider tip: {tips[0]}")

            phrases = culture.get("phrases", [])
            if phrases:
                lines.append(f"  • Say it like a local: {phrases[0]}")

            if experiences:
                lines.append(f"  • Evening vibe: {experiences[0]}")

            lines.append("")

        lines.extend(
            [
                "General etiquette:",
                "- Most stalls take cash; keep €1-2 coins for mug deposits.",
                "- Layers are your friend—temperatures swing between day sun and frosty nights.",
                "- Bring a reusable tote or backpack for artisan finds (many cities encourage low waste).",
            ]
        )

        return "\n".join(lines).strip()

    def _get_fallback_cultural_info(self, markets: list) -> dict:
        """Provide fallback cultural information."""
        markets_str = ", ".join(markets) if isinstance(markets, list) else str(markets)

        text = (
            f"Cultural tips for {markets_str}:\n"
            "- Try local mulled wine (Glühwein) and traditional Christmas treats\n"
            "- Dress warmly as markets are outdoors\n"
            "- Visit markets in the evening for the best atmosphere\n"
            "- Learn basic greetings in the local language\n"
            "- Bring cash as some stalls don't accept cards"
        )

        return {
            "cultural_insights": text,
            "raw_response": text,
            "preferences": {},
        }

