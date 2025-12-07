import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Wallet, Heart, Zap, Globe, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { createTravelPlan, TravelPlanRequest } from '@/lib/api';
import { toast } from 'sonner';

const interests = [
  { id: 'food', label: 'Local Food & Drinks', emoji: '🍷' },
  { id: 'crafts', label: 'Traditional Crafts', emoji: '🎄' },
  { id: 'music', label: 'Music & Entertainment', emoji: '🎵' },
  { id: 'shopping', label: 'Gift Shopping', emoji: '🎁' },
  { id: 'history', label: 'History & Culture', emoji: '🏰' },
  { id: 'photo', label: 'Photography', emoji: '📸' },
];

const paceOptions = [
  { id: 'relaxed', label: 'Relaxed', description: '1-2 markets per day' },
  { id: 'moderate', label: 'Moderate', description: '2-3 markets per day' },
  { id: 'active', label: 'Active', description: '3+ markets per day' },
];

const languages = [
  { code: 'en', label: 'English' },
  { code: 'de', label: 'German' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
];

const TravelForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    departureCity: '',
    budget: [1500],
    interests: [] as string[],
    pace: 'moderate' as 'relaxed' | 'moderate' | 'active',
    language: 'en',
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.startDate || !formData.endDate || !formData.departureCity) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.interests.length === 0) {
      toast.error('Please select at least one interest');
      return;
    }

    setIsLoading(true);
    
    try {
      const request: TravelPlanRequest = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        departureCity: formData.departureCity,
        budget: formData.budget,
        interests: formData.interests,
        pace: formData.pace,
        language: formData.language,
      };

      toast.info('Creating your personalized travel plan...', { duration: 2000 });
      const response = await createTravelPlan(request);
      
      // Store the response in sessionStorage and navigate
      sessionStorage.setItem('travelPlan', JSON.stringify(response));
      navigate('/itinerary', { state: { travelPlan: response, formData } });
    } catch (error) {
      console.error('Error creating travel plan:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to create travel plan. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Travel Dates */}
      <div className="festive-card p-6 space-y-4 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold">Travel Dates</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="bg-background"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="bg-background"
              required
            />
          </div>
        </div>
      </div>

      {/* Departure City */}
      <div className="festive-card p-6 space-y-4 animate-fade-in-up delay-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-forest/10 rounded-lg">
            <MapPin className="w-5 h-5 text-forest" />
          </div>
          <h3 className="font-display text-xl font-semibold">Departure City</h3>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="departureCity">Where are you traveling from?</Label>
          <Input
            id="departureCity"
            type="text"
            placeholder="e.g., London, New York, Sydney"
            value={formData.departureCity}
            onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
            className="bg-background"
            required
          />
        </div>
      </div>

      {/* Budget */}
      <div className="festive-card p-6 space-y-4 animate-fade-in-up delay-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gold/10 rounded-lg">
            <Wallet className="w-5 h-5 text-gold-dark" />
          </div>
          <h3 className="font-display text-xl font-semibold">Budget</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Trip budget (excluding flights)</span>
            <span className="text-2xl font-display font-bold text-primary">
              €{formData.budget[0].toLocaleString()}
            </span>
          </div>
          <Slider
            value={formData.budget}
            onValueChange={(value) => setFormData({ ...formData, budget: value })}
            min={500}
            max={5000}
            step={100}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>€500</span>
            <span>€5,000</span>
          </div>
        </div>
      </div>

      {/* Interests */}
      <div className="festive-card p-6 space-y-4 animate-fade-in-up delay-300">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold">Your Interests</h3>
        </div>
        
        <p className="text-muted-foreground text-sm">Select all that apply</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interests.map((interest) => (
            <button
              key={interest.id}
              type="button"
              onClick={() => toggleInterest(interest.id)}
              className={cn(
                "flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200",
                formData.interests.includes(interest.id)
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
            >
              <span className="text-xl">{interest.emoji}</span>
              <span className="text-sm font-medium">{interest.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pace */}
      <div className="festive-card p-6 space-y-4 animate-fade-in-up delay-400">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-forest/10 rounded-lg">
            <Zap className="w-5 h-5 text-forest" />
          </div>
          <h3 className="font-display text-xl font-semibold">Travel Pace</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paceOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setFormData({ ...formData, pace: option.id })}
              className={cn(
                "p-4 rounded-lg border-2 text-left transition-all duration-200",
                formData.pace === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div className="font-semibold text-foreground">{option.label}</div>
              <div className="text-sm text-muted-foreground">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div className="festive-card p-6 space-y-4 animate-fade-in-up delay-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gold/10 rounded-lg">
            <Globe className="w-5 h-5 text-gold-dark" />
          </div>
          <h3 className="font-display text-xl font-semibold">Preferred Language</h3>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setFormData({ ...formData, language: lang.code })}
              className={cn(
                "px-4 py-2 rounded-full border-2 transition-all duration-200",
                formData.language === lang.code
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary/50"
              )}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button 
          type="submit" 
          variant="hero" 
          size="xl" 
          className="group"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Creating Your Plan...
            </>
          ) : (
            <>
              Generate My Itinerary
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default TravelForm;
