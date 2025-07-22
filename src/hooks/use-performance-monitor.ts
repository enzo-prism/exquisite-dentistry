
import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  isLowEnd: boolean;
  connectionSpeed: 'slow' | 'fast' | 'unknown';
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    isLowEnd: false,
    connectionSpeed: 'unknown'
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number>();
  const isMobile = useRef(window.innerWidth < 768);

  useEffect(() => {
    // Update mobile detection
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);

    // Reduced FPS monitoring for mobile to prevent scroll interference
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      // Less frequent updates on mobile
      const updateInterval = isMobile.current ? 2000 : 1000;
      
      if (currentTime - lastTime.current >= updateInterval) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          // Less aggressive low-end detection on mobile
          isLowEnd: isMobile.current ? fps < 20 : fps < 30
        }));
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      rafId.current = requestAnimationFrame(measureFPS);
    };

    rafId.current = requestAnimationFrame(measureFPS);

    // Memory monitoring (less frequent on mobile)
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit
        }));
      };
      
      const memoryInterval = setInterval(updateMemory, isMobile.current ? 10000 : 5000);
      
      return () => {
        clearInterval(memoryInterval);
        window.removeEventListener('resize', handleResize);
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
      };
    }

    // Connection speed detection
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const speed = connection.effectiveType === '4g' || connection.effectiveType === '3g' ? 'fast' : 'slow';
      
      setMetrics(prev => ({
        ...prev,
        connectionSpeed: speed
      }));
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const getOptimizedSettings = () => ({
    enableHeavyAnimations: metrics.fps > (isMobile.current ? 30 : 45) && !metrics.isLowEnd,
    enableParallax: metrics.fps > (isMobile.current ? 35 : 50),
    enableComplexTransitions: metrics.fps > (isMobile.current ? 25 : 40),
    reduceAnimations: metrics.isLowEnd || metrics.connectionSpeed === 'slow',
    maxConcurrentAnimations: metrics.isLowEnd ? (isMobile.current ? 1 : 2) : (isMobile.current ? 3 : 6)
  });

  return {
    metrics,
    optimizedSettings: getOptimizedSettings()
  };
};

export const useSmartAnimations = () => {
  const { optimizedSettings } = usePerformanceMonitor();
  
  const getAnimationClass = (defaultClass: string, heavyClass?: string) => {
    if (!optimizedSettings.enableHeavyAnimations && heavyClass) {
      return defaultClass;
    }
    return heavyClass || defaultClass;
  };

  const shouldAnimate = (priority: 'low' | 'medium' | 'high' = 'medium') => {
    if (optimizedSettings.reduceAnimations && priority === 'low') return false;
    if (!optimizedSettings.enableComplexTransitions && priority === 'medium') return false;
    return true;
  };

  return {
    getAnimationClass,
    shouldAnimate,
    settings: optimizedSettings
  };
};
