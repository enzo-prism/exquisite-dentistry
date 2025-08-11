import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import ImageComponent from './Image';

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
      <div className="relative aspect-[4/5] min-h-[400px]">
        <ImageComponent 
          src={imageSrc}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full"
          objectPosition="center 20%"
          fill
          priority
          loadingVariant="skeleton"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent md:from-black/80 md:via-black/40 flex flex-col items-center justify-center text-white p-8">
          <div className={`w-16 h-16 rounded-full ${iconBgColor} flex items-center justify-center mb-6 shadow-lg`}>
            <Icon className="h-7 w-7 text-gold" />
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold mb-3 text-center text-shadow-strong">
            {title}
          </h3>
          <p className="text-center text-white/95 md:text-gray-200 mb-6 leading-relaxed text-shadow-medium">
            {description}
          </p>
          <Link to={buttonLink} className="inline-flex">
            <div className="bg-gold hover:bg-gold/90 text-white px-6 py-3 rounded-sm font-medium transition-colors duration-300 shadow-lg hover:shadow-xl">
              {buttonText}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SpecialMomentCard;