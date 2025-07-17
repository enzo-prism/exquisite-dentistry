import React, { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './aspect-ratio';
import LoadingSkeleton from './loading-skeleton';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  src: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackAspectRatio?: number;
  minAspectRatio?: number;
  maxAspectRatio?: number;
  showLoadingSkeleton?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  objectPosition = 'center',
  className,
  onLoad,
  onError,
  fallbackAspectRatio = 4/3,
  minAspectRatio = 3/4,
  maxAspectRatio = 16/9,
  showLoadingSkeleton = true
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(fallbackAspectRatio);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const naturalRatio = img.naturalWidth / img.naturalHeight;
      // Constrain aspect ratio within bounds
      const constrainedRatio = Math.max(minAspectRatio, Math.min(maxAspectRatio, naturalRatio));
      setAspectRatio(constrainedRatio);
      setIsLoading(false);
      onLoad?.();
    };
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      onError?.();
    };
    img.src = src;
  }, [src, minAspectRatio, maxAspectRatio, onLoad, onError]);

  if (hasError) {
    return (
      <AspectRatio ratio={fallbackAspectRatio} className={cn("bg-muted rounded-lg", className)}>
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <span className="text-sm">Failed to load image</span>
        </div>
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={aspectRatio} className={cn("bg-muted rounded-lg overflow-hidden", className)}>
      {isLoading && showLoadingSkeleton && (
        <LoadingSkeleton className="absolute inset-0 z-10" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        style={{ objectPosition }}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
          onError?.();
        }}
      />
    </AspectRatio>
  );
};