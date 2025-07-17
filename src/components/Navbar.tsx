import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useIsMobile } from '@/hooks/use-mobile';
import ImageComponent from '@/components/Image';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollProgress from './ScrollProgress';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  hasDropdown?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, isActive, hasDropdown }) => {
  if (hasDropdown) {
    return (
      <HoverCard openDelay={0} closeDelay={100}>
        <HoverCardTrigger asChild>
          <div className="relative group">
            <RouterNavLink
              to={to}
              className={({ isActive: active }) =>
                `text-white hover:text-gold micro-lift transition-all duration-300 flex items-center gap-1 py-2 ${
                  active || isActive ? 'text-gold' : ''
                }`
              }
            >
              {children}
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </RouterNavLink>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-0 bg-black border-gold gpu-accelerated">
          <motion.div 
            className="py-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <slot />
          </motion.div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <RouterNavLink
      to={to}
      className={({ isActive: active }) =>
        `text-white hover:text-gold micro-lift transition-all duration-300 py-2 ${
          active || isActive ? 'text-gold border-b-2 border-gold' : ''
        }`
      }
    >
      {children}
    </RouterNavLink>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, children, onClick }) => (
  <RouterNavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `block py-2 px-4 text-base ${isActive ? 'text-gold' : 'text-white'} hover:bg-black/50 transition-colors duration-200`
    }
  >
    {children}
  </RouterNavLink>
);

const MobileDropdown: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 px-4 text-base text-white hover:bg-black/50 transition-colors duration-200">
        {title}
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 bg-black/30">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { ref: navRef } = useHardwareAcceleration();

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== scrolled) {
        setScrolled(shouldBeScrolled);
      }
    };

    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ScrollProgress />
      <motion.header 
        ref={navRef}
        className={`navbar-morph sticky top-0 z-50 w-full ${scrolled ? 'navbar-morphed' : 'bg-black'}`}
        initial={false}
        animate={{
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 1)'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="mx-auto px-6 max-w-7xl">
          <div className="flex h-20 items-center justify-between">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center micro-scale" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <ImageComponent
                    src=""
                    alt="Exquisite Dentistry Logo"
                    className={isMobile ? 'h-6' : 'h-12'}
                    logoType="alt"
                    responsive
                    priority
                  />
                </motion.div>
              </Link>
            </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              
              <HoverCard openDelay={0} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="relative group">
                    <span className="text-white hover:text-gold transition-colors duration-200 flex items-center gap-1 py-2 cursor-pointer">
                      Clients
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                    </span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-0 bg-black border-gold">
                  <div className="py-2">
                    <Link to="/smile-gallery" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50">
                      Smile Gallery
                    </Link>
                    <Link to="/testimonials" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50">
                      Testimonials
                    </Link>
                    <Link to="/client-experience" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50">
                      Client Experience
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <HoverCard openDelay={0} closeDelay={100}>
                <HoverCardTrigger asChild>
                  <div className="relative group">
                    <span className="text-white hover:text-gold transition-colors duration-200 flex items-center gap-1 py-2 cursor-pointer">
                      More
                      <ChevronDown size={16} className="transition-transform group-hover:rotate-180" />
                    </span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-0 bg-black border-gold">
                  <div className="py-2">
                    <Link to="/faqs" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50">
                      FAQs
                    </Link>
                    <Link to="/contact" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50">
                      Contact
                    </Link>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </nav>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button asChild size="lg" className="bg-gold text-white hover:bg-gold/90 rounded-none px-6 micro-glow">
                <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                  Book an Appointment
                </a>
              </Button>
            </motion.div>
          </div>
          
          <div className="md:hidden">
            <motion.button
              type="button"
              className="text-white hover:text-gold focus:outline-none micro-scale"
              onClick={toggleMobileMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
      
        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden bg-black shadow-lg gpu-accelerated"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
        <nav className="px-4 pt-2 pb-4 space-y-1">
          <MobileNavLink to="/" onClick={closeMobileMenu}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={closeMobileMenu}>About</MobileNavLink>
          <MobileNavLink to="/services" onClick={closeMobileMenu}>Services</MobileNavLink>
          <MobileNavLink to="/blog" onClick={closeMobileMenu}>Blog</MobileNavLink>
          
          <MobileDropdown title="Clients">
            <MobileNavLink to="/smile-gallery" onClick={closeMobileMenu}>Smile Gallery</MobileNavLink>
            <MobileNavLink to="/testimonials" onClick={closeMobileMenu}>Testimonials</MobileNavLink>
            <MobileNavLink to="/client-experience" onClick={closeMobileMenu}>Client Experience</MobileNavLink>
          </MobileDropdown>
          
          <MobileDropdown title="More">
            <MobileNavLink to="/faqs" onClick={closeMobileMenu}>FAQs</MobileNavLink>
            <MobileNavLink to="/contact" onClick={closeMobileMenu}>Contact</MobileNavLink>
          </MobileDropdown>
          
          <div className="pt-2">
            <Button asChild size="sm" className="w-full bg-gold text-white hover:bg-gold/90 rounded-none">
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
            </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;
