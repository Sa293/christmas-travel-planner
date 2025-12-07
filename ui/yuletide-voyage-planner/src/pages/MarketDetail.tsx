import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, Star, Calendar, Clock, Heart, Share2, ArrowLeft, 
  Utensils, Music, ShoppingBag, Camera, ExternalLink, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

const marketData = {
  vienna: {
    id: 'vienna',
    name: 'Vienna Christkindlmarkt',
    location: 'Vienna, Austria',
    fullAddress: 'Rathausplatz 1, 1010 Vienna, Austria',
    rating: 4.9,
    reviewCount: 2847,
    dates: 'November 15 - December 26, 2024',
    hours: '10:00 AM - 9:30 PM (Sun-Thu), 10:00 AM - 10:00 PM (Fri-Sat)',
    description: 'The Vienna Christkindlmarkt, held in front of the stunning City Hall (Rathaus), is one of the oldest and most beloved Christmas markets in the world. With over 150 stalls offering traditional crafts, decorations, and culinary delights, it attracts millions of visitors each year.',
    heroImage: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&q=80',
      'https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=800&q=80',
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80',
    ],
    foods: [
      { name: 'Glühwein (Mulled Wine)', description: 'Traditional spiced hot wine served in collectible mugs', price: '€4-6' },
      { name: 'Lebkuchen', description: 'Decorated gingerbread hearts with sweet messages', price: '€3-8' },
      { name: 'Kartoffelpuffer', description: 'Crispy potato pancakes with applesauce', price: '€5-7' },
      { name: 'Maroni', description: 'Roasted chestnuts, a winter classic', price: '€4-5' },
    ],
    events: [
      { date: 'Dec 6', name: 'St. Nicholas Day Parade', time: '5:00 PM' },
      { date: 'Dec 13', name: 'Children\'s Lantern Walk', time: '4:30 PM' },
      { date: 'Dec 20', name: 'Christmas Carol Concert', time: '7:00 PM' },
      { date: 'Dec 24', name: 'Final Day Celebration', time: '2:00 PM' },
    ],
    tips: [
      'Visit after 6 PM for the magical 3D light show on City Hall',
      'Collect a different Glühwein mug each year - they make great souvenirs',
      'Take the tram line 1 or 2 to Rathaus for easy access',
      'Weekday afternoons are less crowded than weekends',
    ],
    links: [
      { name: 'Official Website', url: 'https://www.christkindlmarkt.at/' },
      { name: 'Vienna Tourism', url: 'https://www.wien.info/' },
    ],
  },
};

const MarketDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const market = marketData[id as keyof typeof marketData] || marketData.vienna;

  return (
    <>
      <Helmet>
        <title>{market.name} | Christmas Market Travel Assistant</title>
        <meta name="description" content={market.description.slice(0, 160)} />
      </Helmet>

      <Snowfall count={15} />
      <Navigation />

      <main className="pt-16 min-h-screen">
        {/* Hero Image */}
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={market.heroImage}
            alt={market.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-24 left-4 md:left-8 inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm hover:bg-card transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 -mt-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header Card */}
            <div className="festive-card p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {market.name}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{market.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-semibold text-foreground">{market.rating}</span>
                      <span>({market.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={cn("w-5 h-5", isFavorite && "text-primary fill-primary")} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Dates</div>
                    <div className="font-medium">{market.dates}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-forest/10 rounded-lg">
                    <Clock className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                    <div className="font-medium text-sm">{market.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="w-full justify-start bg-card border border-border p-1 rounded-lg overflow-x-auto">
                <TabsTrigger value="overview" className="gap-2">
                  <Info className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="food" className="gap-2">
                  <Utensils className="w-4 h-4" />
                  Food & Drinks
                </TabsTrigger>
                <TabsTrigger value="events" className="gap-2">
                  <Music className="w-4 h-4" />
                  Events
                </TabsTrigger>
                <TabsTrigger value="gallery" className="gap-2">
                  <Camera className="w-4 h-4" />
                  Photos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="festive-card p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">About This Market</h2>
                  <p className="text-muted-foreground leading-relaxed">{market.description}</p>
                  
                  <div className="mt-6 p-4 bg-gold/5 rounded-lg border border-gold/20">
                    <h3 className="font-semibold flex items-center gap-2 mb-3">
                      <ShoppingBag className="w-5 h-5 text-gold-dark" />
                      Insider Tips
                    </h3>
                    <ul className="space-y-2">
                      {market.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-gold">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="festive-card p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Useful Links</h2>
                  <div className="space-y-2">
                    {market.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                      >
                        <span className="font-medium">{link.name}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="food">
                <div className="festive-card p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Must-Try Foods & Drinks</h2>
                  <div className="grid gap-4">
                    {market.foods.map((food) => (
                      <div key={food.name} className="flex items-start justify-between p-4 bg-muted/30 rounded-lg">
                        <div>
                          <h3 className="font-semibold text-foreground">{food.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{food.description}</p>
                        </div>
                        <span className="text-forest font-semibold whitespace-nowrap ml-4">{food.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="events">
                <div className="festive-card p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Special Events</h2>
                  <div className="space-y-4">
                    {market.events.map((event) => (
                      <div key={event.name} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <div className="text-center min-w-[60px]">
                          <div className="text-sm text-muted-foreground">{event.date.split(' ')[0]}</div>
                          <div className="text-2xl font-display font-bold text-primary">{event.date.split(' ')[1]}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{event.name}</h3>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="gallery">
                <div className="festive-card p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">Photo Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {market.gallery.map((image, index) => (
                      <div key={index} className="aspect-video rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${market.name} photo ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link to="/plan">
                <Button variant="hero" size="lg">
                  Include in My Itinerary
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer spacing */}
        <div className="h-16" />
      </main>
    </>
  );
};

export default MarketDetail;
