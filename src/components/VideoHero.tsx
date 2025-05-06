
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileVideoHero from './video-hero/MobileVideoHero';
import DesktopVideoHero from './video-hero/DesktopVideoHero';
import type { VideoHeroProps } from './video-hero/video-hero-types';
import { DEFAULT_HERO_VIMEO_ID } from './video-hero/video-constants';

const VideoHero: React.FC<VideoHeroProps> = (props) => {
  const isMobile = useIsMobile();
  
  // Always use the default Vimeo ID
  const enhancedProps = {
    ...props,
    vimeoId: DEFAULT_HERO_VIMEO_ID
  };
  
  if (isMobile) {
    return <MobileVideoHero {...enhancedProps} />;
  }

  return <DesktopVideoHero {...enhancedProps} />;
};

export { YOUTUBE_VIDEOS } from './video-hero/video-constants';
export type { VideoHeroProps } from './video-hero/video-hero-types';
export default VideoHero;
