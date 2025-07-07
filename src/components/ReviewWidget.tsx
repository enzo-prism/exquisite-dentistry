
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const ReviewWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!isVisible || scriptLoadedRef.current) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://birdeye.com/embed/v7/173163061159627/11/987654321301115183';
    script.async = true;
    
    script.onload = () => {
      setIsLoaded(true);
      scriptLoadedRef.current = true;
    };
    
    script.onerror = () => {
      console.warn('Failed to load BirdEye widget');
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
        "w-full transition-opacity duration-300",
        "min-h-[200px] max-h-[400px] overflow-hidden",
        !isLoaded && isVisible ? "animate-pulse bg-gray-100 rounded-lg" : ""
      )}
      style={{
        contain: 'layout',
        containIntrinsicSize: '100% 200px'
      }}
    >
      {!isLoaded && isVisible && (
        <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm text-gray-500">Loading reviews...</p>
          </div>
        </div>
      )}
      <div 
        id="bf-revz-widget-987654321301115183"
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default ReviewWidget;
