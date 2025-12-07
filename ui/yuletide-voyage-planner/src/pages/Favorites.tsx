import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import MarketCard from '@/components/MarketCard';
import Snowfall from '@/components/Snowfall';
import { Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const initialFavorites = [
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
];

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((market) => market.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>My Favorites | Christmas Market Travel Assistant</title>
        <meta 
          name="description" 
          content="View and manage your saved Christmas markets. Keep track of the markets you want to visit." 
        />
      </Helmet>

      <Snowfall count={20} />
      <Navigation />

      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-gold">
              <Heart className="w-5 h-5" />
              <span className="font-medium text-sm uppercase tracking-wider">
                My Collection
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Saved Markets
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Your favorite Christmas markets, saved for easy planning.
            </p>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {favorites.map((market) => (
                <MarketCard
                  key={market.id}
                  {...market}
                  isFavorite={true}
                  onToggleFavorite={() => removeFavorite(market.id)}
                  className="animate-fade-in-up"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex p-4 bg-muted rounded-full mb-6">
                <Sparkles className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
                No favorites yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Start exploring markets and save your favorites for later!
              </p>
              <Link to="/">
                <Button variant="festive">
                  Explore Markets
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Favorites;
