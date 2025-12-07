# 🎄 Christmas Market Travel Agent

A professional, multi-agent AI travel assistant specializing in Christmas markets across Europe. This system provides personalized recommendations, travel itineraries, cultural tips, and booking suggestions using Google's Gemini API.

## Features

- **Market Recommendations**: AI-powered suggestions for the best Christmas markets in Europe
- **Personalized Itineraries**: Day-by-day travel plans based on your preferences
- **Transportation Options**: Flight, train, bus, and local transport recommendations
- **Accommodation Suggestions**: Hotels, hostels, and Airbnb recommendations
- **Cultural Insights**: Local food, events, customs, and tips
- **Multi-language Support**: English, German, and French
- **Beautiful Web UI**: Modern React-based interface with shadcn/ui components
- **REST API**: Flask backend API for frontend integration
- **CLI Interface**: Command-line interface for terminal users

## Project Structure

```
research-agent/
├── agents/
│   ├── __init__.py
│   ├── market_recommendation_agent.py  # Suggests markets based on preferences
│   ├── itinerary_agent.py              # Creates optimized travel plans
│   ├── transport_agent.py               # Provides transportation options
│   ├── accommodation_agent.py          # Suggests hotels/hostels/Airbnb
│   └── cultural_agent.py                # Provides local insights and tips
├── ui/
│   └── yuletide-voyage-planner/         # React frontend application
│       ├── src/
│       │   ├── components/             # React components
│       │   ├── pages/                  # Page components
│       │   └── lib/                    # Utilities and API client
│       └── package.json
├── api_server.py                        # Flask REST API server
├── config.py                            # Configuration and settings
├── gemini_client.py                     # Gemini API integration
├── travel_agent.py                      # Main orchestrator agent
├── main.py                              # CLI entry point
├── requirements.txt                     # Python dependencies
├── start_backend.bat                    # Windows startup script
├── start_backend.sh                     # Linux/Mac startup script
├── env.example                          # Environment variables template
└── README.md                            # This file
```

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd research-agent
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your Gemini API key:**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the project root:
     ```bash
     cp .env.example .env
     ```
   - Edit `.env` and add your API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

## Usage

### Option 1: Web UI (Recommended)

1. **Start the backend API server:**
   ```bash
   # Windows
   start_backend.bat
   
   # Linux/Mac
   chmod +x start_backend.sh
   ./start_backend.sh
   
   # Or manually:
   python api_server.py
   ```
   The API server will run on `http://localhost:5000`

2. **Start the frontend UI:**
   ```bash
   cd ui/yuletide-voyage-planner
   npm install  # First time only
   npm run dev
   ```
   The UI will be available at `http://localhost:8080`

3. **Open your browser** and navigate to `http://localhost:8080`

### Option 2: CLI Interface

Run the command-line interface:

```bash
python main.py
```

The agent will:
1. Welcome you with a friendly interface
2. Ask about your travel preferences:
   - Departure city
   - Travel dates
   - Trip duration
   - Budget range
   - Interests (food, culture, shopping, etc.)
   - Travel pace (relaxed, moderate, intense)
   - Travel companions
   - Language preference
3. Generate a comprehensive travel plan including:
   - Recommended Christmas markets
   - Day-by-day itinerary
   - Transportation options
   - Accommodation recommendations
   - Cultural insights and local tips

## Example Interaction

```
User: "I want to visit Christmas markets in Germany and Austria for 5 days, 
       starting from Berlin. I'm traveling with family and want a cozy experience."

AI Response:
- Suggested markets: Nuremberg, Munich, Salzburg, Vienna
- Day-by-day itinerary with travel times
- Recommended local foods and events
- Accommodation suggestions in each city
- Tips on getting around with family
```

## Technical Details

### Agents Architecture

The system uses a modular multi-agent architecture:

- **MarketRecommendationAgent**: Analyzes user preferences and recommends suitable markets
- **ItineraryAgent**: Creates optimized day-by-day travel plans
- **TransportAgent**: Provides transportation options and cost estimates
- **AccommodationAgent**: Suggests lodging based on budget and preferences
- **CulturalAgent**: Offers local insights, food recommendations, and cultural tips

### API Integration

- **Gemini API**: Powers all AI-generated responses
- Uses `google-generativeai` library for API communication
- Configurable temperature settings for different agent types

### Dependencies

**Backend (Python):**
- `google-generativeai`: Google Gemini API client
- `python-dotenv`: Environment variable management
- `colorama`: Cross-platform colored terminal text
- `rich`: Beautiful terminal formatting and UI
- `flask`: Web framework for REST API
- `flask-cors`: CORS support for frontend

**Frontend (React/TypeScript):**
- `react`: UI framework
- `react-router-dom`: Routing
- `@tanstack/react-query`: Data fetching
- `shadcn/ui`: UI component library
- `tailwindcss`: Styling
- `sonner`: Toast notifications

## Configuration

Edit `config.py` to customize:
- Supported languages
- Christmas market database
- Default settings
- Logging configuration

## API Endpoints

The Flask API server provides the following endpoints:

- `GET /api/health` - Health check
- `POST /api/plan` - Create a travel plan (requires JSON payload with user preferences)
- `GET /api/markets` - Get list of available Christmas markets

### Example API Request

```bash
curl -X POST http://localhost:5000/api/plan \
  -H "Content-Type: application/json" \
  -d '{
    "startDate": "2024-12-15",
    "endDate": "2024-12-20",
    "departureCity": "Berlin",
    "budget": [1500],
    "interests": ["food", "culture"],
    "pace": "moderate",
    "language": "en"
  }'
```

## Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
FLASK_DEBUG=False
LOG_LEVEL=INFO
```

For the frontend, create `ui/yuletide-voyage-planner/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Future Enhancements

- Integration with Google Maps API for route visualization
- Real-time booking API integrations
- Database for storing user preferences and analytics
- Multi-language response generation
- Weather API integration
- Export travel plans to PDF/JSON
- User authentication and saved itineraries

## Error Handling

The system includes:
- Fallback recommendations if AI fails
- Comprehensive error logging
- Graceful degradation
- User-friendly error messages

## License

This project is open source and available for educational and personal use.

## Support

For issues or questions, please check the code comments or create an issue in the repository.

---

**Happy Travels! 🎄✈️**

