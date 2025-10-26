import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Calendar, X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTouchOptimization } from '@/hooks/use-mobile-gestures';
import { motion, AnimatePresence } from 'framer-motion';
import { gtagSendEvent } from '@/utils/googleAdsTracking';

interface FloatingActionButtonProps {
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  className 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const isMobile = useIsMobile();
  const { getTouchTargetClasses, getThumbZoneClasses } = useTouchOptimization();

  // Hide FAB on desktop or when not scrolled
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMobile || !hasScrolled) {
    return null;
  }

  const actions = [
    {
      icon: Phone,
      label: 'Call Now',
      href: 'tel:+13232722388',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: MessageSquare,
      label: 'Text Us',
      href: 'sms:+13232722388',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: MapPin,
      label: 'Directions',
      href: 'https://maps.google.com/?q=Exquisite+Dentistry+Los+Angeles',
      color: 'bg-red-500 hover:bg-red-600'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      href: 'https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null',
      color: 'bg-primary hover:bg-primary/90 text-primary-foreground',
      trackConversion: true
    }
  ];

  const containerVariants = {
    collapsed: {
      scale: 1,
      rotate: 0,
    },
    expanded: {
      scale: 1.1,
      rotate: 45,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15
      }
    }
  };

  const actionVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 20,
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: index * 0.05
      }
    }),
    exit: {
      scale: 0,
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div className={cn(getThumbZoneClasses(), className)}>
      {/* Action buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="absolute bottom-20 right-0 space-y-3"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {actions.map((action, index) => (
              <motion.a
                key={action.label}
                href={action.href}
                variants={actionVariants}
                custom={index}
                className={cn(
                  'flex items-center justify-center rounded-full shadow-lg text-white',
                  'transition-all duration-200',
                  getTouchTargetClasses('md'),
                  action.color
                )}
                onClick={(e) => {
                  if (action.trackConversion) {
                    e.preventDefault();
                    gtagSendEvent(action.href);
                  }
                  setIsExpanded(false);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon size={20} />
                <span className="sr-only">{action.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        className={cn(
          'bg-primary text-primary-foreground rounded-full shadow-xl',
          'border-2 border-white',
          'transition-all duration-200',
          'active:scale-95',
          getTouchTargetClasses('lg')
        )}
        variants={containerVariants}
        animate={isExpanded ? 'expanded' : 'collapsed'}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--gold-light)))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)'
        }}
      >
        {isExpanded ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
        <span className="sr-only">
          {isExpanded ? 'Close menu' : 'Open quick actions'}
        </span>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton;