import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import BulletproofImage from './BulletproofImage';

interface SpecialMomentCardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
  iconBgColor?: string;
}

const SpecialMomentCard: React.FC<SpecialMomentCardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  icon: Icon,
  iconBgColor = "bg-gold/30"
}) => {
  return (
    <div className="relative overflow-hidden rounded-sm shadow-lg group">
      {/* Responsive container with aspect ratio */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[5/6]">
        <BulletproofImage 
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full rounded-sm"
        />
        
        {/* Mobile-optimized overlay with better performance */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center text-white p-4 sm:p-6 md:p-8">
          {/* Responsive icon */}
          <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full ${iconBgColor} flex items-center justify-center mb-3 sm:mb-4 md:mb-6 shadow-lg`}>
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-gold" />
          </div>
          
          {/* Responsive typography */}
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 text-center leading-tight">
            {title}
          </h3>
          
          {/* Mobile-optimized description */}
          <p className="text-center text-white/95 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base max-w-xs sm:max-w-sm px-2">
            {description}
          </p>
          
          {/* Touch-optimized button */}
          <Link to={buttonLink} className="inline-flex">
            <div className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px] flex items-center justify-center">
              {buttonText}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialMomentCard;