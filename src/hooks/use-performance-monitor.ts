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

  useEffect(() => {
    // FPS Monitoring
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        
        setMetrics(prev => ({
          ...prev,
          fps,
          isLowEnd: fps < 30
        }));
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      rafId.current = requestAnimationFrame(measureFPS);
    };

    rafId.current = requestAnimationFrame(measureFPS);

    // Memory monitoring (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = (performance as any).memory;
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit
        }));
      };
      
      const memoryInterval = setInterval(updateMemory, 5000);
      return () => clearInterval(memoryInterval);
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
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const getOptimizedSettings = () => ({
    enableHeavyAnimations: metrics.fps > 45 && !metrics.isLowEnd,
    enableParallax: metrics.fps > 50,
    enableComplexTransitions: metrics.fps > 40,
    reduceAnimations: metrics.isLowEnd || metrics.connectionSpeed === 'slow',
    maxConcurrentAnimations: metrics.isLowEnd ? 2 : 6
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