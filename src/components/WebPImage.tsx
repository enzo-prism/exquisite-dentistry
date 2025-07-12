import React from 'react';
import OptimizedImage from './OptimizedImage';
import { convertToWebP, generateWebPMetadata } from '@/utils/webpConverter';

interface WebPImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  fallbackSrc?: string;
  loadingVariant?: 'elegant' | 'minimal' | 'skeleton';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * WebPImage Component
 * Automatically serves WebP format with fallback to original format
 * Built on top of OptimizedImage with WebP-first approach
 */
export const WebPImage: React.FC<WebPImageProps> = ({
  src,
  alt,
  onLoad,
  onError,
  ...props
}) => {
  const metadata = generateWebPMetadata(src);
  
  return (
    <OptimizedImage
      src={metadata.webp}
      alt={alt || metadata.alt}
      fallbackSrc={metadata.original}
      forceWebP={true}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
};

export default WebPImage;