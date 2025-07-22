
import React from 'react';
import VimeoFacade from './VimeoFacade';

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
            <div className="relative w-full aspect-video">
              <VimeoFacade
                videoId="1076433847"
                title="Exquisite Dentistry Practice Video"
                thumbnailUrl="/lovable-uploads/dr-aguil-banner-2024-m.webp"
                className="w-full h-full"
                autoplay={true}
                muted={true}
                loop={true}
                background={false}
                controls={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeVideoSection;
