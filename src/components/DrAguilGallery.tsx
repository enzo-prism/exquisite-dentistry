
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Star, CheckCircle } from 'lucide-react';
import ImageComponent from '@/components/Image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
    src: '/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png', // NEW: Premium Business Portrait
    alt: 'Dr. Alexie Aguil - Premium business portrait',
    caption: 'Dr. Aguil - Excellence in cosmetic dentistry',
    featured: true,
  },
  {
    src: '/lovable-uploads/7fc03f27-6c3a-4d2a-bba6-961af127a9f0.png', // NEW: Clinical Portrait B&W
    alt: 'Dr. Aguil clinical portrait in dental office',
    caption: 'Professional excellence in dental care',
    featured: false,
  },
  {
    src: '/lovable-uploads/fc6628ee-e664-4138-9abd-756dbcfc9889.png', // NEW: Casual Office Portrait
    alt: 'Dr. Aguil in his dental office wearing scrubs',
    caption: 'Comfortable, personalized care',
    featured: false,
  },
  {
    src: '/lovable-uploads/ced61c9e-85aa-49c9-8378-f0ed60da48fc.png', // NEW: Smile Close-up
    alt: 'Dr. Aguil beautiful smile showcase',
    caption: 'Beautiful results, beautiful smiles',
    featured: false,
  },
];

const achievements = [
  { icon: Award, label: 'Board Certified', value: 'Cosmetic Dentistry' },
  { icon: Users, label: 'Happy Patients', value: '2,500+' },
  { icon: Star, label: 'Years Experience', value: '15+' },
  { icon: CheckCircle, label: 'Success Rate', value: '98%' }
];

const highlights = [
  'Precision-crafted smile transformations',
  'Advanced cosmetic dentistry techniques',
  'Personalized treatment planning',
  'Comfortable, anxiety-free experience'
];

const DrAguilGallery: React.FC<DrAguilGalleryProps> = ({
  title = "Meet Dr. Alexie Aguil",
  subtitle = "Transforming smiles with precision, artistry, and compassionate care",
  images = defaultImages,
  showButton = true,
  className,
  compact = false
}) => {
  const isMobile = useIsMobile();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const featuredImage = images.find(img => img.featured) || images[0];

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden isolation">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-3 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full blur-3xl transform-gpu"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl transform-gpu"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("w-full", className)}>
          {!compact && (
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gold/10 text-gold rounded-full text-sm sm:text-base font-medium mb-6">
                <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                EXQUISITE DENTISTRY
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            </div>
          )}

          {/* Main content layout */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-6 sm:space-y-8">
              {/* Achievement stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4 lg:gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 sm:p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 sm:w-8 sm:h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                        <achievement.icon className="w-5 h-5 sm:w-4 sm:h-4 text-gold" />
                      </div>
                      <span className="text-sm sm:text-sm lg:text-base text-gray-600 font-medium">{achievement.label}</span>
                    </div>
                    <div className="text-2xl sm:text-xl lg:text-2xl font-bold text-gray-900">
                      {achievement.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-6">Why Choose Dr. Aguil?</h3>
                <div className="space-y-4 sm:space-y-5">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 sm:gap-4">
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gold mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              {showButton && (
                <div className="pt-4">
                  <Link to="/about">
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-base font-semibold"
                    >
                      Learn More About Dr. Aguil
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Right side - Images */}
            <div className="relative z-20">
              {/* Main featured image */}
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
                  <ImageComponent
                    src={featuredImage.src}
                    alt={featuredImage.alt}
                    fill={true}
                    priority
                    loadingVariant="elegant"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  
                  {/* Floating info card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-30 bg-white sm:bg-white/95 sm:backdrop-blur-sm rounded-xl p-4 sm:p-5 shadow-lg">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gold/10 rounded-full flex items-center justify-center">
                        <Star className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">Dr. Alexie Aguil</div>
                        <div className="text-xs sm:text-sm text-gray-600">Cosmetic Dentistry Specialist</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary images */}
                {images.length > 1 && (
                  <div className="absolute -bottom-8 -right-8 z-25 hidden lg:block">
                    <div className="grid grid-cols-2 gap-3">
                      {images.slice(1, 3).map((image, index) => (
                        <div 
                          key={index} 
                          className="w-24 h-24 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => setActiveImageIndex(index + 1)}
                        >
                          <ImageComponent
                            src={image.src}
                            alt={image.alt}
                            fill={true}
                            loadingVariant="elegant"
                            objectFit="cover"
                            objectPosition="center"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 z-5 w-16 h-16 bg-gradient-to-br from-gold to-yellow-400 rounded-full opacity-20 pointer-events-none transform-gpu"></div>
              <div className="absolute -bottom-6 -right-6 z-5 w-20 h-20 bg-gradient-to-br from-primary to-blue-500 rounded-full opacity-15 pointer-events-none transform-gpu"></div>
            </div>
          </div>

          {/* Mobile image gallery */}
          {isMobile && images.length > 1 && (
            <div className="mt-8 sm:mt-12 lg:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 px-1">
                {images.map((image, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <ImageComponent
                      src={image.src}
                      alt={image.alt}
                      fill={true}
                      loadingVariant="elegant"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DrAguilGallery;
