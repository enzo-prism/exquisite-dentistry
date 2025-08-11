import { useEffect, useRef, useState } from 'react';
import { usePerformance } from './use-performance';

interface BlogAnimationOptions {
  staggerDelay?: number;
  threshold?: number;
  rootMargin?: string;
}

export const useBlogCardAnimation = (index: number, options: BlogAnimationOptions = {}) => {
  const { staggerDelay = 100, threshold = 0.1, rootMargin = '0px 0px -10% 0px' } = options;
  const { isSlowConnection, isReducedMotion } = usePerformance();
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Reset animation state on route changes
    const resetAnimation = () => {
      setIsVisible(false);
      setHasAnimated(false);
    };

    let animationTimer: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          const delay = isSlowConnection ? staggerDelay * 0.5 : staggerDelay;
          animationTimer = setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, index * delay);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, [index, staggerDelay, threshold, rootMargin, isSlowConnection, isReducedMotion, hasAnimated]);

  return {
    ref: elementRef,
    isVisible,
    className: `transition-all duration-500 ${
      isVisible 
        ? 'opacity-100 transform translate-y-0 scale-100' 
        : 'opacity-0 transform translate-y-8 scale-95'
    }`
  };
};

export const useBlogHeaderAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isReducedMotion } = usePerformance();

  useEffect(() => {
    if (isReducedMotion) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, [isReducedMotion]);

  return {
    isVisible,
    className: `transition-all duration-700 ${
      isVisible 
        ? 'opacity-100 transform translate-y-0' 
        : 'opacity-0 transform translate-y-8'
    }`
  };
};

export const useBlogSearchAnimation = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { isReducedMotion } = usePerformance();

  const handleFocus = () => {
    if (!isReducedMotion) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return {
    isFocused,
    handleFocus,
    handleBlur,
    className: `transition-all duration-300 ${
      isFocused && !isReducedMotion
        ? 'scale-105 shadow-2xl ring-2 ring-gold/30'
        : 'shadow-lg'
    }`
  };
};