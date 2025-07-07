// Image alignment utilities for before/after comparisons

export interface ImagePair {
  beforeImage: string;
  afterImage: string;
  beforeObjectPosition?: string;
  afterObjectPosition?: string;
}

export interface ImageAlignmentResult {
  beforePosition: string;
  afterPosition: string;
  isValid: boolean;
}

/**
 * Calculates optimal object positioning for image pairs to ensure proper alignment
 */
export function calculateImageAlignment(imagePair: ImagePair): ImageAlignmentResult {
  // Default centered positioning for dental photos
  const defaultPosition = "center center";
  
  // Use custom positions if provided, otherwise use default
  const beforePosition = imagePair.beforeObjectPosition || defaultPosition;
  const afterPosition = imagePair.afterObjectPosition || beforePosition;
  
  // Ensure both images use identical positioning for perfect alignment
  const alignedPosition = beforePosition;
  
  return {
    beforePosition: alignedPosition,
    afterPosition: alignedPosition,
    isValid: true
  };
}

/**
 * Preloads image pairs to ensure they're ready for simultaneous display
 */
export function preloadImagePair(beforeSrc: string, afterSrc: string): Promise<{ before: HTMLImageElement; after: HTMLImageElement }> {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    const images = { before: new Image(), after: new Image() };
    
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        resolve(images);
      }
    };
    
    const handleError = (error: ErrorEvent) => {
      reject(new Error(`Failed to load image pair: ${error.message}`));
    };
    
    images.before.onload = handleLoad;
    images.before.onerror = handleError;
    images.after.onload = handleLoad;
    images.after.onerror = handleError;
    
    images.before.src = beforeSrc;
    images.after.src = afterSrc;
  });
}

/**
 * Validates that image dimensions are compatible for before/after comparison
 */
export function validateImagePairDimensions(before: HTMLImageElement, after: HTMLImageElement): boolean {
  const aspectRatioTolerance = 0.1;
  const beforeRatio = before.naturalWidth / before.naturalHeight;
  const afterRatio = after.naturalWidth / after.naturalHeight;
  
  return Math.abs(beforeRatio - afterRatio) <= aspectRatioTolerance;
}

/**
 * Debounced resize handler for recalculating positioning
 */
export function createResizeHandler(callback: () => void, delay: number = 100) {
  let timeoutId: NodeJS.Timeout;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}