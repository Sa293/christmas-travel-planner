import React from 'react';
import { ChevronDown, MapPin, Clock, Train, Hotel, Lightbulb, Utensils } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

interface Activity {
  time: string;
  title: string;
  description: string;
  type: 'market' | 'transport' | 'food' | 'activity';
}

interface DayData {
  day: number;
  date: string;
  city: string;
  activities: Activity[];
  accommodation?: string;
  tip?: string;
}

interface ItineraryDayProps {
  data: DayData;
  isOpen: boolean;
  onToggle: () => void;
}

const activityIcons = {
  market: MapPin,
  transport: Train,
  food: Utensils,
  activity: Clock,
};

const activityColors = {
  market: 'text-primary bg-primary/10',
  transport: 'text-forest bg-forest/10',
  food: 'text-gold-dark bg-gold/10',
  activity: 'text-muted-foreground bg-muted',
};

const ItineraryDay: React.FC<ItineraryDayProps> = ({ data, isOpen, onToggle }) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <div className="festive-card overflow-hidden hover-lift">
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-6 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shadow-warm">
                <span className="text-2xl font-display font-bold text-primary-foreground">
                  {data.day}
                </span>
              </div>
              <div className="text-left">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Day {data.day}: {data.city}
                </h3>
                <p className="text-muted-foreground text-sm">{data.date}</p>
              </div>
            </div>
            <ChevronDown
              className={cn(
                "w-6 h-6 text-muted-foreground transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-6 pb-6 space-y-6 border-t border-border/50">
            {/* Timeline */}
            <div className="pt-6 space-y-4">
              {data.activities.map((activity, index) => {
                const Icon = activityIcons[activity.type];
                const colorClass = activityColors[activity.type];
                
                return (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={cn("p-2 rounded-lg", colorClass)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {index < data.activities.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          {activity.time}
                        </span>
                      </div>
                      <h4 className="font-semibold text-foreground">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accommodation */}
            {data.accommodation && (
              <div className="flex items-start gap-3 p-4 bg-forest/5 rounded-lg border border-forest/20">
                <Hotel className="w-5 h-5 text-forest mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Accommodation</h4>
                  <p className="text-sm text-muted-foreground">{data.accommodation}</p>
                </div>
              </div>
            )}

            {/* Tip */}
            {data.tip && (
              <div className="flex items-start gap-3 p-4 bg-gold/5 rounded-lg border border-gold/20">
                <Lightbulb className="w-5 h-5 text-gold-dark mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground">Pro Tip</h4>
                  <p className="text-sm text-muted-foreground">{data.tip}</p>
                </div>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default ItineraryDay;
