
import React from 'react';
import { Helmet } from 'react-helmet-async';
import ReviewWidget from '@/components/ReviewWidget';
import VideoHero from '@/components/VideoHero';

const TestimonialsPage: React.FC = () => {
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
          
          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
