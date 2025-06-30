
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileVideoHero from './video-hero/MobileVideoHero';
import DesktopVideoHero from './video-hero/DesktopVideoHero';
import type { VideoHeroProps } from './video-hero/video-hero-types';
import { DEFAULT_HERO_VIMEO_ID, VIDEO_POSTERS } from './video-hero/video-constants';

const VideoHero: React.FC<VideoHeroProps> = (props) => {
  const isMobile = useIsMobile();
  
  // Use the provided Vimeo ID if available, otherwise fall back to the default
  // Also provide a default poster image
  const enhancedProps = {
    ...props,
    vimeoId: props.vimeoId || DEFAULT_HERO_VIMEO_ID,
    posterSrc: props.posterSrc || VIDEO_POSTERS.hero
  };
  
  console.log('VideoHero rendering with props:', enhancedProps);
  
  if (isMobile) {
    return <MobileVideoHero {...enhancedProps} />;
  }

  return <DesktopVideoHero {...enhancedProps} />;
};

export { YOUTUBE_VIDEOS } from './video-hero/video-constants';
export type { VideoHeroProps } from './video-hero/video-hero-types';
export default VideoHero;
