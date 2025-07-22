
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ImageComponent from '@/components/Image';
import ScrollProgress from './ScrollProgress';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside or on links
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Toggle dropdown menus
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Navigation links data
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
  ];

  const clientsDropdown = [
    { to: '/smile-gallery', label: 'Smile Gallery' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/client-experience', label: 'Client Experience' },
  ];

  const moreDropdown = [
    { to: '/faqs', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <ScrollProgress />
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10' 
            : 'bg-black'
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            
            {/* Logo */}
            <div className="flex-shrink-0 z-50">
              <Link to="/" onClick={closeMobileMenu}>
                <picture>
                  {/* WebP sources with proper sizes */}
                  <source 
                    media="(max-width: 768px)" 
                    srcSet="/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-mobile.webp" 
                    type="image/webp" 
                  />
                  <source 
                    media="(min-width: 769px)" 
                    srcSet="/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-desktop-2x.webp" 
                    type="image/webp" 
                  />
                  
                  {/* PNG fallbacks */}
                  <source 
                    media="(max-width: 768px)" 
                    srcSet="/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-mobile.png" 
                    type="image/png" 
                  />
                  <source 
                    media="(min-width: 769px)" 
                    srcSet="/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-desktop-2x.png" 
                    type="image/png" 
                  />
                  
                  {/* Final fallback img */}
                  <img
                    src="/lovable-uploads/9e823f53-f866-40f9-a3e2-78373640ee8f.png"
                    alt="Exquisite Dentistry Logo"
                    className="h-6 md:h-12 w-auto max-w-none"
                    loading="eager"
                    style={{ 
                      objectFit: 'contain',
                      objectPosition: 'center'
                    }}
                  />
                </picture>
              </Link>
            </div>
          
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white hover:text-gold transition-colors duration-200 py-2 px-2"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Clients Dropdown - Desktop */}
              <div className="relative group">
                <button 
                  className="text-white hover:text-gold transition-colors duration-200 flex items-center gap-1 py-2 px-2"
                  onMouseEnter={() => setOpenDropdown('clients')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  Clients
                  <ChevronDown size={16} />
                </button>
                
                {openDropdown === 'clients' && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-black border border-gold rounded-md shadow-lg z-50"
                    onMouseEnter={() => setOpenDropdown('clients')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {clientsDropdown.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-white hover:text-gold hover:bg-white/10 transition-colors first:rounded-t-md last:rounded-b-md"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* More Dropdown - Desktop */}
              <div className="relative group">
                <button 
                  className="text-white hover:text-gold transition-colors duration-200 flex items-center gap-1 py-2 px-2"
                  onMouseEnter={() => setOpenDropdown('more')}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  More
                  <ChevronDown size={16} />
                </button>
                
                {openDropdown === 'more' && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-black border border-gold rounded-md shadow-lg z-50"
                    onMouseEnter={() => setOpenDropdown('more')}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {moreDropdown.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block px-4 py-2 text-white hover:text-gold hover:bg-white/10 transition-colors first:rounded-t-md last:rounded-b-md"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* CTA Button - Desktop */}
              <Button asChild size="lg" className="bg-gold text-white hover:bg-gold/90">
                <a 
                  href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Book an Appointment
                </a>
              </Button>
            </nav>
          
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-3 text-white hover:text-gold focus:outline-none z-[110]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] md:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/90" 
              onClick={closeMobileMenu}
            />
            
            {/* Menu Panel */}
            <div className="relative h-full w-full bg-black flex flex-col pt-16 sm:pt-20" style={{ minHeight: '100dvh' }}>              
              {/* Navigation Links - Scrollable Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <nav className="flex flex-col w-full">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="w-full block py-3 px-4 mb-1 text-base text-white hover:text-gold hover:bg-white/10 transition-colors rounded-md border-b border-white/10"
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {/* Clients Section */}
                  <div className="w-full border-b border-white/10 mb-1">
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 text-base text-white hover:text-gold transition-colors"
                      onClick={() => toggleDropdown('clients')}
                    >
                      Clients
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-200 ${
                          openDropdown === 'clients' ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {openDropdown === 'clients' && (
                      <div className="w-full bg-black/50 rounded-md ml-4 mb-2">
                        {clientsDropdown.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="w-full block py-2 px-4 text-sm text-white hover:text-gold hover:bg-white/10 transition-colors rounded-md"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* More Section */}
                  <div className="w-full border-b border-white/10 mb-1">
                    <button
                      className="w-full flex items-center justify-between py-3 px-4 text-base text-white hover:text-gold transition-colors"
                      onClick={() => toggleDropdown('more')}
                    >
                      More
                      <ChevronDown 
                        size={18} 
                        className={`transition-transform duration-200 ${
                          openDropdown === 'more' ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {openDropdown === 'more' && (
                      <div className="w-full bg-black/50 rounded-md ml-4 mb-2">
                        {moreDropdown.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="w-full block py-2 px-4 text-sm text-white hover:text-gold hover:bg-white/10 transition-colors rounded-md"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </nav>
              </div>
              
              {/* CTA Button - Mobile - Fixed at bottom */}
              <div className="flex-shrink-0 p-4 border-t border-white/10 bg-black/95" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full bg-gold text-white hover:bg-gold/90"
                >
                  <a 
                    href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                  >
                    Book an Appointment
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
