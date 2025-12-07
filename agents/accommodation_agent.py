"""
Accommodation Agent - Suggests hotels, hostels, and Airbnb options.
"""
from gemini_client import GeminiClient
import logging

logger = logging.getLogger(__name__)


class AccommodationAgent:
    """Agent responsible for accommodation recommendations."""
    
    def __init__(self, gemini_client: GeminiClient):
        """Initialize the accommodation agent."""
        self.gemini = gemini_client
    
    def get_accommodation_recommendations(self, itinerary: dict, user_preferences: dict) -> dict:
        """
        Get accommodation recommendations for the trip.
        
        Args:
            itinerary: The travel itinerary
            user_preferences: User preferences including budget and travel companions
        
        Returns:
            Dictionary with accommodation recommendations
        """
        prompt = self._build_accommodation_prompt(itinerary, user_preferences)
        
        try:
            response = self.gemini.generate_response(prompt, temperature=0.7)
            accommodations = self._parse_accommodations(response, user_preferences)
            return accommodations
        except Exception as e:
            logger.error(f"Error getting accommodation recommendations: {str(e)}")
            return self._get_fallback_accommodations(user_preferences)
    
    def _build_accommodation_prompt(self, itinerary: dict, preferences: dict) -> str:
        """Build the prompt for accommodation recommendations."""
        budget = preferences.get('budget', 'Not specified')
        markets = preferences.get('recommended_markets', [])
        companions = preferences.get('travel_companions', 'Not specified')
        duration = preferences.get('duration', 'Not specified')
        
        prompt = f"""Provide accommodation recommendations for a Christmas market trip:

Cities to Visit: {', '.join(markets) if markets else 'Multiple European cities'}
Budget: {budget}
Travel Companions: {companions}
Trip Duration: {duration}

For each city, provide:
1. Hotel recommendations (luxury, mid-range, budget options)
2. Hostel options for budget travelers
3. Airbnb/vacation rental suggestions
4. Best neighborhoods/areas to stay in each city
5. Proximity to Christmas markets and attractions
6. Estimated costs per night for each option
7. Booking tips and best practices
8. Special considerations (family-friendly, pet-friendly, etc.)

Consider the budget ({budget}) and provide realistic recommendations.
Format the response clearly with specific suggestions for each city."""
        
        return prompt
    
    def _parse_accommodations(self, response: str, preferences: dict) -> dict:
        """Parse the accommodation recommendations."""
        return {
            "accommodations": response,
            "raw_response": response,
            "preferences": preferences
        }
    
    def _get_fallback_accommodations(self, preferences: dict) -> dict:
        """Provide fallback accommodation recommendations."""
        markets = preferences.get('recommended_markets', [])
        
        return {
            "accommodations": f"Accommodation recommendations for {', '.join(markets) if markets else 'your destinations'}:\n"
                            "- Hotels: Check Booking.com, Expedia for options near city centers\n"
                            "- Hostels: Hostelworld for budget-friendly options\n"
                            "- Airbnb: Great for longer stays and family groups\n"
                            "- Book early during Christmas market season (late November - December)",
            "raw_response": "Fallback accommodations",
            "preferences": preferences
        }

