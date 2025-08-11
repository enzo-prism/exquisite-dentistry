import React, { useState } from 'react';

interface SimpleSpecialMomentImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SimpleSpecialMomentImage: React.FC<SimpleSpecialMomentImageProps> = ({ 
  src, 
  alt, 
  className = ""
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  const renderFallback = () => (
    <div className={`${className} bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center`}>
      <div className="text-center p-4 md:p-8">
        <div className="w-8 h-8 md:w-12 md:h-12 bg-primary/30 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
          <svg className="w-4 h-4 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-primary/70 text-xs md:text-sm">Beautiful Smile Preview</p>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className={`${className} bg-gradient-to-br from-primary/10 to-secondary/10 animate-pulse`}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );

  if (hasError) {
    return renderFallback();
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && renderLoading()}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="eager"
      />
    </div>
  );
};

export default SimpleSpecialMomentImage;