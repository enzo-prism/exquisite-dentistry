// Hero height utilities for responsive video hero sections

export type HeroHeight = 'small' | 'medium' | 'large' | 'full' | 'auto';

interface HeightClasses {
  mobile: string;
  desktop: string;
}

/**
 * Maps height prop values to appropriate CSS classes for mobile and desktop
 */
export function getHeroHeightClasses(height: HeroHeight = 'medium'): HeightClasses {
  const heightMap: Record<HeroHeight, HeightClasses> = {
    small: {
      mobile: 'h-[50vh] min-h-[400px] max-h-[500px]',
      desktop: 'min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]'
    },
    medium: {
      mobile: 'min-h-[100vh] max-h-[100vh]',
      desktop: 'min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]'
    },
    large: {
      mobile: 'h-[70vh] min-h-[500px] max-h-[700px]',
      desktop: 'min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh]'
    },
    full: {
      mobile: 'h-[80vh] min-h-[600px] max-h-[800px]',
      desktop: 'min-h-[90vh] md:min-h-[95vh] lg:min-h-screen'
    },
    auto: {
      mobile: 'min-h-[400px]',
      desktop: 'min-h-[500px]'
    }
  };

  return heightMap[height] || heightMap.medium;
}