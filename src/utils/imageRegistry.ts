import registryData from './imageRegistry.json';

export interface ImageRegistryEntry {
  formats: string[];
  paths: Record<string, string>;
  preferred: string;
  fallback: string | null;
}

export interface ImageRegistry {
  images: Record<string, ImageRegistryEntry>;
  lastUpdated: string;
}

// Type-safe access to the registry
const registry: ImageRegistry = registryData as ImageRegistry;

/**
 * Smart image selector that chooses the best available format
 * @param imagePath - The base image path (without extension or with any extension)
 * @param preferWebP - Whether to prefer WebP format (default: true)
 * @returns Object with optimal image path and fallback
 */
export function getOptimalImage(imagePath: string, preferWebP: boolean = true): {
  src: string;
  fallback: string | null;
  formats: string[];
} {
  // Normalize the path to match registry keys
  const normalizedPath = imagePath.replace(/\.[^.]+$/, ''); // Remove extension
  
  const entry = registry.images[normalizedPath];
  
  if (!entry) {
    console.warn(`⚠️ Image not found in registry: ${imagePath}`);
    return {
      src: imagePath, // Return original path as fallback
      fallback: null,
      formats: []
    };
  }
  
  // Choose optimal format
  let optimalSrc = entry.preferred;
  
  if (preferWebP && entry.paths.webp) {
    optimalSrc = entry.paths.webp;
  } else if (entry.paths.png) {
    optimalSrc = entry.paths.png;
  } else if (entry.paths.jpg || entry.paths.jpeg) {
    optimalSrc = entry.paths.jpg || entry.paths.jpeg;
  }
  
  return {
    src: optimalSrc,
    fallback: entry.fallback,
    formats: entry.formats
  };
}

/**
 * Get all available formats for an image
 * @param imagePath - The base image path
 * @returns Array of available formats
 */
export function getImageFormats(imagePath: string): string[] {
  const normalizedPath = imagePath.replace(/\.[^.]+$/, '');
  const entry = registry.images[normalizedPath];
  return entry?.formats || [];
}

/**
 * Check if an image exists in the registry
 * @param imagePath - The image path to check
 * @returns Boolean indicating if the image exists
 */
export function imageExists(imagePath: string): boolean {
  const normalizedPath = imagePath.replace(/\.[^.]+$/, '');
  return normalizedPath in registry.images;
}

/**
 * Get the registry metadata
 * @returns Registry metadata
 */
export function getRegistryInfo(): { totalImages: number; lastUpdated: string } {
  return {
    totalImages: Object.keys(registry.images).length,
    lastUpdated: registry.lastUpdated
  };
}

/**
 * Preload critical images from the registry
 * @param imageKeys - Array of image keys to preload
 */
export function preloadFromRegistry(imageKeys: string[]): void {
  imageKeys.forEach(key => {
    const entry = registry.images[key];
    if (entry) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = entry.preferred;
      
      // Add WebP type hint if it's a WebP image
      if (entry.preferred.endsWith('.webp')) {
        link.type = 'image/webp';
      }
      
      document.head.appendChild(link);
    }
  });
}

export default registry;