
import React from 'react';
import { ComparisonSlider } from '@/components/ui/comparison-slider';
import { getDentalPhotoAspectRatioBounds } from '@/utils/imageFraming';
import { cn } from '@/lib/utils';

export interface CloseUpTransformationData {
  id: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

interface CloseUpTransformationCardProps {
  transformation: CloseUpTransformationData;
  className?: string;
}

const CloseUpTransformationCard: React.FC<CloseUpTransformationCardProps> = ({
  transformation,
  className
}) => {
  const aspectRatioBounds = getDentalPhotoAspectRatioBounds();

  return (
    <div className={cn("bg-white shadow-md rounded-sm overflow-hidden group", className)}>
      <ComparisonSlider
        beforeImage={transformation.beforeImage}
        afterImage={transformation.afterImage}
        beforeAlt={`Close-up dental transformation before - ${transformation.id}`}
        afterAlt={`Close-up dental transformation after - ${transformation.id}`}
        objectPosition="center 30%"
        minAspectRatio={aspectRatioBounds.min}
        maxAspectRatio={aspectRatioBounds.max}
        aspectRatio={aspectRatioBounds.default}
      />
    </div>
  );
};

export default CloseUpTransformationCard;
