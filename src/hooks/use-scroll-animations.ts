import { useEffect, useRef, useState, useCallback } from 'react';
import { useAdaptiveLoading } from './use-hardware-acceleration';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  staggerDelay?: number;
  animationClass?: string;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -10% 0px',
    triggerOnce = true,
    staggerDelay = 0,
    animationClass = 'gpu-slide-in'
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const { settings } = useAdaptiveLoading();

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && (!hasTriggered || !triggerOnce)) {
      setTimeout(() => {
        setIsVisible(true);
        if (triggerOnce) setHasTriggered(true);
      }, staggerDelay);
    } else if (!triggerOnce && !entry.isIntersecting) {
      setIsVisible(false);
    }
  }, [hasTriggered, triggerOnce, staggerDelay]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !settings.enableGPUAcceleration) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    // Add initial animation class
    element.classList.add(animationClass);
    
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold, rootMargin, animationClass, settings.enableGPUAcceleration]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (isVisible) {
      element.classList.add('in-view');
    } else {
      element.classList.remove('in-view');
    }
  }, [isVisible]);

  return { ref: elementRef, isVisible };
};

export const useParallaxScroll = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);
  const { settings } = useAdaptiveLoading();

  useEffect(() => {
    if (!settings.enableComplexAnimations) return;

    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      if (element) {
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, [speed, settings.enableComplexAnimations]);

  return { ref: elementRef };
};

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    let ticking = false;
    const handleScrollThrottled = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
    };
  }, []);

  return scrollProgress;
};

export const useStaggeredAnimation = (
  count: number, 
  baseDelay: number = 100,
  animationClass: string = 'gpu-slide-in'
) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const { settings } = useAdaptiveLoading();

  const triggerAnimation = useCallback((index: number) => {
    if (!settings.enableComplexAnimations) {
      setVisibleItems(new Set(Array.from({ length: count }, (_, i) => i)));
      return;
    }

    setTimeout(() => {
      setVisibleItems(prev => new Set([...prev, index]));
    }, index * baseDelay);
  }, [count, baseDelay, settings.enableComplexAnimations]);

  const getItemProps = useCallback((index: number) => ({
    className: `${animationClass} ${visibleItems.has(index) ? 'in-view' : ''}`,
    style: {
      transitionDelay: `${index * baseDelay}ms`
    }
  }), [animationClass, visibleItems, baseDelay]);

  return { triggerAnimation, getItemProps, visibleItems };
};