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
    
    // Gradient variants with dental/medical theme
    const gradientVariants = {
      dental: {
        subtle: 'bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-800',
        moderate: 'bg-gradient-to-br from-slate-900 via-blue-900/90 via-indigo-900/70 to-slate-800',
        vibrant: 'bg-gradient-to-br from-slate-900 via-blue-900 via-indigo-900/80 via-blue-800/60 to-slate-800'
      },
      luxury: {
        subtle: 'bg-gradient-to-br from-gray-900 via-slate-800/80 to-gray-900',
        moderate: 'bg-gradient-to-br from-gray-900 via-slate-800/90 via-gray-700/70 to-gray-900',
        vibrant: 'bg-gradient-to-br from-gray-900 via-slate-800 via-gray-700/80 via-slate-600/60 to-gray-900'
      },
      elegant: {
        subtle: 'bg-gradient-to-br from-slate-900 via-gray-800/80 to-slate-900',
        moderate: 'bg-gradient-to-br from-slate-900 via-gray-800/90 via-slate-700/70 to-slate-900',
        vibrant: 'bg-gradient-to-br from-slate-900 via-gray-800 via-slate-700/80 via-gray-600/60 to-slate-900'
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
      
      {/* Secondary Animated Layer */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full opacity-60 animate-gradient-shift',
          variant === 'dental' && 'bg-gradient-to-tr from-blue-900/30 via-transparent via-indigo-800/20 to-blue-900/30',
          variant === 'luxury' && 'bg-gradient-to-tr from-gray-700/30 via-transparent via-slate-600/20 to-gray-700/30',
          variant === 'elegant' && 'bg-gradient-to-tr from-slate-700/30 via-transparent via-gray-600/20 to-slate-700/30'
        )}
        style={{
          backgroundSize: '400% 400%',
          willChange: 'background-position'
        }}
      />
      
      {/* Subtle Overlay */}
      <div className={getOverlayClasses()} />
      
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