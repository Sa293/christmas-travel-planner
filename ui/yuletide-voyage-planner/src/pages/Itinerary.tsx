import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ItineraryDay from '@/components/ItineraryDay';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/ui/button';
import { Map, Download, Share2, Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { parseItinerary, extractMarkets, ParsedItineraryDay } from '@/lib/itineraryParser';
import { TravelPlanResponse } from '@/lib/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Itinerary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openDay, setOpenDay] = useState<number>(1);
  const [travelPlan, setTravelPlan] = useState<TravelPlanResponse | null>(null);
  const [parsedItinerary, setParsedItinerary] = useState<ParsedItineraryDay[]>([]);
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get travel plan from location state or sessionStorage
    const stateTravelPlan = location.state?.travelPlan;
    const stateFormData = location.state?.formData;
    
    if (stateTravelPlan) {
      setTravelPlan(stateTravelPlan);
      setFormData(stateFormData);
      parseTravelPlan(stateTravelPlan, stateFormData);
    } else {
      // Try to get from sessionStorage
      const stored = sessionStorage.getItem('travelPlan');
      const storedForm = sessionStorage.getItem('formData');
      if (stored) {
        try {
          const plan = JSON.parse(stored);
          const form = storedForm ? JSON.parse(storedForm) : null;
          setTravelPlan(plan);
          setFormData(form);
          parseTravelPlan(plan, form);
        } catch (e) {
          console.error('Error parsing stored travel plan:', e);
          navigate('/plan');
        }
      } else {
        // No travel plan found, redirect to plan page
        navigate('/plan');
      }
    }
    setLoading(false);
  }, [location, navigate]);

  const parseTravelPlan = (plan: TravelPlanResponse, form: any) => {
    if (plan?.travel_plan?.itinerary && form) {
      // Extract markets from recommendations to help with city parsing
      const markets = extractMarkets(plan.travel_plan.market_recommendations || '');
      
      // Parse itinerary
      let itinerary = parseItinerary(
        plan.travel_plan.itinerary,
        form.startDate || '',
        form.endDate || ''
      );
      
      // Post-process: if cities are still "Unknown City", try to assign from markets
      if (markets.length > 0) {
        itinerary = itinerary.map((day, index) => {
          if (day.city === 'Unknown City' || day.city === 'Various Locations') {
            // Try to assign city from markets list based on day number
            const marketIndex = Math.min(index, markets.length - 1);
            if (markets[marketIndex]) {
              return {
                ...day,
                city: markets[marketIndex]
              };
            }
          }
          return day;
        });
      }
      
      setParsedItinerary(itinerary);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!travelPlan) {
    return null;
  }

  const markets = extractMarkets(travelPlan.travel_plan.market_recommendations);
  const days = parsedItinerary.length > 0 ? parsedItinerary : [];
  const startDate = formData?.startDate || '';
  const endDate = formData?.endDate || '';

  return (
    <>
      <Helmet>
        <title>Your Itinerary | Christmas Market Travel Assistant</title>
        <meta 
          name="description" 
          content="Your personalized Christmas market travel itinerary with day-by-day activities, accommodations, and insider tips." 
        />
      </Helmet>

      <Snowfall count={15} />
      <Navigation />

      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <Link to="/plan" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to planner</span>
              </Link>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Your Christmas Market Adventure
              </h1>
              <p className="text-muted-foreground mt-2">
                {startDate && endDate 
                  ? `${new Date(startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                  : 'Your Trip'
                }
                {markets.length > 0 && ` • ${markets.slice(0, 2).join(' & ')}${markets.length > 2 ? '...' : ''}`}
                {days.length > 0 && ` • ${days.length} Days`}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Map className="w-4 h-4" />
                View Map
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button variant="festive" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Travel Plan Details */}
          <div className="max-w-4xl mx-auto mb-8">
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="markets">Markets</TabsTrigger>
                <TabsTrigger value="transport">Transport</TabsTrigger>
                <TabsTrigger value="accommodations">Stays</TabsTrigger>
              </TabsList>
              
              <TabsContent value="itinerary" className="mt-6">
                {days.length > 0 ? (
                  <div className="space-y-4">
                    {days.map((day) => (
                      <ItineraryDay
                        key={day.day}
                        data={day}
                        isOpen={openDay === day.day}
                        onToggle={() => setOpenDay(openDay === day.day ? 0 : day.day)}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Itinerary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="whitespace-pre-wrap text-muted-foreground">
                        {travelPlan.travel_plan.itinerary || 'Itinerary details will appear here.'}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="markets" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Markets</CardTitle>
                    <CardDescription>Christmas markets selected for your trip</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-muted-foreground">
                      {travelPlan.travel_plan.market_recommendations || 'Market recommendations will appear here.'}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="transport" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transportation Options</CardTitle>
                    <CardDescription>How to get around during your trip</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-muted-foreground">
                      {travelPlan.travel_plan.transport || 'Transportation details will appear here.'}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="accommodations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Accommodation Recommendations</CardTitle>
                    <CardDescription>Where to stay during your journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-muted-foreground">
                      {travelPlan.travel_plan.accommodations || 'Accommodation recommendations will appear here.'}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Cultural Insights */}
          {travelPlan.travel_plan.cultural_insights && (
            <div className="max-w-4xl mx-auto mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cultural Insights & Local Tips</CardTitle>
                  <CardDescription>Insider knowledge for your trip</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-muted-foreground">
                    {travelPlan.travel_plan.cultural_insights}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Summary Cards */}
          <div className="max-w-3xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="festive-card p-5 text-center">
              <div className="text-3xl font-display font-bold text-primary">{days.length || 'N/A'}</div>
              <div className="text-sm text-muted-foreground">Days</div>
            </div>
            <div className="festive-card p-5 text-center">
              <div className="text-3xl font-display font-bold text-forest">{markets.length || 'N/A'}</div>
              <div className="text-sm text-muted-foreground">Markets</div>
            </div>
            <div className="festive-card p-5 text-center">
              <div className="text-3xl font-display font-bold text-gold-dark">
                {formData?.departureCity || 'N/A'}
              </div>
              <div className="text-sm text-muted-foreground">Departure</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Itinerary;
