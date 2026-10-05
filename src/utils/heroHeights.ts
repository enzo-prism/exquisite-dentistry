
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
      mobile: 'min-h-[min(480px,60svh)]',
      desktop: 'min-h-[60vh] md:min-h-[65vh] lg:min-h-[70vh]'
    },
    medium: {
      // Content can grow with text zoom and short landscape viewports. Normal
      // phones also see the next section without a full viewport of empty hero.
      mobile: 'min-h-[min(620px,75svh)]',
      desktop: 'min-h-[min(78svh,760px)] lg:min-h-[min(82svh,800px)]'
    },
    large: {
      mobile: 'min-h-[min(680px,80svh)]',
      desktop: 'min-h-[min(84svh,800px)] lg:min-h-[min(88svh,900px)]'
    },
    full: {
      mobile: 'min-h-[90svh]',
      desktop: 'min-h-[90vh] md:min-h-[95vh] lg:min-h-screen'
    },
    auto: {
      mobile: 'min-h-[min(480px,60svh)]',
      desktop: 'min-h-[500px]'
    }
  };

  return heightMap[height] || heightMap.medium;
}
