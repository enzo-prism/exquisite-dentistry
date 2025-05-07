
import React, { useEffect, useState } from 'react';
import VideoHero from '@/components/VideoHero';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import VideoBackground from '@/components/VideoBackground';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { Play } from 'lucide-react';
import VideoModal from '@/components/VideoModal';

// Sample testimonial reviews for the carousel
const testimonialReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    content: "Dr. Aguil and his team provided the most comfortable dental experience I've ever had. My smile transformation exceeded all expectations!",
    stars: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    content: "I was always anxious about dental visits until I found Exquisite Dentistry. Their attention to detail and gentle approach changed everything for me.",
    stars: 5
  },
  {
    id: 3,
    name: "Jennifer Williams",
    content: "The level of care and expertise at Exquisite Dentistry is unmatched. My smile makeover has boosted my confidence tremendously.",
    stars: 5
  }
];

const Testimonials = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      <VideoHero
        title={<>Our Clients <span className="text-gold">Share Their Stories</span></>}
        subtitle="Hear directly from our clients about their transformative experiences at Exquisite Dentistry."
        primaryCta={{ text: "Schedule Your Consultation" }}
        height="medium"
        badgeText="CLIENT TESTIMONIALS"
        scrollIndicator={false}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black mb-6">
              Video Testimonials
            </h2>
            <p className="text-lg text-black-light max-w-3xl mx-auto mb-10">
              Watch our clients share their transformative dental experiences
            </p>
            <div className="w-24 h-1 bg-gold rounded-full mx-auto"></div>
          </div>

          <div className="space-y-20">
            {/* Featured Testimonial with Play Button */}
            <div className="rounded-md overflow-hidden shadow-xl">
              <div className="relative cursor-pointer" onClick={() => setIsVideoModalOpen(true)}>
                <AspectRatio ratio={16 / 9}>
                  {/* Thumbnail image for the video */}
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <img 
                      src="https://i.vimeocdn.com/video/1621891097-daf6a0fcaedd2f3fd465a22d5f27263c6c0d8a8dcd2f24db0026c644ca8dcc0f-d_640x360.jpg" 
                      alt="Christian Fernandez testimonial thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </AspectRatio>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gold/90 rounded-full p-5 transform transition-transform hover:scale-110">
                    <Play className="text-white w-10 h-10" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-medium mb-2">Christian Fernandez</h3>
                <p className="text-gold mb-4">Full Smile Transformation</p>
                <p className="text-black-light">
                  Christian shares his experience with our comprehensive dental care and the impact it's had on his confidence and daily life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black mb-6">
              Client <span className="text-gold">Reviews</span>
            </h2>
            <p className="text-lg text-black-light max-w-3xl mx-auto mb-10">
              Read what our clients are saying about us
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonialReviews} />
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal 
        youtubeId="1082192388" 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </div>
  );
};

export default Testimonials;
