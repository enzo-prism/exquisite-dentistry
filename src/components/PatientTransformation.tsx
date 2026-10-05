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
    <article aria-label={`${patient.name}: ${patient.procedure}`} className={cn("group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/15 bg-white shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]", className)}>
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
      
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">{patient.procedure}</p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.01em] text-ink">{patient.name}</h3>
        {patient.description && <p className="mt-2 text-sm leading-6 text-gray-600">{patient.description}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 pt-4">
          <Link to={patient.serviceHref} className="inline-flex min-h-11 items-center text-sm font-semibold text-gold-dark underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold">
            Explore {patient.serviceId === 'smile-makeover' ? 'smile makeovers' : patient.serviceId === 'invisalign' ? 'Invisalign' : patient.serviceId === 'dental-implants' ? 'dental implants' : 'porcelain veneers'}
          </Link>
          <Link to={consultationHref(patient.serviceId)} className="inline-flex min-h-11 items-center text-sm font-semibold text-ink underline decoration-black/25 underline-offset-4 transition-colors hover:decoration-black">
            Discuss this treatment
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PatientTransformationCard;
