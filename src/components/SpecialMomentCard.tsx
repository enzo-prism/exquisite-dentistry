import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import SpecialMomentImage from './SpecialMomentImage';

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
    <div className="relative overflow-hidden rounded-sm shadow-lg group transform transition-transform hover:scale-[1.01] duration-300">
      <div className="relative aspect-[4/5] min-h-[400px] md:min-h-[500px]">
        <SpecialMomentImage 
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full rounded-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center text-white p-6 md:p-8">
          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full ${iconBgColor} flex items-center justify-center mb-4 md:mb-6 shadow-lg`}>
            <Icon className="h-6 w-6 md:h-7 md:w-7 text-gold" />
          </div>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 text-center">
            {title}
          </h3>
          <p className="text-center text-white/95 mb-6 leading-relaxed text-sm md:text-base max-w-sm">
            {description}
          </p>
          <Link to={buttonLink} className="inline-flex">
            <div className="bg-gold hover:bg-gold/90 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-sm font-medium transition-colors duration-300 shadow-lg hover:shadow-xl text-sm md:text-base">
              {buttonText}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialMomentCard;