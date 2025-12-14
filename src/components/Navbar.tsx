import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ConversionButton from '@/components/ConversionButton';
import ImageComponent from '@/components/Image';
import ScrollProgress from './ScrollProgress';
import { useSwipeGestures } from '@/hooks/use-mobile-gestures';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [originalBodyOverflow, setOriginalBodyOverflow] = useState<string>('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const lastMenuLinkRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced body scroll management with position preservation
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store original state and scroll position
      setOriginalBodyOverflow(document.body.style.overflow);
      setScrollPosition(window.scrollY);
      
      // Prevent scrolling
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore original state and scroll position
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position smoothly
      if (scrollPosition > 0) {
        window.scrollTo(0, scrollPosition);
      }
    }
    
    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen, originalBodyOverflow, scrollPosition]);

  // Handle window resize to close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Enhanced mobile menu close with focus restoration
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    
    // Restore focus to menu button when closing
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 100);
  }, []);

  // Focus management for accessibility
  const handleMenuOpen = useCallback(() => {
    setIsMobileMenuOpen(true);
    
    // Focus first menu item after opening
    setTimeout(() => {
      firstMenuLinkRef.current?.focus();
    }, 100);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isMobileMenuOpen) return;
    
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
    
    // Tab trap logic
    if (e.key === 'Tab') {
      const focusableElements = document.querySelectorAll(
        '[data-mobile-menu] a, [data-mobile-menu] button'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Toggle dropdown menus
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Navigation links data
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/tour', label: 'Virtual Tour' },
  ];

  const servicesDropdown = [
    { to: '/services', label: 'Services Overview' },
    { to: '/invisalign', label: 'Invisalign' },
    { to: '/veneers', label: 'Porcelain Veneers' },
    { to: '/teeth-whitening', label: 'Teeth Whitening' },
    { to: '/teeth-cleaning', label: 'Teeth Cleaning' },
    { to: '/zoom-whitening', label: 'Zoom Whitening' },
    { to: '/dental-implants', label: 'Dental Implants' },
    { to: '/dental-crowns', label: 'Dental Crowns' },
    { to: '/dental-bridge', label: 'Dental Bridge' },
    { to: '/root-canal', label: 'Root Canal Therapy' },
    { to: '/cosmetic-dentistry', label: 'Cosmetic Dentistry' },
    { to: '/emergency-dentist', label: 'Emergency Dentist' },
    { to: '/pain-free-dentistry', label: 'Pain-Free Dentistry' },
    { to: '/oral-cancer-screening', label: 'Oral Cancer Screening' },
  ];

  const clientsDropdown = [
    { to: '/transformation-stories', label: 'Transformation Stories' },
    { to: '/smile-gallery', label: 'Smile Gallery' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/client-experience', label: 'Client Experience' },
  ];

  const moreDropdown = [
    { to: '/faqs', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
    { to: '/blog', label: 'Blog' },
    { to: '/culver-city-dentist', label: 'Culver City Dentist' },
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
                <img
                  src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp"
                  alt="Exquisite Dentistry Logo"
                  className="h-6 md:h-12 w-auto max-w-none"
                  loading="eager"
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                />
              </Link>
            </div>
          
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="navbar-link text-white transition-colors duration-200 py-2 px-2"
                >
                  {link.label}
                </Link>
              ))}

              {/* Services Dropdown - Desktop */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('services')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  className="navbar-link text-white transition-colors duration-200 flex items-center gap-1 py-2 px-2"
                >
                  Services
                  <ChevronDown size={16} />
                </button>
                
                {openDropdown === 'services' && (
                  <div className="absolute top-full left-0 w-56 bg-black border border-gold rounded-md shadow-lg z-50">
                    {servicesDropdown.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="navbar-link block px-4 py-2 text-white hover:bg-white/10 transition-colors first:rounded-t-md last:rounded-b-md"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Clients Dropdown - Desktop */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('clients')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  className="navbar-link text-white transition-colors duration-200 flex items-center gap-1 py-2 px-2"
                >
                  Clients
                  <ChevronDown size={16} />
                </button>
                
                {openDropdown === 'clients' && (
                  <div className="absolute top-full left-0 w-48 bg-black border border-gold rounded-md shadow-lg z-50">
                    {clientsDropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="navbar-link block px-4 py-2 text-white hover:bg-white/10 transition-colors first:rounded-t-md last:rounded-b-md"
                        >
                          {item.label}
                        </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* More Dropdown - Desktop */}
              <div 
                className="relative group"
                onMouseEnter={() => setOpenDropdown('more')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button 
                  className="navbar-link text-white transition-colors duration-200 flex items-center gap-1 py-2 px-2"
                >
                  More
                  <ChevronDown size={16} />
                </button>
                
                {openDropdown === 'more' && (
                  <div className="absolute top-full left-0 w-48 bg-black border border-gold rounded-md shadow-lg z-50">
                    {moreDropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="navbar-link block px-4 py-2 text-white hover:bg-white/10 transition-colors first:rounded-t-md last:rounded-b-md"
                        >
                          {item.label}
                        </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* CTA Button - Desktop */}
              <ConversionButton 
                size="lg" 
                variant="default"
                href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book an Appointment
              </ConversionButton>
            </nav>
          
            {/* Enhanced Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className="md:hidden relative p-3 text-white hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md z-[115] transition-all duration-200 will-change-transform"
              style={{ 
                minWidth: '48px', 
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={isMobileMenuOpen ? closeMobileMenu : handleMenuOpen}
              onKeyDown={handleKeyDown}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              <div className="transform transition-transform duration-200 hover:scale-110">
                {isMobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation with Swipe Support */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-[110] md:hidden"
            id="mobile-menu"
            data-mobile-menu
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Enhanced Backdrop with Animation */}
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-sm animate-fade-in" 
              onClick={closeMobileMenu}
              onTouchStart={(e) => e.stopPropagation()}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            />
            
            {/* Enhanced Menu Panel with Swipe Support */}
            <MobileMenuPanel 
              onClose={closeMobileMenu}
              navLinks={navLinks}
              servicesDropdown={servicesDropdown}
              clientsDropdown={clientsDropdown}
              moreDropdown={moreDropdown}
              openDropdown={openDropdown}
              toggleDropdown={toggleDropdown}
              firstMenuLinkRef={firstMenuLinkRef}
              lastMenuLinkRef={lastMenuLinkRef}
            />
          </div>
        )}
      </header>
    </>
  );
};

// Enhanced Mobile Menu Panel Component with Swipe Support
const MobileMenuPanel = ({ 
  onClose, 
  navLinks, 
  servicesDropdown,
  clientsDropdown, 
  moreDropdown, 
  openDropdown, 
  toggleDropdown,
  firstMenuLinkRef,
  lastMenuLinkRef
}: {
  onClose: () => void;
  navLinks: Array<{ to: string; label: string }>;
  clientsDropdown: Array<{ to: string; label: string }>;
  servicesDropdown: Array<{ to: string; label: string }>;
  moreDropdown: Array<{ to: string; label: string }>;
  openDropdown: string | null;
  toggleDropdown: (dropdown: string) => void;
  firstMenuLinkRef: React.RefObject<HTMLAnchorElement>;
  lastMenuLinkRef: React.RefObject<HTMLButtonElement>;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  
  // Swipe gesture support
  const { ref: swipeRef, gestureState } = useSwipeGestures({
    onSwipeLeft: () => {
      onClose();
    },
    threshold: 100
  });

  // Calculate deltaX for swipe visual feedback
  const deltaX = gestureState.currentX - gestureState.startX;

  // Combine refs for swipe functionality
  useEffect(() => {
    if (panelRef.current && swipeRef.current) {
      swipeRef.current = panelRef.current;
    }
  }, []);

  return (
    <div 
      ref={panelRef}
      className={`relative h-full w-full bg-black flex flex-col pt-12 sm:pt-14 pb-6 sm:pb-8 transform transition-transform duration-300 will-change-transform ${
        gestureState.isDragging ? 'transition-none' : ''
      }`}
      style={{ 
        minHeight: '100dvh',
        paddingBottom: 'env(safe-area-inset-bottom)',
        transform: gestureState.isDragging && deltaX < 0 
          ? `translateX(${Math.min(0, deltaX)}px)` 
          : 'translateX(0)'
      }}
    >
      <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
      
      {/* Navigation Links - Scrollable Area */}
      <div className="px-4">
        <nav 
          className="flex flex-col w-full gap-1.5 overflow-y-auto pr-1 scroll-smooth"
          role="navigation"
          style={{ maxHeight: 'min(70vh, calc(100dvh - 240px))' }}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              ref={index === 0 ? firstMenuLinkRef : undefined}
              to={link.to}
              className="navbar-link w-full block py-3 px-4 text-base text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              style={{ 
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={onClose}
              tabIndex={0}
            >
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
          
          {/* Services Section */}
          <div className="w-full border-b border-white/10 pb-1">
            <button
              className="w-full flex items-center justify-between py-3 px-4 text-base text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md"
              style={{ 
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={() => toggleDropdown('services')}
            >
              <span className="font-medium">Services</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180 text-gold' : ''}`} 
              />
            </button>
            {openDropdown === 'services' && (
              <div className="mt-1 space-y-1.5 pb-1">
                {servicesDropdown.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="block py-2.5 px-6 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-colors rounded-md"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Clients Section */}
          <div className="w-full border-b border-white/10 pb-1">
            <button
              className="w-full flex items-center justify-between py-3 px-4 text-base text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md"
              style={{ 
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={() => toggleDropdown('clients')}
              aria-expanded={openDropdown === 'clients'}
              aria-controls="clients-submenu"
            >
              <span className="font-medium">Clients</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${
                  openDropdown === 'clients' ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {openDropdown === 'clients' && (
              <div 
                id="clients-submenu"
                className="w-full bg-black/50 rounded-md ml-4 mb-2 animate-accordion-down"
                role="region"
                aria-labelledby="clients-button"
              >
                {clientsDropdown.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                     className="navbar-link w-full block py-2.5 px-4 text-sm text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                    style={{ 
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* More Section */}
          <div className="w-full border-b border-white/10 pb-1">
            <button
              ref={lastMenuLinkRef}
              className="w-full flex items-center justify-between py-3 px-4 text-base text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md"
              style={{ 
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={() => toggleDropdown('more')}
              aria-expanded={openDropdown === 'more'}
              aria-controls="more-submenu"
            >
              <span className="font-medium">More</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 ${
                  openDropdown === 'more' ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {openDropdown === 'more' && (
              <div 
                id="more-submenu"
                className="w-full bg-black/50 rounded-md ml-4 mb-2 animate-accordion-down"
                role="region"
                aria-labelledby="more-button"
              >
                {moreDropdown.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="navbar-link w-full block py-2.5 px-4 text-sm text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
                    style={{ 
                      minHeight: '44px',
                      WebkitTapHighlightColor: 'transparent'
                    }}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
      
      {/* Enhanced CTA Button - Mobile - Fixed at bottom */}
      <div 
        className="flex-shrink-0 mt-auto p-4 border-t border-white/10 bg-black/95" 
        style={{ 
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 20px))'
        }}
      >
        <ConversionButton 
          size="lg" 
          className="w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
          variant="default"
          href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
          target="_blank"
          rel="noopener noreferrer"
          style={{ 
            minHeight: '48px',
            WebkitTapHighlightColor: 'transparent'
          }}
          onClick={onClose}
        >
          Book an Appointment
        </ConversionButton>
      </div>
      
      {/* Swipe Indicator */}
      {gestureState.isDragging && deltaX < -50 && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white/60 animate-pulse">
          <div className="flex items-center gap-2">
            <span className="text-sm">Swipe to close</span>
            <ChevronDown className="rotate-90" size={16} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
