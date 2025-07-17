import React from 'react';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  className?: string;
  variant?: 'dental' | 'luxury' | 'elegant';
  intensity?: 'subtle' | 'moderate' | 'vibrant';
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className,
  variant = 'dental',
  intensity = 'moderate'
}) => {
  const getGradientClasses = () => {
    const baseClasses = 'absolute inset-0 w-full h-full';
    
    // Performance optimizations
    const performanceClasses = 'gpu-accelerated will-change-auto transform-gpu';
    
    // Elegant black, gold, white gradient variants
    const gradientVariants = {
      dental: {
        subtle: 'bg-gradient-to-br from-black via-black/95 via-amber-900/20 to-black',
        moderate: 'bg-gradient-to-br from-black via-black/90 via-amber-800/30 via-white/5 to-black',
        vibrant: 'bg-gradient-to-br from-black via-amber-900/40 via-amber-700/25 via-white/10 to-black'
      },
      luxury: {
        subtle: 'bg-gradient-to-br from-black via-black/95 via-yellow-600/15 to-black',
        moderate: 'bg-gradient-to-br from-black via-black/90 via-yellow-600/25 via-amber-200/8 to-black',
        vibrant: 'bg-gradient-to-br from-black via-yellow-600/35 via-amber-400/20 via-white/12 to-black'
      },
      elegant: {
        subtle: 'bg-gradient-to-br from-black via-black/95 via-amber-800/10 to-black',
        moderate: 'bg-gradient-to-br from-black via-black/90 via-amber-700/20 via-slate-100/6 to-black',
        vibrant: 'bg-gradient-to-br from-black via-amber-800/30 via-amber-600/18 via-white/8 to-black'
      }
    };

    const selectedGradient = gradientVariants[variant][intensity];
    
    // Animation classes
    const animationClasses = 'animate-gradient-move';
    
    return cn(baseClasses, performanceClasses, selectedGradient, animationClasses);
  };

  const getOverlayClasses = () => {
    const overlayIntensity = {
      subtle: 'bg-black/20',
      moderate: 'bg-black/30', 
      vibrant: 'bg-black/40'
    };
    
    return cn(
      'absolute inset-0 w-full h-full animate-elegant-float',
      overlayIntensity[intensity]
    );
  };

  return (
    <>
      {/* Primary Gradient Layer */}
      <div 
        className={getGradientClasses()}
        style={{
          backgroundSize: '300% 300%',
          willChange: 'background-position, transform'
        }}
      />
      
      {/* Gold Shimmer Layer */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full opacity-40 animate-gradient-shift',
          variant === 'dental' && 'bg-gradient-to-tr from-amber-600/20 via-transparent via-yellow-500/15 to-amber-700/20',
          variant === 'luxury' && 'bg-gradient-to-tr from-yellow-500/25 via-transparent via-amber-400/20 to-yellow-600/25',
          variant === 'elegant' && 'bg-gradient-to-tr from-amber-700/15 via-transparent via-amber-500/12 to-amber-800/15'
        )}
        style={{
          backgroundSize: '400% 400%',
          willChange: 'background-position'
        }}
      />
      
      {/* White Highlight Layer */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full opacity-30 animate-elegant-float',
          'bg-gradient-to-tl from-white/5 via-transparent via-white/8 to-white/3'
        )}
        style={{
          backgroundSize: '200% 200%',
          willChange: 'background-position'
        }}
      />
      
      {/* Accessibility fallback */}
      <div 
        className={cn('absolute inset-0 bg-slate-900', className)}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </>
  );
};

export default GradientBackground;