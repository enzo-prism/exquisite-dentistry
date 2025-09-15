
import React from 'react';

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
            <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
              <iframe
                src="https://player.vimeo.com/video/1076433847?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
                title="Exquisite Dentistry Dental Spa"
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeVideoSection;
