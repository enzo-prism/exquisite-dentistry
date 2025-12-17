import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface RedirectRule {
  from: string;
  to: string;
  exact?: boolean;
}

// Legacy redirect mappings from WordPress URLs
const LEGACY_REDIRECTS: RedirectRule[] = [
  // Specific redirects for GSC 404 errors (highest priority)
  { from: '/hollywood-cosmetic-dentist.html', to: '/services', exact: true },
  { from: '/dentist-west-hollywood.html', to: '/about', exact: true },
  { from: '/invisalign-los-angeles.html', to: '/invisalign', exact: true },
  { from: '/invisalign.html', to: '/invisalign', exact: true },
  { from: '/teeth-whitening.html', to: '/teeth-whitening', exact: true },
  { from: '/dental-implants.html', to: '/dental-implants', exact: true },
  { from: '/cosmetic-dentistry.html', to: '/cosmetic-dentistry', exact: true },
  { from: '/emergency-dentist.html', to: '/emergency-dentist', exact: true },
  { from: '/veneers-los-angeles.html', to: '/veneers', exact: true },
  { from: '/z-test_value.html', to: '/', exact: true },
  
  // Google-indexed URLs that need redirects
  { from: '/about-us/about-dr-alexie-aguil/', to: '/about', exact: true },
  { from: '/5-healthy-habits-for-your-teeth/', to: '/blog', exact: true },
  { from: '/about-us/', to: '/about', exact: true },
  { from: '/blog/front-teeth-veneers-complete-guide/', to: '/veneers/front-teeth-veneers-los-angeles', exact: true },
  { from: '/blog/front-teeth-veneers-complete-guide', to: '/veneers/front-teeth-veneers-los-angeles', exact: true },
  { from: '/blog/2-front-teeth-veneers-cost-los-angeles', to: '/veneers/front-teeth-veneers-los-angeles', exact: true },
  { from: '/blog/4-front-teeth-veneers-cost-los-angeles', to: '/veneers/front-teeth-veneers-los-angeles', exact: true },
  { from: '/choosing-veneers-for-the-front-4-teeth/', to: '/veneers/front-teeth-veneers-los-angeles', exact: true },
  { from: '/choosing-veneers-for-the-front-4-teeth', to: '/veneers/front-teeth-veneers-los-angeles', exact: true },
];

const LegacyRedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search + location.hash;
    const { pathname } = location;

    const redirectTo = (to: string) => {
      import('@/utils/redirectTracker')
        .then(({ trackLegacyRedirect }) => {
          trackLegacyRedirect(currentPath);
        })
        .catch(() => undefined)
        .finally(() => {
          window.location.replace(to);
        });
    };

    // Check for exact matches first
    const exactMatch = LEGACY_REDIRECTS.find(
      rule => rule.exact && rule.from === pathname
    );
    
    if (exactMatch) {
      redirectTo(exactMatch.to);
      return;
    }
    
    // Handle .html extensions on any path (WordPress legacy)
    if (pathname.endsWith('.html')) {
      const cleanPath = pathname.replace(/\.html$/, '');
      redirectTo(cleanPath || '/');
      return;
    }

  }, [location]);

  return null; // This component doesn't render anything
};

export default LegacyRedirectHandler;
