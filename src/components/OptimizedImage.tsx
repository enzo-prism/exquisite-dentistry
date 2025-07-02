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
  objectPosition?: string;
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
  objectPosition = 'center center',
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
  const [fallbackAttempts, setFallbackAttempts] = useState(0);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Check if the image is hosted on lovable-uploads
  const isLocalImage = src.includes('/lovable-uploads/');
  
  // Smart object positioning for dental photos
  const getSmartObjectPosition = () => {
    if (objectPosition !== 'center center') {
      return objectPosition; // Use custom position if provided
    }
    
    // Default positioning optimized for dental photos
    // Focus slightly higher than center to capture smile area better
    return 'center 30%';
  };
  
  // Validate image URL and provide fallback
  const getValidatedSrc = (imageSrc: string) => {
    if (!imageSrc) {
      console.warn('OptimizedImage: No src provided, using fallback');
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
  
  // Handle image load event
  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', currentSrc);
    setIsLoaded(true);
    setError(false);
    onLoad?.();
  };
  
  // Handle image error with comprehensive fallback logic
  const handleImageError = () => {
    console.warn('❌ Image failed to load:', currentSrc, 'Attempt:', fallbackAttempts);
    
    // Try different fallback strategies based on attempt count
    if (fallbackAttempts === 0 && fallbackSrc && currentSrc !== fallbackSrc) {
      console.log('🔄 Trying fallbackSrc:', fallbackSrc);
      setCurrentSrc(fallbackSrc);
      setFallbackAttempts(1);
      return;
    }
    
    if (fallbackAttempts === 1 && currentSrc !== '/placeholder.svg') {
      console.log('🔄 Trying placeholder.svg');
      setCurrentSrc('/placeholder.svg');
      setFallbackAttempts(2);
      return;
    }
    
    // All fallbacks failed
    console.error('🚫 All image fallbacks failed for:', src);
    setError(true);
    onError?.();
  };

  // Reset state when src changes
  useEffect(() => {
    console.log('🔄 Image src changed:', src);
    setCurrentSrc(src);
    setIsLoaded(false);
    setError(false);
    setFallbackAttempts(0);
  }, [src]);
  
  // Test image availability
  useEffect(() => {
    if (!currentSrc || !isVisible) return;
    
    console.log('🔍 Testing image availability:', currentSrc);
    const testImg = new Image();
    testImg.onload = () => {
      console.log('✅ Image test passed:', currentSrc);
    };
    testImg.onerror = () => {
      console.warn('⚠️ Image test failed:', currentSrc);
    };
    testImg.src = currentSrc;
  }, [currentSrc, isVisible]);

  const validatedSrc = getValidatedSrc(currentSrc);
  const smartObjectPosition = getSmartObjectPosition();

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
      {/* Loading placeholder */}
      {!isLoaded && !error && (
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          <div className="text-gray-500 text-xs">Loading...</div>
        </div>
      )}
      
      {/* Actual image - only render when visible or priority */}
      {(isVisible || priority) && !error && (
        <img
          ref={imgRef}
          src={validatedSrc}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          loading={priority ? 'eager' : 'lazy'}
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
            objectPosition: smartObjectPosition,
          }}
          {...props}
        />
      )}
      
      {/* Error fallback */}
      {error && (
        <div 
          className={cn(
            "flex items-center justify-center bg-gray-100 text-gray-500 text-sm border-2 border-dashed border-gray-300",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          <div className="text-center p-4">
            <div className="text-gray-400 mb-2 text-lg">⚠</div>
            <div className="text-xs">{alt || 'Image not available'}</div>
            <div className="text-xs text-gray-400 mt-1">Failed to load</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
