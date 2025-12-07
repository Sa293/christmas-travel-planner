import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Calendar, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MarketCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  dates: string;
  description: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  className?: string;
}

const MarketCard: React.FC<MarketCardProps> = ({
  id,
  name,
  location,
  image,
  rating,
  dates,
  description,
  isFavorite = false,
  onToggleFavorite,
  className,
}) => {
  return (
    <div className={cn("festive-card overflow-hidden hover-lift group", className)}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-gold fill-gold" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm hover:bg-card"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.();
          }}
        >
          <Heart
            className={cn(
              "w-5 h-5 transition-colors",
              isFavorite ? "text-primary fill-primary" : "text-muted-foreground"
            )}
          />
        </Button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <Link to={`/market/${id}`}>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-forest">
            <Calendar className="w-4 h-4" />
            <span>{dates}</span>
          </div>
          
          <Link to={`/market/${id}`}>
            <Button variant="ghost" size="sm" className="text-primary">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
