import { useState, useEffect } from 'react';

// Resolve the initial value synchronously so the first render already reflects
// the real viewport. Starting at `false` caused the homepage to paint the
// desktop hero and then snap to the mobile hero one frame later (a visible flash
// + layout shift on the LCP element).
const getIsMobile = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
}

export function useBreakpoint() {
  const isMobile = useIsMobile();
  return { isMobile };
}