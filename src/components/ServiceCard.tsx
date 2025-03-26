
import React from 'react';
import { cn } from '@/lib/utils';
import Button from './Button';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  className?: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  href,
  className,
  index = 0
}) => {
  return (
    <div 
      className={cn(
        'bg-white rounded-sm shadow-md p-8 transition-all duration-500 hover:shadow-xl opacity-0',
        index % 2 === 0 ? 'animate-fade-in-right' : 'animate-fade-in-left',
        className
      )}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-6 text-gold">
        {icon}
      </div>
      <h3 className="heading-sm mb-4 text-black">{title}</h3>
      <p className="paragraph mb-6">{description}</p>
      {href ? (
        <Link to={href}>
          <Button variant="outline" size="sm">Learn More</Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm">Learn More</Button>
      )}
    </div>
  );
};

export default ServiceCard;
