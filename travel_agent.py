"""
Main Travel Agent - Orchestrates all agents to provide comprehensive travel assistance.
"""
from gemini_client import GeminiClient
from agents import (
    MarketRecommendationAgent,
    ItineraryAgent,
    TransportAgent,
    AccommodationAgent,
    CulturalAgent
)
import logging

logger = logging.getLogger(__name__)


class ChristmasMarketTravelAgent:
    """Main travel agent that coordinates all specialized agents."""
    
    def __init__(self, api_key: str = None):
        """Initialize the travel agent with all sub-agents."""
        self.gemini_client = GeminiClient(api_key)
        
        # Initialize all agents
        self.market_agent = MarketRecommendationAgent(self.gemini_client)
        self.itinerary_agent = ItineraryAgent(self.gemini_client)
        self.transport_agent = TransportAgent(self.gemini_client)
        self.accommodation_agent = AccommodationAgent(self.gemini_client)
        self.cultural_agent = CulturalAgent(self.gemini_client)
        
        logger.info("Christmas Market Travel Agent initialized")
    
    def process_request(self, user_preferences: dict) -> dict:
        """
        Process a complete travel request and return comprehensive recommendations.
        
        Args:
            user_preferences: Dictionary containing:
                - departure_city: User's departure city
                - travel_dates: Travel dates
                - duration: Trip duration
                - budget: Budget range
                - interests: List of interests
                - pace: Travel pace
                - language: Preferred language
                - travel_companions: Who they're traveling with
        
        Returns:
            Complete travel plan dictionary
        """
        try:
            logger.info("Processing travel request...")
            
            # Step 1: Get market recommendations
            logger.info("Getting market recommendations...")
            market_recommendations = self.market_agent.recommend_markets(user_preferences)
            
            # Extract recommended markets from response
            recommended_markets = self._extract_markets_from_response(
                market_recommendations.get("recommendations", "")
            )
            
            if not recommended_markets:
                # Fallback to default markets
                recommended_markets = ["Nuremberg", "Munich", "Vienna"]
            
            user_preferences["recommended_markets"] = recommended_markets
            
            # Step 2: Create itinerary
            logger.info("Creating itinerary...")
            itinerary = self.itinerary_agent.create_itinerary(
                user_preferences,
                recommended_markets
            )
            
            # Step 3: Get transport options
            logger.info("Getting transport options...")
            transport = self.transport_agent.get_transport_options(
                itinerary,
                user_preferences
            )
            
            # Step 4: Get accommodation recommendations
            logger.info("Getting accommodation recommendations...")
            accommodations = self.accommodation_agent.get_accommodation_recommendations(
                itinerary,
                user_preferences
            )
            
            # Step 5: Get cultural insights
            logger.info("Getting cultural insights...")
            cultural_info = self.cultural_agent.get_cultural_insights(
                recommended_markets,
                user_preferences
            )
            
            # Compile complete travel plan
            travel_plan = {
                "market_recommendations": market_recommendations,
                "itinerary": itinerary,
                "transport": transport,
                "accommodations": accommodations,
                "cultural_insights": cultural_info,
                "summary": self._generate_summary(
                    recommended_markets,
                    user_preferences
                )
            }
            
            logger.info("Travel request processed successfully")
            return travel_plan
            
        except Exception as e:
            logger.error(f"Error processing travel request: {str(e)}")
            raise
    
    def _extract_markets_from_response(self, response: str) -> list:
        """Extract market names from the AI response."""
        # Simple extraction - can be enhanced with NLP
        markets = []
        common_markets = [
            "Nuremberg", "Munich", "Dresden", "Cologne", "Frankfurt", "Berlin",
            "Vienna", "Salzburg", "Innsbruck", "Strasbourg", "Colmar", "Paris",
            "Prague", "Zurich", "Brussels", "Bruges"
        ]
        
        response_lower = response.lower()
        for market in common_markets:
            if market.lower() in response_lower:
                markets.append(market)
        
        return markets[:5]  # Return top 5
    
    def _generate_summary(self, markets: list, preferences: dict) -> str:
        """Generate a summary of the travel plan."""
        return f"""
Travel Plan Summary:
- Recommended Markets: {', '.join(markets)}
- Duration: {preferences.get('duration', 'Not specified')}
- Budget: {preferences.get('budget', 'Not specified')}
- Departure: {preferences.get('departure_city', 'Not specified')}
"""

