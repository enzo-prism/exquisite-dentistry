
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Restructured navigation with main items and dropdown categories
  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
  ];

  const patientLinks = [
    { name: 'Patient Experience', path: '/patient-experience' },
    { name: 'Patient Resources', path: '/patient-resources' },
  ];

  const moreLinks = [
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  // All links flattened for mobile menu
  const allNavLinks = [...mainNavLinks, ...patientLinks, ...moreLinks];

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

  // Check if a dropdown item is active
  const isDropdownActive = (links) => {
    return links.some(link => link.path === location.pathname);
  };

  // Apply styles for header based on scroll position
  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black',
    scrolled 
      ? 'bg-opacity-95 py-2 md:py-4 shadow-lg' 
      : 'bg-opacity-100 py-3 md:py-6'
  );

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo - reduced size by 25% */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <img 
              src="/lovable-uploads/aaedf2d1-c204-4ff6-9e44-695686f3871c.png" 
              alt="Exquisite Dentistry" 
              className="h-6 md:h-7.5 lg:h-9"
            />
          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center">
            <div className="flex space-x-6 xl:space-x-8 mr-8 items-center">
              {/* Main nav links */}
              {mainNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'relative inline-flex items-center px-3 py-2 font-medium text-sm transition-colors rounded-md hover:bg-white/10',
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

              {/* Patient dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  'relative inline-flex items-center px-3 py-2 font-medium text-sm transition-colors rounded-md hover:bg-white/10',
                  'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                  'after:h-[2px] after:bg-gold after:transition-all after:duration-300',
                  isDropdownActive(patientLinks)
                    ? 'text-gold after:w-1/2' 
                    : 'text-white/90 hover:text-white after:w-0 hover:after:w-1/2'
                )}>
                  Patients <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-black/95 border border-gold/20 shadow-lg p-2 rounded-md backdrop-blur">
                  {patientLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild className="focus:bg-white/10 rounded-md">
                      <Link
                        to={link.path}
                        className={cn(
                          'px-4 py-2 text-sm font-medium w-full hover:bg-white/10 rounded-md transition-colors',
                          location.pathname === link.path 
                            ? 'text-gold' 
                            : 'text-white/90 hover:text-white'
                        )}
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* More dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(
                  'relative inline-flex items-center px-3 py-2 font-medium text-sm transition-colors rounded-md hover:bg-white/10',
                  'after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2',
                  'after:h-[2px] after:bg-gold after:transition-all after:duration-300',
                  isDropdownActive(moreLinks)
                    ? 'text-gold after:w-1/2' 
                    : 'text-white/90 hover:text-white after:w-0 hover:after:w-1/2'
                )}>
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-black/95 border border-gold/20 shadow-lg p-2 rounded-md backdrop-blur">
                  {moreLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild className="focus:bg-white/10 rounded-md">
                      <Link
                        to={link.path}
                        className={cn(
                          'px-4 py-2 text-sm font-medium w-full hover:bg-white/10 rounded-md transition-colors',
                          location.pathname === link.path 
                            ? 'text-gold' 
                            : 'text-white/90 hover:text-white'
                        )}
                      >
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button variant="gold" size="sm" className="ml-4 rounded-md">
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
                    {/* Reduced logo size in mobile menu by 25% */}
                    <img 
                      src="/lovable-uploads/aaedf2d1-c204-4ff6-9e44-695686f3871c.png" 
                      alt="Exquisite Dentistry" 
                      className="h-6"
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
                    <ul className="space-y-4">
                      {allNavLinks.map((link) => (
                        <li key={link.name}>
                          <Link
                            to={link.path}
                            className={cn(
                              'flex items-center py-3 px-4 rounded-md text-base font-medium transition-colors',
                              location.pathname === link.path
                                ? 'bg-gold/10 text-gold'
                                : 'text-white hover:bg-white/5'
                            )}
                            onClick={() => setIsMenuOpen(false)}
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
