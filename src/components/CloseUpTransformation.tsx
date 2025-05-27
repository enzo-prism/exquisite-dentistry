
import React, { useState, useRef, useCallback } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { CloseUpTransformation } from '@/data/closeUpTransformations';

interface CloseUpTransformationCardProps {
  transformation: CloseUpTransformation;
  className?: string;
}

const CloseUpTransformationCard: React.FC<CloseUpTransformationCardProps> = ({
  transformation,
  className
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
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
    <div className={cn("bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200", className)}>
      <div 
        ref={containerRef}
        className="relative cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Optimized aspect ratio for close-up dental photos */}
        <AspectRatio ratio={16/9}>
          <div className="relative w-full h-full overflow-hidden bg-gray-100">
            {/* After image (full background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={transformation.afterImage}
                alt={`After ${transformation.description}`}
                className="w-full h-full object-cover object-center"
                width={500}
                height={281}
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
                src={transformation.beforeImage}
                alt={`Before ${transformation.description}`}
                className="w-full h-full object-cover object-center"
                width={500}
                height={281}
                draggable={false}
              />
            </div>

            {/* Enhanced slider line for better visibility */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xl z-10 border-l-2 border-r-2 border-gold"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Enhanced slider handle for close-up photos */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl border-3 border-gold flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
                <div className="flex space-x-0.5">
                  <div className="w-0.5 h-5 bg-gold rounded-full"></div>
                  <div className="w-0.5 h-5 bg-gold rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Enhanced labels with better contrast */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between pointer-events-none">
              <span className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                Before
              </span>
              <span className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                After
              </span>
            </div>
          </div>
        </AspectRatio>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 leading-relaxed">{transformation.description}</p>
      </div>
    </div>
  );
};

export default CloseUpTransformationCard;
