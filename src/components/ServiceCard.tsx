
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
        'bg-white rounded-sm p-8 transition-all duration-500 shadow-sm hover:shadow-md',
        index % 2 === 0 ? 'animate-fade-in-right' : 'animate-fade-in-left',
        className
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-[#FAF9F6] flex items-center justify-center mb-6">
        <Star className="h-6 w-6 text-gold" />
      </div>
      <h3 className="text-xl font-semibold mb-4 text-black">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {href && (
        <Link to={href}>
          <Button 
            variant="outline" 
            size="sm"
            className="border-gold text-black hover:bg-gold/5"
          >
            Learn More
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
