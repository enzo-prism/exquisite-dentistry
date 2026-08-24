import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Reset a new route before paint so it cannot override an immediate user scroll. */
export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
};
