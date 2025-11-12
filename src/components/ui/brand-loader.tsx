import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';

interface BrandLoaderProps {
  variant?: 'minimal' | 'elegant' | 'luxury' | 'immersive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  subMessage?: string;
  className?: string;
  showLogo?: boolean;
  timeout?: number; // Timeout in milliseconds
  onTimeout?: () => void;
}

const BrandLoader: React.FC<BrandLoaderProps> = ({
  variant = 'elegant',
  size = 'md',
  message,
  subMessage,
  className,
  showLogo = false,
  timeout = 30000, // 30 second default timeout
  onTimeout
}) => {
  const { ref } = useHardwareAcceleration();
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    if (timeout > 0) {
      const timer = setTimeout(() => {
        setIsTimedOut(true);
        onTimeout?.();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout, onTimeout]);

  if (isTimedOut) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-6 text-center", className)}>
        <div className="text-amber-600 mb-2">⚠️</div>
        <p className="text-sm text-gray-600">Loading is taking longer than expected</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-3 px-4 py-2 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const containerSizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12'
  };

  if (variant === 'immersive') {
    return (
      <div className={cn(
        "fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-50",
        "flex items-center justify-center",
        className
      )}>
        <div ref={ref} className="text-center space-y-6 gpu-accelerated">
          {showLogo && (
            <div className="mb-8 animate-pulse">
              <div className="w-16 h-16 bg-gradient-to-br from-gold via-yellow-500 to-gold rounded-full mx-auto opacity-90" />
            </div>
          )}
          
          <div className="relative">
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-3 h-3 bg-gradient-to-r from-gold to-yellow-500 rounded-full",
                    "animate-pulse"
                  )}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '1.4s'
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-gold text-sm font-medium tracking-wider uppercase font-montserrat">
              {message || 'Loading Experience'}
            </h3>
            {subMessage && (
              <p className="text-white/60 text-xs font-light font-open-sans">
                {subMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'luxury') {
    return (
      <div className={cn("flex flex-col items-center justify-center", containerSizes[size], className)}>
        <div ref={ref} className="relative gpu-accelerated">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/20 to-yellow-500/20 animate-ping" />
          <div className={cn(
            "relative rounded-full border-2 border-gold/30 bg-gradient-to-br from-white to-gray-50",
            "shadow-lg shadow-gold/10",
            sizeClasses[size]
          )}>
            <div className="absolute inset-1 rounded-full bg-gradient-to-tr from-gold via-yellow-500 to-gold animate-spin opacity-80" />
            <div className="absolute inset-2 rounded-full bg-white" />
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-gold/20 to-transparent animate-pulse" />
          </div>
        </div>
        
        {message && (
          <div className="mt-4 text-center space-y-1">
            <p className="text-sm font-medium text-black font-montserrat">
              {message}
            </p>
            {subMessage && (
              <p className="text-xs text-gray-600 font-open-sans">
                {subMessage}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'elegant') {
    return (
      <div className={cn("flex flex-col items-center justify-center", containerSizes[size], className)}>
        <div ref={ref} className="relative gpu-accelerated">
          <div className={cn(
            "rounded-full border border-gold/40 animate-spin",
            sizeClasses[size]
          )}>
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-gold rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping" />
        </div>
        
        {message && (
          <p className="mt-3 text-sm text-gray-700 font-medium font-open-sans animate-pulse">
            {message}
          </p>
        )}
      </div>
    );
  }

  // Minimal variant
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <div ref={ref} className={cn(
        "rounded-full border-2 border-gold/30 border-t-gold animate-spin gpu-accelerated",
        sizeClasses[size]
      )} />
      {message && (
        <span className="text-sm text-gray-600 font-open-sans">
          {message}
        </span>
      )}
    </div>
  );
};

export default BrandLoader;