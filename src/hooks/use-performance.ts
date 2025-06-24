
import { useEffect, useState } from 'react';

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
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isReducedMotion = mediaQuery.matches;

    // Check connection speed
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const isSlowConnection = connection ? 
      (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g' || connection.saveData) : 
      false;

    // Get device memory if available
    const deviceMemory = (navigator as any).deviceMemory;

    // Get connection type
    const connectionType = connection ? connection.effectiveType : 'unknown';

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

    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, []);

  return metrics;
}
