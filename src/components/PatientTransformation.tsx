
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import OptimizedImage from './OptimizedImage';

export interface PatientTransformationData {
  name: string;
  procedure: string;
  description?: string;
  beforeImage: string;
  afterImage: string;
}

interface PatientTransformationCardProps {
  patient: PatientTransformationData;
  className?: string;
}

const PatientTransformationCard: React.FC<PatientTransformationCardProps> = ({
  patient,
  className
}) => {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className={cn("bg-white shadow-md rounded-sm overflow-hidden", className)}>
      <div className="relative">
        <AspectRatio ratio={4/3}>
          <div className="relative w-full h-full">
            {/* Before image (shown when showAfter is false) */}
            <div className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-500",
              showAfter ? "opacity-0" : "opacity-100"
            )}>
              <OptimizedImage
                src={patient.beforeImage}
                alt={`${patient.name} before ${patient.procedure}`}
                className="w-full h-full"
                objectFit="cover"
                width={400}
                height={300}
              />
            </div>
            
            {/* After image (shown when showAfter is true) */}
            <div className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-500",
              showAfter ? "opacity-100" : "opacity-0"
            )}>
              <OptimizedImage
                src={patient.afterImage}
                alt={`${patient.name} after ${patient.procedure}`}
                className="w-full h-full"
                objectFit="cover"
                width={400}
                height={300}
              />
            </div>
          </div>
        </AspectRatio>

        {/* Before/After toggle buttons */}
        <div className="absolute bottom-0 left-0 right-0 flex">
          <button 
            className={cn(
              "flex-1 py-2 text-sm font-medium",
              !showAfter 
                ? "bg-gold text-white" 
                : "bg-black/50 text-white/90 hover:bg-black/60"
            )}
            onClick={() => setShowAfter(false)}
            type="button"
          >
            Before
          </button>
          <button 
            className={cn(
              "flex-1 py-2 text-sm font-medium",
              showAfter 
                ? "bg-gold text-white" 
                : "bg-black/50 text-white/90 hover:bg-black/60"
            )}
            onClick={() => setShowAfter(true)}
            type="button"
          >
            After
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium">{patient.name}</h3>
        <p className="text-gold text-sm mb-2">{patient.procedure}</p>
        {patient.description && (
          <p className="text-gray-600 text-sm">{patient.description}</p>
        )}
      </div>
    </div>
  );
};

export default PatientTransformationCard;
