"""
Market Recommendation Agent - Suggests Christmas markets based on user preferences.
"""
from gemini_client import GeminiClient
from config import CHRISTMAS_MARKETS
import logging

logger = logging.getLogger(__name__)


class MarketRecommendationAgent:
    """Agent responsible for recommending Christmas markets."""
    
    def __init__(self, gemini_client: GeminiClient):
        """Initialize the market recommendation agent."""
        self.gemini = gemini_client
        self.markets = CHRISTMAS_MARKETS
    
    def recommend_markets(self, user_preferences: dict) -> dict:
        """
        Recommend Christmas markets based on user preferences.
        
        Args:
            user_preferences: Dictionary containing:
                - departure_city: User's departure city
                - travel_dates: Travel dates
                - budget: Budget range
                - interests: List of interests (food, culture, shopping, etc.)
                - pace: Travel pace (relaxed, moderate, intense)
                - language: Preferred language
        
        Returns:
            Dictionary with recommended markets and reasoning
        """
        prompt = self._build_recommendation_prompt(user_preferences)
        
        try:
            response = self.gemini.generate_response(prompt, temperature=0.8)
            
            # Parse and structure the response
            recommendations = self._parse_recommendations(response, user_preferences)
            return recommendations
        except Exception as e:
            logger.error(f"Error in market recommendation: {str(e)}")
            return self._get_fallback_recommendations(user_preferences)
    
    def _build_recommendation_prompt(self, preferences: dict) -> str:
        """Build the prompt for market recommendations."""
        interests = ", ".join(preferences.get("interests", []))
        
        prompt = f"""You are a Christmas market travel expert. Recommend the best Christmas markets in Europe based on the following preferences:

Departure City: {preferences.get('departure_city', 'Not specified')}
Travel Dates: {preferences.get('travel_dates', 'Not specified')}
Budget: {preferences.get('budget', 'Not specified')}
Interests: {interests}
Travel Pace: {preferences.get('pace', 'moderate')}
Language Preference: {preferences.get('language', 'English')}

Available Christmas Markets by Country:
- Germany: {', '.join(self.markets.get('germany', []))}
- Austria: {', '.join(self.markets.get('austria', []))}
- France: {', '.join(self.markets.get('france', []))}
- Czech Republic: {', '.join(self.markets.get('czech_republic', []))}
- Switzerland: {', '.join(self.markets.get('switzerland', []))}
- Belgium: {', '.join(self.markets.get('belgium', []))}

Provide:
1. Top 3-5 recommended markets with brief explanations
2. Why each market matches their preferences
3. Best time to visit each market
4. Unique features of each market

Format your response clearly and concisely."""
        
        return prompt
    
    def _parse_recommendations(self, response: str, preferences: dict) -> dict:
        """Parse the AI response into a structured format."""
        return {
            "recommendations": response,
            "raw_response": response,
            "user_preferences": preferences
        }
    
    def _get_fallback_recommendations(self, preferences: dict) -> dict:
        """Provide fallback recommendations if AI fails."""
        # Default recommendations based on common preferences
        default_markets = {
            "germany": ["Nuremberg", "Munich", "Dresden"],
            "austria": ["Vienna", "Salzburg"],
            "france": ["Strasbourg", "Colmar"]
        }
        
        return {
            "recommendations": "Based on your preferences, I recommend visiting: " + 
                             ", ".join(default_markets.get("germany", [])),
            "raw_response": "Fallback recommendations",
            "user_preferences": preferences
        }

