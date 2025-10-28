import React from 'react';

interface SimpleImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SimpleImage: React.FC<SimpleImageProps> = ({ src, alt, className = "" }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = '/lovable-uploads/graduation-smile.webp';
      }}
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
    />
  );
};

export default SimpleImage;
