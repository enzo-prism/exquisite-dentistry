
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import { convertToWebP, supportsWebP } from '@/utils/webpConverter';

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
  loadingVariant?: 'elegant' | 'minimal' | 'skeleton';
  forceWebP?: boolean;
}

type ImageFormat = 'original' | 'webp' | 'avif';

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
  loadingVariant = 'elegant',
  forceWebP = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [fallbackAttempts, setFallbackAttempts] = useState(0);
  const [webpSupported, setWebpSupported] = useState<boolean | null>(null);
  const imgRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Check WebP support
  useEffect(() => {
    supportsWebP().then(setWebpSupported);
  }, []);

  const getOptimizedSrc = (imageSrc: string): string => {
    if (!imageSrc) return '';
    
    // Always try WebP first if supported (unless already WebP)
    if (webpSupported && !imageSrc.includes('.webp')) {
      return convertToWebP(imageSrc);
    }
    
    return imageSrc;
  };
  
  const getSmartObjectPosition = () => {
    // Always use the explicitly passed objectPosition if provided
    if (objectPosition && objectPosition !== 'center center') {
      return objectPosition;
    }
    // Only use smart positioning for default center values
    return objectPosition === 'center center' ? 'center 35%' : (objectPosition || 'center center');
  };
  
  const getValidatedSrc = (imageSrc: string) => {
    if (!imageSrc) {
      console.warn('OptimizedImage: No src provided, using fallback');
      return fallbackSrc || '/placeholder.svg';
    }
    
    if (imageSrc.startsWith('http')) {
      return imageSrc;
    }
    
    if (!imageSrc.startsWith('/')) {
      return `/${imageSrc}`;
    }
    
    return imageSrc;
  };
  
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
  
  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', currentSrc);
    setIsLoaded(true);
    setError(false);
    onLoad?.();
  };
  
  const handleImageError = () => {
    console.warn('❌ Image failed to load:', currentSrc, 'Attempt:', fallbackAttempts);
    
    // First try fallback to original format if WebP failed
    if (fallbackAttempts === 0 && currentSrc.includes('.webp')) {
      const originalSrc = currentSrc.replace(/\.webp$/i, '.png').replace(/\.png\.png$/i, '.png');
      console.log('🔄 Trying original PNG format:', originalSrc);
      setCurrentSrc(originalSrc);
      setFallbackAttempts(1);
      return;
    }
    
    // Try JPG if PNG failed
    if (fallbackAttempts === 1 && currentSrc.includes('.png')) {
      const jpgSrc = currentSrc.replace(/\.png$/i, '.jpg');
      console.log('🔄 Trying JPG format:', jpgSrc);
      setCurrentSrc(jpgSrc);
      setFallbackAttempts(2);
      return;
    }
    
    // Try provided fallback source
    if (fallbackAttempts <= 2 && fallbackSrc && currentSrc !== fallbackSrc) {
      console.log('🔄 Trying fallbackSrc:', fallbackSrc);
      setCurrentSrc(fallbackSrc);
      setFallbackAttempts(fallbackAttempts + 1);
      return;
    }
    
    if (fallbackAttempts <= 3 && currentSrc !== '/placeholder.svg') {
      console.log('🔄 Trying placeholder.svg');
      setCurrentSrc('/placeholder.svg');
      setFallbackAttempts(fallbackAttempts + 1);
      return;
    }
    
    console.error('🚫 All image fallbacks failed for:', src);
    setError(true);
    onError?.();
  };

  useEffect(() => {
    console.log('🔄 Image src changed:', src);
    const optimizedSrc = getOptimizedSrc(src);
    setCurrentSrc(optimizedSrc);
    setIsLoaded(false);
    setError(false);
    setFallbackAttempts(0);
  }, [src, webpSupported]);
  
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
  const finalObjectPosition = getSmartObjectPosition();

  const renderLoadingState = () => {
    if (loadingVariant === 'skeleton') {
      return (
        <LoadingSkeleton
          variant="image"
          className={cn(
            fill ? 'w-full h-full' : '',
            "absolute inset-0"
          )}
        />
      );
    }

    if (loadingVariant === 'minimal') {
      return (
        <div 
          className={cn(
            "absolute inset-0 bg-black/5 flex items-center justify-center",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          <div className="w-2 h-2 bg-black/20 rounded-full animate-pulse" />
        </div>
      );
    }

    // Elegant loading (default)
    return (
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-black/3 via-black/5 to-black/8 flex items-center justify-center transition-opacity duration-300",
          fill ? 'w-full h-full' : ''
        )}
        style={{
          width: fill ? '100%' : width,
          height: fill ? '100%' : height,
        }}
      >
        <div className="flex flex-col items-center gap-2 opacity-60">
          <div className="w-1 h-1 bg-black/30 rounded-full animate-pulse" />
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        fill ? 'w-full h-full' : '',
        className
      )}
      style={{
        backgroundColor: placeholderColor,
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        contain: 'layout',
        containIntrinsicSize: width && height ? `${width}px ${height}px` : undefined
      }}
    >
      {!isLoaded && !error && renderLoadingState()}
      
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
            'transition-opacity duration-300 ease-out',
            fill ? 'w-full h-full' : '',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            objectFit,
            objectPosition: finalObjectPosition,
          }}
          {...props}
        />
      )}
      
      {error && (
        <div 
          className={cn(
            "flex items-center justify-center bg-gradient-to-br from-black/5 to-black/10 text-black/40 text-sm border border-black/10 rounded-sm",
            fill ? 'w-full h-full' : ''
          )}
          style={{
            width: fill ? '100%' : width,
            height: fill ? '100%' : height,
          }}
        >
          <div className="text-center p-4">
            <div className="text-black/20 mb-2 text-lg">⚬</div>
            <div className="text-xs font-medium">{alt || 'Image unavailable'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
