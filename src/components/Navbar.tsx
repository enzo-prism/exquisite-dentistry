
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';
import ImageComponent from '@/components/Image';
import ScrollProgress from './ScrollProgress';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';
import MobileMenuButton from './navbar/MobileMenuButton';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      console.log('Closing mobile menu due to desktop switch');
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      console.log('Mobile menu opened - body scroll disabled');
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      console.log('Mobile menu closed - body scroll enabled');
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    console.log('Toggling mobile menu from', isMobileMenuOpen, 'to', !isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    console.log('Closing mobile menu');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <ScrollProgress />
      <motion.header 
        ref={navRef}
        className={`sticky top-0 z-40 w-full transition-all duration-300 isolate ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-black'
        }`}
        initial={false}
        animate={{
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 1)'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center" onClick={closeMobileMenu}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <ImageComponent
                    src=""
                    alt="Exquisite Dentistry Logo"
                    className={isMobile ? 'h-8' : 'h-12'}
                    logoType="alt"
                    responsive
                    priority
                  />
                </motion.div>
              </Link>
            </div>
          
            {/* Desktop Navigation */}
            <DesktopNavigation />
          
            {/* Mobile Menu Button */}
            <MobileMenuButton 
              isOpen={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Navigation - moved outside header to prevent z-index issues */}
      <MobileNavigation 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
};

export default Navbar;
