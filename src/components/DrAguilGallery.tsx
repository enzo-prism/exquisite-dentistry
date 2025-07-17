
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ImageComponent from '@/components/Image';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

interface DrAguilImageItem {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
  fallbackSrc?: string;
}

interface DrAguilGalleryProps {
  title?: string;
  subtitle?: string;
  images?: DrAguilImageItem[];
  showButton?: boolean;
  className?: string;
  compact?: boolean;
}

const defaultImages: DrAguilImageItem[] = [
  {
    src: '/lovable-uploads/8632f149-3a68-4157-809c-902a92a3f3a6.png',
    alt: 'Dr. Alexie Aguil explaining dental x-rays',
    caption: 'Dr. Aguil reviewing patient scans',
    fallbackSrc: '/lovable-uploads/a88d0fa1-399a-4043-ba91-b3a84e19149a.png'
  },
  {
    src: '/lovable-uploads/087a65dd-859a-4356-a682-58793125626f.png',
    alt: 'Dr. Alexie Aguil with patient',
    caption: 'Providing personalized consultations',
    fallbackSrc: '/lovable-uploads/45895aca-ec41-480b-b5a3-b4261464edef.png'
  }
];

const DrAguilGallery: React.FC<DrAguilGalleryProps> = ({
  title = "Meet Dr. Alexie Aguil",
  subtitle = "Exquisite Dentistry's founder and renowned cosmetic dentist serving Los Angeles",
  images = defaultImages,
  showButton = true,
  className,
  compact = false
}) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mobile-first: Show only 1 image on mobile, 2 on tablet, all on desktop
  const visibleImages = isMobile ? [images[currentImageIndex]] : isTablet ? images.slice(0, 2) : images;
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("w-full", className)}>
          {!compact && (
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
              <span className="inline-block text-xs sm:text-sm text-gold font-medium mb-2 sm:mb-3 tracking-wide">
                EXQUISITE DENTISTRY
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 leading-tight">
                {title}
              </h2>
              <div className="separator mx-auto"></div>
              <p className="text-gray-600 mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                {subtitle}
              </p>
            </div>
          )}
          
          {/* Mobile: Single image with navigation */}
          {isMobile && images.length > 1 ? (
            <div className="relative">
              <div className="grid grid-cols-1 gap-4">
                {visibleImages.map((image, index) => (
                  <div key={currentImageIndex} className="relative overflow-hidden rounded-lg shadow-lg group">
                    {/* Mobile: Portrait aspect ratio for better mobile viewing */}
                    <div className="aspect-[3/4] sm:aspect-[4/3]">
                      <ImageComponent
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transform transition-all duration-500 group-active:scale-95"
                        width={400}
                        height={533}
                        priority={index === 0}
                        loadingVariant="elegant"
                      />
                    </div>
                    
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                        <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                          {image.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile navigation buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={prevImage}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-colors",
                        currentImageIndex === index ? "bg-gold" : "bg-gray-300"
                      )}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextImage}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          ) : (
            /* Tablet and Desktop: Grid layout */
            <div className={cn(
              "grid gap-4 sm:gap-6 lg:gap-8",
              isTablet ? "grid-cols-2" : isMobile ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            )}>
              {visibleImages.map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-lg group">
                  {/* Responsive aspect ratios */}
                  <div className="aspect-[3/4] sm:aspect-[4/3]">
                    <ImageComponent
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
                      width={400}
                      height={isMobile ? 533 : 300}
                      priority={index === 0}
                      loadingVariant="elegant"
                    />
                  </div>
                  
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10">
                      <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {showButton && (
            <div className="mt-8 sm:mt-12 text-center">
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size={isMobile ? "default" : "lg"}
                  className={cn(
                    "group shadow-md hover:shadow-lg transition-all",
                    isMobile && "w-full sm:w-auto px-8 py-3 text-base"
                  )}
                >
                  <span className="hidden sm:inline">Meet Dr. Aguil - Our Expert Dentist</span>
                  <span className="sm:hidden">Meet Dr. Aguil</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DrAguilGallery;
