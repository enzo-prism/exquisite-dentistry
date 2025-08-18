import { useMemo } from 'react';

export interface UseCanonicalOptions {
  path?: string;
  removeTrailingSlash?: boolean;
  params?: Record<string, string | undefined>;
}

const BASE_URL = 'https://exquisitedentistryla.com';

export const useCanonical = (options: UseCanonicalOptions = {}) => {
  const { path = '', removeTrailingSlash = false, params } = options;

  const canonicalUrl = useMemo(() => {
    // Start with base URL
    let url = BASE_URL;
    
    // Add path if provided
    if (path) {
      // Ensure path starts with /
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      url += cleanPath;
    }
    
    // Enforce trailing slash policy (with trailing slash for non-root pages)
    if (url === BASE_URL) {
      // Root URL should not have trailing slash
      url = BASE_URL;
    } else if (!url.endsWith('/')) {
      // All non-root pages should have trailing slash
      url += '/';
    }
    
    // Remove any query parameters for canonical URL
    // Canonical URLs should not include query parameters unless necessary
    const urlWithoutParams = url.split('?')[0];
    
    return urlWithoutParams;
  }, [path, removeTrailingSlash, params]);

  return canonicalUrl;
};

// Pre-defined canonical URLs for common pages
export const CANONICAL_URLS = {
  HOME: `${BASE_URL}/`,
  ABOUT: `${BASE_URL}/about/`,
  SERVICES: `${BASE_URL}/services/`,
  CONTACT: `${BASE_URL}/contact/`,
  BLOG: `${BASE_URL}/blog/`,
  TESTIMONIALS: `${BASE_URL}/testimonials/`,
  SMILE_GALLERY: `${BASE_URL}/smile-gallery/`,
  FAQS: `${BASE_URL}/faqs/`,
  WEDDING: `${BASE_URL}/wedding/`,
  GRADUATION: `${BASE_URL}/graduation/`,
  VENEERS: `${BASE_URL}/veneers/`,
  ZOOM_WHITENING: `${BASE_URL}/zoom-whitening/`,
  CLIENT_EXPERIENCE: `${BASE_URL}/client-experience/`,
  PRIVACY_POLICY: `${BASE_URL}/privacy-policy/`,
  TERMS_OF_SERVICE: `${BASE_URL}/terms-of-service/`,
  HIPAA_COMPLIANCE: `${BASE_URL}/hipaa-compliance/`,
  NOT_FOUND: `${BASE_URL}/404/`,
} as const; 