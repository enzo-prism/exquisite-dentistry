import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  gpuMemory?: number;
  frameRate?: number;
  paintTime?: number;
}

export const useHardwareAcceleration = <T extends HTMLElement = HTMLDivElement>(enabled: boolean = true) => {
  const elementRef = useRef<T>(null);
  const metricsRef = useRef<PerformanceMetrics>({});

  useEffect(() => {
    if (!enabled || !elementRef.current) return;

    const element = elementRef.current;
    
    // Apply GPU acceleration
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';

    // Dynamic will-change management
    const applyWillChange = () => {
      element.style.willChange = 'transform, opacity';
    };

    const removeWillChange = () => {
      element.style.willChange = 'auto';
    };

    // Apply will-change on interaction start
    const handleInteractionStart = () => {
      applyWillChange();
    };

    // Remove will-change after interaction
    const handleInteractionEnd = () => {
      setTimeout(removeWillChange, 300);
    };

    // Add event listeners
    element.addEventListener('mouseenter', handleInteractionStart);
    element.addEventListener('mouseleave', handleInteractionEnd);
    element.addEventListener('touchstart', handleInteractionStart);
    element.addEventListener('transitionend', handleInteractionEnd);
    element.addEventListener('animationend', handleInteractionEnd);

    // Performance monitoring
    const monitorPerformance = () => {
      if ('memory' in performance) {
        // @ts-ignore - Chrome specific API
        metricsRef.current.gpuMemory = performance.memory?.usedJSHeapSize;
      }

      // Monitor frame rate using requestAnimationFrame
      let frames = 0;
      let lastTime = performance.now();
      
      const countFrames = () => {
        frames++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
          metricsRef.current.frameRate = frames;
          frames = 0;
          lastTime = currentTime;
        }
        
        requestAnimationFrame(countFrames);
      };
      
      if (enabled) {
        requestAnimationFrame(countFrames);
      }
    };

    monitorPerformance();

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
      element.style.perspective = '';
    };
  }, [enabled]);

  return {
    ref: elementRef,
    metrics: metricsRef.current
  };
};

export const useAdaptiveLoading = () => {
  const getDeviceCapabilities = () => {
    // Check device memory (Chrome only)
    // @ts-ignore
    const deviceMemory = navigator.deviceMemory || 4;
    
    // Check connection type
    // @ts-ignore
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const effectiveType = connection?.effectiveType || '4g';
    
    // Check hardware concurrency
    const cores = navigator.hardwareConcurrency || 2;
    
    return {
      memory: deviceMemory,
      connection: effectiveType,
      cores,
      isHighEnd: deviceMemory >= 8 && cores >= 4,
      isMidRange: deviceMemory >= 4 && cores >= 2,
      isLowEnd: deviceMemory < 4 || cores < 2
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
        enableGPUAcceleration: true,
        enableComplexAnimations: true,
        enableHeavyEffects: false,
        imageQuality: 'medium',
        maxAnimationsPerView: 6
      };
    } else {
      return {
        enableGPUAcceleration: false,
        enableComplexAnimations: false,
        enableHeavyEffects: false,
        imageQuality: 'low',
        maxAnimationsPerView: 3
      };
    }
  };

  return {
    capabilities,
    settings: getOptimalSettings()
  };
};