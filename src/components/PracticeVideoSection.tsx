
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const PRACTICE_VIDEO = {
  source: 'https://videos-hazel-eta.vercel.app/trailer.mp4',
  poster: 'https://videos-hazel-eta.vercel.app/trailer-thumbnail.png',
  title: 'Discover Exquisite Dentistry'
};

const PracticeVideoSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block text-sm text-gold font-medium mb-3">OUR PRACTICE</span>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Experience <span className="text-gold">Excellence</span>
          </h2>
          <div className="separator mx-auto"></div>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
            Discover what makes Exquisite Dentistry unique through our commitment to personalized care and exceptional results
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 overflow-hidden">
            <AspectRatio ratio={16 / 9} className="bg-black">
              <video
                controls
                preload="none"
                poster={PRACTICE_VIDEO.poster}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                title={PRACTICE_VIDEO.title}
              >
                <source src={PRACTICE_VIDEO.source} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeVideoSection;
