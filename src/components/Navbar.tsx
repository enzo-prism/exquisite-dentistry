
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'py-3 md:py-4 bg-white/90 backdrop-blur-md shadow-sm' 
          : 'py-4 md:py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <img 
              src="https://drive.google.com/uc?export=view&id=12ddztwLJcoOgoOcDamdxBF9vnAbHRYJW" 
              alt="Exquisite Dentistry" 
              className="h-10 md:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'font-medium text-sm transition-colors duration-200',
                  location.pathname === link.path 
                    ? 'text-gold' 
                    : scrolled || location.pathname !== '/' 
                      ? 'text-black-light hover:text-black' 
                      : 'text-white/90 hover:text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button size="sm" className="ml-2">Book an Appointment</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden transition-colors",
              scrolled || location.pathname !== '/' 
                ? 'text-black hover:text-gold' 
                : 'text-white hover:text-gold'
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 bg-white z-40 flex flex-col lg:hidden transition-transform duration-300 ease-in-out pt-24',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="px-6 py-8 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'block text-xl font-medium py-2 text-black-light hover:text-gold transition-colors duration-200',
                location.pathname === link.path && 'text-gold'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-6">
            <Button fullWidth>Book an Appointment</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
