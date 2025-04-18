import React, { useEffect, useState } from 'react';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import { Star, Users, MessageSquare, Award, Check, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import VideoModal from '@/components/VideoModal';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

// Fixed thumbnail URLs - using high-quality version for all videos
const videoTestimonials = [
  {
    id: 1,
    title: "Life-Changing Smile Transformation",
    youtubeId: "U32NScY_qCQ",
    icon: <Award className="text-gold/90" size={48} />,
    procedure: "Comprehensive Smile Makeover",
    thumbnail: `https://img.youtube.com/vi/U32NScY_qCQ/maxresdefault.jpg`
  },
  {
    id: 2,
    title: "Restoring Confidence with Expert Care",
    youtubeId: "6QACxCt6J7g",
    icon: <Star className="text-gold/90" size={48} />,
    procedure: "Full Dental Restoration",
    thumbnail: `https://img.youtube.com/vi/6QACxCt6J7g/maxresdefault.jpg`
  },
  {
    id: 3,
    title: "The Journey to a Perfect Smile",
    youtubeId: "3O6FuKufvL4",
    icon: <ThumbsUp className="text-gold/90" size={48} />,
    procedure: "Cosmetic Dentistry Excellence",
    thumbnail: `https://img.youtube.com/vi/3O6FuKufvL4/maxresdefault.jpg`
  },
  {
    id: 4,
    title: "Transforming Lives Through Dentistry",
    youtubeId: "dpd6glBbZVU",
    icon: <Users className="text-gold/90" size={48} />,
    procedure: "Dental Reconstruction",
    thumbnail: `https://img.youtube.com/vi/dpd6glBbZVU/maxresdefault.jpg`
  },
  {
    id: 5,
    title: "A Patient's Journey to Dental Health",
    youtubeId: "3pNo4sKFB58",
    icon: <MessageSquare className="text-gold/90" size={48} />,
    procedure: "Comprehensive Treatment",
    thumbnail: `https://img.youtube.com/vi/3pNo4sKFB58/maxresdefault.jpg`
  }
];

const VideoTestimonialCard = ({ testimonial, onPlay }: { 
  testimonial: typeof videoTestimonials[0], 
  onPlay: (youtubeId: string) => void 
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 opacity-0 animate-fade-in">
      <div 
        className="relative aspect-video group cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => onPlay(testimonial.youtubeId)}
      >
        {imageError ? (
          // Fallback for any thumbnail loading errors
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </div>
        ) : (
          <img 
            src={testimonial.thumbnail} 
            alt={testimonial.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors">
          <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="font-medium text-lg mb-1">{testimonial.title}</h3>
        <p className="text-sm text-gold">{testimonial.procedure}</p>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handlePlayVideo = (youtubeId: string) => {
    setActiveVideoId(youtubeId);
  };

  const handleCloseVideo = () => {
    setActiveVideoId(null);
  };

  return (
    <div className="min-h-screen page-transition-in">
      <VideoModal
        youtubeId={activeVideoId || ''}
        isOpen={!!activeVideoId}
        onClose={handleCloseVideo}
      />

      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1513757271804-385fb022e70a?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PATIENT}
        title={<>Our Patients <span className="text-gold">Share Their Stories</span></>}
        subtitle="Hear what our patients have to say about their experience with our expert dental team."
        primaryCta={{ text: "Become Our Next Success Story" }}
        overlayColor="gradient"
        height="medium"
        badgeText="PATIENT TESTIMONIALS"
        scrollIndicator={false}
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">FEATURED STORIES</span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Patient Success Stories
            </h2>
            <div className="w-24 h-1 bg-gold rounded-full mx-auto my-8"></div>
            <p className="text-lg text-black-light/80">
              Watch these featured video testimonials to hear directly from our patients about their transformative experiences at our dental practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {videoTestimonials.slice(0, 3).map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${index * 150}ms` }}>
                <VideoTestimonialCard 
                  testimonial={testimonial} 
                  onPlay={handlePlayVideo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">MORE PATIENT STORIES</span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Additional Testimonials
            </h2>
            <Separator className="w-24 h-1 bg-gold rounded-full mx-auto my-8" />
            <p className="text-lg text-black-light/80">
              Discover more inspiring stories from patients who have experienced life-changing dental treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {videoTestimonials.slice(3).map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${(index + 3) * 150}ms` }}>
                <VideoTestimonialCard 
                  testimonial={testimonial} 
                  onPlay={handlePlayVideo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">GOOGLE REVIEWS</span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              5-Star Google Rating
            </h2>
            <div className="w-24 h-1 bg-gold rounded-full mx-auto my-8"></div>
            <div className="flex items-center justify-center mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={32} className="fill-gold text-gold mx-1" />
              ))}
            </div>
            <p className="text-2xl font-medium mb-2">4.9 out of 5</p>
            <p className="text-lg text-black-light/80 mb-8">
              Based on 150+ reviews
            </p>
            <a 
              href="https://g.co/kgs/eoZWBrR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white px-6 py-3 rounded-sm shadow-md hover:shadow-lg transition-shadow text-black font-medium border border-gray-200"
            >
              Read Our Google Reviews
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
              Ready to Join Our <span className="text-gold">Satisfied Patients?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 font-light">
              Schedule your consultation today and experience the difference for yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg">Book an Appointment</Button>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
