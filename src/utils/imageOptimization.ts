import { imageExists } from './imageRegistry';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  sizes?: string;
}

const OPTIMIZED_SIZES = [
  { suffix: 'sm', width: 320 },
  { suffix: 'md', width: 640 },
  { suffix: 'lg', width: 1024 },
  { suffix: 'xl', width: 1920 }
];

const normalizeLocalPath = (src: string) => src.split('?')[0]?.split('#')[0] ?? src;

const resolveOptimizedBase = (src: string): string | null => {
  if (!src.startsWith('/')) return null;

  const normalized = normalizeLocalPath(src);
  const withoutExtension = normalized.replace(/\.[^.]+$/, '');

  if (normalized.includes('/optimized/')) {
    const match = withoutExtension.match(/^(.*)-(sm|md|lg|xl|original)$/);
    return match ? match[1] : withoutExtension;
  }

  if (normalized.includes('/lovable-uploads/')) {
    const filename = withoutExtension.split('/').pop();
    if (!filename) return null;
    return `/optimized/${filename}`;
  }

  return null;
};

const buildSrcSet = (base: string, format: 'avif' | 'webp') => {
  const entries = OPTIMIZED_SIZES
    .filter(({ suffix }) => imageExists(`${base}-${suffix}.${format}`))
    .map(({ suffix, width }) => `${base}-${suffix}.${format} ${width}w`);

  return entries.length ? entries.join(', ') : undefined;
};

export const generateResponsiveImageUrls = (src: string) => {
  const normalized = normalizeLocalPath(src);
  const optimizedBase = resolveOptimizedBase(normalized);

  if (!optimizedBase) {
    return {
      fallback: src
    };
  }

  return {
    avif: buildSrcSet(optimizedBase, 'avif'),
    webp: buildSrcSet(optimizedBase, 'webp'),
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
