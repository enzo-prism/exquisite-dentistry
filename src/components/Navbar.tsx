
import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `text-gray-700 hover:text-gold transition-colors duration-200 ${
        isActive ? 'text-gold font-medium' : ''
      }`
    }
  >
    {children}
  </RouterNavLink>
);

const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => (
  <RouterNavLink
    to={to}
    onClick={onClick}
    className="block py-2 px-4 text-base text-gray-700 hover:bg-gray-100 transition-colors duration-200"
  >
    {children}
  </RouterNavLink>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="mx-auto px-4 max-w-7xl">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <img 
                src="/lovable-uploads/9683bb53-6591-4e0a-9a1d-6f49d54ea2b1.png" 
                alt="Exquisite Dentistry Logo" 
                className="h-10 md:h-12"
                style={{ filter: 'brightness(0) invert(70%) sepia(11%) saturate(659%) hue-rotate(358deg) brightness(90%) contrast(83%)' }}
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/smile-gallery">Smile Gallery</NavLink>
              <NavLink to="/testimonials">Testimonials</NavLink>
              <NavLink to="/client-resources">Resources</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </nav>
            
            <Button asChild size="sm" className="hidden md:flex bg-gold text-white hover:bg-gold/90">
              <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                Book Appointment
              </a>
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-800 hover:text-gold focus:outline-none"
              onClick={toggleMobileMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-screen bg-white shadow-lg' : 'max-h-0'
        }`}
      >
        <nav className="px-4 pt-2 pb-4 space-y-1">
          <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={closeMobileMenu}>About</MobileNavLink>
          <MobileNavLink to="/services" onClick={closeMobileMenu}>Services</MobileNavLink>
          <MobileNavLink to="/smile-gallery" onClick={closeMobileMenu}>Smile Gallery</MobileNavLink>
          <MobileNavLink to="/testimonials" onClick={closeMobileMenu}>Testimonials</MobileNavLink>
          <MobileNavLink to="/client-resources" onClick={closeMobileMenu}>Resources</MobileNavLink>
          <MobileNavLink to="/contact" onClick={closeMobileMenu}>Contact</MobileNavLink>
          <div className="pt-2">
            <Button asChild size="sm" className="w-full bg-gold text-white hover:bg-gold/90">
              <a 
                href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                Book Appointment
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
