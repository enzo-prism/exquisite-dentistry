
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReviewWidget from '@/components/ReviewWidget';
import VideoHero from '@/components/VideoHero';
import VideoModal from '@/components/VideoModal';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const TestimonialsPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSecondVideoModalOpen, setIsSecondVideoModalOpen] = useState(false);
  const [isThirdVideoModalOpen, setIsThirdVideoModalOpen] = useState(false);
  const [isFourthVideoModalOpen, setIsFourthVideoModalOpen] = useState(false);
  
  return (
    <>
      <Helmet>
        <title>Client Testimonials | Exquisite Dentistry</title>
        <meta name="description" content="See what our clients are saying about their experience at Exquisite Dentistry in Los Angeles." />
      </Helmet>
      
      <VideoHero 
        title="Client Testimonials"
        subtitle="See what our clients are saying about their experience at Exquisite Dentistry"
        primaryCta={{
          text: "Schedule a Consultation",
          href: "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
        }}
      />
      
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">REVIEWS</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              What Our Clients Are Saying
            </h2>
            <div className="separator mx-auto"></div>
          </div>
          
          {/* Featured Video Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* First Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <div className="bg-gold/90 text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <img 
                  src="/lovable-uploads/4b013eb9-025b-4762-9fd9-3e1ed6e76587.png" 
                  alt="Shannon Langhorne Patient Testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Second Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsSecondVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <div className="bg-gold/90 text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <img 
                  src="/lovable-uploads/94b33bca-4e9c-4e37-9028-82ebe5b81ccf.png" 
                  alt="Taylor Vasek Patient Testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Third Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsThirdVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <div className="bg-gold/90 text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <img 
                  src="/lovable-uploads/2bbd4833-a352-4ec7-8bfe-c12d956fbcfa.png" 
                  alt="Christian Fernandez Patient Testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Fourth Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsFourthVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                  <div className="bg-gold/90 text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-6 w-6" />
                  </div>
                </div>
                <img 
                  src="/lovable-uploads/44218c1b-5e06-4f02-aed6-b32ab5eca52e.png" 
                  alt="Rob Talbert Patient Testimonial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>
      
      <VideoModal
        youtubeId="1082192427"
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />
      
      <VideoModal
        youtubeId="1082192501"
        isOpen={isSecondVideoModalOpen}
        onClose={() => setIsSecondVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />

      <VideoModal
        youtubeId="1088876675"
        isOpen={isThirdVideoModalOpen}
        onClose={() => setIsThirdVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />

      <VideoModal
        youtubeId="1088877336"
        isOpen={isFourthVideoModalOpen}
        onClose={() => setIsFourthVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />
    </>
  );
};

export default TestimonialsPage;
