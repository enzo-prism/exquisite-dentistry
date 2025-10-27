import React, { useState, useEffect, useRef } from 'react';

interface ResponsiveSpecialMomentImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

const ResponsiveSpecialMomentImage: React.FC<ResponsiveSpecialMomentImageProps> = ({ 
  src, 
  alt, 
  className = "",
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isSlowConnection: false
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const { isMobile, isSlowConnection } = deviceInfo;

  // Detect mobile device and network conditions in the browser
  useEffect(() => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }

    const updateDeviceInfo = () => {
      const effectiveType = navigator.connection?.effectiveType;
      setDeviceInfo({
        isMobile: window.innerWidth < 768,
        isSlowConnection: effectiveType === 'slow-2g' || effectiveType === '2g'
      });
    };

    updateDeviceInfo();
    window.addEventListener('resize', updateDeviceInfo);

    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);

  // Intersection Observer for lazy loading (only if not priority)
  useEffect(() => {
    if (priority) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: isMobile ? '50px' : '100px', // Smaller margin for mobile
        threshold: 0.1 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isMobile]);

  // Generate optimized image source based on device
  useEffect(() => {
    if (!isVisible) return;

    let optimizedSrc = src;

    // For mobile devices or slow connections, prefer smaller/compressed versions
    if (isMobile || isSlowConnection) {
      // If it's a large image, try to find a smaller version or add quality parameters
      if (src.includes('review') && src.includes('.webp')) {
        // Keep the same source but add mobile-specific loading strategy
        optimizedSrc = src;
      }
    }

    setCurrentSrc(optimizedSrc);
  }, [src, isVisible, isMobile, isSlowConnection]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  // Enhanced fallback component for mobile
  const renderFallback = () => (
    <div className={`${className} bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center`}>
      <div className="text-center p-4 md:p-8">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
          <svg className="w-4 h-4 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-primary/70 text-xs md:text-sm">Beautiful Smile Preview</p>
      </div>
    </div>
  );

  // Loading state optimized for mobile
  const renderLoading = () => (
    <div className={`${className} bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse rounded-sm`}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );

  if (hasError) {
    return renderFallback();
  }

  if (!isVisible) {
    return (
      <div ref={containerRef} className={`${className} bg-gradient-to-br from-primary/5 to-secondary/5`}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-primary/40 text-xs">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {!isLoaded && renderLoading()}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding={isMobile ? 'async' : 'auto'}
          // Mobile-specific optimizations
          style={{
            willChange: isLoaded ? 'auto' : 'opacity',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        />
      )}
    </div>
  );
};

export default ResponsiveSpecialMomentImage;
