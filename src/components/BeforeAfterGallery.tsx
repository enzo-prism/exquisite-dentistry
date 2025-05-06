
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface GalleryItem {
  id: string;
  name: string;
  beforeSrc: string;
  afterSrc: string;
}

// The issue is with the URL format - direct image links should end with .jpg not .jpg/b
const galleryData: GalleryItem[] = [
  {
    id: 'ryan',
    name: 'Ryan',
    beforeSrc: 'https://i.imgur.com/JwjKNh3.jpg', // Using imgur format which is more reliable
    afterSrc: 'https://i.imgur.com/LDL6J2z.jpg', // Using imgur format which is more reliable
  }
];

const BeforeAfterGallery: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'compare'>('grid');
  // Track which items are showing "after" images (true) or "before" images (false)
  const [showAfter, setShowAfter] = useState<Record<string, boolean>>(() => {
    const initialState: Record<string, boolean> = {};
    galleryData.forEach(item => {
      initialState[item.id] = true; // Start with "after" images
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

  // Added fallback images in case the primary images fail to load
  const fallbackImage = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=1000&fit=crop";

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
                        <img
                          src={item.afterSrc}
                          alt={`After - ${item.name}`}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            console.error("Image load error:", e);
                            (e.target as HTMLImageElement).src = fallbackImage;
                          }}
                        />
                      ) : (
                        <img
                          src={item.beforeSrc}
                          alt={`Before - ${item.name}`}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            console.error("Image load error:", e);
                            (e.target as HTMLImageElement).src = fallbackImage;
                          }}
                        />
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
                    <img 
                      src={item.beforeSrc} 
                      alt={`Before - ${item.name}`} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        console.error("Image load error:", e);
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                    />
                  </AspectRatio>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">AFTER</h4>
                  <AspectRatio ratio={4/5} className="bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.afterSrc} 
                      alt={`After - ${item.name}`} 
                      className="object-cover w-full h-full" 
                      onError={(e) => {
                        console.error("Image load error:", e);
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
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
