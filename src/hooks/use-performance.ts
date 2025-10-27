
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

export function usePerformance(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isSlowConnection: false,
    isReducedMotion: false,
    deviceMemory: undefined,
    connectionType: 'unknown'
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = mediaQuery.matches;

    // Check connection speed
    const nav = navigator as ExtendedNavigator;
    const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
    const isSlowConnection = connection ?
      (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData === true) :
      false;

    // Get device memory if available
    const deviceMemory = nav.deviceMemory;

    // Get connection type
    const connectionType = connection?.effectiveType ?? 'unknown';

    setMetrics({
      isSlowConnection,
      isReducedMotion,
      deviceMemory,
      connectionType
    });

    // Listen for connection changes
    const handleConnectionChange = () => {
      if (connection) {
        setMetrics(prev => ({
          ...prev,
          isSlowConnection: connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData,
          connectionType: connection.effectiveType
        }));
      }
    };

    if (connection?.addEventListener) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      if (connection?.removeEventListener) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return metrics;
}
