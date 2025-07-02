
import React from 'react';
import { cn } from '@/lib/utils';

interface ElegantLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'subtle' | 'branded' | 'minimal';
  className?: string;
  text?: string;
}

const ElegantLoader: React.FC<ElegantLoaderProps> = ({
  size = 'md',
  variant = 'subtle',
  className,
  text
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    subtle: 'border-black/20 border-t-black/40',
    branded: 'border-gold/30 border-t-gold',
    minimal: 'border-gray-200 border-t-gray-400'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        className={cn(
          "border-2 rounded-full animate-spin",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      {text && (
        <p className="text-sm text-black/60 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default ElegantLoader;
