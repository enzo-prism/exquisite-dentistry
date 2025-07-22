
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion } from 'framer-motion';

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="text-white hover:text-gold transition-all duration-300 py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black rounded-md px-2"
  >
    {children}
  </Link>
);

const DropdownMenu: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <HoverCard openDelay={0} closeDelay={100}>
    <HoverCardTrigger asChild>
      <div className="relative group">
        <span className="text-white hover:text-gold transition-colors duration-200 flex items-center gap-1 py-2 cursor-pointer px-2 rounded-md hover:underline focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-black">
          {title}
          <motion.div
            animate={{ rotate: 0 }}
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </span>
      </div>
    </HoverCardTrigger>
    <HoverCardContent className="w-auto p-0 bg-black border-gold z-50">
      <motion.div 
        className="py-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </HoverCardContent>
  </HoverCard>
);

const DesktopNavigation: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <nav className="flex items-center space-x-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        
        <DropdownMenu title="Clients">
          <Link to="/smile-gallery" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50 transition-colors">
            Smile Gallery
          </Link>
          <Link to="/testimonials" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50 transition-colors">
            Testimonials
          </Link>
          <Link to="/client-experience" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50 transition-colors">
            Client Experience
          </Link>
        </DropdownMenu>

        <DropdownMenu title="More">
          <Link to="/faqs" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50 transition-colors">
            FAQs
          </Link>
          <Link to="/contact" className="block px-4 py-2 text-white hover:text-gold hover:bg-black/50 transition-colors">
            Contact
          </Link>
        </DropdownMenu>
      </nav>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button asChild size="lg" className="bg-gold text-white hover:bg-gold/90 rounded-md px-6 focus:ring-2 focus:ring-gold focus:ring-offset-2">
          <a href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
            Book an Appointment
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default DesktopNavigation;
