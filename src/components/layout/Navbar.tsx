
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [{
  label: 'Home',
  href: '/'
}, {
  label: 'About',
  href: '/about'
}, {
  label: 'Experience',
  href: '/experience'
}, {
  label: 'Portfolio',
  href: '/portfolio'
}, {
  label: 'Testimonials',
  href: '/testimonials'
}, {
  label: 'Blog',
  href: '/blog'
}];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-brand-black/95 shadow-gold-lg backdrop-blur-md py-3 border-b border-brand-gold/20' 
        : 'bg-brand-black/90 backdrop-blur-sm py-5'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold text-brand-gold hover:text-brand-gold-light transition-all duration-300 font-playfair drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(230,179,37,0.6)]">
            Willy
          </span>
        </RouterLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navItems.map(item => (
            <RouterLink 
              key={item.href} 
              to={item.href} 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                location.pathname === item.href 
                  ? 'text-brand-black bg-brand-gold shadow-gold-md font-semibold' 
                  : 'text-brand-white hover:text-brand-gold hover:bg-brand-gold/10 hover:shadow-gold-sm'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {location.pathname !== item.href && (
                <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/5 to-brand-gold/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              )}
            </RouterLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full bg-brand-gold/10 hover:bg-brand-gold/20 hover:shadow-gold-sm transition-all duration-300 border border-brand-gold/30 hover:border-brand-gold/50" 
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-brand-gold drop-shadow-sm" />
            ) : (
              <Moon className="h-5 w-5 text-brand-gold drop-shadow-sm" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden bg-brand-gold/10 hover:bg-brand-gold/20 hover:shadow-gold-sm transition-all duration-300 border border-brand-gold/30 hover:border-brand-gold/50 rounded-full" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-brand-gold drop-shadow-sm" />
            ) : (
              <Menu className="h-6 w-6 text-brand-gold drop-shadow-sm" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-0 z-40 bg-brand-black/98 backdrop-blur-xl p-6 lg:hidden animate-fade-in">
            <div className="h-16 flex items-center justify-between mb-8 border-b border-brand-gold/20 pb-4">
              <span className="text-2xl font-bold text-brand-gold font-playfair drop-shadow-lg">
                Willy
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="bg-brand-gold/10 hover:bg-brand-gold/20 hover:shadow-gold-sm transition-all duration-300 border border-brand-gold/30 rounded-full" 
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6 text-brand-gold" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <RouterLink 
                  key={item.href} 
                  to={item.href} 
                  className={`px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300 relative overflow-hidden group ${
                    location.pathname === item.href 
                      ? 'bg-brand-gold text-brand-black shadow-gold-md font-semibold' 
                      : 'text-brand-white hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-gold/20 hover:border-brand-gold/40 hover:shadow-gold-sm'
                  }`} 
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10 flex items-center justify-between">
                    {item.label}
                    {location.pathname === item.href && (
                      <div className="w-2 h-2 bg-brand-black rounded-full"></div>
                    )}
                  </span>
                  {location.pathname !== item.href && (
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  )}
                </RouterLink>
              ))}
            </nav>
            
            {/* Mobile Theme Toggle */}
            <div className="mt-8 pt-6 border-t border-brand-gold/20">
              <Button 
                variant="ghost" 
                onClick={toggleTheme} 
                className="w-full justify-start px-6 py-4 text-lg font-medium text-brand-white hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-gold/20 hover:border-brand-gold/40 rounded-xl transition-all duration-300"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5 text-brand-gold mr-3" />
                    Switch to Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-brand-gold mr-3" />
                    Switch to Dark Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
