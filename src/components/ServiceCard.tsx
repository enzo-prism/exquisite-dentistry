
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  href?: string;
  className?: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  href,
  className,
  index = 0
}) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-sm p-6 sm:p-8 transition-all duration-500 shadow-sm hover:shadow-md h-full',
        index % 2 === 0 ? 'animate-fade-in-right' : 'animate-fade-in-left',
        className
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#FAF9F6] flex items-center justify-center mb-4 sm:mb-6">
        <Star className="h-5 w-5 sm:h-6 sm:w-6 text-gold" />
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black">{title}</h3>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{description}</p>
      {href && (
        <Link to={href}>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gold text-black hover:bg-gold/5 mt-auto"
          >
            Learn More
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
