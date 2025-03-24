
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Patient Experience', path: '/patient-experience' },
    { name: 'Patient Resources', path: '/patient-resources' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply styles for header based on scroll position
  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black',
    scrolled 
      ? 'bg-opacity-95 py-3 md:py-4 shadow-lg' 
      : 'bg-opacity-100 py-4 md:py-6'
  );

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <img 
              src="/lovable-uploads/aaedf2d1-c204-4ff6-9e44-695686f3871c.png" 
              alt="Exquisite Dentistry" 
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex space-x-1 xl:space-x-2 mr-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'relative px-3 py-2 font-medium text-sm transition-colors rounded-md hover:bg-white/10',
                    'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                    'after:h-[2px] after:bg-gold after:transition-all after:duration-300',
                    location.pathname === link.path 
                      ? 'text-gold after:w-1/2' 
                      : 'text-white/90 hover:text-white after:w-0 hover:after:w-1/2'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <Button variant="gold" size="sm" className="ml-2 rounded-md">
              Book an Appointment
            </Button>
          </nav>

          {/* Mobile Menu - Using Sheet component from shadcn/ui */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
                  aria-label="Open menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-full sm:max-w-md p-0 bg-black border-l border-gold/30">
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-gold/10 flex justify-between items-center">
                    <img 
                      src="/lovable-uploads/aaedf2d1-c204-4ff6-9e44-695686f3871c.png" 
                      alt="Exquisite Dentistry" 
                      className="h-8"
                    />
                    <button 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white hover:text-gold transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-auto py-6 px-4">
                    <ul className="space-y-1">
                      {navLinks.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.path}
                            className={cn(
                              'flex items-center py-3 px-4 rounded-md text-base font-medium transition-colors',
                              location.pathname === link.path
                                ? 'bg-gold/10 text-gold'
                                : 'text-white hover:bg-white/5'
                            )}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="p-6 border-t border-gold/10">
                    <Button variant="gold" fullWidth className="rounded-md">
                      Book an Appointment
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
