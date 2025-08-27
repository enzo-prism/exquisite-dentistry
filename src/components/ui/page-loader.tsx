
import React from 'react';
import { cn } from '@/lib/utils';
import BrandLoader from './brand-loader';

interface PageLoaderProps {
  variant?: 'minimal' | 'branded' | 'hero';
  message?: string;
  className?: string;
  timeout?: number;
  onTimeout?: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  variant = 'minimal',
  message,
  className,
  timeout = 30000,
  onTimeout
}) => {
  if (variant === 'hero') {
    return (
      <BrandLoader
        variant="immersive"
        showLogo={true}
        message="Preparing Your Experience"
        subMessage="Loading beautiful content..."
        className={className}
        timeout={timeout}
        onTimeout={onTimeout}
      />
    );
  }

  if (variant === 'branded') {
    return (
      <div className={cn(
        "flex items-center justify-center min-h-[50vh] md:min-h-[60vh] bg-gradient-to-b from-background to-background/95",
        className
      )}>
        <BrandLoader
          variant="luxury"
          size="lg"
          message={message || "Loading Content"}
          subMessage="Please wait while we prepare your experience..."
          timeout={timeout}
          onTimeout={onTimeout}
        />
      </div>
    );
  }

  // Minimal variant
  return (
    <div className={cn(
      "flex items-center justify-center min-h-[30vh] md:min-h-[40vh] bg-background",
      className
    )}>
      <BrandLoader 
        variant="elegant" 
        size="md" 
        message={message} 
        timeout={timeout}
        onTimeout={onTimeout}
      />
    </div>
  );
};

export default PageLoader;
