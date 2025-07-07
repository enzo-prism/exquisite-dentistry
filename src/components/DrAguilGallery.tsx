
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

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
  },
  {
    src: '/lovable-uploads/a88d0fa1-399a-4043-ba91-b3a84e19149a.png',
    alt: 'Dr. Alexie Aguil portrait',
    caption: 'Award-winning cosmetic dentist',
    fallbackSrc: '/lovable-uploads/8632f149-3a68-4157-809c-902a92a3f3a6.png'
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
  
  console.log('DrAguilGallery rendering with images:', images);
  
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("w-full", className)}>
          {!compact && (
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-sm text-gold font-medium mb-3">EXQUISITE DENTISTRY</span>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">{title}</h2>
              <div className="separator mx-auto"></div>
              <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {images.map((image, index) => {
              console.log(`Rendering image ${index}:`, image.src);
              return (
                <div key={index} className="relative overflow-hidden rounded-sm shadow-lg group aspect-[4/3]">
                  <OptimizedImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-105"
                    width={400}
                    height={300}
                    fallbackSrc={image.fallbackSrc || '/placeholder.svg'}
                    priority={index === 0}
                    loadingVariant="elegant"
                    onLoad={() => console.log(`✅ Image ${index} loaded successfully`)}
                    onError={() => console.error(`❌ Image ${index} failed to load:`, image.src)}
                  />
                  
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-10">
                      <p className="text-white text-sm font-medium">{image.caption}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {showButton && (
            <div className="mt-12 text-center">
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group shadow-md hover:shadow-lg"
                >
                  Meet Dr. Aguil - Our Expert Dentist
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
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
