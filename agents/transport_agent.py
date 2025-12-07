"""
Transport Agent - Provides transportation options and recommendations.
"""
from gemini_client import GeminiClient
import logging

logger = logging.getLogger(__name__)


class TransportAgent:
    """Agent responsible for transportation recommendations."""
    
    def __init__(self, gemini_client: GeminiClient):
        """Initialize the transport agent."""
        self.gemini = gemini_client
    
    def get_transport_options(self, itinerary: dict, user_preferences: dict) -> dict:
        """
        Get transportation options for the itinerary.
        
        Args:
            itinerary: The travel itinerary
            user_preferences: User preferences including departure city
        
        Returns:
            Dictionary with transportation options and costs
        """
        prompt = self._build_transport_prompt(itinerary, user_preferences)
        
        try:
            response = self.gemini.generate_response(prompt, temperature=0.6)
            transport_info = self._parse_transport_info(response, user_preferences)
            return transport_info
        except Exception as e:
            logger.error(f"Error getting transport options: {str(e)}")
            return self._get_fallback_transport(user_preferences)
    
    def _build_transport_prompt(self, itinerary: dict, preferences: dict) -> str:
        """Build the prompt for transportation recommendations."""
        departure = preferences.get('departure_city', 'Not specified')
        budget = preferences.get('budget', 'Not specified')
        markets = preferences.get('recommended_markets', [])
        
        prompt = f"""Provide detailed transportation options for a Christmas market trip:

Departure City: {departure}
Budget: {budget}
Markets to Visit: {', '.join(markets) if markets else 'Multiple European cities'}

Provide recommendations for:
1. Flights: Best airports, airlines, and approximate costs from {departure}
2. Trains: European rail options (Eurail, national railways), routes, and costs
3. Buses: Intercity bus services and costs
4. Car Rental: If applicable, rental options and considerations
5. Local Transportation: Public transport, taxis, walking in each city
6. Best combination of transport modes for this itinerary
7. Estimated total transportation costs
8. Booking tips and best practices

Consider the budget ({budget}) and provide realistic cost estimates.
Format the response clearly with specific recommendations."""
        
        return prompt
    
    def _parse_transport_info(self, response: str, preferences: dict) -> dict:
        """Parse the transport information."""
        return {
            "transport_options": response,
            "raw_response": response,
            "preferences": preferences
        }
    
    def _get_fallback_transport(self, preferences: dict) -> dict:
        """Provide fallback transport information."""
        return {
            "transport_options": f"Recommended transportation from {preferences.get('departure_city', 'your city')}:\n"
                                "- Flights: Check major airlines for European destinations\n"
                                "- Trains: Consider Eurail pass for multiple cities\n"
                                "- Local: Use public transportation in each city",
            "raw_response": "Fallback transport info",
            "preferences": preferences
        }

