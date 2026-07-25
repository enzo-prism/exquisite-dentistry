import React from 'react';
import {
  OptimizedImageProps,
  generateResponsiveImageUrls,
  generateOptimizedAltText,
  shouldLazyLoad
} from '@/utils/imageOptimization';

// `src`/`alt`/`width`/`height` are omitted from the intrinsic <img> attributes
// because OptimizedImageProps declares them with narrower, non-identical types
// (required `src`/`alt`, numeric `width`/`height`). Extending both directly made
// this an error type, so props passed to this component were never checked.
interface ExtendedOptimizedImageProps
  extends OptimizedImageProps,
    Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'width' | 'height'> {
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
  caption,
  sizes,
  decoding = 'async',
  style,
  ...imgProps
}) => {
  const responsiveUrls = generateResponsiveImageUrls(src);
  const optimizedAlt = generateOptimizedAltText(alt, context);
  const loadingBehavior = shouldLazyLoad(priority, loading);

  return (
    <picture>
      {responsiveUrls.avif && (
        <source type="image/avif" srcSet={responsiveUrls.avif} sizes={sizes} />
      )}
      {responsiveUrls.webp && (
        <source type="image/webp" srcSet={responsiveUrls.webp} sizes={sizes} />
      )}
      
      {/* Fallback image */}
      <img
        src={responsiveUrls.fallback || src}
        alt={optimizedAlt}
        {...(width && { width })}
        {...(height && { height })}
        loading={loadingBehavior}
        className={className}
        decoding={decoding}
        style={{
          contentVisibility: loadingBehavior === 'lazy' ? 'auto' : 'visible',
          aspectRatio: width && height ? `${width}/${height}` : undefined,
          ...(style || {})
        }}
        sizes={sizes}
        {...imgProps}
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
