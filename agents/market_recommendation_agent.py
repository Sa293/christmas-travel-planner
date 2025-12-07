"""
Market Recommendation Agent - Suggests Christmas markets based on user preferences.
"""
from typing import List, Dict, Tuple

import logging

from config import CHRISTMAS_MARKETS
from data import MARKET_PROFILES

logger = logging.getLogger(__name__)


class MarketRecommendationAgent:
    """Agent responsible for recommending Christmas markets."""

    def __init__(self, _=None):
        """
        Initialize the market recommendation agent.
        Gemini is optional – we use curated data when no model is configured.
        """
        self.markets = CHRISTMAS_MARKETS
        self.market_profiles = MARKET_PROFILES

    def recommend_markets(self, user_preferences: dict) -> dict:
        """
        Recommend Christmas markets based on user preferences.
        """
        try:
            top_markets = self._score_markets(user_preferences)
            if not top_markets:
                raise ValueError("No markets scored.")

            formatted = self._format_recommendations(top_markets, user_preferences)
            return {
                "recommendations": formatted,
                "raw_response": formatted,
                "user_preferences": user_preferences,
            }
        except Exception as exc:
            logger.error("Error in market recommendation: %s", exc)
            fallback = self._get_fallback_recommendations(user_preferences)
            return fallback

    # ------------------------------------------------------------------ helpers
    def _score_markets(self, preferences: dict) -> List[Dict]:
        """Score markets using static knowledge and user interests."""
        interests = preferences.get("interests", [])
        budget = (preferences.get("budget") or "").lower()
        pace = preferences.get("pace", "moderate")
        duration_days = preferences.get("duration_days", 5)

        scored: List[Tuple[str, float]] = []

        for city, profile in self.market_profiles.items():
            score = 50.0

            # Interests
            for interest in interests:
                if interest in profile.get("best_for", []):
                    score += 8

            # Budget alignment
            price_level = profile.get("price_level", "")
            if budget.startswith("budget") and price_level == "budget":
                score += 6
            elif budget.startswith("mid") and price_level == "mid":
                score += 6
            elif budget.startswith("lux") and price_level in {"premium", "luxury"}:
                score += 6

            # Travel pace
            if pace == profile.get("ideal_pace"):
                score += 5

            # Seasonal availability boost for longer trips (encourage variety)
            score += min(duration_days, 8) * 0.8

            scored.append(
                {
                    "city": city,
                    "score": score,
                    "profile": profile,
                }
            )

        scored.sort(key=lambda item: item["score"], reverse=True)
        return scored[:5]

    def _format_recommendations(
        self, markets: List[Dict], preferences: dict
    ) -> str:
        """Format recommendations into human-friendly text."""
        lines = [
            "Top Christmas markets selected for your wish list:",
            "",
        ]

        for index, item in enumerate(markets, start=1):
            profile = item["profile"]
            lines.append(
                f"{index}. {item['city']} ({profile['country']}) – {profile['dates']}"
            )
            lines.append(f"   Why it fits: {profile['summary']}")

            highlights = profile.get("highlights", [])
            if highlights:
                lines.append(f"   Don't miss: {highlights[0]}")

            foods = profile.get("foods", [])
            if foods:
                lines.append(f"   Taste: {foods[0]} & {foods[1] if len(foods) > 1 else foods[0]}")

            lines.append(
                f"   Best for: {', '.join(profile.get('best_for', []))}"
            )
            lines.append("")

        lines.append(
            "Tip: Mix nearby cities (e.g., Munich + Salzburg) to keep travel easy."
        )

        return "\n".join(lines).strip()

    def _get_fallback_recommendations(self, preferences: dict) -> dict:
        """Provide fallback recommendations if scoring fails."""
        default_markets = ["Nuremberg", "Munich", "Vienna", "Strasbourg", "Prague"]
        default_profile = {
            "country": "Europe",
            "dates": "Advent season",
            "summary": "Classic Christmas market atmosphere.",
            "best_for": ["food", "crafts"],
            "highlights": [],
            "foods": [],
        }
        recommendations = self._format_recommendations(
            [
                {
                    "city": city,
                    "score": 0,
                    "profile": self.market_profiles.get(city, default_profile),
                }
                for city in default_markets
            ],
            preferences,
        )

        return {
            "recommendations": recommendations,
            "raw_response": recommendations,
            "user_preferences": preferences,
        }

