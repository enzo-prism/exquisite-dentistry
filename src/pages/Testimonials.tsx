import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ReviewWidget from '@/components/ReviewWidget';
import VideoHero from '@/components/VideoHero';
import VideoModal from '@/components/VideoModal';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import ImageComponent from '@/components/Image';
import VideoTestimonialStructuredData from '@/components/VideoTestimonialStructuredData';
import ReviewStructuredData from '@/components/ReviewStructuredData';

const TestimonialsPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSecondVideoModalOpen, setIsSecondVideoModalOpen] = useState(false);
  const [isThirdVideoModalOpen, setIsThirdVideoModalOpen] = useState(false);
  const [isFourthVideoModalOpen, setIsFourthVideoModalOpen] = useState(false);
  const [isFifthVideoModalOpen, setIsFifthVideoModalOpen] = useState(false);
  
  return (
    <>
      <VideoTestimonialStructuredData />
      <ReviewStructuredData />
      <Helmet>
        <title>Patient Reviews & Testimonials | Exquisite Dentistry Los Angeles</title>
        <meta name="description" content="Read verified patient reviews and watch video testimonials from satisfied clients of Dr. Alexie Aguil at Exquisite Dentistry in Los Angeles. Real results, real smiles." />
        <meta name="keywords" content="dental reviews Los Angeles, patient testimonials, cosmetic dentistry reviews, Dr. Alexie Aguil reviews, dental patient experiences, verified reviews" />
        <meta property="og:title" content="Patient Reviews & Testimonials | Exquisite Dentistry Los Angeles" />
        <meta property="og:description" content="Read verified patient reviews and watch video testimonials from satisfied clients of Dr. Alexie Aguil at Exquisite Dentistry." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://exquisitedentistryla.com/testimonials/" />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            {/* First Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsVideoModalOpen(true)}>
                <ImageComponent
                  src="/lovable-uploads/4b013eb9-025b-4762-9fd9-3e1ed6e76587.png"
                  alt="Shannon Langhorne Patient Testimonial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsSecondVideoModalOpen(true)}>
                <ImageComponent
                  src="/lovable-uploads/94b33bca-4e9c-4e37-9028-82ebe5b81ccf.png"
                  alt="Taylor Vasek Patient Testimonial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Third Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsThirdVideoModalOpen(true)}>
                <ImageComponent
                  src="/lovable-uploads/2bbd4833-a352-4ec7-8bfe-c12d956fbcfa.png"
                  alt="Christian Fernandez Patient Testimonial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Fourth Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsFourthVideoModalOpen(true)}>
                <ImageComponent
                  src="/lovable-uploads/44218c1b-5e06-4f02-aed6-b32ab5eca52e.png"
                  alt="Rob Talbert Patient Testimonial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Fifth Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group" onClick={() => setIsFifthVideoModalOpen(true)}>
                <ImageComponent
                  src="/lovable-uploads/160f389c-fa93-49f1-ac68-847dedda16fc.png"
                  alt="Patient Testimonial"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="h-6 w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
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

      <VideoModal
        youtubeId="1088878160"
        isOpen={isFifthVideoModalOpen}
        onClose={() => setIsFifthVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />
    </>
  );
};

export default TestimonialsPage;
