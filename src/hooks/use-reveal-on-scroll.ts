import { useEffect, useRef, useState } from 'react';

interface RevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delayClass?: string;
  animation?: 'up' | 'fade' | 'skew' | 'scale';
}

const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const useRevealOnScroll = ({
  threshold = 0.15,
  rootMargin = '0px',
  once = true,
  delayClass,
  animation = 'up'
}: RevealOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion());

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && observer) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  const animationClass = isVisible
    ? `reveal-visible reveal-${animation} ${delayClass || ''}`
    : 'reveal-hidden';

  return { ref, isVisible, animationClass };
};

export default useRevealOnScroll;
