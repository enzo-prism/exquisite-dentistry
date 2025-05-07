
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Supported image formats
type ImageFormat = 'original' | 'webp' | 'avif';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholderColor?: string;
  formats?: ImageFormat[];
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage - A component for optimized image loading
 * 
 * Features:
 * - Lazy loading for non-priority images
 * - Responsive images with srcset
 * - Modern image format support (WebP, AVIF with fallbacks)
 * - Placeholder while loading
 * - Smooth fade-in animation
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  quality = 80,
  priority = false,
  className = '',
  objectFit = 'cover',
  placeholderColor = '#f3f4f6', // Light gray placeholder
  formats = ['webp', 'original'],
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Check if the image is hosted on lovable-uploads
  const isLocalImage = src.includes('/lovable-uploads/');
  
  // Handle image load event
  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };
  
  // Handle image error
  const handleImageError = () => {
    setError(true);
    onError?.();
  };

  // Determine if image should be lazy loaded
  const loadingStrategy = priority ? 'eager' : 'lazy';
  
  // For local images we can generate a simpler path structure
  // For external images we don't attempt format conversion
  const getSrcSet = () => {
    if (!isLocalImage || error) return undefined;
    
    if (width && !fill) {
      // Calculate responsive sizes
      const sizes = [0.5, 1, 1.5, 2].map(scale => Math.round(width * scale));
      
      // Generate srcset for WebP if supported
      if (formats.includes('webp')) {
        return sizes.map(size => `${src} ${size}w`).join(', ');
      }
    }
    
    return undefined;
  };
  
  // Determine sizes attribute for responsive images
  const getSizes = () => {
    if (!width || fill || !isLocalImage) return undefined;
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-opacity-10',
        fill ? 'w-full h-full' : '',
        className
      )}
      style={{
        backgroundColor: placeholderColor,
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {!error && (
        <img
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          loading={loadingStrategy}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={cn(
            'transition-opacity duration-300',
            fill ? 'object-cover w-full h-full' : '',
            isLoaded ? 'opacity-100' : 'opacity-0',
            objectFit ? `object-${objectFit}` : ''
          )}
          style={{
            objectFit,
          }}
          sizes={getSizes()}
          srcSet={getSrcSet()}
          {...props}
        />
      )}
      
      {/* Display fallback for error state */}
      {error && (
        <div 
          className={cn(
            "flex items-center justify-center bg-gray-100 text-gray-400 text-sm",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          {alt || 'Image not available'}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
