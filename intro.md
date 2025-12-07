🎄 Christmas Market Travel Agent - Prompt for Cursor (Using Gemini API)

Objective:
Create a professional, multi-agent AI travel assistant specializing in Christmas markets across Europe. The assistant should provide personalized recommendations, travel itineraries, cultural tips, and booking suggestions. The system should be modular, scalable, and integrate with the Gemini API.

Project Requirements:
1. Functionality

The AI travel agent should:

Recommend the best Christmas markets in Europe (Germany, Austria, France, Czech Republic, etc.)

Provide itineraries based on user preferences (e.g., 3-day, 7-day trips, luxury, budget-friendly)

Suggest local attractions, food, events, and experiences near each market

Include transportation options (flights, trains, buses)

Offer accommodation recommendations

Give weather and local tips

Be able to answer FAQs about travel restrictions, safety, local customs, and ticketing

Provide multi-lingual support for at least English, German, and French (optional but a plus)

2. Technical Requirements

Use Gemini API key for AI responses.

Integrate with Google ADK (Google Assistant Development Kit) for travel-related queries.

Modular code structure:

market_recommendation_agent: Suggests markets based on preferences

itinerary_agent: Creates optimized travel plans

transport_agent: Provides transportation options

accommodation_agent: Suggests hotels, hostels, Airbnb options

cultural_agent: Provides local insights, food, events

Support API integration for flight, train, and hotel booking (dummy data or optional integration)

Friendly, conversational UI/UX design for users.

3. Input from User

The assistant should collect:

Travel dates

Departure city/country

Budget range

Interests (food, culture, shopping, family-friendly, nightlife)

Preferred pace (relaxed, moderate, intense)

Language preference

4. Output

Personalized Christmas market itinerary

Suggested activities per day

Transportation options and estimated costs

Accommodation suggestions

Quick tips and local advice

Links to market websites, travel guides, and ticket info

5. Sample User Interaction

User: “I want to visit Christmas markets in Germany and Austria for 5 days, starting from Berlin. I’m traveling with family and want a cozy experience.”
AI Response:

Suggested markets: Nuremberg, Munich, Salzburg, Vienna

Day-by-day itinerary with travel times

Recommended local foods and events

Accommodation suggestions in each city

Tips on getting around with family

6. Programming Notes

Use Python or Node.js as the backend language.

Use Gemini API to power the conversational AI.

Modular architecture for future extension (e.g., adding more European countries or other seasonal markets).

Follow professional coding standards (comments, structured functions, error handling).

Include logging and analytics hooks to track user preferences and improve recommendations over time.

Optionally, support integration with Google Maps API to visualize travel routes.