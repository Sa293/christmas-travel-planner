import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Heart, Settings, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/plan', label: 'Plan Trip', icon: Map },
  { path: '/favorites', label: 'Favorites', icon: Heart },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-gold animate-twinkle" />
              <div className="absolute inset-0 bg-gold/20 blur-lg rounded-full" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              Christmas<span className="text-primary">Markets</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "gap-2 transition-all duration-300",
                      isActive && "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isActive && "text-gold")} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card/95 backdrop-blur-md border-b border-border animate-fade-in-up">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3",
                      isActive && "bg-primary/10 text-primary"
                    )}
                  >
                    <Icon className={cn("w-5 h-5", isActive && "text-gold")} />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
