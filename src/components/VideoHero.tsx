
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileVideoHero from './video-hero/MobileVideoHero';
import DesktopVideoHero from './video-hero/DesktopVideoHero';
import type { VideoHeroProps } from './video-hero/video-hero-types';
import { DEFAULT_HERO_VIMEO_ID } from './video-hero/video-constants';
import { getVideoHeroPosterForPath } from './video-hero/route-posters';
import { usePerformance } from '@/hooks/use-performance';

const VideoHero: React.FC<VideoHeroProps> = (props) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { isReducedMotion, isSlowConnection } = usePerformance();
  const adaptiveDisableVideo = useMemo(() => {
    if (props.disableVideo) return true;
    if (props.preferStaticOnMobile && isMobile) return true;
    if (isReducedMotion) return true;
    return isSlowConnection;
  }, [props.disableVideo, props.preferStaticOnMobile, isMobile, isReducedMotion, isSlowConnection]);

  const resolvedPosterSrc = useMemo(
    () => props.posterSrc ?? getVideoHeroPosterForPath(location.pathname),
    [location.pathname, props.posterSrc]
  );
  
  const enhancedProps = {
    ...props,
    vimeoId: props.vimeoId || DEFAULT_HERO_VIMEO_ID,
    posterSrc: resolvedPosterSrc,
    disableVideo: adaptiveDisableVideo
  };
  
  if (isMobile) {
    return <MobileVideoHero {...enhancedProps} />;
  }

  return <DesktopVideoHero {...enhancedProps} />;
};

export { VIDEO_TESTIMONIALS, YOUTUBE_VIDEOS } from './video-hero/video-constants';
export type { VideoHeroProps } from './video-hero/video-hero-types';
export default VideoHero;
