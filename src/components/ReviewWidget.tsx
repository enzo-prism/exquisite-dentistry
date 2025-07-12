
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import BrandLoader from './ui/brand-loader';

const ReviewWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerHeight, setContainerHeight] = useState(200);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !scriptLoadedRef.current) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // ResizeObserver to adapt to widget content height
  useEffect(() => {
    if (!isLoaded || !widgetRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        if (height > 0) {
          setContainerHeight(Math.max(height, 200));
        }
      }
    });

    resizeObserver.observe(widgetRef.current);
    return () => resizeObserver.disconnect();
  }, [isLoaded]);

  // Retry mechanism for failed loads
  const retryLoad = useCallback(() => {
    setHasError(false);
    setIsLoaded(false);
    scriptLoadedRef.current = false;
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible || scriptLoadedRef.current) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://birdeye.com/embed/v7/173163061159627/11/987654321301115183';
    script.async = true;
    
    script.onload = () => {
      setIsLoaded(true);
      scriptLoadedRef.current = true;
      setHasError(false);
    };
    
    script.onerror = () => {
      console.warn('Failed to load BirdEye widget');
      setHasError(true);
      setIsLoaded(true); // Prevent infinite loading state
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full transition-all duration-500 ease-in-out",
        "min-h-[200px] px-2 sm:px-4 md:px-6",
        !isLoaded && isVisible ? "animate-pulse bg-gray-100 rounded-lg" : ""
      )}
      style={{
        height: isLoaded ? `${containerHeight}px` : '200px',
        contain: 'layout style'
      }}
    >
      {hasError && (
        <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-500">Failed to load reviews</p>
            <button 
              onClick={retryLoad}
              className="px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {!isLoaded && isVisible && !hasError && (
        <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-lg border border-gray-200">
          <BrandLoader
            variant="elegant"
            size="md"
            message="Loading Reviews"
            subMessage="Fetching patient testimonials..."
          />
        </div>
      )}
      
      <div 
        ref={widgetRef}
        id="bf-revz-widget-987654321301115183"
        className={cn(
          "transition-opacity duration-500 w-full",
          isLoaded && !hasError ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default ReviewWidget;
