
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileVideoHero from './video-hero/MobileVideoHero';
import DesktopVideoHero from './video-hero/DesktopVideoHero';
import type { VideoHeroProps } from './video-hero/video-hero-types';

const VideoHero: React.FC<VideoHeroProps> = (props) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return <MobileVideoHero {...props} />;
  }

  return <DesktopVideoHero {...props} />;
};

export { YOUTUBE_VIDEOS } from './video-hero/video-constants';
export type { VideoHeroProps } from './video-hero/video-hero-types';
export default VideoHero;

