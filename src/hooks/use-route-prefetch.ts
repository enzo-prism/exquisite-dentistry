import { useEffect } from 'react';

type RouteLoader = () => Promise<unknown>;

const criticalRoutes: RouteLoader[] = [
  () => import('@/pages/About'),
  () => import('@/pages/Services'),
  () => import('@/pages/Tour'),
  () => import('@/pages/ZoomWhitening'),
  () => import('@/pages/SmileGallery'),
  () => import('@/pages/Contact'),
  () => import('@/pages/Veneers'),
  () => import('@/pages/DentalImplants')
];

const fallbackRoutes: RouteLoader[] = [
  () => import('@/pages/Testimonials'),
  () => import('@/pages/ClientExperience'),
  () => import('@/pages/CosmeticDentistry')
];

const safelyImport = (loader: RouteLoader) => {
  loader().catch(() => null);
};

export const useRoutePrefetch = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const prefetch = () => {
      criticalRoutes.forEach(safelyImport);
      window.setTimeout(() => fallbackRoutes.forEach(safelyImport), 1200);
    };

    const idleCallback = (window as typeof window & { requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number }).requestIdleCallback?.(
      prefetch,
      { timeout: 2000 }
    );

    if (idleCallback) {
      return () => {
        (window as typeof window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleCallback);
      };
    }

    const timeoutId = window.setTimeout(prefetch, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);
};

export default useRoutePrefetch;
