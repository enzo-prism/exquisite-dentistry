
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
  fallbackSrc?: string;
}

/**
 * OptimizedImage - A high-performance component for optimized image loading
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
  fallbackSrc,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Check if the image is hosted on lovable-uploads
  const isLocalImage = src.includes('/lovable-uploads/');
  
  // Validate image URL and provide fallback
  const getValidatedSrc = (imageSrc: string) => {
    if (!imageSrc) {
      console.warn('OptimizedImage: No src provided');
      return fallbackSrc || '/placeholder.svg';
    }
    
    // Ensure absolute URL for external images
    if (imageSrc.startsWith('http')) {
      return imageSrc;
    }
    
    // Ensure leading slash for local images
    if (!imageSrc.startsWith('/')) {
      return `/${imageSrc}`;
    }
    
    return imageSrc;
  };
  
  // Generate optimized paths for local images
  const getOptimizedPath = (size?: string) => {
    if (!isLocalImage) return getValidatedSrc(currentSrc);
    
    const filename = currentSrc.split('/').pop()?.split('.')[0];
    if (!filename) return getValidatedSrc(currentSrc);
    
    const suffix = size || 'original';
    return `/optimized/${filename}-${suffix}.webp`;
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
        rootMargin: '50px',
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
    if (priority && isLocalImage && !error) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.type = 'image/webp';
      link.href = getOptimizedPath('lg');
      link.onload = () => console.log('Preloaded:', link.href);
      link.onerror = () => console.warn('Failed to preload:', link.href);
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [priority, currentSrc, isLocalImage, error]);
  
  // Handle image load event
  const handleImageLoad = () => {
    console.log('Image loaded successfully:', currentSrc);
    setIsLoaded(true);
    setError(false);
    onLoad?.();
  };
  
  // Handle image error with fallback logic
  const handleImageError = () => {
    console.warn('Image failed to load:', currentSrc);
    
    // Try fallback src if provided and not already tried
    if (fallbackSrc && currentSrc !== fallbackSrc && currentSrc !== '/placeholder.svg') {
      console.log('Attempting fallback src:', fallbackSrc);
      setCurrentSrc(fallbackSrc);
      return;
    }
    
    // Try original src if we were trying optimized version
    if (isLocalImage && currentSrc.includes('/optimized/')) {
      console.log('Attempting original src:', src);
      setCurrentSrc(src);
      return;
    }
    
    // Final fallback to placeholder
    if (currentSrc !== '/placeholder.svg') {
      console.log('Using placeholder.svg as final fallback');
      setCurrentSrc('/placeholder.svg');
      return;
    }
    
    // All fallbacks failed
    setError(true);
    onError?.();
  };

  // Reset state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  // Generate responsive srcset for better performance
  const getSrcSet = () => {
    if (!isLocalImage || error || !width) return undefined;
    
    const sizes = [
      { width: 320, suffix: 'sm' },
      { width: 640, suffix: 'md' },
      { width: 1024, suffix: 'lg' },
      { width: 1920, suffix: 'xl' }
    ];
    
    return sizes
      .filter(size => width >= size.width * 0.5)
      .map(size => `${getOptimizedPath(size.suffix)} ${size.width}w`)
      .join(', ');
  };
  
  // Determine sizes attribute for responsive images
  const getSizes = () => {
    if (!width || fill || !isLocalImage) return undefined;
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  const validatedSrc = getValidatedSrc(currentSrc);

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden',
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
      {/* Placeholder while loading */}
      {!isLoaded && !error && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          <div className="text-gray-400 text-xs">Loading...</div>
        </div>
      )}
      
      {/* Actual image - only render when visible or priority */}
      {(isVisible || priority) && !error && (
        <picture>
          {/* WebP source for modern browsers */}
          {isLocalImage && !currentSrc.includes('/optimized/') && (
            <source
              type="image/webp"
              srcSet={getSrcSet()}
              sizes={getSizes()}
            />
          )}
          
          {/* Fallback to original format */}
          <img
            ref={imgRef}
            src={validatedSrc}
            alt={alt}
            width={fill ? undefined : width}
            height={fill ? undefined : height}
            loading={priority ? 'eager' : 'lazy'}
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
            {...props}
          />
        </picture>
      )}
      
      {/* Error fallback */}
      {error && (
        <div 
          className={cn(
            "flex items-center justify-center bg-gray-100 text-gray-400 text-sm border border-dashed border-gray-300",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          <div className="text-center p-4">
            <div className="text-gray-400 mb-1">⚠</div>
            <div>{alt || 'Image unavailable'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
