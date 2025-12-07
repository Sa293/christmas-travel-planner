"""
Flask API server for the Christmas Market Travel Agent.
Provides REST API endpoints for the frontend UI.
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from travel_agent import ChristmasMarketTravelAgent
from config import GEMINI_API_KEY
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Initialize the travel agent
try:
    travel_agent = ChristmasMarketTravelAgent(GEMINI_API_KEY)
    logger.info("Travel agent initialized successfully")
except Exception as e:
    logger.error(f"Failed to initialize travel agent: {str(e)}")
    travel_agent = None


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        "status": "healthy",
        "service": "Christmas Market Travel Agent API"
    })


@app.route('/api/plan', methods=['POST'])
def create_travel_plan():
    """
    Create a travel plan based on user preferences.
    
    Expected JSON payload:
    {
        "startDate": "2024-12-15",
        "endDate": "2024-12-20",
        "departureCity": "Berlin",
        "budget": [1500],
        "interests": ["food", "culture"],
        "pace": "moderate",
        "language": "en"
    }
    """
    if not travel_agent:
        return jsonify({
            "error": "Travel agent not initialized. Please check API key configuration."
        }), 500
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        # Extract and format user preferences
        start_date = data.get('startDate', '')
        end_date = data.get('endDate', '')
        travel_dates = f"{start_date} to {end_date}" if start_date and end_date else "Not specified"
        
        # Calculate duration
        if start_date and end_date:
            from datetime import datetime
            try:
                start = datetime.strptime(start_date, '%Y-%m-%d')
                end = datetime.strptime(end_date, '%Y-%m-%d')
                days = (end - start).days + 1
                duration = f"{days} days"
            except:
                duration = "Not specified"
        else:
            duration = "Not specified"
        
        # Map budget slider value to budget category
        budget_value = data.get('budget', [1500])[0] if isinstance(data.get('budget'), list) else data.get('budget', 1500)
        if budget_value < 1000:
            budget_category = "Budget-friendly"
        elif budget_value < 2500:
            budget_category = "Mid-range"
        else:
            budget_category = "Luxury"
        
        # Map interests
        interests = data.get('interests', [])
        # Map frontend interest IDs to backend format
        interest_mapping = {
            'food': 'food',
            'crafts': 'culture',
            'music': 'culture',
            'shopping': 'shopping',
            'history': 'culture',
            'photo': 'culture'
        }
        mapped_interests = [interest_mapping.get(i, i) for i in interests]
        
        # Map pace
        pace_mapping = {
            'relaxed': 'relaxed',
            'moderate': 'moderate',
            'active': 'intense'
        }
        pace = pace_mapping.get(data.get('pace', 'moderate'), 'moderate')
        
        # Build user preferences dictionary
        user_preferences = {
            'departure_city': data.get('departureCity', 'Not specified'),
            'travel_dates': travel_dates,
            'duration': duration,
            'budget': budget_category,
            'interests': mapped_interests if mapped_interests else ['culture', 'food'],
            'pace': pace,
            'language': data.get('language', 'en'),
            'travel_companions': 'Not specified'  # Can be added to form later
        }
        
        logger.info(f"Processing travel plan request: {user_preferences}")
        
        # Process the request
        travel_plan = travel_agent.process_request(user_preferences)
        
        # Format response for frontend
        response = {
            "success": True,
            "travel_plan": {
                "market_recommendations": travel_plan.get('market_recommendations', {}).get('recommendations', ''),
                "itinerary": travel_plan.get('itinerary', {}).get('itinerary', ''),
                "transport": travel_plan.get('transport', {}).get('transport_options', ''),
                "accommodations": travel_plan.get('accommodations', {}).get('accommodations', ''),
                "cultural_insights": travel_plan.get('cultural_insights', {}).get('cultural_insights', ''),
                "summary": travel_plan.get('summary', ''),
                "raw_data": travel_plan  # Include full data for advanced parsing
            },
            "user_preferences": user_preferences
        }
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error creating travel plan: {str(e)}")
        return jsonify({
            "error": "Failed to create travel plan",
            "message": str(e)
        }), 500


@app.route('/api/markets', methods=['GET'])
def get_markets():
    """Get list of available Christmas markets."""
    from config import CHRISTMAS_MARKETS
    
    markets = []
    for country, market_list in CHRISTMAS_MARKETS.items():
        for market in market_list:
            markets.append({
                "name": market,
                "country": country.replace('_', ' ').title()
            })
    
    return jsonify({
        "markets": markets,
        "total": len(markets)
    })


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting API server on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)

