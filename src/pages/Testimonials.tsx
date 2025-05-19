
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReviewWidget from '@/components/ReviewWidget';
import VideoHero from '@/components/VideoHero';
import VideoModal from '@/components/VideoModal';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

const TestimonialsPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
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
          
          {/* Featured Video Testimonial */}
          <div className="mb-16 bg-gray-50 rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-video cursor-pointer group" onClick={() => setIsVideoModalOpen(true)}>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                <div className="bg-gold/90 text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-6 w-6" />
                </div>
              </div>
              <img 
                src="https://vumbnail.com/1082192427.jpg" 
                alt="Client testimonial video thumbnail" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-semibold mb-2">Hear From Our Satisfied Clients</h3>
              <p className="text-gray-600 mb-4">Watch this testimonial to learn more about the exceptional care our patients receive.</p>
              <Button 
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-secondary hover:bg-secondary/90"
              >
                <Play className="mr-2 h-4 w-4" /> Watch Video
              </Button>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>
      
      {/* Video Modal */}
      <VideoModal
        youtubeId="1082192427"
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        thumbnailUrl="https://vumbnail.com/1082192427.jpg"
      />
    </>
  );
};

export default TestimonialsPage;
