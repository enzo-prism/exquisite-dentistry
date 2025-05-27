
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight,
  Eye,
  Smile,
  Heart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

interface DrAguilImageItem {
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
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
    caption: 'Dr. Aguil reviewing patient scans'
  },
  {
    src: '/lovable-uploads/087a65dd-859a-4356-a682-58793125626f.png',
    alt: 'Dr. Alexie Aguil with patient',
    caption: 'Providing personalized consultations'
  },
  {
    src: '/lovable-uploads/a88d0fa1-399a-4043-ba91-b3a84e19149a.png',
    alt: 'Dr. Alexie Aguil portrait',
    caption: 'Award-winning cosmetic dentist'
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
            {images.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-sm shadow-lg group h-80">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  width={400}
                  height={320}
                />
                
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent z-10">
                    <p className="text-white text-sm font-medium">{image.caption}</p>
                  </div>
                )}
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <Link to="/about">
                    <Button variant="ghost" size="sm" className="text-white bg-black/30 hover:bg-black/50 shadow-md">
                      <Eye size={16} className="mr-2" />
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {showButton && (
            <div className="mt-12 text-center">
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="group shadow-md hover:shadow-lg"
                >
                  Learn More About Dr. Aguil
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
