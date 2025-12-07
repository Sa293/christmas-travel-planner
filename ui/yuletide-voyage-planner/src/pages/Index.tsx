import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import FeaturedMarkets from '@/components/FeaturedMarkets';
import Snowfall from '@/components/Snowfall';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, MapPin, Calendar, Users } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Curated Destinations',
    description: 'Hand-picked markets across Europe, from classic favorites to hidden gems.',
  },
  {
    icon: Calendar,
    title: 'Perfect Timing',
    description: 'Optimal travel dates and schedules to experience each market at its best.',
  },
  {
    icon: Users,
    title: 'Local Insights',
    description: 'Insider tips on the best food stalls, performances, and shopping spots.',
  },
  {
    icon: Sparkles,
    title: 'Custom Itineraries',
    description: 'Personalized trip plans based on your interests, budget, and travel style.',
  },
];

const Index: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Christmas Market Travel Assistant | Plan Your Magical Holiday Journey</title>
        <meta 
          name="description" 
          content="Discover Europe's most enchanting Christmas markets. Plan your perfect holiday trip with personalized itineraries, insider tips, and curated experiences." 
        />
      </Helmet>

      <Snowfall count={30} />
      <Navigation />
      
      <main>
        <HeroSection />
        <FeaturedMarkets />

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <span className="text-gold font-medium text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Your Journey, Perfectly Planned
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="festive-card p-6 text-center hover-lift animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="inline-flex p-3 bg-primary/10 rounded-xl mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(150 45% 25% / 0.9), hsl(150 45% 25% / 0.7)), url('https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=1920&q=80')`,
            }}
          />
          
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-snow">
                Ready to Experience the Magic?
              </h2>
              <p className="text-snow/80 text-lg">
                Start planning your unforgettable Christmas market adventure today. 
                Our smart assistant will create the perfect itinerary just for you.
              </p>
              <Link to="/plan">
                <Button variant="hero" size="xl" className="mt-4">
                  Plan Your Trip Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-gold" />
                <span className="font-display text-lg font-semibold">
                  Christmas<span className="text-primary">Markets</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2024 Christmas Market Travel Assistant. Made with ❤️ for holiday lovers.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;
