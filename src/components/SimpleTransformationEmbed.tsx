import React from 'react';
import PracticeVideoPlayer from './PracticeVideoPlayer';

type VideoAppearance = 'elevated' | 'minimal';

interface SimpleTransformationEmbedProps {
  source: string;
  title: string;
  poster?: string;
  className?: string;
  appearance?: VideoAppearance;
  loop?: boolean;
}

const SimpleTransformationEmbed: React.FC<SimpleTransformationEmbedProps> = ({
  source,
  title,
  poster,
  className,
  appearance = 'elevated',
  loop = false
}) => {
  const fallbackPoster = 'https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png';
  const resolvedPoster = poster || fallbackPoster;

  return (
    <PracticeVideoPlayer
      source={source}
      poster={resolvedPoster}
      title={title}
      className={className}
      appearance={appearance}
      loop={loop}
    />
  );
};

export default SimpleTransformationEmbed;
