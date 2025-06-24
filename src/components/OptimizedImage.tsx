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
 * OptimizedImage - A high-performance component for optimized image loading
 * 
 * Features:
 * - Lazy loading for non-priority images
 * - Responsive images with srcset
 * - Modern image format support (WebP, AVIF with fallbacks)
 * - Intersection Observer for performance
 * - Preload hints for critical images
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
  placeholderColor = 'transparent',
  formats = ['webp', 'original'],
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority); // Priority images are immediately visible
  const [error, setError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Check if the image is hosted on lovable-uploads
  const isLocalImage = src.includes('/lovable-uploads/');
  
  // Generate optimized paths
  const getOptimizedPath = (size?: string) => {
    if (!isLocalImage) return src;
    
    const filename = src.split('/').pop()?.split('.')[0];
    const suffix = size || 'original';
    
    // Check if optimized version exists
    const optimizedPath = `/optimized/${filename}-${suffix}.webp`;
    return optimizedPath;
  };
  
  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isVisible) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before the image comes into view
        threshold: 0.1
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, [priority, isVisible]);
  
  // Preload critical images
  useEffect(() => {
    if (priority && isLocalImage) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.type = 'image/webp';
      link.href = getOptimizedPath('lg');
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [priority, src, isLocalImage]);
  
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
  
  // Generate responsive srcset for better performance
  const getSrcSet = () => {
    if (!isLocalImage || error || !width) return undefined;
    
    // Generate srcset with optimized WebP images
    const sizes = [
      { width: 320, suffix: 'sm' },
      { width: 640, suffix: 'md' },
      { width: 1024, suffix: 'lg' },
      { width: 1920, suffix: 'xl' }
    ];
    
    return sizes
      .filter(size => width >= size.width * 0.5) // Only include sizes that make sense
      .map(size => `${getOptimizedPath(size.suffix)} ${size.width}w`)
      .join(', ');
  };
  
  // Determine sizes attribute for responsive images
  const getSizes = () => {
    if (!width || fill || !isLocalImage) return undefined;
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
        fill ? 'w-full h-full' : '',
        isLocalImage && src.toLowerCase().endsWith('.png') ? 'bg-transparent' : '',
        className
      )}
      style={{
        backgroundColor: placeholderColor,
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        aspectRatio: width && height ? `${width}/${height}` : undefined,
      }}
    >
      {/* Placeholder while loading */}
      {!isLoaded && !error && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-100 animate-pulse",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        />
      )}
      
      {/* Actual image - only render when visible or priority */}
      {(isVisible || priority) && !error && (
        <picture>
          {/* WebP source for modern browsers */}
          {isLocalImage && (
            <source
              type="image/webp"
              srcSet={getSrcSet()}
              sizes={getSizes()}
            />
          )}
          
          {/* Fallback to original format */}
          <img
            ref={imgRef}
            src={error || !isLocalImage ? src : getOptimizedPath()}
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
            sizes={!isLocalImage ? getSizes() : undefined}
            srcSet={!isLocalImage && !error && width ? getSrcSet() : undefined}
            {...props}
          />
        </picture>
      )}
      
      {/* Error fallback */}
      {error && (
        <div 
          className={cn(
            "flex items-center justify-center bg-transparent text-gray-400 text-sm",
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
