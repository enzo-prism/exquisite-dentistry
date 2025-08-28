// Shared video aspect ratio constants
export const VIDEO_ASPECT_RATIO = 16 / 9;
export const VIDEO_ASPECT_RATIO_STRING = '16/9';

// Container constraints for consistent video display
export const VIDEO_CONTAINER_CONSTRAINTS = {
  maxWidth: '100%',
  aspectRatio: VIDEO_ASPECT_RATIO_STRING,
  contain: 'layout' as const,
  containIntrinsicSize: '100% 56.25%' // 16:9 ratio = 56.25% height
};