import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce').matches;

  const getGradientClasses = () => {
    const baseClasses = 'absolute inset-0 w-full h-full';
    
    // Advanced GPU acceleration with composite layers
    const performanceClasses = cn(
      'gpu-accelerated will-change-transform transform-gpu',
      'isolation-auto contain-layout-style-paint',
      // Hardware acceleration optimizations
      '[transform-style:preserve-3d] [backface-visibility:hidden]'
    );
    
    // Enhanced multi-layer gradient variants with sophisticated color blending
    const gradientVariants = {
      dental: {
        subtle: cn(
          'bg-gradient-to-br from-black via-black/98 via-amber-900/15 to-black',
          '[background-image:radial-gradient(ellipse_at_50%_20%,rgb(217_119_6_/_0.15),transparent_50%)]'
        ),
        moderate: cn(
          'bg-gradient-to-br from-black via-black/95 via-amber-800/25 via-white/4 to-black',
          '[background-image:radial-gradient(ellipse_at_70%_30%,rgb(217_119_6_/_0.2),transparent_60%)]'
        ),
        vibrant: cn(
          'bg-gradient-to-br from-black via-amber-900/35 via-amber-700/20 via-white/8 to-black',
          '[background-image:conic-gradient(from_45deg_at_50%_50%,rgb(217_119_6_/_0.25),transparent_30%,rgb(245_158_11_/_0.15),transparent_70%)]'
        )
      },
      luxury: {
        subtle: cn(
          'bg-gradient-to-br from-black via-black/98 via-yellow-600/12 to-black',
          '[background-image:radial-gradient(ellipse_at_40%_60%,rgb(202_138_4_/_0.18),transparent_55%)]'
        ),
        moderate: cn(
          'bg-gradient-to-br from-black via-black/95 via-yellow-600/22 via-amber-200/6 to-black',
          '[background-image:radial-gradient(ellipse_at_60%_40%,rgb(245_158_11_/_0.22),transparent_65%)]'
        ),
        vibrant: cn(
          'bg-gradient-to-br from-black via-yellow-600/30 via-amber-400/18 via-white/10 to-black',
          '[background-image:conic-gradient(from_135deg_at_40%_60%,rgb(245_158_11_/_0.28),transparent_25%,rgb(251_191_36_/_0.18),transparent_75%)]'
        )
      },
      elegant: {
        subtle: cn(
          'bg-gradient-to-br from-black via-black/98 via-amber-800/8 to-black',
          '[background-image:radial-gradient(ellipse_at_30%_70%,rgb(146_64_14_/_0.15),transparent_50%)]'
        ),
        moderate: cn(
          'bg-gradient-to-br from-black via-black/95 via-amber-700/18 via-slate-100/4 to-black',
          '[background-image:radial-gradient(ellipse_at_80%_20%,rgb(180_83_9_/_0.2),transparent_60%)]'
        ),
        vibrant: cn(
          'bg-gradient-to-br from-black via-amber-800/25 via-amber-600/15 via-white/6 to-black',
          '[background-image:conic-gradient(from_225deg_at_70%_30%,rgb(180_83_9_/_0.25),transparent_30%,rgb(217_119_6_/_0.15),transparent_70%)]'
        )
      }
    };

    const selectedGradient = gradientVariants[variant][intensity];
    
    // Advanced animation system with staggered timing
    const animationClasses = cn(
      !prefersReducedMotion && 'animate-[gradient-flow_20s_ease-in-out_infinite]',
      prefersReducedMotion && 'animate-none'
    );
    
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

  // Simplified mobile version for better performance
  if (isMobile) {
    return (
      <div 
        ref={containerRef}
        className={cn("absolute inset-0 w-full h-full", className)}
        role="presentation"
        aria-hidden="true"
      >
        {/* Simplified Primary Gradient for Mobile */}
        <div className={cn(
          "absolute inset-0 w-full h-full",
          "bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95"
        )} />
        
        {/* Single Subtle Animation Layer for Mobile */}
        <div 
          className={cn(
            "absolute inset-0 w-full h-full",
            "bg-gradient-to-br from-amber-500/8 via-transparent to-slate-700/10",
            !prefersReducedMotion && 'animate-mobile-gradient',
            "mix-blend-soft-light opacity-60"
          )}
          style={{
            backgroundSize: '200% 200%',
            willChange: 'transform, background-position, opacity'
          }}
        />
        
        {/* Accessibility fallback */}
        <div 
          className="absolute inset-0 bg-slate-900 opacity-0"
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      </div>
    );
  }

  // Full desktop version with all effects
  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/* Primary Gradient Layer with Advanced GPU Acceleration */}
      <div 
        className={getGradientClasses()}
        style={{
          backgroundSize: '400% 400%',
          willChange: 'transform',
          isolation: 'isolate',
          transform: 'translateZ(0)',
          animationDelay: '0s'
        }}
      />
      
      {/* Golden Veins Layer - Organic flowing gold streams */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full isolation-isolate',
          !prefersReducedMotion && 'animate-[golden-veins_25s_ease-in-out_infinite]',
          prefersReducedMotion && 'opacity-60',
          variant === 'dental' && 'opacity-50',
          variant === 'luxury' && 'opacity-65', 
          variant === 'elegant' && 'opacity-45'
        )}
        style={{
          background: `
            conic-gradient(from 45deg at 20% 80%, rgba(217, 119, 6, 0.15) 0deg, transparent 90deg, transparent 270deg, rgba(245, 158, 11, 0.1) 360deg),
            conic-gradient(from 225deg at 80% 20%, rgba(245, 158, 11, 0.12) 0deg, transparent 120deg, transparent 240deg, rgba(217, 119, 6, 0.08) 360deg)
          `,
          backgroundSize: '300% 300%, 250% 250%',
          willChange: 'transform',
          transform: 'translateZ(0)',
          animationDelay: '3s'
        }}
      />
      
      {/* Particle Light Effects */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full isolation-isolate',
          !prefersReducedMotion && 'animate-[sparkle-dance_30s_linear_infinite]',
          'opacity-40'
        )}
        style={{
          background: `
            radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.08) 1px, transparent 2px),
            radial-gradient(circle at 85% 75%, rgba(245, 158, 11, 0.12) 1px, transparent 2px),
            radial-gradient(circle at 60% 40%, rgba(255, 255, 255, 0.06) 1px, transparent 2px),
            radial-gradient(circle at 30% 80%, rgba(217, 119, 6, 0.1) 1px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 120px 120px, 90px 90px',
          willChange: 'transform',
          transform: 'translateZ(0)',
          animationDelay: '5s'
        }}
      />
      
      {/* Depth Shimmer Layer */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full isolation-isolate',
          !prefersReducedMotion && 'animate-[depth-shimmer_18s_ease-in-out_infinite]',
          variant === 'dental' && 'opacity-35',
          variant === 'luxury' && 'opacity-45',
          variant === 'elegant' && 'opacity-30'
        )}
        style={{
          background: `
            linear-gradient(135deg, transparent 30%, rgba(245, 158, 11, 0.08) 50%, transparent 70%),
            radial-gradient(ellipse at 70% 30%, rgba(255, 255, 255, 0.04) 0%, transparent 70%)
          `,
          backgroundSize: '200% 200%, 300% 300%',
          willChange: 'transform',
          transform: 'translateZ(0)',
          animationDelay: '8s'
        }}
      />
      
      {/* Premium Texture Overlay */}
      <div 
        className={cn(
          'absolute inset-0 w-full h-full isolation-isolate opacity-20',
          !prefersReducedMotion && 'animate-[texture-breathe_22s_ease-in-out_infinite]'
        )}
        style={{
          background: `
            repeating-linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.02) 0px,
              rgba(217, 119, 6, 0.01) 1px,
              rgba(0, 0, 0, 0.02) 2px
            )
          `,
          willChange: 'transform',
          transform: 'translateZ(0)',
          animationDelay: '12s'
        }}
      />
      
      {/* Accessibility fallback */}
      <div 
        className={cn('absolute inset-0 bg-slate-900', className)}
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </div>
  );
};

export default GradientBackground;