
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Patient Experience', path: '/patient-experience' },
    { name: 'Patient Resources', path: '/patient-resources' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Apply styles for header based on scroll position
  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled 
      ? 'bg-black bg-opacity-95 py-3 md:py-4 shadow-lg' 
      : 'bg-black bg-opacity-80 backdrop-blur-md py-4 md:py-6'
  );

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobile) {
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isMobile]);

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

          {/* Desktop Navigation - Redesigned */}
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

          {/* Mobile Menu Button - Updated styling */}
          <button
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Completely solid black background with new design */}
      <div
        className={cn(
          'fixed inset-0 bg-black z-40 flex flex-col lg:hidden transition-all duration-400 ease-in-out',
          isMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        )}
        style={{ backgroundColor: '#000000' }} // Ensuring solid black background
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'flex items-center w-full p-4 text-lg font-medium rounded-md transition-colors',
                  location.pathname === link.path 
                    ? 'text-gold bg-white/5' 
                    : 'text-white hover:bg-white/5'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-8 p-4 border-t border-white/10">
            <Button variant="gold" fullWidth className="rounded-md">
              Book an Appointment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
