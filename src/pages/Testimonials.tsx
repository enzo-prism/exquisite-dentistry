
import React, { useEffect, useState } from 'react';
import VideoHero from '@/components/VideoHero';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import VideoBackground from '@/components/VideoBackground';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { Play } from 'lucide-react';
import VideoModal from '@/components/VideoModal';
import Button from '@/components/Button';

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

// Video testimonials data
const videoTestimonials = [
  {
    id: "1082192388",
    name: "Christian Fernandez",
    title: "Full Smile Transformation",
    description: "Christian shares his experience with our comprehensive dental care and the impact it's had on his confidence and daily life.",
    thumbnail: "https://i.vimeocdn.com/video/1621891097-daf6a0fcaedd2f3fd465a22d5f27263c6c0d8a8dcd2f24db0026c644ca8dcc0f-d_640x360.jpg"
  }
];

const Testimonials = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState("");
  const [activeThumbnail, setActiveThumbnail] = useState("");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openVideoModal = (videoId: string, thumbnailUrl: string) => {
    setActiveVideoId(videoId);
    setActiveThumbnail(thumbnailUrl);
    setIsVideoModalOpen(true);
  };

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {videoTestimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                <div 
                  className="relative cursor-pointer group" 
                  onClick={() => openVideoModal(testimonial.id, testimonial.thumbnail)}
                >
                  <AspectRatio ratio={16 / 9}>
                    <div className="w-full h-full overflow-hidden">
                      <img 
                        src={testimonial.thumbnail} 
                        alt={`${testimonial.name} testimonial thumbnail`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>
                    </div>
                  </AspectRatio>
                  
                  {/* Play button overlay with scaling effect */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-gold/90 rounded-full p-5 transform transition-all duration-300 
                                  group-hover:scale-110 group-hover:bg-gold shadow-lg">
                      <Play className="text-white w-10 h-10" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white border-t-2 border-gold/20">
                  <h3 className="text-2xl font-medium mb-2">{testimonial.name}</h3>
                  <p className="text-gold mb-4">{testimonial.title}</p>
                  <p className="text-black-light mb-4">
                    {testimonial.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm" 
                    onClick={() => openVideoModal(testimonial.id, testimonial.thumbnail)}
                    className="mt-2"
                  >
                    Watch Story
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Add more videos section */}
          <div className="text-center mb-8">
            <p className="text-black-light mb-6">
              We have many more happy clients who've shared their experiences with us.
            </p>
            <Button variant="gold" size="lg">
              View More Testimonials
            </Button>
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
        youtubeId={activeVideoId} 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        thumbnailUrl={activeThumbnail}
      />
    </div>
  );
};

export default Testimonials;
