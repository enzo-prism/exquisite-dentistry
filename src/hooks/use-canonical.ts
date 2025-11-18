import { useMemo } from 'react';
import { getCanonicalUrl } from '@/utils/schemaValidation';

export interface UseCanonicalOptions {
  path?: string;
  removeTrailingSlash?: boolean;
  params?: Record<string, string | undefined>;
}

const BASE_URL = 'https://exquisitedentistryla.com';

export const useCanonical = (options: UseCanonicalOptions = {}) => {
  const { path = '/', removeTrailingSlash = false } = options;

  const canonicalUrl = useMemo(() => {
    const normalizedPath = path || '/';
    let url = getCanonicalUrl(normalizedPath);

    if (removeTrailingSlash && url.endsWith('/') && url !== `${BASE_URL}/`) {
      url = url.slice(0, -1);
    }

    return url;
  }, [path, removeTrailingSlash]);

  return canonicalUrl;
};

// Pre-defined canonical URLs for common pages
export const CANONICAL_URLS = {
  HOME: getCanonicalUrl('/'),
  ABOUT: getCanonicalUrl('/about'),
  SERVICES: getCanonicalUrl('/services'),
  CONTACT: getCanonicalUrl('/contact'),
  BLOG: getCanonicalUrl('/blog'),
  TESTIMONIALS: getCanonicalUrl('/testimonials'),
  SMILE_GALLERY: getCanonicalUrl('/smile-gallery'),
  FAQS: getCanonicalUrl('/faqs'),
  WEDDING: getCanonicalUrl('/wedding'),
  GRADUATION: getCanonicalUrl('/graduation'),
  VENEERS: getCanonicalUrl('/veneers'),
  ZOOM_WHITENING: getCanonicalUrl('/zoom-whitening'),
  INVISALIGN: getCanonicalUrl('/invisalign'),
  VENEERS_LOS_ANGELES: getCanonicalUrl('/veneers-los-angeles'),
  TEETH_WHITENING: getCanonicalUrl('/teeth-whitening'),
  DENTAL_IMPLANTS: getCanonicalUrl('/dental-implants'),
  COSMETIC_DENTISTRY: getCanonicalUrl('/cosmetic-dentistry'),
  EMERGENCY_DENTIST: getCanonicalUrl('/emergency-dentist'),
  CLIENT_EXPERIENCE: getCanonicalUrl('/client-experience'),
  PRIVACY_POLICY: getCanonicalUrl('/privacy-policy'),
  TERMS_OF_SERVICE: getCanonicalUrl('/terms-of-service'),
  HIPAA_COMPLIANCE: getCanonicalUrl('/hipaa-compliance'),
  NOT_FOUND: getCanonicalUrl('/404'),
} as const; 
