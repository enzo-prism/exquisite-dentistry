
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

interface GalleryItem {
  id: string;
  name: string;
  beforeSrc: string;
  afterSrc: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'ryan',
    name: 'Ryan',
    beforeSrc: '/lovable-uploads/cfcb94a5-2958-486f-a740-f950690c9dc5.png', // Updated to use the first uploaded image
    afterSrc: '/lovable-uploads/e47e6790-9bff-4b18-a085-7a6ed12e1648.png', // Updated to use the second uploaded image
  }
];

const BeforeAfterGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'compare'>('grid');
  // Track which items are showing "after" images (true) or "before" images (false)
  // Start with "before" images by default
  const [showAfter, setShowAfter] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    galleryData.forEach(item => {
      initialState[item.id] = false; // Start with "before" images
    });
    return initialState;
  });
  
  // Add loading state for images
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, Record<'before' | 'after', boolean>>>(() => {
    const initialState: Record<string, Record<'before' | 'after', boolean>> = {};
    galleryData.forEach(item => {
      initialState[item.id] = { before: false, after: false };
    });
    return initialState;
  });

  const toggleImage = (id: string) => {
    setShowAfter(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const isMobile = useIsMobile();

  // Default fallback image if loading fails
  const fallbackImage = '/lovable-uploads/2fb5c7d2-e25a-4153-a61e-04d767c89307.png'; // Updated to use the third uploaded image as fallback

  // Mark an image as loaded
  const handleImageLoad = (id: string, type: 'before' | 'after') => {
    setImagesLoaded(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: true
      }
    }));
    console.log(`${type} image for ${id} loaded successfully`);
  };

  // Handle image load error
  const handleImageError = (id: string, type: 'before' | 'after', e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`${type} image load error for ${id}:`, e);
    toast.error(`Failed to load ${type} image for ${id}'s transformation`);
    
    // Set src to fallback
    (e.target as HTMLImageElement).src = fallbackImage;
  };

  // Pre-load images to ensure they're available before rendering
  useEffect(() => {
    galleryData.forEach(item => {
      const beforeImg = new Image();
      beforeImg.onload = () => handleImageLoad(item.id, 'before');
      beforeImg.onerror = (e) => console.error("Before image preload error:", e);
      beforeImg.src = item.beforeSrc;
      
      const afterImg = new Image();
      afterImg.onload = () => handleImageLoad(item.id, 'after');
      afterImg.onerror = (e) => console.error("After image preload error:", e);
      afterImg.src = item.afterSrc;
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Our Transformations</h2>
        
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'compare')}>
          <ToggleGroupItem value="grid" aria-label="Grid View" className="text-sm">
            Grid View
          </ToggleGroupItem>
          <ToggleGroupItem value="compare" aria-label="Compare View" className="text-sm">
            Compare View
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
                <div className="relative">
                  <AspectRatio ratio={4/5} className="bg-gray-100">
                    <div className="relative w-full h-full overflow-hidden">
                      {showAfter[item.id] ? (
                        <>
                          {!imagesLoaded[item.id]?.after && (
                            <Skeleton className="absolute inset-0" />
                          )}
                          <img
                            src={item.afterSrc}
                            alt={`After - ${item.name}`}
                            className="object-cover w-full h-full"
                            onLoad={() => handleImageLoad(item.id, 'after')}
                            onError={(e) => handleImageError(item.id, 'after', e)}
                          />
                        </>
                      ) : (
                        <>
                          {!imagesLoaded[item.id]?.before && (
                            <Skeleton className="absolute inset-0" />
                          )}
                          <img
                            src={item.beforeSrc}
                            alt={`Before - ${item.name}`}
                            className="object-cover w-full h-full"
                            onLoad={() => handleImageLoad(item.id, 'before')}
                            onError={(e) => handleImageError(item.id, 'before', e)}
                          />
                        </>
                      )}
                      <div className="absolute top-3 left-3 bg-black/70 text-white text-xs font-medium py-1 px-2 rounded">
                        {showAfter[item.id] ? 'AFTER' : 'BEFORE'}
                      </div>
                    </div>
                  </AspectRatio>
                  <Toggle
                    pressed={showAfter[item.id]}
                    onPressedChange={() => toggleImage(item.id)}
                    className="absolute bottom-3 right-3 bg-white text-black hover:bg-white/90 shadow-md"
                  >
                    {showAfter[item.id] ? 'View Before' : 'View After'}
                  </Toggle>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-medium mb-2">{item.name}'s Smile Transformation</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {galleryData.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="p-4 sm:p-6">
                <h3 className="text-xl font-medium mb-2">{item.name}'s Smile Transformation</h3>
              </div>
              <div className={cn(
                "grid gap-4 p-4 sm:p-6 pt-0",
                isMobile ? "grid-cols-1" : "grid-cols-2"
              )}>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">BEFORE</h4>
                  <AspectRatio ratio={4/5} className="bg-gray-100 rounded-md overflow-hidden">
                    {!imagesLoaded[item.id]?.before && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <img 
                      src={item.beforeSrc} 
                      alt={`Before - ${item.name}`} 
                      className="object-cover w-full h-full"
                      onLoad={() => handleImageLoad(item.id, 'before')}
                      onError={(e) => handleImageError(item.id, 'before', e)}
                    />
                  </AspectRatio>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">AFTER</h4>
                  <AspectRatio ratio={4/5} className="bg-gray-100 rounded-md overflow-hidden">
                    {!imagesLoaded[item.id]?.after && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    <img 
                      src={item.afterSrc} 
                      alt={`After - ${item.name}`} 
                      className="object-cover w-full h-full" 
                      onLoad={() => handleImageLoad(item.id, 'after')}
                      onError={(e) => handleImageError(item.id, 'after', e)}
                    />
                  </AspectRatio>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeforeAfterGallery;
