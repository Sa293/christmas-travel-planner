# Integration Guide: Backend + Frontend

This guide explains how the backend API and frontend UI are integrated.

## Architecture Overview

```
┌─────────────────┐         HTTP/REST         ┌─────────────────┐
│                 │ ◄─────────────────────────► │                 │
│  React Frontend │                             │  Flask Backend  │
│  (Port 8080)    │                             │  (Port 5000)    │
│                 │                             │                 │
└─────────────────┘                             └─────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │  Travel Agent    │
                                                │  (Multi-Agent)   │
                                                └─────────────────┘
                                                         │
                                                         ▼
                                                ┌─────────────────┐
                                                │   Gemini API    │
                                                └─────────────────┘
```

## Data Flow

1. **User fills out form** in `TravelForm.tsx`
2. **Form submission** calls `createTravelPlan()` from `lib/api.ts`
3. **API request** sent to `POST /api/plan` endpoint
4. **Backend processes** request using `travel_agent.py`
5. **AI agents** generate recommendations via Gemini API
6. **Response** sent back to frontend
7. **Itinerary page** displays parsed and formatted results

## API Integration

### Frontend API Client (`src/lib/api.ts`)

The frontend uses a centralized API client that:
- Handles all HTTP requests to the backend
- Provides TypeScript types for request/response
- Manages error handling
- Uses environment variables for API URL configuration

### Backend API Server (`api_server.py`)

The Flask server:
- Provides REST endpoints for travel planning
- Handles CORS for frontend requests
- Maps frontend form data to backend preferences
- Returns structured JSON responses

## Key Integration Points

### 1. Form Data Mapping

**Frontend** (`TravelForm.tsx`):
```typescript
{
  startDate: "2024-12-15",
  endDate: "2024-12-20",
  departureCity: "Berlin",
  budget: [1500],
  interests: ["food", "culture"],
  pace: "moderate",
  language: "en"
}
```

**Backend** (`api_server.py`):
```python
{
  'departure_city': 'Berlin',
  'travel_dates': '2024-12-15 to 2024-12-20',
  'duration': '6 days',
  'budget': 'Mid-range',
  'interests': ['food', 'culture'],
  'pace': 'moderate',
  'language': 'en'
}
```

### 2. Response Parsing

The frontend uses `itineraryParser.ts` to:
- Parse AI-generated text into structured day-by-day format
- Extract market names from recommendations
- Format dates and times
- Categorize activities (market, transport, food, activity)

### 3. State Management

- **Session Storage**: Travel plan stored in `sessionStorage` for persistence
- **React Router**: Navigation with state passing
- **React Query**: Could be used for caching (future enhancement)

## Running the Integrated System

### Step 1: Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Edit .env and add your GEMINI_API_KEY

# Start the API server
python api_server.py
# Server runs on http://localhost:5000
```

### Step 2: Frontend Setup

```bash
# Navigate to UI directory
cd ui/yuletide-voyage-planner

# Install dependencies (first time only)
npm install

# Set up environment variables (optional)
# Create .env file with: VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
# UI runs on http://localhost:8080
```

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:
- Ensure `flask-cors` is installed: `pip install flask-cors`
- Check that `CORS(app)` is called in `api_server.py`

### API Connection Errors

If the frontend can't connect to the backend:
- Verify the backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env` file
- Ensure no firewall is blocking the connection

### Missing Dependencies

**Backend:**
```bash
pip install flask flask-cors google-generativeai python-dotenv
```

**Frontend:**
```bash
cd ui/yuletide-voyage-planner
npm install
```

## Development Tips

1. **Backend Logging**: Check console output for API request logs
2. **Frontend DevTools**: Use browser DevTools Network tab to inspect API calls
3. **Hot Reload**: Both frontend (Vite) and backend (Flask debug mode) support hot reload
4. **API Testing**: Use tools like Postman or curl to test API endpoints directly

## Environment Variables

### Backend (.env)
```env
GEMINI_API_KEY=your_key_here
PORT=5000
FLASK_DEBUG=True
LOG_LEVEL=INFO
```

### Frontend (ui/yuletide-voyage-planner/.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Production Deployment

For production:
1. Set `FLASK_DEBUG=False` in backend
2. Build frontend: `npm run build`
3. Serve frontend build with a web server (nginx, etc.)
4. Use environment-specific API URLs
5. Enable proper CORS configuration for your domain

