import { CANONICAL_URLS } from '@/hooks/use-canonical';
import { getCanonicalUrl } from '@/utils/schemaValidation';

interface BlogPostCanonicalOptions {
  slug: string;
  category?: string;
}

interface PaginatedCanonicalOptions {
  basePath: string;
  page?: number;
  category?: string;
  tag?: string;
}

export class CanonicalManager {
  private static readonly BASE_URL = 'https://exquisitedentistryla.com';
  
  /**
   * Generate canonical URL for blog posts (without trailing slash)
   */
  static getBlogPostCanonical({ slug }: BlogPostCanonicalOptions): string {
    return getCanonicalUrl(`/blog/${slug}`);
  }
  
  /**
   * Generate canonical URL for paginated content
   * Always points to page 1 (the canonical version)
   */
  static getPaginatedCanonical({ basePath }: PaginatedCanonicalOptions): string {
    const cleanPath = basePath.startsWith('/') ? basePath : `/${basePath}`;
    return getCanonicalUrl(cleanPath);
  }
  
  /**
   * Generate canonical URL for filtered/search content
   * Points to the main page without filters
   */
  static getFilteredCanonical(basePath: string): string {
    const cleanPath = basePath.startsWith('/') ? basePath : `/${basePath}`;
    return getCanonicalUrl(cleanPath);
  }
  
  /**
   * Handle cross-domain canonical scenarios
   */
  static getCrossDomainCanonical(primaryDomain: string, path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${primaryDomain}${cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`}`;
  }
  
  /**
   * Validate canonical URL format
   */
  static isValidCanonical(url: string): boolean {
    try {
      const parsedUrl = new URL(url);
      
      // Must be HTTPS
      if (parsedUrl.protocol !== 'https:') return false;
      
      // Must be our domain
      if (!parsedUrl.hostname.includes('exquisitedentistryla.com')) return false;
      
      // Should not have query parameters (with exceptions)
      if (parsedUrl.search && !this.isAllowedQueryParam(parsedUrl.searchParams)) {
        return false;
      }
      
      // Should not have fragments
      if (parsedUrl.hash) return false;
      
      // Blog URLs should not have trailing slashes
      if (parsedUrl.pathname.startsWith('/blog/') && parsedUrl.pathname.endsWith('/') && parsedUrl.pathname.length > 6) {
        return false;
      }
      
      return true;
    } catch {
      return false;
    }
  }
  
  /**
   * Check if query parameters are allowed in canonical URLs
   */
  private static isAllowedQueryParam(params: URLSearchParams): boolean {
    const allowedParams = ['utm_source', 'utm_medium', 'utm_campaign']; // Usually we remove these too
    
    for (const [key] of params) {
      if (!allowedParams.includes(key)) {
        return false;
      }
    }
    return true;
  }
  
  /**
   * Get hreflang alternates for international SEO (future use)
   */
  static getHreflangAlternates(currentPath: string): Array<{ hreflang: string; href: string }> {
    // For future international expansion
    return [
      {
        hreflang: 'en-US',
        href: getCanonicalUrl(currentPath)
      },
      {
        hreflang: 'x-default',
        href: getCanonicalUrl(currentPath)
      }
    ];
  }
  
  /**
   * Handle mobile/AMP canonical relationships
   */
  static getMobileCanonical(desktopPath: string): string {
    // For mobile-first indexing, canonical should point to the main URL
    return getCanonicalUrl(desktopPath);
  }
}

/**
 * Common canonical tag patterns for your dental practice
 */
export const DENTAL_CANONICAL_PATTERNS = {
  // Service pages
  SERVICE_DETAIL: (serviceName: string) => 
    `${CanonicalManager['BASE_URL']}/${serviceName.toLowerCase().replace(/\s+/g, '-')}/`,
    
  // Treatment pages
  TREATMENT_DETAIL: (treatmentName: string) => 
    `${CanonicalManager['BASE_URL']}/treatments/${treatmentName.toLowerCase().replace(/\s+/g, '-')}/`,
    
  // Doctor pages (if you expand)
  DOCTOR_PROFILE: (doctorName: string) => 
    `${CanonicalManager['BASE_URL']}/doctors/${doctorName.toLowerCase().replace(/\s+/g, '-')}/`,
    
  // Location pages (if you expand)
  LOCATION_DETAIL: (locationName: string) => 
    `${CanonicalManager['BASE_URL']}/locations/${locationName.toLowerCase().replace(/\s+/g, '-')}/`,
} as const;

/**
 * URL normalization utilities
 */
export const normalizeUrl = (url: string): string => {
  try {
    const parsed = new URL(url);
    
    // Remove trailing slash except for root
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }
    
    // Remove query parameters
    parsed.search = '';
    
    // Remove fragment
    parsed.hash = '';
    
    return parsed.toString();
  } catch {
    return url;
  }
};

/**
 * Check for potential duplicate content issues
 */
export const detectDuplicateContentRisks = (currentUrl: string): string[] => {
  const risks: string[] = [];
  
  try {
    const url = new URL(currentUrl);
    
    // Check for query parameters that might create duplicates
    if (url.searchParams.toString()) {
      risks.push('URL contains query parameters that may create duplicate content');
    }
    
    // Check for www vs non-www
    if (url.hostname.startsWith('www.')) {
      risks.push('Consider redirecting www to non-www version');
    }
    
    // Check for trailing slash inconsistency
    if (url.pathname.length > 1 && !url.pathname.endsWith('/')) {
      risks.push('Consider consistent trailing slash usage');
    }
    
    return risks;
  } catch {
    return ['Invalid URL format'];
  }
};
