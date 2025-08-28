import React, { useState, useCallback } from 'react';
import { isValidImageSrc } from '@/utils/typeGuards';
import { cn } from '@/lib/utils';

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onError'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  className?: string;
  priority?: boolean;
}

/**
 * Safe image component with error handling and type validation
 */
const SafeImageComponent: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  onError,
  className,
  priority = false,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(true);
    }
    onError?.(event);
  }, [hasError, fallbackSrc, currentSrc, onError]);

  const handleLoad = useCallback(() => {
    setHasError(false);
  }, []);

  // Validate src before rendering
  if (!isValidImageSrc(currentSrc)) {
    console.warn('Invalid image src provided:', src);
    return null;
  }

  return (
    <img
      {...props}
      src={currentSrc}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      loading={priority ? 'eager' : 'lazy'}
      className={cn(
        'transition-opacity duration-200',
        hasError && 'opacity-75',
        className
      )}
      role="img"
      aria-label={alt}
    />
  );
};

export default SafeImageComponent;