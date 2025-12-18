import React from 'react';
import OptimizedImage from '@/components/seo/OptimizedImage';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SimpleImage: React.FC<SimpleImageProps> = ({ src, alt, className = "" }) => {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
      onError={(e) => {
        e.currentTarget.src = '/lovable-uploads/graduation-smile.webp';
      }}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  );
};

export default SimpleImage;
