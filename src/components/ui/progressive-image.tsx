import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';
import { usePerformanceMonitor } from '@/hooks/use-performance-monitor';
import EnhancedLoading from './enhanced-loading';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className,
  placeholderSrc,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: gpuRef } = useHardwareAcceleration();
  const { optimizedSettings } = usePerformanceMonitor();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsError(true);
    onError?.();
  };

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Loading state */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 z-10">
          <EnhancedLoading
            variant={optimizedSettings.reduceAnimations ? 'pulse' : 'shimmer'}
            className="h-full w-full"
            loadingText="Loading image..."
          />
        </div>
      )}

      {/* Placeholder image if provided */}
      {placeholderSrc && !isLoaded && (
        <img
          src={placeholderSrc}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 transition-opacity duration-300",
            isLoaded && "opacity-0"
          )}
        />
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={(el) => {
            imgRef.current = el;
            if (gpuRef.current !== el) {
              gpuRef.current = el;
            }
          }}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 gpu-accelerated",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
            isError && "opacity-0"
          )}
          decoding="async"
          loading="lazy"
        />
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gold/5">
          <div className="text-center text-black/60">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-black/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 15H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage;