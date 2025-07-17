
import React from 'react';
import { cn } from '@/lib/utils';
import ImageComponent from '@/components/Image';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  bgImage,
  className
}) => {
  return (
    <div 
      className={cn(
        "relative py-24 md:py-32 overflow-hidden",
        className
      )}
    >
      {bgImage && (
        <>
          <div className="absolute inset-0 z-0">
            <ImageComponent
              src={bgImage}
              alt=""
              className="w-full h-full"
              width={1920}
              height={600}
              fill
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        </>
      )}
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold mb-4",
          bgImage ? "text-white" : "text-black"
        )}>
          {title}
        </h1>
        
        {subtitle && (
          <p className={cn(
            "text-lg md:text-xl max-w-3xl mx-auto",
            bgImage ? "text-white/80" : "text-gray-600"
          )}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
