import React from 'react';
import { 
  OptimizedImageProps, 
  generateResponsiveImageUrls, 
  generateOptimizedAltText, 
  shouldLazyLoad 
} from '@/utils/imageOptimization';

interface ExtendedOptimizedImageProps extends OptimizedImageProps {
  context?: 'before-after' | 'procedure' | 'team' | 'office' | 'logo' | 'general';
  caption?: string;
}

const OptimizedImage: React.FC<ExtendedOptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading,
  priority = false,
  context = 'general',
  caption
}) => {
  const responsiveUrls = generateResponsiveImageUrls(src);
  const optimizedAlt = generateOptimizedAltText(alt, context);
  const loadingBehavior = shouldLazyLoad(priority, loading);

  return (
    <picture>
      {/* WebP sources for better compression */}
      <source
        media="(max-width: 768px)"
        srcSet={responsiveUrls.mobile}
        type="image/webp"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={responsiveUrls.tablet}
        type="image/webp"
      />
      <source
        media="(min-width: 1025px)"
        srcSet={responsiveUrls.desktop}
        type="image/webp"
      />
      
      {/* Fallback image */}
      <img
        src={responsiveUrls.fallback || src}
        alt={optimizedAlt}
        {...(width && { width })}
        {...(height && { height })}
        loading={loadingBehavior}
        className={className}
        decoding="async"
        style={{ 
          contentVisibility: loadingBehavior === 'lazy' ? 'auto' : 'visible',
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
      
      {/* Optional caption for accessibility */}
      {caption && (
        <figcaption className="sr-only">
          {caption}
        </figcaption>
      )}
    </picture>
  );
};

export default OptimizedImage;