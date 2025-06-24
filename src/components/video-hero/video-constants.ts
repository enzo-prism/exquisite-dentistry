// Height options
export const getHeightClasses = (height: 'small' | 'medium' | 'large' | 'full' | 'auto') => {
  switch (height) {
    case 'small':
      return 'min-h-[50vh]';
    case 'medium':
      return 'min-h-[70vh]';
    case 'large':
      return 'min-h-[90vh]';
    case 'full':
      return 'min-h-screen';
    case 'auto':
    default:
      return 'min-h-[80vh]';
  }
};

// Default video configuration
export const DEFAULT_HERO_VIMEO_ID = '1085421103';

// YouTube video configurations for different pages
export const YOUTUBE_VIDEOS = {
  IMPLANTS: 'yHnOUAXX0-8',
  PREVENTATIVE: 'dTIFaONIJ0c',
  BOTOX: 'Zat0v7SJpls',
  BLOG: 'mz7r9AR3FcE',
  GENERAL: 'dBz58cFzJTY',
  COSMETIC: 'UBGLMKNhAZc'
} as const;

// Optimized poster images for faster initial load
export const VIDEO_POSTERS = {
  DEFAULT: '/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png',
  WEDDING: '/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png',
  GRADUATION: '/lovable-uploads/ed8ac06c-537d-4671-ad56-dceafa37deb8.png'
} as const;

// Video loading configuration
export const VIDEO_CONFIG = {
  LOAD_DELAY: 1000, // Delay before loading video
  IDLE_TIMEOUT: 2000, // Timeout for requestIdleCallback
  INTERSECTION_MARGIN: '100px', // Start loading before video is visible
  INTERSECTION_THRESHOLD: 0.1
} as const;
