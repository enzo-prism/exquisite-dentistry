
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from 'framer-motion';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavLink: React.FC<{ 
  to: string; 
  children: React.ReactNode; 
  onClick: () => void;
  className?: string;
}> = ({ to, children, onClick, className = "" }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block py-4 px-6 text-lg text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/10 touch-manipulation ${className}`}
    style={{ minHeight: '48px' }}
  >
    {children}
  </Link>
);

const MobileDropdown: React.FC<{ 
  title: string; 
  children: React.ReactNode;
  onItemClick: () => void;
}> = ({ title, children, onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full border-b border-white/10">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-4 px-6 text-lg text-white hover:bg-white/10 transition-colors duration-200 touch-manipulation">
        <span>{title}</span>
        <ChevronDown 
          size={20} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-black/30">
        <div onClick={onItemClick}>
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const MobileNavigation: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Slide-out Navigation */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black z-50 shadow-xl md:hidden overflow-y-auto touch-pan-y"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 text-white hover:bg-white/10 rounded-md transition-colors touch-manipulation"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1">
              <MobileNavLink to="/" onClick={onClose}>
                Home
              </MobileNavLink>
              
              <MobileNavLink to="/about" onClick={onClose}>
                About
              </MobileNavLink>
              
              <MobileNavLink to="/services" onClick={onClose}>
                Services
              </MobileNavLink>
              
              <MobileNavLink to="/blog" onClick={onClose}>
                Blog
              </MobileNavLink>
              
              <MobileDropdown title="Clients" onItemClick={onClose}>
                <MobileNavLink to="/smile-gallery" onClick={onClose} className="pl-12">
                  Smile Gallery
                </MobileNavLink>
                <MobileNavLink to="/testimonials" onClick={onClose} className="pl-12">
                  Testimonials
                </MobileNavLink>
                <MobileNavLink to="/client-experience" onClick={onClose} className="pl-12">
                  Client Experience
                </MobileNavLink>
              </MobileDropdown>
              
              <MobileDropdown title="More" onItemClick={onClose}>
                <MobileNavLink to="/faqs" onClick={onClose} className="pl-12">
                  FAQs
                </MobileNavLink>
                <MobileNavLink to="/contact" onClick={onClose} className="pl-12">
                  Contact
                </MobileNavLink>
              </MobileDropdown>
            </nav>
            
            {/* CTA Button */}
            <div className="p-6 border-t border-white/10">
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-gold text-white hover:bg-gold/90 rounded-md text-lg py-4 touch-manipulation"
              >
                <a 
                  href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  Book an Appointment
                </a>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
