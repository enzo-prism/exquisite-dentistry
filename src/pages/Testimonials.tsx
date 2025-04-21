
import React, { useEffect } from 'react';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import { Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReviewWidget from '@/components/ReviewWidget';

const testimonials = [
  {
    id: 1,
    title: "Life-Changing Smile Transformation",
    youtubeId: "U32NScY_qCQ",
    procedure: "Comprehensive Smile Makeover"
  },
  {
    id: 2,
    title: "Restoring Confidence with Expert Care",
    youtubeId: "6QACxCt6J7g",
    procedure: "Full Dental Restoration"
  },
  {
    id: 3,
    title: "The Journey to a Perfect Smile",
    youtubeId: "3O6FuKufvL4",
    procedure: "Cosmetic Dentistry Excellence"
  },
  {
    id: 4,
    title: "Transforming Lives Through Dentistry",
    youtubeId: "dpd6glBbZVU",
    procedure: "Dental Reconstruction"
  },
  {
    id: 5,
    title: "A Client's Journey to Dental Health",
    youtubeId: "3pNo4sKFB58",
    procedure: "Comprehensive Treatment"
  }
];

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openYouTube = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <div className="min-h-screen page-transition-in">
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1513757271804-385fb022e70a?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PATIENT}
        title={<>Our Clients <span className="text-gold">Share Their Stories</span></>}
        subtitle="Hear what our clients have to say about their experience with our expert dental team."
        primaryCta={{ text: "Become Our Next Success Story" }}
        overlayColor="gradient"
        height="medium"
        badgeText="CLIENT TESTIMONIALS"
        scrollIndicator={false}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black mb-6">
              Client Success Stories
            </h2>
            <div className="w-24 h-1 bg-gold rounded-full mx-auto"></div>
          </div>

          <div className="space-y-12">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="text-center p-6 opacity-0 animate-fade-in"
              >
                <h3 className="text-xl font-medium mb-2">{testimonial.title}</h3>
                <p className="text-gold mb-4">{testimonial.procedure}</p>
                <Button
                  variant="outline"
                  onClick={() => openYouTube(testimonial.youtubeId)}
                  className="gap-2"
                >
                  <Youtube size={20} />
                  Watch Story
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black mb-6">
              Our Client <span className="text-gold">Reviews</span>
            </h2>
            <p className="text-lg text-black-light max-w-3xl mx-auto mb-10">
              Read verified reviews from our satisfied clients
            </p>
          </div>
          <ReviewWidget />
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
