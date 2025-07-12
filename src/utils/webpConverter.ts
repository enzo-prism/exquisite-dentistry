/**
 * WebP Converter Utility
 * Handles automatic PNG/JPEG to WebP conversion and format detection
 */

export interface WebPConversionOptions {
  quality?: number;
  fallbackFormat?: 'png' | 'jpeg' | 'jpg';
  sizes?: number[];
}

/**
 * Convert PNG/JPEG path to WebP equivalent
 */
export function convertToWebP(imagePath: string): string {
  if (!imagePath) return imagePath;
  
  // Replace .png, .jpg, .jpeg with .webp
  return imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
}

/**
 * Get WebP path with fallback chain
 */
export function getWebPWithFallback(imagePath: string): {
  webp: string;
  fallback: string;
} {
  const webpPath = convertToWebP(imagePath);
  
  return {
    webp: webpPath,
    fallback: imagePath
  };
}

/**
 * Check if browser supports WebP format
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Generate responsive WebP sources
 */
export function generateWebPSources(basePath: string, sizes: number[] = [320, 640, 1024, 1920]): {
  webp: string;
  png: string;
} {
  const baseFileName = basePath.split('/').pop()?.replace(/\.(png|jpg|jpeg)$/i, '') || '';
  const basePath_clean = basePath.replace(/\/[^/]+$/, '');
  
  const webpSrcSet = sizes
    .map(size => `${basePath_clean}/${baseFileName}-${size}w.webp ${size}w`)
    .join(', ');
    
  const pngSrcSet = sizes
    .map(size => `${basePath_clean}/${baseFileName}-${size}w.png ${size}w`)
    .join(', ');
  
  return {
    webp: webpSrcSet,
    png: pngSrcSet
  };
}

/**
 * Batch convert array of image paths to WebP
 */
export function batchConvertToWebP(imagePaths: string[]): string[] {
  return imagePaths.map(convertToWebP);
}

/**
 * Update image path in structured data for SEO
 */
export function updateStructuredDataImage(imageUrl: string): string {
  if (imageUrl.startsWith('https://exquisitedentistryla.com/')) {
    const path = imageUrl.replace('https://exquisitedentistryla.com', '');
    return `https://exquisitedentistryla.com${convertToWebP(path)}`;
  }
  return convertToWebP(imageUrl);
}

/**
 * Generate WebP image metadata for optimization
 */
export function generateWebPMetadata(imagePath: string): {
  original: string;
  webp: string;
  alt: string;
  loading: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
} {
  const isHeroBanner = imagePath.includes('96c9493a-c97f-4076-b224-591c2e9c50e6');
  const isLogo = imagePath.includes('fd45d438') || imagePath.includes('9e823f53');
  
  return {
    original: imagePath,
    webp: convertToWebP(imagePath),
    alt: generateAltText(imagePath),
    loading: (isHeroBanner || isLogo) ? 'eager' : 'lazy',
    fetchPriority: isHeroBanner ? 'high' : 'auto'
  };
}

/**
 * Generate appropriate alt text based on image path
 */
function generateAltText(imagePath: string): string {
  const fileName = imagePath.split('/').pop() || '';
  
  // Map known images to appropriate alt text
  const altTextMap: Record<string, string> = {
    '96c9493a-c97f-4076-b224-591c2e9c50e6': 'Exquisite Dentistry LA - Modern dental practice hero image',
    'fd45d438-10a2-4bde-9162-a38816b28958': 'Exquisite Dentistry LA logo',
    '9e823f53-f866-40f9-a3e2-78373640ee8f': 'Exquisite Dentistry LA navigation logo',
    'e2d3dd68-6f1f-4361-8749-59f510dfbc6c': 'Dr. Alexie Aguil professional portrait',
    '63fc4977-eb81-43be-af9a-48baa86296c2': 'Dr. Aguil digital consultation technology',
    'e5f3343d-b25b-4340-a728-57b8756ac156': 'Dr. Aguil explaining dental X-rays',
    'cc21ce69-7e31-4fa0-851a-4ea17ff473a1': 'Dr. Aguil patient consultation',
    'bc828af8-ab4e-4c39-abbf-6934123e34dd': 'Dr. Aguil studio portrait'
  };
  
  const baseFileName = fileName.replace(/\.(png|jpg|jpeg|webp)$/i, '');
  return altTextMap[baseFileName] || 'Dental treatment image';
}