import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ResponsiveLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  type: 'main' | 'alt';
  alt: string;
  className?: string;
  priority?: boolean;
}

const ResponsiveLogo: React.FC<ResponsiveLogoProps> = ({ 
  type, 
  alt, 
  className,
  priority = false,
  ...props 
}) => {
  const isMobile = useIsMobile();
  
  const getLogoSources = () => {
    if (type === 'main') {
      return {
        desktop: {
          webp: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-desktop.webp',
          png: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-desktop.png',
          width: 200,
          height: 37
        },
        mobile: {
          webp: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-mobile.webp',
          png: '/optimized/logos/fd45d438-10a2-4bde-9162-a38816b28958-mobile.png',
          width: 120,
          height: 22
        },
        fallback: '/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png'
      };
    } else {
      return {
        desktop: {
          webp: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-desktop-2x.webp',
          png: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-desktop-2x.png',
          width: 240,
          height: 48
        },
        mobile: {
          webp: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-mobile.webp',
          png: '/optimized/logos/9e823f53-f866-40f9-a3e2-78373640ee8f-mobile.png',
          width: 120,
          height: 24
        },
        fallback: '/lovable-uploads/9e823f53-f866-40f9-a3e2-78373640ee8f.png'
      };
    }
  };
  
  const sources = getLogoSources();
  const currentSource = isMobile ? sources.mobile : sources.desktop;
  
  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source 
        media="(max-width: 768px)" 
        srcSet={sources.mobile.webp}
        type="image/webp"
      />
      <source 
        media="(min-width: 769px)" 
        srcSet={sources.desktop.webp}
        type="image/webp"
      />
      
      {/* PNG fallback */}
      <source 
        media="(max-width: 768px)" 
        srcSet={sources.mobile.png}
        type="image/png"
      />
      <source 
        media="(min-width: 769px)" 
        srcSet={sources.desktop.png}
        type="image/png"
      />
      
      {/* Final fallback img element */}
      <img
        src={sources.fallback}
        alt={alt}
        width={currentSource.width}
        height={currentSource.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('transition-opacity duration-300 ease-out opacity-100', className)}
        style={{ 
          objectFit: 'contain', 
          objectPosition: 'center 35%',
          maxWidth: '100%',
          height: 'auto'
        }}
        {...props}
      />
    </picture>
  );
};

export default ResponsiveLogo;