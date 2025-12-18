import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';
import { usePerformanceSettings } from '@/hooks/use-performance-monitor';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { ref } = useHardwareAcceleration();
  const { optimizedSettings } = usePerformanceSettings();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, optimizedSettings.reduceAnimations ? 200 : 400);

    return () => clearTimeout(timer);
  }, [location.pathname, optimizedSettings.reduceAnimations]);

  const getTransitionClasses = () => {
    if (optimizedSettings.reduceAnimations) {
      return isTransitioning 
        ? 'opacity-90 transition-opacity duration-200'
        : 'opacity-100 transition-opacity duration-200';
    }

    return isTransitioning
      ? 'opacity-0 translate-y-2 scale-98 transition-all duration-400 ease-out'
      : 'opacity-100 translate-y-0 scale-100 transition-all duration-400 ease-out';
  };

  return (
    <div
      ref={ref}
      className={cn(
        "gpu-accelerated transition-smooth",
        getTransitionClasses()
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
