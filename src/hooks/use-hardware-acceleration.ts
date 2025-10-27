
import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  gpuMemory?: number;
  frameRate?: number;
  paintTime?: number;
}

type PerformanceWithMemory = Performance & {
  memory?: {
    usedJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
};

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

type ExtendedNavigator = Navigator & {
  deviceMemory?: number;
  connection?: NetworkInformationLike;
  mozConnection?: NetworkInformationLike;
  webkitConnection?: NetworkInformationLike;
  hardwareConcurrency?: number;
};

export const useHardwareAcceleration = <T extends HTMLElement = HTMLDivElement>(enabled: boolean = true) => {
  const elementRef = useRef<T>(null);
  const metricsRef = useRef<PerformanceMetrics>({});
  const isMobile = useRef(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof performance === 'undefined') {
      return;
    }

    if (!enabled || !elementRef.current) return;

    const element = elementRef.current;
    
    // More conservative GPU acceleration on mobile
    if (isMobile.current) {
      // Minimal GPU acceleration for mobile
      element.style.transform = 'translateZ(0)';
      element.style.backfaceVisibility = 'hidden';
      // Skip perspective on mobile to reduce GPU load
    } else {
      // Full GPU acceleration for desktop
      element.style.transform = 'translateZ(0)';
      element.style.backfaceVisibility = 'hidden';
      element.style.perspective = '1000px';
    }

    // Conservative will-change management
    const applyWillChange = () => {
      // Only apply will-change when absolutely necessary
      if (!isMobile.current || element.classList.contains('is-animating')) {
        element.style.willChange = 'transform, opacity';
      }
    };

    const removeWillChange = () => {
      element.style.willChange = 'auto';
    };

    // Apply will-change on interaction start (less aggressive on mobile)
    const handleInteractionStart = () => {
      element.classList.add('is-animating');
      applyWillChange();
    };

    // Remove will-change after interaction (faster removal on mobile)
    const handleInteractionEnd = () => {
      element.classList.remove('is-animating');
      const delay = isMobile.current ? 100 : 300;
      setTimeout(removeWillChange, delay);
    };

    // Add event listeners (passive on mobile for better scroll performance)
    const options = isMobile.current ? { passive: true } : {};
    element.addEventListener('mouseenter', handleInteractionStart, options);
    element.addEventListener('mouseleave', handleInteractionEnd, options);
    element.addEventListener('touchstart', handleInteractionStart, options);
    element.addEventListener('transitionend', handleInteractionEnd, options);
    element.addEventListener('animationend', handleInteractionEnd, options);

    // Performance monitoring (reduced frequency on mobile)
    const monitorPerformance = () => {
      if (typeof performance !== 'undefined' && !isMobile.current) {
        const performanceWithMemory = performance as PerformanceWithMemory;
        const memoryInfo = performanceWithMemory.memory;
        if (memoryInfo) {
          metricsRef.current.gpuMemory = memoryInfo.usedJSHeapSize;
        }
      }

      // Monitor frame rate using requestAnimationFrame (less frequent on mobile)
      let frames = 0;
      let lastTime = performance.now();
      let rafId: number;
      
      const countFrames = () => {
        frames++;
        const currentTime = performance.now();
        
        const interval = isMobile.current ? 2000 : 1000;
        
        if (currentTime - lastTime >= interval) {
          metricsRef.current.frameRate = frames;
          frames = 0;
          lastTime = currentTime;
        }
        
        if (enabled) {
          rafId = window.requestAnimationFrame(countFrames);
        }
      };
      
      if (enabled) {
        rafId = window.requestAnimationFrame(countFrames);
      }
      
      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    };

    const cleanupPerformance = monitorPerformance();

    return () => {
      element.removeEventListener('mouseenter', handleInteractionStart);
      element.removeEventListener('mouseleave', handleInteractionEnd);
      element.removeEventListener('touchstart', handleInteractionStart);
      element.removeEventListener('transitionend', handleInteractionEnd);
      element.removeEventListener('animationend', handleInteractionEnd);
      
      // Reset styles
      element.style.transform = '';
      element.style.willChange = '';
      element.style.backfaceVisibility = '';
      if (!isMobile.current) {
        element.style.perspective = '';
      }
      
      element.classList.remove('is-animating');
      
      if (cleanupPerformance) {
        cleanupPerformance();
      }
    };
  }, [enabled]);

  return {
    ref: elementRef,
    metrics: metricsRef.current
  };
};

export const useAdaptiveLoading = () => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const nav = (typeof navigator !== 'undefined' ? navigator : undefined) as ExtendedNavigator | undefined;
  
  const getDeviceCapabilities = () => {
    // Check device memory (Chrome only)
    const deviceMemory = nav?.deviceMemory ?? (isMobile ? 2 : 4);
    
    // Check connection type
    const connection = nav?.connection || nav?.mozConnection || nav?.webkitConnection;
    const effectiveType = connection?.effectiveType || '4g';
    
    // Check hardware concurrency
    const cores = nav?.hardwareConcurrency || (isMobile ? 2 : 4);
    
    return {
      memory: deviceMemory,
      connection: effectiveType,
      cores,
      isMobile,
      isHighEnd: deviceMemory >= 8 && cores >= 4 && !isMobile,
      isMidRange: deviceMemory >= 4 && cores >= 2,
      isLowEnd: deviceMemory < 4 || cores < 2 || (isMobile && deviceMemory < 3)
    };
  };

  const capabilities = getDeviceCapabilities();

  const getOptimalSettings = () => {
    if (capabilities.isHighEnd) {
      return {
        enableGPUAcceleration: true,
        enableComplexAnimations: true,
        enableHeavyEffects: true,
        imageQuality: 'high',
        maxAnimationsPerView: 10
      };
    } else if (capabilities.isMidRange) {
      return {
        enableGPUAcceleration: !isMobile,
        enableComplexAnimations: !isMobile,
        enableHeavyEffects: false,
        imageQuality: isMobile ? 'low' : 'medium',
        maxAnimationsPerView: isMobile ? 3 : 6
      };
    } else {
      return {
        enableGPUAcceleration: false,
        enableComplexAnimations: false,
        enableHeavyEffects: false,
        imageQuality: 'low',
        maxAnimationsPerView: isMobile ? 2 : 3
      };
    }
  };

  return {
    capabilities,
    settings: getOptimalSettings()
  };
};
