import React from 'react';
import { ComparisonSlider } from '@/components/ui/comparison-slider';
import { getDentalPhotoAspectRatioBounds } from '@/utils/imageFraming';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import type { PatientTransformation } from '@/data/patientTransformations';
import { consultationHref } from '@/data/consultation';

export type PatientTransformationData = PatientTransformation;

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
    <article aria-label={`${patient.name}: ${patient.procedure}`} className={cn("bg-white shadow-md rounded-sm overflow-hidden group flex h-full flex-col", className)}>
      <ComparisonSlider
        beforeImage={patient.beforeImage}
        afterImage={patient.afterImage}
        beforeAlt={`${patient.name} Before ${patient.procedure}`}
        afterAlt={`${patient.name} After ${patient.procedure}`}
        label={`Compare ${patient.name} before and after ${patient.procedure}`}
        beforeObjectPosition={patient.beforeObjectPosition}
        afterObjectPosition={patient.afterObjectPosition}
        objectPosition={objectPosition}
        minAspectRatio={aspectRatioBounds.min}
        maxAspectRatio={aspectRatioBounds.max}
        aspectRatio={aspectRatioBounds.default}
      />
      
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-medium">{patient.name}</h3>
        <p className="mt-1 text-sm font-semibold text-gold-dark">{patient.procedure}</p>
        {patient.description && <p className="mt-2 text-sm leading-6 text-gray-600">{patient.description}</p>}
        <div className="mt-auto flex flex-col gap-2 pt-4">
          <Link to={patient.serviceHref} className="inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark underline underline-offset-4">
            Explore {patient.serviceId === 'smile-makeover' ? 'smile makeovers' : patient.serviceId === 'invisalign' ? 'Invisalign' : patient.serviceId === 'dental-implants' ? 'dental implants' : 'porcelain veneers'}
          </Link>
          <Link to={consultationHref(patient.serviceId)} className="inline-flex min-h-11 items-center text-sm font-semibold text-gray-900 underline underline-offset-4">
            Discuss this treatment
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PatientTransformationCard;
