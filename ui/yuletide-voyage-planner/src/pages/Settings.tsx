import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Snowfall from '@/components/Snowfall';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Bell, Globe, Eye, Snowflake } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    snowEffect: true,
    language: 'en',
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <>
      <Helmet>
        <title>Settings | Christmas Market Travel Assistant</title>
        <meta 
          name="description" 
          content="Customize your Christmas Market Travel Assistant experience with your preferred settings." 
        />
      </Helmet>

      {settings.snowEffect && <Snowfall count={20} />}
      <Navigation />

      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-gold">
              <SettingsIcon className="w-5 h-5" />
              <span className="font-medium text-sm uppercase tracking-wider">
                Preferences
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Settings
            </h1>
            <p className="text-muted-foreground text-lg">
              Customize your experience
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="festive-card p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold">Notifications</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new markets and events
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, notifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailUpdates">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly market recommendations
                    </p>
                  </div>
                  <Switch
                    id="emailUpdates"
                    checked={settings.emailUpdates}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, emailUpdates: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Display */}
            <div className="festive-card p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-forest/10 rounded-lg">
                  <Eye className="w-5 h-5 text-forest" />
                </div>
                <h2 className="font-display text-xl font-semibold">Display</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="snowEffect" className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4" />
                      Snow Effect
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Show falling snowflakes animation
                    </p>
                  </div>
                  <Switch
                    id="snowEffect"
                    checked={settings.snowEffect}
                    onCheckedChange={(checked) => 
                      setSettings({ ...settings, snowEffect: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="festive-card p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gold/10 rounded-lg">
                  <Globe className="w-5 h-5 text-gold-dark" />
                </div>
                <h2 className="font-display text-xl font-semibold">Language</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'de', label: 'Deutsch' },
                  { code: 'fr', label: 'Français' },
                  { code: 'es', label: 'Español' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setSettings({ ...settings, language: lang.code })}
                    className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                      settings.language === lang.code
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-4">
              <Button variant="festive" size="lg" onClick={handleSave}>
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Settings;
