import React from 'react';
import { ComparisonSlider } from '@/components/ui/comparison-slider';
import { getDentalPhotoAspectRatioBounds } from '@/utils/imageFraming';
import { cn } from '@/lib/utils';

export interface PatientTransformationData {
  name: string;
  procedure: string;
  description?: string;
  beforeImage: string;
  afterImage: string;
  afterObjectPosition?: string;
  beforeObjectPosition?: string;
}

interface PatientTransformationCardProps {
  patient: PatientTransformationData;
  className?: string;
}

const PatientTransformationCard: React.FC<PatientTransformationCardProps> = ({
  patient,
  className
}) => {
  const aspectRatioBounds = getDentalPhotoAspectRatioBounds();
  
  // Use custom positioning or smart default
  const objectPosition = patient.beforeObjectPosition || patient.afterObjectPosition || 'center 25%';

  return (
    <div className={cn("bg-white shadow-md rounded-sm overflow-hidden group", className)}>
      <ComparisonSlider
        beforeImage={patient.beforeImage}
        afterImage={patient.afterImage}
        beforeAlt={`${patient.name} - Before ${patient.procedure}`}
        afterAlt={`${patient.name} - After ${patient.procedure}`}
        objectPosition={objectPosition}
        minAspectRatio={aspectRatioBounds.min}
        maxAspectRatio={aspectRatioBounds.max}
        aspectRatio={aspectRatioBounds.default}
      />
      
      <div className="p-4">
        <h3 className="text-lg font-medium">{patient.name}</h3>
      </div>
    </div>
  );
};

export default PatientTransformationCard;
