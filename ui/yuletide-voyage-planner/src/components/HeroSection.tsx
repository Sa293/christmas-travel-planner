import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, hsl(0 65% 45% / 0.85), hsl(350 60% 20% / 0.95)), url('https://images.unsplash.com/photo-1545127398-14699f92334b?w=1920&q=80')`,
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-gold rounded-full animate-twinkle opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-gold rounded-full animate-twinkle delay-300 opacity-80" />
      <div className="absolute bottom-40 left-20 w-5 h-5 bg-gold rounded-full animate-twinkle delay-500 opacity-50" />
      <div className="absolute bottom-60 right-10 w-2 h-2 bg-gold rounded-full animate-twinkle delay-200 opacity-70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm border border-snow/20 rounded-full px-4 py-2 animate-fade-in-up">
            <Star className="w-4 h-4 text-gold" />
            <span className="text-snow/90 text-sm font-medium">Discover Europe's Magical Markets</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold text-snow leading-tight animate-fade-in-up delay-100">
            Your Perfect
            <br />
            <span className="text-gradient-gold">Christmas Market</span>
            <br />
            Adventure Awaits
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-snow/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            From Vienna's enchanting stalls to Strasbourg's twinkling lights. 
            Plan your dream holiday journey through Europe's most magical Christmas markets.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
            <Link to="/plan">
              <Button variant="hero" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/markets">
              <Button variant="ghost" size="lg" className="text-snow border border-snow/30 hover:bg-snow/10">
                Explore Markets
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in-up delay-400">
            <div className="flex items-center gap-2 text-snow/80">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="font-medium">50+ Markets</span>
            </div>
            <div className="flex items-center gap-2 text-snow/80">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="font-medium">Nov - Jan</span>
            </div>
            <div className="flex items-center gap-2 text-snow/80">
              <Star className="w-5 h-5 text-gold" />
              <span className="font-medium">1000+ Reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
