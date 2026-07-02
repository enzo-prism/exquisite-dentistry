import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const LazyFloatingActionButton = lazy(() => import('@/components/mobile/FloatingActionButton'));

// Site-wide quick-actions FAB (Call / Text / Directions / Book). Renders on
// every page, but the chunk only loads once a mobile visitor scrolls past the
// header — desktop and first-paint mobile pay zero JS for it.
const GlobalMobileFab: React.FC = () => {
  const isMobile = useIsMobile();
  const [shouldLoadFab, setShouldLoadFab] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      if (window.scrollY > 100) setShouldLoadFab(true);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (!isMobile || !shouldLoadFab) return null;

  return (
    <Suspense fallback={null}>
      <LazyFloatingActionButton />
    </Suspense>
  );
};

export default GlobalMobileFab;
