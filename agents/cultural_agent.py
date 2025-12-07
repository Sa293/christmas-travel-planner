"""
Cultural Agent - Provides local insights, food recommendations, events, and cultural tips.
"""
from gemini_client import GeminiClient
import logging

logger = logging.getLogger(__name__)


class CulturalAgent:
    """Agent responsible for cultural information and local insights."""
    
    def __init__(self, gemini_client: GeminiClient):
        """Initialize the cultural agent."""
        self.gemini = gemini_client
    
    def get_cultural_insights(self, recommended_markets: list, user_preferences: dict) -> dict:
        """
        Get cultural insights, food recommendations, and local tips.
        
        Args:
            recommended_markets: List of recommended markets
            user_preferences: User preferences including interests
        
        Returns:
            Dictionary with cultural information
        """
        prompt = self._build_cultural_prompt(recommended_markets, user_preferences)
        
        try:
            response = self.gemini.generate_response(prompt, temperature=0.8)
            cultural_info = self._parse_cultural_info(response, user_preferences)
            return cultural_info
        except Exception as e:
            logger.error(f"Error getting cultural insights: {str(e)}")
            return self._get_fallback_cultural_info(recommended_markets)
    
    def _build_cultural_prompt(self, markets: list, preferences: dict) -> str:
        """Build the prompt for cultural information."""
        markets_str = ", ".join(markets) if isinstance(markets, list) else str(markets)
        interests = ", ".join(preferences.get('interests', []))
        
        prompt = f"""Provide comprehensive cultural insights and local tips for visiting these Christmas markets: {markets_str}

User Interests: {interests}

For each market, provide:
1. Local Food & Drinks: Traditional Christmas market foods, must-try dishes, local specialties, mulled wine (Glühwein), hot chocolate, regional treats
2. Cultural Events: Special events, concerts, performances, traditional celebrations during the market period
3. Local Customs & Etiquette: How to interact with locals, tipping culture, market etiquette, what to expect
4. Nearby Attractions: Museums, historical sites, churches, viewpoints, other tourist attractions near the markets
5. Shopping Tips: What to buy, local crafts, souvenirs, market stalls to visit
6. Weather & What to Wear: Expected weather conditions, appropriate clothing, staying warm
7. Language Tips: Basic phrases in local language, how to communicate
8. Safety Tips: General safety advice, areas to be cautious, emergency contacts
9. Photography Tips: Best spots for photos, market highlights
10. Family-Friendly Activities: If applicable, activities suitable for children

Make the information practical, specific, and engaging.
Format it clearly for each market."""
        
        return prompt
    
    def _parse_cultural_info(self, response: str, preferences: dict) -> dict:
        """Parse the cultural information."""
        return {
            "cultural_insights": response,
            "raw_response": response,
            "preferences": preferences
        }
    
    def _get_fallback_cultural_info(self, markets: list) -> dict:
        """Provide fallback cultural information."""
        markets_str = ", ".join(markets) if isinstance(markets, list) else str(markets)
        
        return {
            "cultural_insights": f"Cultural tips for {markets_str}:\n"
                                "- Try local mulled wine (Glühwein) and traditional Christmas treats\n"
                                "- Dress warmly as markets are outdoors\n"
                                "- Visit markets in the evening for the best atmosphere\n"
                                "- Learn basic greetings in the local language\n"
                                "- Bring cash as some stalls don't accept cards",
            "raw_response": "Fallback cultural info",
            "preferences": {}
        }

