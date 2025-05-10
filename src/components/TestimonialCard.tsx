
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TestimonialType {
  id: number;
  name: string;
  title?: string;
  content: string;
  rating: number;
  image?: string;
  featured?: boolean;
}

interface TestimonialCardProps {
  testimonial: TestimonialType;
  className?: string;
}

const TestimonialCard = ({ testimonial, className }: TestimonialCardProps) => {
  const { content, name, title, rating } = testimonial;
  
  return (
    <div className={cn(
      'bg-white p-6 rounded-sm shadow-md transition-all duration-300 hover:shadow-lg',
      className
    )}>
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star 
            key={index}
            size={16}
            className={cn(
              index < rating ? 'text-gold fill-gold' : 'text-gray-300'
            )}
          />
        ))}
      </div>
      <blockquote className="text-black-light italic mb-6">
        "{content}"
      </blockquote>
      <div className="flex flex-col">
        <span className="font-medium text-black">{name}</span>
        {title && (
          <span className="text-sm text-black-light">{title}</span>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
