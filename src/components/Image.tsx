import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  loadingVariant?: 'elegant' | 'minimal' | 'skeleton';
  responsive?: boolean; // For logos and responsive images
  logoType?: 'main' | 'alt'; // For logo variants
}

// Logo sources configuration
const LOGO_SOURCES = {
  main: {
    desktop: { webp: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-desktop.webp', png: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-desktop.png', width: 200, height: 37 },
    mobile: { webp: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-mobile.webp', png: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-mobile.png', width: 120, height: 22 },
    fallback: '/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png'
  },
  alt: {
    desktop: { webp: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-desktop-2x.webp', png: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-desktop-2x.png', width: 240, height: 48 },
    mobile: { webp: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-mobile.webp', png: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-mobile.png', width: 120, height: 24 },
    fallback: '/lovable-uploads/9e823f53-f866-40f9-a3e2-78373640ee8f.png'
  }
};

// WebP detection
let webpSupported: boolean | null = null;
const checkWebPSupport = (): Promise<boolean> => {
  if (webpSupported !== null) return Promise.resolve(webpSupported);
  
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      webpSupported = webP.height === 2;
      resolve(webpSupported);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

const ImageComponent: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  objectFit = 'cover',
  objectPosition = 'center center',
  loadingVariant = 'elegant',
  responsive = false,
  logoType,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [fallbackAttempt, setFallbackAttempt] = useState(0);
  const isMobile = useIsMobile();
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate sources based on image type
  const generateSources = async () => {
    if (logoType && responsive) {
      const logoConfig = LOGO_SOURCES[logoType];
      const deviceConfig = isMobile ? logoConfig.mobile : logoConfig.desktop;
      const supportsWebP = await checkWebPSupport();
      return {
        primary: supportsWebP ? deviceConfig.webp : deviceConfig.png,
        fallback: deviceConfig.png,
        dimensions: { width: deviceConfig.width, height: deviceConfig.height }
      };
    }

    // Regular image - try WebP first if supported
    const supportsWebP = await checkWebPSupport();
    if (supportsWebP && !src.includes('.webp')) {
      const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
      return {
        primary: webpSrc,
        fallback: src,
        dimensions: { width, height }
      };
    }

    return {
      primary: src,
      fallback: src.replace(/\.webp$/i, '.png'),
      dimensions: { width, height }
    };
  };

  // Initialize source
  useEffect(() => {
    generateSources().then(sources => {
      setCurrentSrc(sources.primary);
      setIsLoaded(false);
      setError(false);
      setFallbackAttempt(0);
    });
  }, [src, logoType, responsive, isMobile]);

  // Intersection observer for lazy loading
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
      { rootMargin: '50px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isVisible]);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    setError(false);
    onLoad?.(event);
  };

  const handleError = async () => {
    if (fallbackAttempt === 0) {
      // Try fallback source
      const sources = await generateSources();
      if (sources.fallback !== currentSrc) {
        setCurrentSrc(sources.fallback);
        setFallbackAttempt(1);
        return;
      }
    }

    if (fallbackAttempt === 1 && logoType) {
      // Try logo fallback
      setCurrentSrc(LOGO_SOURCES[logoType].fallback);
      setFallbackAttempt(2);
      return;
    }

    // Final fallback
    if (fallbackAttempt < 2 && currentSrc !== '/placeholder.svg') {
      setCurrentSrc('/placeholder.svg');
      setFallbackAttempt(2);
      return;
    }

    setError(true);
    if (onError) {
      onError({} as React.SyntheticEvent<HTMLImageElement>);
    }
  };

  const renderLoadingState = () => {
    if (loadingVariant === 'skeleton') {
      return <LoadingSkeleton variant="image" className="absolute inset-0" />;
    }

    if (loadingVariant === 'minimal') {
      return (
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
          <div className="w-2 h-2 bg-black/20 rounded-full animate-pulse" />
        </div>
      );
    }

    return (
      <div className="absolute inset-0 bg-gradient-to-br from-black/3 via-black/5 to-black/8 flex items-center justify-center">
        <div className="w-1 h-1 bg-black/30 rounded-full animate-pulse" />
      </div>
    );
  };

  // Get dimensions for responsive logos
  const getDimensions = () => {
    if (logoType && responsive) {
      const logoConfig = LOGO_SOURCES[logoType];
      const deviceConfig = isMobile ? logoConfig.mobile : logoConfig.desktop;
      return { width: deviceConfig.width, height: deviceConfig.height };
    }
    return { width, height };
  };

  const dimensions = getDimensions();

  // Render responsive logo with picture element
  if (logoType && responsive) {
    const logoConfig = LOGO_SOURCES[logoType];
    
    return (
      <picture className={className}>
        {/* WebP sources */}
        <source media="(max-width: 768px)" srcSet={logoConfig.mobile.webp} type="image/webp" />
        <source media="(min-width: 769px)" srcSet={logoConfig.desktop.webp} type="image/webp" />
        
        {/* PNG fallbacks */}
        <source media="(max-width: 768px)" srcSet={logoConfig.mobile.png} type="image/png" />
        <source media="(min-width: 769px)" srcSet={logoConfig.desktop.png} type="image/png" />
        
        {/* Final img */}
        <img
          src={logoConfig.fallback}
          alt={alt}
          width={dimensions.width}
          height={dimensions.height}
          loading={priority ? 'eager' : 'lazy'}
          className={cn('transition-opacity duration-300', className)}
          style={{ objectFit: 'contain', objectPosition: 'center', maxWidth: '100%', height: 'auto' }}
          {...props}
        />
      </picture>
    );
  }

  // Regular image rendering
  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', fill ? 'w-full h-full' : '', className)}
      style={{
        width: fill ? '100%' : dimensions.width,
        height: fill ? '100%' : dimensions.height,
      }}
    >
      {!isLoaded && !error && renderLoadingState()}
      
      {(isVisible || priority) && !error && (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          width={fill ? undefined : dimensions.width}
          height={fill ? undefined : dimensions.height}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            fill ? 'w-full h-full' : '',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          style={{ objectFit, objectPosition }}
          {...props}
        />
      )}
      
      {error && (
        <div className="flex items-center justify-center bg-gradient-to-br from-black/5 to-black/10 text-black/40 text-sm w-full h-full">
          <div className="text-center p-4">
            <div className="text-black/20 mb-2">⚬</div>
            <div className="text-xs font-medium">{alt}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageComponent;