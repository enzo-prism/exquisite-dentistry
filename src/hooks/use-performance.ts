
import { useEffect, useState } from 'react';

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
  addEventListener?: (type: string, listener: () => void) => void;
  removeEventListener?: (type: string, listener: () => void) => void;
};

type ExtendedNavigator = Navigator & {
  connection?: NetworkInformationLike;
  mozConnection?: NetworkInformationLike;
  webkitConnection?: NetworkInformationLike;
  deviceMemory?: number;
};

interface PerformanceMetrics {
  isSlowConnection: boolean;
  isReducedMotion: boolean;
  deviceMemory: number | undefined;
  connectionType: string;
}

const readPerformanceMetrics = (): PerformanceMetrics => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return {
      isSlowConnection: false,
      isReducedMotion: false,
      deviceMemory: undefined,
      connectionType: 'unknown'
    };
  }

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nav = navigator as ExtendedNavigator;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const connectionType = connection?.effectiveType ?? 'unknown';

  return {
    isSlowConnection: Boolean(
      connection &&
        (connection.effectiveType === 'slow-2g' ||
          connection.effectiveType === '2g' ||
          connection.saveData === true)
    ),
    isReducedMotion: mediaQuery.matches,
    deviceMemory: nav.deviceMemory,
    connectionType
  };
};

type MotionMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(() => readPerformanceMetrics());

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)') as MotionMediaQueryList;
    const nav = navigator as ExtendedNavigator;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    const updateMetrics = () => setMetrics(readPerformanceMetrics());

    updateMetrics();

    if (connection?.addEventListener) {
      connection.addEventListener('change', updateMetrics);
    }

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMetrics);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateMetrics);
    }

    return () => {
      if (connection?.removeEventListener) {
        connection.removeEventListener('change', updateMetrics);
      }

      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updateMetrics);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(updateMetrics);
      }
    };
  }, []);

  return metrics;
}
