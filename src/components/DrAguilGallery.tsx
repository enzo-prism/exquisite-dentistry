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
    src: '/lovable-uploads/0fd21f21-b7ba-404a-a028-16662a8dc60a.png',
    alt: 'Dr. Alexie Aguil in scrubs',
    featured: true
  },
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
  // Get the featured image or the first one
  const featuredImage = images.find(img => img.featured) || images[0];
  const remainingImages = images.filter(img => img !== featuredImage).slice(0, 3);
  
  return (
    <div className={cn("w-full", className)}>
      {!compact && (
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm text-gold font-medium mb-3">EXQUISITE DENTISTRY</span>
          <h2 className="heading-lg mb-6">{title}</h2>
          <div className="separator"></div>
          <p className="paragraph mt-6">
            {subtitle}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Featured image takes up more space */}
        <div className={cn(
          "relative overflow-hidden rounded-sm shadow-lg group",
          compact ? "col-span-1" : "md:col-span-2 lg:col-span-2 md:row-span-2"
        )}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <img 
            src={featuredImage.src} 
            alt={featuredImage.alt} 
            className="w-full h-full object-cover aspect-[4/3]"
          />
          
          {!compact && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 border-2 border-gold">
                  <AvatarImage src={featuredImage.src} alt="Dr. Aguil" />
                  <AvatarFallback>AA</AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <h3 className="font-medium text-lg leading-tight">Dr. Alexie Aguil, DDS</h3>
                  <p className="text-sm text-gold">Founder, Exquisite Dentistry</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Smaller images */}
        {!compact && remainingImages.map((image, index) => (
          <div key={index} className="relative overflow-hidden rounded-sm shadow-md group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover aspect-square"
            />
            
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="text-white text-sm font-medium">{image.caption}</p>
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/about">
                <Button variant="ghost" size="sm" className="text-white bg-black/30 hover:bg-black/50">
                  <Eye size={16} className="mr-2" />
                  View
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {showButton && !compact && (
        <div className="text-center mt-10">
          <Link to="/about">
            <Button variant="outline" className="group">
              Learn More About Dr. Aguil
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DrAguilGallery;
