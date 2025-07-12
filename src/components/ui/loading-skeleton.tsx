
import React from 'react';
import { cn } from '@/lib/utils';
import { useHardwareAcceleration } from '@/hooks/use-hardware-acceleration';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'text' | 'avatar' | 'image' | 'card';
  lines?: number;
  animate?: boolean;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = 'default',
  lines = 1,
  animate = true
}) => {
  const { ref } = useHardwareAcceleration();

  const baseClasses = cn(
    "bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5 rounded-sm gpu-accelerated",
    animate && "animate-shimmer bg-[length:200%_100%]",
    className
  );

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              "h-4",
              i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return <div className={cn(baseClasses, "w-12 h-12 rounded-full")} />;
  }

  if (variant === 'image') {
    return <div className={cn(baseClasses, "w-full aspect-video")} />;
  }

  if (variant === 'card') {
    return (
      <div className="space-y-4 p-6">
        <div className={cn(baseClasses, "h-6 w-3/4")} />
        <div className="space-y-2">
          <div className={cn(baseClasses, "h-4 w-full")} />
          <div className={cn(baseClasses, "h-4 w-2/3")} />
        </div>
      </div>
    );
  }

  return <div className={baseClasses} />;
};

export default LoadingSkeleton;
