import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const markets = [
  {
    id: 'vienna',
    name: 'Vienna Christkindlmarkt',
    location: 'Vienna, Austria',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80',
    rating: 4.9,
    dates: 'Nov 15 - Dec 26',
    description: 'One of the oldest and most beloved Christmas markets in the world.',
  },
  {
    id: 'strasbourg',
    name: 'Marché de Noël',
    location: 'Strasbourg, France',
    image: 'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&q=80',
    rating: 4.8,
    dates: 'Nov 24 - Dec 24',
    description: 'The oldest Christmas market in France, dating back to 1570.',
  },
  {
    id: 'nuremberg',
    name: 'Christkindlesmarkt',
    location: 'Nuremberg, Germany',
    image: 'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80',
    rating: 4.9,
    dates: 'Nov 29 - Dec 24',
    description: 'Famous for its traditional crafts and Nuremberg Bratwurst.',
  },
  {
    id: 'prague',
    name: 'Old Town Square Market',
    location: 'Prague, Czech Republic',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80',
    rating: 4.7,
    dates: 'Dec 1 - Jan 6',
    description: 'Set against the backdrop of the stunning Gothic Tyn Church.',
  },
  {
    id: 'cologne',
    name: 'Cologne Cathedral Market',
    location: 'Cologne, Germany',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
    rating: 4.8,
    dates: 'Nov 25 - Dec 23',
    description: 'Located at the foot of the magnificent Cologne Cathedral.',
  },
];

const FeaturedMarkets: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % markets.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + markets.length) % markets.length);
  };

  const getVisibleMarkets = () => {
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(markets[(currentIndex + i) % markets.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-gold font-medium text-sm uppercase tracking-wider">
            Featured Destinations
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Magical Markets Await
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the most enchanting Christmas markets across Europe, each with its own unique charm and traditions.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-card shadow-soft hidden md:flex"
            onClick={prev}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-card shadow-soft hidden md:flex"
            onClick={next}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
            {getVisibleMarkets().map((market, index) => (
              <Link
                key={market.id}
                to={`/market/${market.id}`}
                className={cn(
                  "group festive-card overflow-hidden hover-lift",
                  "animate-fade-in-up",
                  index === 0 && "delay-100",
                  index === 1 && "delay-200",
                  index === 2 && "delay-300"
                )}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={market.image}
                    alt={market.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-sm font-semibold">{market.rating}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {market.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{market.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {market.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-forest">
                    <Calendar className="w-4 h-4" />
                    <span>{market.dates}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {markets.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  currentIndex === index ? "bg-primary w-6" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMarkets;
