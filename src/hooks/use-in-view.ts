import { useEffect, useRef, useState } from 'react';

type Options = { rootMargin?: string; threshold?: number; once?: boolean };

/**
 * One IntersectionObserver per (rootMargin, threshold) pair, shared by every
 * element on the page, so dozens of reveals cost one observer, not dozens.
 */
const observers = new Map<string, { io: IntersectionObserver; callbacks: Map<Element, (entry: IntersectionObserverEntry) => void> }>();

const observe = (element: Element, options: Required<Omit<Options, 'once'>>, callback: (entry: IntersectionObserverEntry) => void) => {
  const key = `${options.rootMargin}|${options.threshold}`;
  let record = observers.get(key);
  if (!record) {
    const callbacks = new Map<Element, (entry: IntersectionObserverEntry) => void>();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => callbacks.get(entry.target)?.(entry)),
      options,
    );
    record = { io, callbacks };
    observers.set(key, record);
  }
  record.callbacks.set(element, callback);
  record.io.observe(element);
  return () => {
    record!.callbacks.delete(element);
    record!.io.unobserve(element);
  };
};

export const useInView = <T extends Element = HTMLDivElement>({
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.12,
  once = true,
}: Options = {}) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof window.IntersectionObserver !== 'function') {
      setInView(true);
      return;
    }
    const stop = observe(element, { rootMargin, threshold }, (entry) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) stop();
      } else if (!once) {
        setInView(false);
      }
    });
    return stop;
  }, [rootMargin, threshold, once]);

  return { ref, inView };
};

export default useInView;
