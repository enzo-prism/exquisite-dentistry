import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePerformance } from '@/hooks/use-performance';
import { motion } from 'framer-motion';

interface ProgressiveLoaderProps {
  children: React.ReactNode;
  skeleton?: React.ReactNode;
  delay?: number;
  className?: string;
  fadeIn?: boolean;
  enablePerformanceOptimization?: boolean;
}

const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  children,
  skeleton,
  delay = 0,
  className,
  fadeIn = true,
  enablePerformanceOptimization = true
}) => {
  const [isLoaded, setIsLoaded] = useState(delay === 0);
  const [showContent, setShowContent] = useState(false);
  const { isSlowConnection, isReducedMotion } = usePerformance();

  useEffect(() => {
    if (delay === 0) {
      setShowContent(true);
      return;
    }

    // Adjust delay based on connection speed
    const adjustedDelay = enablePerformanceOptimization && isSlowConnection 
      ? delay * 1.5 
      : delay;

    const timer = setTimeout(() => {
      setIsLoaded(true);
      // Small delay for fade-in animation
      setTimeout(() => setShowContent(true), fadeIn && !isReducedMotion ? 100 : 0);
    }, adjustedDelay);

    return () => clearTimeout(timer);
  }, [delay, isSlowConnection, fadeIn, isReducedMotion, enablePerformanceOptimization]);

  if (!isLoaded) {
    return (
      <div className={cn('progressive-loader-skeleton', className)}>
        {skeleton || <DefaultSkeleton />}
      </div>
    );
  }

  if (fadeIn && !isReducedMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 10 }}
        animate={{ 
          opacity: showContent ? 1 : 0,
          y: showContent ? 0 : 10
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut'
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(
      'transition-opacity duration-300',
      showContent ? 'opacity-100' : 'opacity-0',
      className
    )}>
      {children}
    </div>
  );
};

const DefaultSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
    <div className="bg-gray-200 rounded h-4 w-1/2 mb-2"></div>
    <div className="bg-gray-200 rounded h-20 w-full"></div>
  </div>
);

// Content skeleton variants
export const ImageSkeleton: React.FC<{ className?: string; aspectRatio?: string }> = ({ 
  className, 
  aspectRatio = 'aspect-video' 
}) => (
  <div className={cn('bg-gray-200 rounded animate-pulse', aspectRatio, className)} />
);

export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className 
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }, (_, i) => (
      <div 
        key={i} 
        className={cn(
          'bg-gray-200 rounded h-4 animate-pulse',
          i === lines - 1 ? 'w-2/3' : 'w-full'
        )} 
      />
    ))}
  </div>
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 space-y-4', className)}>
    <ImageSkeleton className="w-full h-48" aspectRatio="aspect-video" />
    <TextSkeleton lines={3} />
  </div>
);

// Progressive image component
interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className,
  placeholderSrc,
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { isSlowConnection } = usePerformance();

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Low-quality placeholder or skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0">
          {placeholderSrc ? (
            <img
              src={placeholderSrc}
              alt=""
              className="w-full h-full object-cover filter blur-sm scale-110"
              loading="eager"
            />
          ) : (
            <ImageSkeleton className="w-full h-full" aspectRatio="" />
          )}
        </div>
      )}

      {/* High-quality image */}
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        loading={isSlowConnection ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
      />

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default ProgressiveLoader;