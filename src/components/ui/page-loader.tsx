
import React from 'react';
import { cn } from '@/lib/utils';
import BrandLoader from './brand-loader';

interface PageLoaderProps {
  variant?: 'minimal' | 'branded' | 'hero';
  message?: string;
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  variant = 'minimal',
  message,
  className
}) => {
  if (variant === 'hero') {
    return (
      <BrandLoader
        variant="immersive"
        showLogo={true}
        message="Preparing Your Experience"
        subMessage="Loading beautiful content..."
        className={className}
      />
    );
  }

  if (variant === 'branded') {
    return (
      <div className={cn(
        "flex items-center justify-center min-h-[60vh] bg-gradient-to-b from-white to-gray-50/50",
        className
      )}>
        <BrandLoader
          variant="luxury"
          size="lg"
          message={message || "Loading Content"}
          subMessage="Please wait while we prepare your experience..."
        />
      </div>
    );
  }

  // Minimal variant
  return (
    <div className={cn(
      "flex items-center justify-center min-h-[40vh]",
      className
    )}>
      <BrandLoader variant="elegant" size="md" message={message} />
    </div>
  );
};

export default PageLoader;
