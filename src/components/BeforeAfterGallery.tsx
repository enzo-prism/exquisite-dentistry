
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
  beforeSrc: string;
  afterSrc: string;
  title: string;
  description?: string;
  treatment?: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 'smile1',
    beforeSrc: '/lovable-uploads/7afe5319-fc08-4608-8f05-3dadcca5fd25.png',
    afterSrc: '/lovable-uploads/6832c089-3eb3-4e1d-829e-b63bccf1c054.png',
    title: 'Complete Smile Makeover',
    description: 'Porcelain veneers transformed this smile, creating a brighter, more aligned appearance.',
    treatment: 'Porcelain Veneers'
  },
  {
    id: 'smile2',
    beforeSrc: '/lovable-uploads/5a676e52-fa74-4ba4-936b-a940f42ffcd2.png',
    afterSrc: '/lovable-uploads/7362eaa3-a68b-4aee-a7e5-e2593297c02f.png',
    title: 'Comprehensive Restoration',
    description: 'Full-mouth rehabilitation addressed alignment issues and discoloration.',
    treatment: 'Porcelain Crowns & Veneers'
  },
  {
    id: 'smile3',
    beforeSrc: '/lovable-uploads/021c3c54-bf83-4812-99f0-c9b7a962b088.png',
    afterSrc: '/lovable-uploads/86aac28f-bdf3-490f-8a1d-07e5b15d452d.png',
    title: 'Aesthetic Enhancement',
    description: 'Cosmetic bonding and whitening created a naturally beautiful smile.',
    treatment: 'Cosmetic Bonding & Whitening'
  },
  {
    id: 'smile4',
    beforeSrc: '/lovable-uploads/f0436570-462f-46d7-9fc5-8d7219056cf9.png',
    afterSrc: '/lovable-uploads/11e485a4-b030-45b9-b44d-2e4f0ae79a9c.png',
    title: 'Smile Transformation',
    description: 'A combination of treatments addressed multiple cosmetic concerns.',
    treatment: 'Veneers & Whitening'
  },
  {
    id: 'smile5',
    beforeSrc: '/lovable-uploads/db363a4c-61db-4070-bcd3-7c8f5b524e8d.png',
    afterSrc: '/lovable-uploads/d5bb32be-44bc-4b3b-ac47-48cc224cf54d.png',
    title: 'Full Smile Restoration',
    description: 'Complete dental rehabilitation for improved function and aesthetics.',
    treatment: 'Full Mouth Reconstruction'
  },
  {
    id: 'smile6',
    beforeSrc: '/lovable-uploads/02ae5c96-b8b6-43d0-afa7-629cb02b9c5b.png',
    afterSrc: '/lovable-uploads/e2653f4b-3af7-4690-bde6-cea5d7ad82b3.png',
    title: 'Smile Refinement',
    description: 'Subtle enhancements created a more balanced and harmonious smile.',
    treatment: 'Conservative Cosmetic Dentistry'
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
                      <motion.img
                        src={showAfter[item.id] ? item.afterSrc : item.beforeSrc}
                        alt={`${showAfter[item.id] ? 'After' : 'Before'} - ${item.title}`}
                        className="object-cover w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
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
                  <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  )}
                  {item.treatment && (
                    <div className="mt-auto">
                      <span className="text-xs font-medium px-2 py-1 bg-gold/10 text-gold rounded-full inline-block mt-2">
                        {item.treatment}
                      </span>
                    </div>
                  )}
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
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                )}
                {item.treatment && (
                  <span className="text-xs font-medium px-2 py-1 bg-gold/10 text-gold rounded-full inline-block mb-4">
                    {item.treatment}
                  </span>
                )}
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
                      alt={`Before - ${item.title}`} 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">AFTER</h4>
                  <AspectRatio ratio={4/5} className="bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.afterSrc} 
                      alt={`After - ${item.title}`} 
                      className="object-cover w-full h-full" 
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
