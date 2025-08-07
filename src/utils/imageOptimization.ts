export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

// Generate responsive image URLs for different screen sizes
export const generateResponsiveImageUrls = (src: string) => {
  // If it's already an optimized image, return as-is
  if (src.includes('/optimized/')) {
    return {
      mobile: src,
      tablet: src,
      desktop: src,
      webp: src
    };
  }

  // Extract filename without extension
  const lastDot = src.lastIndexOf('.');
  const basePath = src.substring(0, lastDot);
  const extension = src.substring(lastDot);
  
  return {
    mobile: `${basePath}-mobile.webp`,
    tablet: `${basePath}-tablet.webp`, 
    desktop: `${basePath}-desktop.webp`,
    webp: `${basePath}.webp`,
    fallback: src
  };
};

// Generate SEO-optimized alt text for dental images
export const generateOptimizedAltText = (
  originalAlt: string,
  context: 'before-after' | 'procedure' | 'team' | 'office' | 'logo' | 'general' = 'general'
): string => {
  if (!originalAlt) return 'Image from Exquisite Dentistry Los Angeles';
  
  const contextualSuffix = {
    'before-after': ' - cosmetic dentistry transformation at Exquisite Dentistry Los Angeles',
    'procedure': ' - dental procedure performed by Dr. Alexie Aguil in Los Angeles',
    'team': ' - professional dental team at Exquisite Dentistry West Hollywood',
    'office': ' - modern dental office interior at Exquisite Dentistry Los Angeles',
    'logo': ' - Exquisite Dentistry Los Angeles cosmetic dental practice',
    'general': ' - Exquisite Dentistry Los Angeles'
  };

  // If alt text already includes practice name, don't duplicate
  if (originalAlt.toLowerCase().includes('exquisite dentistry')) {
    return originalAlt;
  }

  return originalAlt + contextualSuffix[context];
};

// Check if image should be lazy loaded
export const shouldLazyLoad = (priority?: boolean, loading?: 'lazy' | 'eager'): 'lazy' | 'eager' => {
  if (loading) return loading;
  if (priority) return 'eager';
  return 'lazy';
};

// Generate structured data for images
export const generateImageStructuredData = (
  src: string,
  alt: string,
  caption?: string,
  width?: number,
  height?: number
) => {
  return {
    '@type': 'ImageObject',
    url: src.startsWith('http') ? src : `https://exquisitedentistryla.com${src}`,
    description: alt,
    ...(caption && { caption }),
    ...(width && { width }),
    ...(height && { height }),
    creator: {
      '@type': 'Organization',
      name: 'Exquisite Dentistry'
    },
    copyrightHolder: {
      '@type': 'Organization', 
      name: 'Exquisite Dentistry'
    },
    keywords: [
      'cosmetic dentistry',
      'Los Angeles dentist',
      'smile makeover',
      'dental transformation'
    ].join(', ')
  };
};