import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackLegacyRedirect } from '@/utils/redirectTracker';

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
  { from: '/invisalign-los-angeles.html', to: '/services#invisalign', exact: true },
  { from: '/invisalign.html', to: '/services#invisalign', exact: true },
  { from: '/z-test_value.html', to: '/', exact: true },
  
  // Google-indexed URLs that need redirects
  { from: '/about-us/about-dr-alexie-aguil/', to: '/about', exact: true },
  { from: '/5-healthy-habits-for-your-teeth/', to: '/blog', exact: true },
  { from: '/about-us/', to: '/about', exact: true },
  
  // Pattern-based redirects (order matters - specific to general)
  { from: 'old-veneers', to: '/veneers' }, // Changed to avoid conflict with valid routes
  { from: 'whitening', to: '/zoom-whitening' },
  { from: 'cosmetic-dentist', to: '/services' },
  { from: 'dentist-', to: '/about' },
  { from: 'dentist.html', to: '/services' },
  { from: 'beach', to: '/' },
  { from: 'hills', to: '/' },
  { from: 'hollywood', to: '/' },
];

const LegacyRedirectHandler = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname + location.search + location.hash;
    
    // Exclude valid React Router paths from redirects to prevent loops
    const validRoutes = [
      '/blog/', '/services', '/about', '/contact', '/veneers', '/testimonials', 
      '/graduation', '/wedding', '/faqs', '/smile-gallery', '/client-experience',
      '/zoom-whitening', '/privacy-policy', '/terms-of-service', '/hipaa-compliance',
      '/sitemap'
    ];
    const isValidRoute = validRoutes.some(route => currentPath.startsWith(route));
    
    if (isValidRoute) {
      console.log(`Skipping redirect for valid route: ${currentPath}`);
      return;
    }
    
    // Check for exact matches first
    const exactMatch = LEGACY_REDIRECTS.find(
      rule => rule.exact && rule.from === location.pathname
    );
    
    if (exactMatch) {
      console.log(`Legacy redirect: ${currentPath} → ${exactMatch.to}`);
      trackLegacyRedirect(currentPath);
      window.location.replace(exactMatch.to);
      return;
    }
    
    // Check for pattern matches (more restrictive now)
    const patternMatch = LEGACY_REDIRECTS.find(
      rule => !rule.exact && currentPath.toLowerCase().includes(rule.from.toLowerCase())
    );
    
    if (patternMatch) {
      console.log(`Legacy redirect: ${currentPath} → ${patternMatch.to}`);
      trackLegacyRedirect(currentPath);
      window.location.replace(patternMatch.to);
      return;
    }
    
    // Handle .html extensions on any path (WordPress legacy)
    if (location.pathname.endsWith('.html')) {
      const cleanPath = location.pathname.replace('.html', '');
      console.log(`HTML extension redirect: ${currentPath} → ${cleanPath || '/'}`);
      trackLegacyRedirect(currentPath);
      window.location.replace(cleanPath || '/');
      return;
    }

  }, [location]);

  return null; // This component doesn't render anything
};

export default LegacyRedirectHandler;