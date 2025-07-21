
import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const NavigationDebugger = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // Track all navigation events
    console.group('🧭 Navigation Debug');
    console.log('Current path:', location.pathname);
    console.log('Navigation type:', navigationType);
    console.log('Location state:', location.state);
    console.log('Search params:', location.search);
    console.log('Hash:', location.hash);
    console.groupEnd();

    // Special debugging for sitemap requests
    if (location.pathname === '/sitemap.xml') {
      console.group('🗺️ SITEMAP DEBUG');
      console.log('Sitemap route detected in React Router - this should NOT happen!');
      console.log('Request should be served as static file');
      console.log('Check _redirects file configuration');
      console.groupEnd();
    }

    // Track popstate events (back/forward navigation)
    const handlePopState = (event: PopStateEvent) => {
      console.group('⬅️ PopState Event');
      console.log('State:', event.state);
      console.log('URL:', window.location.href);
      console.groupEnd();
    };

    // Track all navigation timing
    const handleBeforeUnload = () => {
      console.log('🔄 Page unloading from:', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location, navigationType]);

  return null;
};

export default NavigationDebugger;
