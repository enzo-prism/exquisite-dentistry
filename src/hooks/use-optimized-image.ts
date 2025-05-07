
import { useState, useEffect } from 'react';

interface UseOptimizedImageOptions {
  src: string;
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'original';
}

interface UseOptimizedImageResult {
  isLoading: boolean;
  error: Error | null;
  imageSrc: string;
  imageWidth: number | undefined;
  imageHeight: number | undefined;
  imageLoaded: boolean;
  handleLoad: () => void;
  handleError: () => void;
}

/**
 * Hook for optimized image loading with state management
 */
export function useOptimizedImage({
  src,
  width,
  height,
  quality = 80,
  format = 'original',
}: UseOptimizedImageOptions): UseOptimizedImageResult {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Local uploads should use original path 
  const isLocalImage = src.includes('/lovable-uploads/');
  
  // For now, simply use the original image.
  // In a real implementation, this would generate optimized
  // versions of the image based on the parameters
  const imageSrc = src;
  
  // Handle successful image load
  const handleLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
  };
  
  // Handle image load error
  const handleError = () => {
    setIsLoading(false);
    setError(new Error(`Failed to load image: ${src}`));
  };

  // Preload high-priority images
  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = handleLoad;
    img.onerror = handleError;
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return {
    isLoading,
    error,
    imageSrc,
    imageWidth: width,
    imageHeight: height,
    imageLoaded,
    handleLoad,
    handleError
  };
}
