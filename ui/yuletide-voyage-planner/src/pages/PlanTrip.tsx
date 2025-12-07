import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import TravelForm from '@/components/TravelForm';
import Snowfall from '@/components/Snowfall';
import { Sparkles } from 'lucide-react';

const PlanTrip: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Plan Your Trip | Christmas Market Travel Assistant</title>
        <meta 
          name="description" 
          content="Create your personalized Christmas market itinerary. Tell us your dates, budget, and interests, and we'll craft the perfect holiday journey." 
        />
      </Helmet>

      <Snowfall count={20} />
      <Navigation />

      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-gold">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium text-sm uppercase tracking-wider">
                Trip Planner
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Plan Your Perfect Journey
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tell us about your travel preferences and we'll create a magical 
              Christmas market itinerary just for you.
            </p>
          </div>

          {/* Form */}
          <TravelForm />
        </div>
      </main>
    </>
  );
};

export default PlanTrip;
