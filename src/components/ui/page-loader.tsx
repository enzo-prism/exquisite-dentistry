
import React from 'react';
import { cn } from '@/lib/utils';
import ElegantLoader from './elegant-loader';

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
      <div className={cn(
        "fixed inset-0 bg-black flex items-center justify-center z-50",
        className
      )}>
        <div className="text-center">
          <div className="w-3 h-3 bg-gold rounded-full animate-pulse mb-4" />
          <div className="text-gold/60 text-sm font-medium tracking-wide">
            EXQUISITE DENTISTRY
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'branded') {
    return (
      <div className={cn(
        "flex items-center justify-center min-h-[60vh] bg-gradient-to-b from-white to-gray-50/50",
        className
      )}>
        <div className="text-center">
          <ElegantLoader variant="branded" size="lg" />
          {message && (
            <p className="mt-4 text-black/60 text-sm font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Minimal variant
  return (
    <div className={cn(
      "flex items-center justify-center min-h-[40vh]",
      className
    )}>
      <ElegantLoader variant="subtle" size="md" text={message} />
    </div>
  );
};

export default PageLoader;
