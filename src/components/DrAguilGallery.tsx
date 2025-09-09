import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Star, CheckCircle } from 'lucide-react';
import ImageComponent from '@/components/Image';
import { Button } from '@/components/ui/button';
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
    src: '/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png',
    alt: 'Dr. Alexie Aguil - Premium business portrait',
    caption: 'Dr. Aguil - Excellence in cosmetic dentistry',
    featured: true,
  },
  {
    src: '/lovable-uploads/7fc03f27-6c3a-4d2a-bba6-961af127a9f0.png',
    alt: 'Dr. Aguil clinical portrait in dental office',
    caption: 'Professional excellence in dental care',
    featured: false,
  },
  {
    src: '/lovable-uploads/fc6628ee-e664-4138-9abd-756dbcfc9889.png',
    alt: 'Dr. Aguil in his dental office wearing scrubs',
    caption: 'Comfortable, personalized care',
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

// Extracted Achievement Card Component
const AchievementCard: React.FC<{ achievement: typeof achievements[0]; index: number }> = ({ achievement, index }) => (
  <div className="bg-background rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
        <achievement.icon className="w-5 h-5 text-gold" />
      </div>
      <span className="text-sm text-muted-foreground font-medium">{achievement.label}</span>
    </div>
    <div className="text-2xl font-bold text-foreground">
      {achievement.value}
    </div>
  </div>
);

// Extracted Highlights Section Component
const HighlightsSection: React.FC = () => (
  <div className="bg-background rounded-xl p-6 sm:p-8 shadow-sm border">
    <h3 className="text-xl font-semibold text-foreground mb-6">Why Choose Dr. Aguil?</h3>
    <div className="space-y-4">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
          <span className="text-muted-foreground leading-relaxed">{highlight}</span>
        </div>
      ))}
    </div>
  </div>
);

// Extracted Image Gallery Component
const ImageGallery: React.FC<{ featuredImage: DrAguilImageItem; images: DrAguilImageItem[] }> = ({ featuredImage, images }) => (
  <div className="relative">
    {/* Main featured image */}
    <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg">
      <ImageComponent
        src={featuredImage.src}
        alt={featuredImage.alt}
        fill={true}
        priority
        loadingVariant="elegant"
        objectFit="cover"
        objectPosition="center"
      />
      
      {/* Simple info overlay */}
      <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-gold" />
          </div>
          <div>
            <div className="font-semibold text-foreground">Dr. Alexie Aguil</div>
            <div className="text-sm text-muted-foreground">Cosmetic Dentistry Specialist</div>
          </div>
        </div>
      </div>
    </div>

    {/* Secondary images grid - simplified for desktop only */}
    {images.length > 1 && (
      <div className="hidden lg:flex gap-3 mt-4">
        {images.slice(1, 3).map((image, index) => (
          <div key={index} className="w-20 h-20 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200">
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
    )}
  </div>
);

const DrAguilGallery: React.FC<DrAguilGalleryProps> = ({
  title = "Meet Dr. Alexie Aguil",
  subtitle = "Transforming smiles with precision, artistry, and compassionate care",
  images = defaultImages,
  showButton = true,
  className,
  compact = false
}) => {
  const featuredImage = images.find(img => img.featured) || images[0];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("w-full", className)}>
          {/* Header Section */}
          {!compact && (
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                EXQUISITE DENTISTRY
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Achievement Stats Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <AchievementCard key={index} achievement={achievement} index={index} />
                ))}
              </div>

              {/* Highlights Section */}
              <HighlightsSection />

              {/* Call to Action */}
              {showButton && (
                <div className="pt-4">
                  <Link to="/about">
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-600 hover:to-gold text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
                    >
                      Learn More About Dr. Aguil
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Images */}
            <div className="lg:pl-8">
              <ImageGallery featuredImage={featuredImage} images={images} />
            </div>
          </div>

          {/* Mobile Image Strip */}
          {images.length > 1 && (
            <div className="lg:hidden mt-8">
              <div className="flex gap-4 overflow-x-auto pb-4">
                {images.slice(1).map((image, index) => (
                  <div key={index} className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden shadow-md">
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