import { useEffect, useRef } from 'react';

/**
 * Enhanced useEffect that ensures proper cleanup and prevents memory leaks
 */
export function useCleanupEffect(
  effect: () => (() => void) | void,
  deps?: React.DependencyList
) {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Clean up any previous effect
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    // Run the effect and store cleanup function
    const cleanup = effect();
    if (typeof cleanup === 'function') {
      cleanupRef.current = cleanup;
    }

    // Cleanup function for this effect
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, deps);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, []);
}

/**
 * Safe event listener hook with automatic cleanup
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element: Window | HTMLElement = window,
  options?: AddEventListenerOptions
) {
  useCleanupEffect(() => {
    if (!element || !element.addEventListener) return;

    const eventListener = (event: Event) => {
      handler(event as WindowEventMap[K]);
    };

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, handler, element, options]);
}