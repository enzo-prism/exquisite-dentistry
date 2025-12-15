import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ScrollProgress from './ScrollProgress';
import { useSwipeGestures } from '@/hooks/use-mobile-gestures';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [originalBodyOverflow, setOriginalBodyOverflow] = useState<string>('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );
  const [isNavOverflowing, setIsNavOverflowing] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const lastMenuLinkRef = useRef<HTMLButtonElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  const isAtLeastLg = viewportWidth >= 1024;
  const shouldShowDesktopNav = isAtLeastLg && !isNavOverflowing;

  // Enhanced mobile menu close with focus restoration
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    // Restore focus to menu button when closing
    setTimeout(() => {
      const button = menuButtonRef.current;
      if (!button) return;
      if (button.offsetParent === null) return;
      button.focus();
    }, 100);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track viewport width for responsive behaviors that can't rely on CSS alone.
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
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

  // Close the mobile menu when switching into desktop navigation mode.
  useEffect(() => {
    if (shouldShowDesktopNav && isMobileMenuOpen) {
      closeMobileMenu();
    }
  }, [shouldShowDesktopNav, isMobileMenuOpen, closeMobileMenu]);

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

  // Desktop navigation fit check (auto-collapses to hamburger if links can't fit).
  const updateNavFit = useCallback(() => {
    const headerEl = headerRowRef.current;
    const logoEl = logoRef.current;
    const navEl = desktopNavRef.current;

    if (!headerEl || !logoEl || !navEl) return;

    const containerWidth = headerEl.clientWidth;
    const logoWidth = logoEl.getBoundingClientRect().width;
    const navWidth = navEl.getBoundingClientRect().width;
    const buffer = 24;

    setIsNavOverflowing(logoWidth + navWidth + buffer > containerWidth);
  }, []);

  useLayoutEffect(() => {
    updateNavFit();
  }, [viewportWidth, updateNavFit]);

  useEffect(() => {
    const headerEl = headerRowRef.current;
    const logoEl = logoRef.current;
    const navEl = desktopNavRef.current;

    if (!headerEl || !logoEl || !navEl) return;

    const observer = new ResizeObserver(() => updateNavFit());
    observer.observe(headerEl);
    observer.observe(logoEl);
    observer.observe(navEl);

    return () => observer.disconnect();
  }, [updateNavFit]);

  // Navigation links data
  const navLinks = [
    { to: '/dental-implants/', label: 'Dental Implants' },
    { to: '/veneers/', label: 'Porcelain Veneers' },
    { to: '/beverly-hills-dentist/', label: 'Beverly Hills Dentist' },
    { to: '/smile-gallery/', label: 'Smile Gallery' },
    { to: '/schedule-consultation/', label: 'Schedule Consultation' },
  ];

  const servicesDropdown = [
    { to: '/services/', label: 'Services Overview' },
    { to: '/veneers/', label: 'Porcelain Veneers' },
    { to: '/dental-implants/', label: 'Dental Implants' },
    { to: '/invisalign/', label: 'Invisalign' },
    { to: '/teeth-whitening/', label: 'Teeth Whitening' },
    { to: '/teeth-cleaning/', label: 'Teeth Cleaning' },
    { to: '/zoom-whitening/', label: 'Zoom Whitening' },
    { to: '/dental-crowns/', label: 'Dental Crowns' },
    { to: '/dental-bridge/', label: 'Dental Bridge' },
    { to: '/root-canal/', label: 'Root Canal Therapy' },
    { to: '/cosmetic-dentistry/', label: 'Cosmetic Dentistry' },
    { to: '/emergency-dentist/', label: 'Emergency Dentist' },
    { to: '/pain-free-dentistry/', label: 'Pain-Free Dentistry' },
    { to: '/oral-cancer-screening/', label: 'Oral Cancer Screening' },
  ];

  const clientsDropdown = [
    { to: '/transformation-stories/', label: 'Transformation Stories' },
    { to: '/testimonials/', label: 'Testimonials' },
    { to: '/client-experience/', label: 'Client Experience' },
  ];

  const moreDropdown = [
    { to: '/', label: 'Home' },
    { to: '/services/', label: 'Services' },
    { to: '/about/', label: 'About Dr. Aguil' },
    { to: '/tour/', label: 'Virtual Tour' },
    { to: '/contact/', label: 'Contact' },
    { to: '/faqs/', label: 'FAQs' },
    { to: '/blog/', label: 'Blog' },
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
          <div ref={headerRowRef} className="flex h-16 sm:h-20 items-center gap-3 sm:gap-4">
            
            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0 z-50">
              <Link to="/" onClick={closeMobileMenu}>
                <img
                  src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp"
                  alt="Exquisite Dentistry Logo"
                  className="h-6 sm:h-8 lg:h-9 xl:h-12 w-auto max-w-[160px] sm:max-w-[210px] lg:max-w-[190px] xl:max-w-[280px]"
                  loading="eager"
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center'
                  }}
                />
              </Link>
            </div>
          
            {/* Desktop Navigation */}
            <nav
              ref={desktopNavRef}
              aria-label="Primary"
              aria-hidden={!shouldShowDesktopNav}
              className={cn(
                "ml-auto flex items-center whitespace-nowrap text-sm xl:text-base",
                "gap-[clamp(0.5rem,1.2vw,1.75rem)]",
                shouldShowDesktopNav
                  ? ""
                  : "pointer-events-none invisible absolute -left-[9999px] -top-[9999px]",
              )}
            >
              {navLinks.map((link) =>
                link.label === 'Schedule Consultation' ? (
	                  <Button
	                    key={link.to}
	                    size="sm"
	                    asChild
	                    className="bg-gold text-black hover:bg-gold/90 h-9 xl:h-10 px-3 xl:px-4 text-[13px] xl:text-base"
	                  >
	                    <Link to={link.to}>
	                      {link.label}
	                    </Link>
	                  </Button>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="navbar-link text-white transition-colors duration-200 py-2 px-2 text-[13px] xl:text-base"
                  >
                    {link.label}
                  </Link>
                ),
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="navbar-link text-white transition-colors duration-200 flex items-center gap-1 py-2 px-2 text-[13px] xl:text-base"
                    aria-label="More pages"
                  >
                    More
                    <ChevronDown size={16} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-black border border-gold/40 text-white shadow-xl"
                >
                  {moreDropdown.map((item) => (
                    <DropdownMenuItem
                      key={item.to}
                      asChild
                      className="cursor-pointer text-white focus:bg-white/10 focus:text-white data-[highlighted]:bg-white/10 data-[highlighted]:text-white"
                    >
                      <Link to={item.to}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          
            {/* Enhanced Mobile Menu Button */}
            <button
              ref={menuButtonRef}
              className={cn(
                "ml-auto relative p-3 text-white hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md z-[115] transition-all duration-200 will-change-transform",
                shouldShowDesktopNav ? "hidden" : "",
              )}
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
            className="fixed inset-0 z-[110]"
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
    threshold: 100,
    preventDefaultTouchmove: false
  });

  const setPanelRefs = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node;
    swipeRef.current = node;
  }, [swipeRef]);

  // Calculate deltaX for swipe visual feedback
  const deltaX = gestureState.currentX - gestureState.startX;
  const deltaY = gestureState.currentY - gestureState.startY;
  const isHorizontalDrag =
    gestureState.isDragging &&
    Math.abs(deltaX) > Math.abs(deltaY) &&
    Math.abs(deltaX) > 8;

  return (
    <div 
      ref={setPanelRefs}
      className={`relative h-full w-full bg-black flex flex-col pt-12 sm:pt-14 transform transition-transform duration-300 will-change-transform ${
        isHorizontalDrag ? 'transition-none' : ''
      }`}
      style={{ 
        minHeight: '100dvh',
        transform: isHorizontalDrag && deltaX < 0 
          ? `translateX(${Math.min(0, deltaX)}px)` 
          : 'translateX(0)'
      }}
    >
      <h2 id="mobile-menu-title" className="sr-only">Navigation Menu</h2>
      
      {/* Navigation Links - Scrollable Area */}
      <nav 
        className="flex-1 flex flex-col w-full gap-1.5 overflow-y-auto overscroll-contain px-4 pb-4 scroll-smooth"
        role="navigation"
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-y' }}
      >
          {navLinks.map((link, index) => (
            <Link
              key={link.to}
              ref={index === 0 ? firstMenuLinkRef : undefined}
              to={link.to}
              className="w-full block py-3 px-4 text-base text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
              style={{ 
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={onClose}
            >
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
          
          {/* Services Section */}
          <div className="w-full border-b border-white/10 pb-1">
            <button
              id="services-button"
              className="w-full flex items-center justify-between py-3 px-4 text-base text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50 rounded-md"
              style={{ 
                minHeight: '48px',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={() => toggleDropdown('services')}
              aria-expanded={openDropdown === 'services'}
              aria-controls="services-submenu"
            >
              <span className="font-medium">Services</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-200 ${openDropdown === 'services' ? 'rotate-180 text-gold' : ''}`} 
              />
            </button>
            {openDropdown === 'services' && (
              <div
                id="services-submenu"
                className="mt-1 space-y-1.5 pb-1"
                role="region"
                aria-labelledby="services-button"
              >
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
              id="clients-button"
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
                     className="w-full block py-2.5 px-4 text-sm text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
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
              id="more-button"
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
                    className="w-full block py-2.5 px-4 text-sm text-white hover:bg-white/10 active:bg-white/20 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold/50"
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
      
      {/* Enhanced CTA Button - Mobile - Fixed at bottom */}
      <div 
        className="flex-shrink-0 mt-auto p-4 border-t border-white/10 bg-black/95" 
        style={{ 
          paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 20px))'
        }}
      >
        <Button
          size="lg"
          className="w-full bg-gold text-black hover:bg-gold/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
          asChild
          style={{
            minHeight: '48px',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <Link to="/schedule-consultation/" onClick={onClose}>
            Schedule Consultation
          </Link>
        </Button>
      </div>
      
      {/* Swipe Indicator */}
      {isHorizontalDrag && deltaX < -50 && (
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
