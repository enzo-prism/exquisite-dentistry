import React, { useEffect } from 'react';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    content: "Dr. Aguil is amazing! The entire staff made me feel comfortable and the results are exceptional. I couldn't be happier with my new smile.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop",
    procedure: "Porcelain Veneers"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    content: "I've been to many dentists, but Exquisite Dentistry truly lives up to its name. The attention to detail and quality of care is unmatched.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    procedure: "Invisalign Treatment"
  },
  {
    id: 3,
    name: "Jennifer Wallace",
    content: "After years of being afraid of dental work, I finally found a practice that puts patient comfort first. The team is professional and genuinely caring.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop",
    procedure: "Full Smile Makeover"
  },
  {
    id: 4,
    name: "David Chen",
    content: "The level of service at Exquisite Dentistry is exceptional. Dr. Aguil took the time to explain all my options and created a treatment plan that worked perfectly for me.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1500648767791-15a19d654956?q=80&w=1361&auto=format&fit=crop",
    procedure: "Dental Implants"
  },
  {
    id: 5,
    name: "Emily Johnson",
    content: "I was nervous about getting veneers, but Dr. Aguil made the process so easy. The results exceeded my expectations - my smile looks completely natural!",
    stars: 5,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1287&auto=format&fit=crop",
    procedure: "Porcelain Veneers"
  },
  {
    id: 6,
    name: "Robert Williams",
    content: "The office environment is so calming, and the staff is incredibly friendly. My Invisalign treatment was smooth from start to finish.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
    procedure: "Invisalign Treatment"
  }
];

// Video testimonials
const videoTestimonials = [
  {
    id: 1,
    name: "Jessica Martinez",
    youtubeId: "U32NScY_qCQ",
    thumbnail: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1287&auto=format&fit=crop",
    procedure: "Porcelain Veneers & Smile Makeover"
  },
  {
    id: 2,
    name: "Thomas Wilson",
    youtubeId: "6QACxCt6J7g",
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop",
    procedure: "Complete Dental Restoration"
  },
  {
    id: 3,
    name: "Olivia Parker",
    youtubeId: "3O6FuKufvL4",
    thumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
    procedure: "Full Smile Transformation"
  },
  {
    id: 4,
    name: "Michael Davis",
    youtubeId: "dpd6glBbZVU",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop",
    procedure: "Dental Implants & Reconstruction"
  },
  {
    id: 5,
    name: "Amanda Johnson",
    youtubeId: "3pNo4sKFB58",
    thumbnail: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1364&auto=format&fit=crop",
    procedure: "Cosmetic Dentistry Journey"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <div className="bg-white p-6 rounded-sm shadow-md flex flex-col h-full opacity-0 animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-lg">{testimonial.name}</h3>
          <p className="text-sm text-gold">{testimonial.procedure}</p>
          <div className="flex mt-1">
            {Array.from({ length: testimonial.stars }).map((_, i) => (
              <Star key={i} size={16} className="fill-gold text-gold" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-black-light/90 italic flex-grow">"{testimonial.content}"</p>
    </div>
  );
};

const VideoTestimonialCard = ({ testimonial }: { testimonial: typeof videoTestimonials[0] }) => {
  return (
    <div className="bg-white rounded-sm shadow-md overflow-hidden opacity-0 animate-fade-in">
      <div className="relative aspect-video group cursor-pointer">
        <img 
          src={testimonial.thumbnail} 
          alt={testimonial.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
          <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg">{testimonial.name}</h3>
        <p className="text-sm text-gold">{testimonial.procedure}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      {/* Hero Section with YouTube Video */}
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1513757271804-385fb022e70a?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.PATIENT}
        title={<>Our Patients <span className="text-gold">Share Their Stories</span></>}
        subtitle="Read what our patients have to say about their experience with Dr. Alexie Aguil and the Exquisite Dentistry team."
        primaryCta={{ text: "Become Our Next Success Story" }}
        overlayColor="gradient"
        height="medium"
        badgeText="PATIENT TESTIMONIALS"
        scrollIndicator={false}
      />

      {/* Written Testimonials Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">PATIENT REVIEWS</span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              What Our Patients Say
            </h2>
            <div className="w-24 h-1 bg-gold rounded-full mx-auto my-8"></div>
            <p className="text-lg text-black-light/80">
              We're proud to have helped hundreds of patients achieve the smile of their dreams. Here are some of their stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${index * 150}ms` }}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">VIDEO TESTIMONIALS</span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Hear From Our Patients
            </h2>
            <div className="w-24 h-1 bg-gold rounded-full mx-auto my-8"></div>
            <p className="text-lg text-black-light/80">
              Watch these video testimonials to hear directly from our patients about their transformative experiences at Exquisite Dentistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {videoTestimonials.slice(0, 3).map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${index * 150}ms` }}>
                <VideoTestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
          
          {/* Second row for the additional videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 md:max-w-4xl md:mx-auto">
            {videoTestimonials.slice(3).map((testimonial, index) => (
              <div key={testimonial.id} style={{ animationDelay: `${(index + 3) * 150}ms` }}>
                <VideoTestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16 md:py-24 bg-gray-50">
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
              className="inline-block bg-white px-6 py-3 rounded-sm shadow-md hover:shadow-lg transition-shadow text-black font-medium"
            >
              Read Our Google Reviews
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
              Ready to Join Our <span className="text-gold">Satisfied Patients?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 font-light">
              Schedule your consultation today and experience the Exquisite Dentistry difference for yourself.
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
