"""
Itinerary Agent - Creates optimized travel plans and day-by-day itineraries.
"""
from gemini_client import GeminiClient
import logging

logger = logging.getLogger(__name__)


class ItineraryAgent:
    """Agent responsible for creating travel itineraries."""
    
    def __init__(self, gemini_client: GeminiClient):
        """Initialize the itinerary agent."""
        self.gemini = gemini_client
    
    def create_itinerary(self, user_preferences: dict, recommended_markets: list) -> dict:
        """
        Create a detailed travel itinerary.
        
        Args:
            user_preferences: User preferences dictionary
            recommended_markets: List of recommended markets
        
        Returns:
            Dictionary containing day-by-day itinerary
        """
        prompt = self._build_itinerary_prompt(user_preferences, recommended_markets)
        
        try:
            response = self.gemini.generate_response(prompt, temperature=0.7)
            itinerary = self._parse_itinerary(response, user_preferences)
            return itinerary
        except Exception as e:
            logger.error(f"Error creating itinerary: {str(e)}")
            return self._get_fallback_itinerary(user_preferences, recommended_markets)
    
    def _build_itinerary_prompt(self, preferences: dict, markets: list) -> str:
        """Build the prompt for itinerary creation."""
        markets_str = ", ".join(markets) if isinstance(markets, list) else str(markets)
        duration = preferences.get('duration', '5 days')
        pace = preferences.get('pace', 'moderate')
        
        prompt = f"""Create a detailed {duration} travel itinerary for visiting these Christmas markets: {markets_str}

User Preferences:
- Departure City: {preferences.get('departure_city', 'Not specified')}
- Travel Dates: {preferences.get('travel_dates', 'Not specified')}
- Budget: {preferences.get('budget', 'Not specified')}
- Interests: {', '.join(preferences.get('interests', []))}
- Travel Pace: {pace}
- Traveling with: {preferences.get('travel_companions', 'Not specified')}

Create a day-by-day itinerary that includes:
1. Day-by-day breakdown with dates
2. Morning, afternoon, and evening activities for each day
3. Travel times between locations
4. Recommended time spent at each market
5. Nearby attractions and activities
6. Meal suggestions (breakfast, lunch, dinner)
7. Rest and relaxation time appropriate for the travel pace

IMPORTANT FORMATTING REQUIREMENTS:
- Start each day with "Day X: [City Name]" format (e.g., "Day 1: Nuremberg" or "Day 1: Arrive in Nuremberg")
- Include specific times for each activity (e.g., "09:00", "14:00", "18:00")
- List activities clearly with times and descriptions
- Mention the city name prominently in each day's header
- Use clear, structured format that's easy to parse

Make the itinerary realistic, considering travel times and the specified pace ({pace}).
Format it clearly with specific times and activities."""
        
        return prompt
    
    def _parse_itinerary(self, response: str, preferences: dict) -> dict:
        """Parse the AI response into a structured itinerary."""
        return {
            "itinerary": response,
            "raw_response": response,
            "preferences": preferences
        }
    
    def _get_fallback_itinerary(self, preferences: dict, markets: list) -> dict:
        """Provide a fallback itinerary if AI fails."""
        markets_str = ", ".join(markets) if isinstance(markets, list) else str(markets)
        
        return {
            "itinerary": f"Day 1: Arrive and explore {markets[0] if markets else 'first market'}\n"
                        f"Day 2: Visit {markets[1] if len(markets) > 1 else markets[0]}\n"
                        f"Day 3: Continue exploring markets and local attractions",
            "raw_response": "Fallback itinerary",
            "preferences": preferences
        }

