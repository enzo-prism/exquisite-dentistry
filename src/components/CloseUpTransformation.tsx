
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
    <article className={cn("bg-white shadow-md rounded-sm overflow-hidden group", className)}>
      <ComparisonSlider
        beforeImage={transformation.beforeImage}
        afterImage={transformation.afterImage}
        beforeAlt={`Close up dental transformation before ${transformation.id}`}
        afterAlt={`Close up dental transformation after ${transformation.id}`}
        label={`Compare before and after smile detail ${transformation.id.replace('transformation-', '')}`}
        objectPosition="center 30%"
        minAspectRatio={aspectRatioBounds.min}
        maxAspectRatio={aspectRatioBounds.max}
        aspectRatio={aspectRatioBounds.default}
      />
      <div className="p-5">
        <h3 className="text-lg font-medium">Smile detail</h3>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          {transformation.description || 'Before-and-after close-up. Treatment details for this case are not listed.'}
        </p>
      </div>
    </article>
  );
};

export default CloseUpTransformationCard;
