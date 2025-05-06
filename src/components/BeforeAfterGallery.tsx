
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Define the gallery data
const BEFORE_IMAGE = '/lovable-uploads/b8b09898-85a7-4f21-bfe0-9cd80182c3da.png'; // Before image
const AFTER_IMAGE = '/lovable-uploads/8e0ec094-da3e-4ceb-b2aa-509a88c78b77.png'; // After image
const FALLBACK_IMAGE = '/lovable-uploads/2fb5c7d2-e25a-4153-a61e-04d767c89307.png'; // Fallback image

const BeforeAfterGallery: React.FC = () => {
  const [showAfter, setShowAfter] = useState(false);

  // Simple toggle function
  const toggleImage = () => {
    setShowAfter(prev => !prev);
  };

  // Simple error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('Image failed to load, using fallback');
    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="overflow-hidden max-w-xl w-full mx-auto">
        <div className="relative">
          <img
            src={showAfter ? AFTER_IMAGE : BEFORE_IMAGE}
            alt={showAfter ? "After dental treatment" : "Before dental treatment"}
            className="w-full h-auto object-cover"
            onError={handleImageError}
          />
          <div className="absolute top-4 left-4 bg-black/70 text-white text-sm font-medium py-1 px-3 rounded">
            {showAfter ? 'AFTER' : 'BEFORE'}
          </div>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-xl font-medium mb-4">Ryan's Smile Transformation</h3>
          <Button 
            onClick={toggleImage}
            className="bg-gold hover:bg-gold/90 text-white"
          >
            {showAfter ? 'View Before' : 'View After'}
          </Button>
        </div>
      </Card>
      
      <div className="mt-12 text-center max-w-2xl mx-auto">
        <p className="text-lg text-gray-700">
          This transformation showcases our commitment to creating natural, beautiful smiles.
          Our cosmetic dentistry services helped Ryan achieve the confident smile he deserved.
        </p>
      </div>
    </div>
  );
};

export default BeforeAfterGallery;
