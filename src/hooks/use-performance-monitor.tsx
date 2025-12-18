
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode
} from 'react';

type PerformanceMemory = {
  usedJSHeapSize: number;
  jsHeapSizeLimit: number;
};

type PerformanceWithMemory = Performance & {
  memory?: PerformanceMemory;
};

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

type ExtendedNavigator = Navigator & {
  connection?: NetworkInformationLike;
};

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
  const lastTime = useRef(typeof performance !== 'undefined' ? performance.now() : 0);
  const rafId = useRef<number>();
  const isMobile = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof performance === 'undefined') {
      return;
    }

    // Update mobile detection
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', handleResize);

    // Reduced FPS monitoring for mobile to prevent scroll interference
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      // Much less frequent updates on mobile to prevent scroll jank
      const updateInterval = isMobile.current ? 5000 : 2000;
      
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
      
      rafId.current = window.requestAnimationFrame(measureFPS);
    };

    rafId.current = window.requestAnimationFrame(measureFPS);

    let memoryInterval: number | undefined;
    const performanceWithMemory = performance as PerformanceWithMemory;

    if (performanceWithMemory.memory) {
      const updateMemory = () => {
        const memory = performanceWithMemory.memory;
        if (!memory) return;

        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit
        }));
      };

      memoryInterval = window.setInterval(updateMemory, isMobile.current ? 10000 : 5000);
    }

    if (typeof navigator !== 'undefined') {
      const nav = navigator as ExtendedNavigator;
      const connection = nav.connection;
      if (connection?.effectiveType) {
        const speed = connection.effectiveType === '4g' || connection.effectiveType === '3g' ? 'fast' : 'slow';
        setMetrics(prev => ({
          ...prev,
          connectionSpeed: speed
        }));
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (memoryInterval) {
        clearInterval(memoryInterval);
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

type PerformanceMonitorContextValue = ReturnType<typeof usePerformanceMonitor>;

const PerformanceMonitorContext = createContext<PerformanceMonitorContextValue | null>(null);

export const PerformanceProvider = ({ children }: { children: ReactNode }) => {
  const value = usePerformanceMonitor();

  return (
    <PerformanceMonitorContext.Provider value={value}>
      {children}
    </PerformanceMonitorContext.Provider>
  );
};

export const usePerformanceSettings = () => {
  const context = useContext(PerformanceMonitorContext);

  if (!context) {
    throw new Error('usePerformanceSettings must be used within PerformanceProvider');
  }

  return context;
};

export const useSmartAnimations = () => {
  const { optimizedSettings } = usePerformanceSettings();
  
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
