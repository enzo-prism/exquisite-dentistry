
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
    style={{ minHeight: '48px', minWidth: '48px' }}
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
      <CollapsibleTrigger className="flex w-full items-center justify-between py-4 px-6 text-lg text-white hover:bg-white/10 transition-colors duration-200 touch-manipulation" style={{ minHeight: '48px' }}>
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
  React.useEffect(() => {
    console.log('Mobile navigation state changed:', isOpen);
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop with higher z-index */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ isolation: 'isolate' }}
          />
          
          {/* Slide-out Navigation with highest z-index and better positioning */}
          <motion.div
            className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-black z-[9999] shadow-xl md:hidden overflow-y-auto touch-pan-y isolate"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'tween', 
              duration: 0.3,
              ease: 'easeInOut'
            }}
            style={{ 
              minHeight: '100vh',
              minHeight: '100dvh',
              willChange: 'transform'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black">
              <h2 className="text-xl font-semibold text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-3 text-white hover:bg-white/10 rounded-md transition-colors touch-manipulation"
                aria-label="Close menu"
                style={{ minHeight: '48px', minWidth: '48px' }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 bg-black">
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
            <div className="p-6 border-t border-white/10 bg-black">
              <Button 
                asChild 
                size="lg" 
                className="w-full bg-gold text-white hover:bg-gold/90 rounded-md text-lg py-4 touch-manipulation"
                style={{ minHeight: '48px' }}
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
