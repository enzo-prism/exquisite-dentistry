import React from 'react';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';
import { usePerformanceSettings } from '@/hooks/use-performance-monitor';

interface EnhancedLoadingProps {
  variant?: 'skeleton' | 'pulse' | 'shimmer' | 'fade';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({
  variant = 'shimmer',
  size = 'md',
  className,
  children,
  isLoading = true,
  loadingText
}) => {
  const { ref } = useHardwareAcceleration();
  const { metrics, optimizedSettings } = usePerformanceSettings();

  const sizeClasses = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8'
  };

  // Adaptive animation based on device performance
  const getVariantClasses = () => {
    if (optimizedSettings.reduceAnimations) {
      return 'bg-gold/10 animate-pulse';
    }

    switch (variant) {
      case 'skeleton':
        return 'bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 animate-shimmer bg-[length:200%_100%]';
      case 'pulse':
        return 'bg-gold/10 animate-pulse-smooth';
      case 'shimmer':
        return 'bg-gradient-to-r from-gold/5 via-gold/15 to-gold/5 animate-shimmer-enhanced bg-[length:200%_100%]';
      case 'fade':
        return 'bg-gold/8 animate-fade-pulse';
      default:
        return 'bg-gold/10 animate-pulse';
    }
  };

  if (!isLoading && children) {
    return (
      <div className="animate-content-reveal gpu-accelerated">
        {children}
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div
        ref={ref}
        className={cn(
          "w-full rounded-sm gpu-accelerated",
          sizeClasses[size],
          getVariantClasses()
        )}
      />
      {loadingText && (
        <p className="text-sm text-black/60 font-medium font-open-sans animate-fade-pulse">
          {loadingText}
        </p>
      )}
    </div>
  );
};

export default EnhancedLoading;
