
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import ImageComponent from '@/components/Image';
import { calculateImageAlignment, preloadImagePair, createResizeHandler } from '@/utils/imageAlignment';

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
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [alignmentCalculated, setAlignmentCalculated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Calculate aligned positioning for both images
  const alignment = calculateImageAlignment({
    beforeImage: transformation.beforeImage,
    afterImage: transformation.afterImage,
    beforeObjectPosition: "center 30%",
    afterObjectPosition: "center 30%"
  });

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

  // Preload and validate image pair
  useEffect(() => {
    preloadImagePair(transformation.beforeImage, transformation.afterImage)
      .then(() => {
        setImagesLoaded(true);
        setAlignmentCalculated(true);
      })
      .catch((error) => {
        console.warn('Failed to preload image pair:', error);
        setImagesLoaded(true);
        setAlignmentCalculated(true);
      });
  }, [transformation.beforeImage, transformation.afterImage]);

  // Handle resize events
  useEffect(() => {
    const resizeHandler = createResizeHandler(() => {
      setAlignmentCalculated(true);
    });
    
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
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
    <div className={cn("bg-white shadow-md rounded-sm overflow-hidden group", className)}>
      <div 
        ref={containerRef}
        className="relative cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <AspectRatio ratio={4/3}>
          <div className="relative w-full h-full overflow-hidden">
            {/* Loading state */}
            {!imagesLoaded && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              </div>
            )}
            
            {imagesLoaded && alignmentCalculated && (
              <>
                {/* After image (full background) */}
                <div className="absolute inset-0 w-full h-full">
                  <ImageComponent
                    src={transformation.afterImage}
                    alt={`Dental transformation after - ${transformation.id}`}
                    className="w-full h-full object-cover"
                    width={400}
                    height={300}
                    objectFit="cover"
                    objectPosition={alignment.afterPosition}
                    draggable={false}
                    priority={true}
                  />
                </div>
                
                {/* Before image (clipped by slider position) */}
                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ 
                    clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    transform: 'translateZ(0)' // Force hardware acceleration
                  }}
                >
                  <ImageComponent
                    src={transformation.beforeImage}
                    alt={`Dental transformation before - ${transformation.id}`}
                    className="w-full h-full object-cover"
                    width={400}
                    height={300}
                    objectFit="cover"
                    objectPosition={alignment.beforePosition}
                    draggable={false}
                    priority={true}
                  />
                </div>
              </>
            )}

            {/* Smooth slider line */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className={cn(
                "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-ew-resize transition-transform duration-100",
                (isHovering || isDragging) ? "scale-105" : "scale-100"
              )}>
                <div className="flex space-x-0.5">
                  <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
                  <div className="w-0.5 h-4 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </AspectRatio>
      </div>
    </div>
  );
};

export default CloseUpTransformationCard;
