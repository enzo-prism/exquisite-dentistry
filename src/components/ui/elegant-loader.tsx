
import React from 'react';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';

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
  const { ref } = useHardwareAcceleration();

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const variantClasses = {
    subtle: 'border-black/20 border-t-black/40',
    branded: 'border-gold/30 border-t-gold shadow-sm shadow-gold/20',
    minimal: 'border-gray-200 border-t-gray-400'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <div
        ref={ref}
        className={cn(
          "border-2 rounded-full animate-spin gpu-accelerated",
          sizeClasses[size],
          variantClasses[variant]
        )}
      />
      {text && (
        <p className="text-sm text-black/60 font-medium font-open-sans animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default ElegantLoader;
