/**
 * API service for communicating with the backend travel agent
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface TravelPlanRequest {
  startDate: string;
  endDate: string;
  departureCity: string;
  budget: number[];
  interests: string[];
  pace: 'relaxed' | 'moderate' | 'active';
  language: string;
}

export interface TravelPlanResponse {
  success: boolean;
  travel_plan: {
    market_recommendations: string;
    itinerary: string;
    transport: string;
    accommodations: string;
    cultural_insights: string;
    summary: string;
    raw_data?: any;
  };
  user_preferences: any;
}

export interface Market {
  name: string;
  country: string;
}

/**
 * Create a travel plan based on user preferences
 */
export async function createTravelPlan(
  request: TravelPlanRequest
): Promise<TravelPlanResponse> {
  const response = await fetch(`${API_BASE_URL}/plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to create travel plan' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Get list of available Christmas markets
 */
export async function getMarkets(): Promise<{ markets: Market[]; total: number }> {
  const response = await fetch(`${API_BASE_URL}/markets`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Health check endpoint
 */
export async function healthCheck(): Promise<{ status: string; service: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

