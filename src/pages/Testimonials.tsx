import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/PageHeader';
import TestimonialCard from '@/components/TestimonialCard';
import GoogleReviews from '@/components/GoogleReviews';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: number;
  name: string;
  title?: string;
  content: string;
  rating: number;
  image?: string;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer L.",
    title: "Actress",
    content: "Dr. Aguil and his team have completely transformed my smile and my confidence. The veneers look so natural that even my close friends can't tell they're not my real teeth. The entire experience from consultation to final placement was comfortable and exceeded my expectations.",
    rating: 5,
    image: "/lovable-uploads/c4eb9134-7e7d-4dc3-ab3a-abf2fc453302.png",
    featured: true
  },
  {
    id: 2,
    name: "Michael T.",
    title: "Business Executive",
    content: "After years of being self-conscious about my smile, I finally decided to do something about it. Dr. Aguil took the time to understand exactly what I wanted and delivered results that were better than I could have imagined. The office environment is more like a spa than a dental office.",
    rating: 5,
    image: "/lovable-uploads/ebaec307-40e4-4cf9-9b8a-02379250bb8e.png"
  },
  {
    id: 3,
    name: "Sarah K.",
    title: "Marketing Director",
    content: "I had severe dental anxiety before coming to Exquisite Dentistry. Dr. Aguil and his team were incredibly patient and understanding. They made sure I was comfortable every step of the way. Now I actually look forward to my dental visits!",
    rating: 5
  },
  {
    id: 4,
    name: "David R.",
    title: "Attorney",
    content: "The level of care and attention to detail at Exquisite Dentistry is unmatched. Dr. Aguil is truly an artist when it comes to cosmetic dentistry. My smile makeover has made such a difference in both my professional and personal life.",
    rating: 5,
    image: "/lovable-uploads/e29f50ba-aebe-42e9-b82c-1fd4fe0dbccb.png"
  },
  {
    id: 5,
    name: "Amanda P.",
    title: "Teacher",
    content: "I had put off dental work for years due to bad experiences in the past. From the moment I walked into Exquisite Dentistry, I knew this place was different. The staff is friendly, the office is beautiful, and Dr. Aguil's work is phenomenal.",
    rating: 5
  },
  {
    id: 6,
    name: "Robert J.",
    title: "Photographer",
    content: "As someone who works in a visual field, having a great smile is important to me. Dr. Aguil understood exactly what I was looking for and delivered results that were both natural and impactful. I couldn't be happier with my experience.",
    rating: 5
  }
];

const TestimonialsPage: React.FC = () => {
  // Find the featured testimonial
  const featuredTestimonial = testimonials.find(t => t.featured) || testimonials[0];
  // Get the rest of the testimonials
  const regularTestimonials = testimonials.filter(t => t !== featuredTestimonial);
  
  return (
    <>
      <Helmet>
        <title>Client Testimonials | Exquisite Dentistry</title>
        <meta name="description" content="Read what our clients have to say about their experience at Exquisite Dentistry in Los Angeles. Real stories from real patients about their smile transformations." />
      </Helmet>
      
      <PageHeader
        title="Client Testimonials"
        subtitle="Real stories from real clients about their experience at Exquisite Dentistry"
        bgImage="/lovable-uploads/c4eb9134-7e7d-4dc3-ab3a-abf2fc453302.png"
      />
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">CLIENT STORIES</span>
            <h2 className="heading-lg mb-6">Hear From Our Clients</h2>
            <div className="separator"></div>
            <p className="paragraph mt-6">
              We're proud of the relationships we've built with our clients and the transformations we've helped them achieve. Here are some of their stories.
            </p>
          </div>
          
          {/* Featured Testimonial */}
          {featuredTestimonial && (
            <div className="mb-16">
              <div className="bg-white rounded-sm shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {featuredTestimonial.image && (
                    <div className="relative h-64 md:h-auto">
                      <img 
                        src={featuredTestimonial.image} 
                        alt={featuredTestimonial.name} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden"></div>
                    </div>
                  )}
                  
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={cn(
                            i < featuredTestimonial.rating ? "text-gold fill-gold" : "text-gray-300",
                            "mr-1"
                          )}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="mb-6">
                      <p className="text-lg italic leading-relaxed text-black-light/90">"{featuredTestimonial.content}"</p>
                    </blockquote>
                    
                    <div>
                      <p className="font-medium text-lg">{featuredTestimonial.name}</p>
                      {featuredTestimonial.title && (
                        <p className="text-black-light/70">{featuredTestimonial.title}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Regular Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/contact">
              <Button className="group">
                Schedule Your Consultation
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Google Reviews Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">GOOGLE REVIEWS</span>
            <h2 className="heading-lg mb-6">What People Are Saying</h2>
            <div className="separator"></div>
            <p className="paragraph mt-6">
              We're proud to maintain a 5-star rating on Google with over 100 reviews from satisfied clients.
            </p>
          </div>
          
          <GoogleReviews />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="heading-lg mb-6">Ready to Transform Your Smile?</h2>
            <p className="paragraph mb-10 text-white/80">
              Join our satisfied clients and experience the Exquisite Dentistry difference. Schedule your consultation today.
            </p>
            <Link to="/contact">
              <Button variant="gold" size="lg" className="group">
                Book Your Consultation
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
