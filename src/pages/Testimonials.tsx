
import React from 'react';
import PageSEO from '@/components/seo/PageSEO';
import ReviewWidget from '@/components/ReviewWidget';
import VideoHero from '@/components/VideoHero';
import VideoTestimonial from '@/components/VideoTestimonial';
import VideoTestimonialStructuredData from '@/components/VideoTestimonialStructuredData';
import ReviewStructuredData from '@/components/ReviewStructuredData';
import { VIDEO_TESTIMONIALS } from '@/components/video-hero/video-constants';

const TestimonialsPage: React.FC = () => {
  return (
    <>
      <VideoTestimonialStructuredData />
      <ReviewStructuredData />
      <PageSEO 
        title="Patient Reviews & Testimonials | Exquisite Dentistry Los Angeles"
        description="Read verified patient reviews and watch video testimonials from satisfied clients of Dr. Alexie Aguil at Exquisite Dentistry in Los Angeles. Real results, real smiles."
        keywords="dental reviews Los Angeles, patient testimonials, cosmetic dentistry reviews, Dr. Alexie Aguil reviews, dental patient experiences, verified reviews"
        path="/testimonials"
        ogImage="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />
      
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
          
          {/* Video Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {VIDEO_TESTIMONIALS.map((testimonial) => (
            <VideoTestimonial
              key={testimonial.vimeoId}
              vimeoId={testimonial.vimeoId}
              thumbnailUrl={testimonial.thumbnailUrl}
              title={testimonial.title}
            />
          ))}
          </div>
          
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
