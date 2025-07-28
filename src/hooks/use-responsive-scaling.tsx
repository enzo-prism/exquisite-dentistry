import { useState, useEffect } from 'react';

interface ScalingValues {
  width: string;
  height: string;
}

export function useResponsiveScaling(): ScalingValues {
  const [scaling, setScaling] = useState<ScalingValues>({ width: '150%', height: '150%' });

  useEffect(() => {
    const updateScaling = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        // Mobile: Maximum scaling for narrow aspect ratios
        setScaling({ width: '300%', height: '300%' });
      } else if (width < 1024) {
        // Tablet: Moderate scaling for medium aspect ratios
        setScaling({ width: '200%', height: '200%' });
      } else {
        // Desktop: Minimal scaling for wider aspect ratios
        setScaling({ width: '150%', height: '150%' });
      }
    };

    updateScaling();
    window.addEventListener('resize', updateScaling);

    return () => window.removeEventListener('resize', updateScaling);
  }, []);

  return scaling;
}