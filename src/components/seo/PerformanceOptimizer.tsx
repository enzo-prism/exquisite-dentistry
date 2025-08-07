import React, { useEffect } from 'react';
import { usePerformance } from '@/hooks/use-performance';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  const { isSlowConnection, isReducedMotion, deviceMemory, connectionType } = usePerformance();

  useEffect(() => {
    // Optimize based on connection speed
    if (isSlowConnection) {
      // Reduce animation complexity
      document.documentElement.style.setProperty('--transition-duration', '0.1s');
      
      // Disable non-essential animations
      document.documentElement.classList.add('reduce-animations');
      
      // Preload only critical resources
      const criticalResources = document.querySelectorAll('link[rel="preload"]');
      criticalResources.forEach((link, index) => {
        if (index > 2) { // Only keep first 2 preloads on slow connections
          link.remove();
        }
      });
    }

    // Respect reduced motion preference
    if (isReducedMotion) {
      document.documentElement.classList.add('reduce-motion');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }

    // Optimize for low-memory devices
    if (deviceMemory && deviceMemory < 4) {
      document.documentElement.classList.add('low-memory');
      
      // Disable complex CSS effects
      const style = document.createElement('style');
      style.textContent = `
        .low-memory * {
          backdrop-filter: none !important;
          filter: none !important;
        }
        .low-memory .particle-effect,
        .low-memory .complex-gradient {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Add connection type class for styling
    document.documentElement.setAttribute('data-connection', connectionType);

  }, [isSlowConnection, isReducedMotion, deviceMemory, connectionType]);

  // Add performance-aware CSS classes to body
  useEffect(() => {
    const classes = [];
    
    if (isSlowConnection) classes.push('slow-connection');
    if (isReducedMotion) classes.push('reduce-motion');
    if (deviceMemory && deviceMemory < 4) classes.push('low-memory');
    
    classes.forEach(cls => document.body.classList.add(cls));
    
    return () => {
      classes.forEach(cls => document.body.classList.remove(cls));
    };
  }, [isSlowConnection, isReducedMotion, deviceMemory]);

  return <>{children}</>;
};

export default PerformanceOptimizer;