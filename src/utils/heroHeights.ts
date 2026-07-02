
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
      mobile: 'h-[60vh] min-h-[500px] max-h-[600px]',
      desktop: 'min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]'
    },
    medium: {
      // No max-height cap: on short landscape phones a fixed 100vh clipped the
      // CTA/proof rows out of reach (the section is overflow-hidden). min-h lets
      // the hero grow to fit its content while still filling the viewport.
      mobile: 'min-h-[100vh]',
      desktop: 'min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh]'
    },
    large: {
      mobile: 'h-[80vh] min-h-[600px] max-h-[800px]',
      desktop: 'min-h-[80vh] md:min-h-[85vh] lg:min-h-[90vh]'
    },
    full: {
      mobile: 'h-[90vh] min-h-[700px] max-h-[900px]',
      desktop: 'min-h-[90vh] md:min-h-[95vh] lg:min-h-screen'
    },
    auto: {
      mobile: 'min-h-[500px]',
      desktop: 'min-h-[500px]'
    }
  };

  return heightMap[height] || heightMap.medium;
}
