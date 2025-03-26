
import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  location?: string;
  rating: number;
  className?: string;
}

const TestimonialCard = ({ quote, author, location, rating = 5, className }: TestimonialCardProps) => {
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
        "{quote}"
      </blockquote>
      <div className="flex flex-col">
        <span className="font-medium text-black">{author}</span>
        {location && (
          <span className="text-sm text-black-light">{location}</span>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
