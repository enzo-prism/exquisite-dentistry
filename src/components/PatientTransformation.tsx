
import React, { useState, useRef, useCallback } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';

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
  const [sliderPosition, setSliderPosition] = useState(50); // Start at 50% to show both images
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add event listeners for mouse and touch events
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className={cn("bg-white shadow-md rounded-sm overflow-hidden", className)}>
      <div 
        ref={containerRef}
        className="relative cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <AspectRatio ratio={4/3}>
          <div className="relative w-full h-full overflow-hidden">
            {/* After image (full background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={patient.afterImage}
                alt={`${patient.name} after ${patient.procedure}`}
                className="w-full h-full object-cover"
                width={400}
                height={300}
                draggable={false}
              />
            </div>
            
            {/* Before image (clipped by slider position) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ 
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` 
              }}
            >
              <img
                src={patient.beforeImage}
                alt={`${patient.name} before ${patient.procedure}`}
                className="w-full h-full object-cover"
                width={400}
                height={300}
                draggable={false}
              />
            </div>

            {/* Slider line and handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Slider handle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center cursor-ew-resize">
                <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
                <div className="w-1 h-4 bg-gray-400 rounded-full mx-0.5"></div>
              </div>
            </div>
          </div>
        </AspectRatio>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
          <span className="bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
            Before
          </span>
          <span className="bg-black/70 text-white px-2 py-1 rounded text-sm font-medium">
            After
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium">{patient.name}</h3>
      </div>
    </div>
  );
};

export default PatientTransformationCard;
