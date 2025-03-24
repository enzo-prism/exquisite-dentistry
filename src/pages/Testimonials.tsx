
import React, { useEffect } from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import GoogleReviews from '@/components/GoogleReviews';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import VideoHero from '@/components/VideoHero';

const Testimonials = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Thompson",
      profession: "Marketing Executive",
      content: "Dr. Aguil is amazing! The entire staff made me feel comfortable and the results are exceptional. I couldn't be happier with my new smile. The office environment is elegant yet welcoming, and every detail of my treatment plan was clearly explained.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
      procedure: "Smile Makeover"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      profession: "Software Engineer",
      content: "I've been to many dentists, but Exquisite Dentistry truly lives up to its name. The attention to detail and quality of care is unmatched. Dr. Aguil took the time to understand my concerns and created a personalized treatment plan that addressed all my needs.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop",
      procedure: "Invisalign"
    },
    {
      id: 3,
      name: "Jennifer Wallace",
      profession: "Teacher",
      content: "After years of being afraid of dental work, I finally found a practice that puts patient comfort first. The team is professional and genuinely caring. They took extra steps to ensure I was relaxed throughout my procedure, and the results exceeded my expectations.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1960&auto=format&fit=crop",
      procedure: "Dental Implants"
    },
    {
      id: 4,
      name: "David Chen",
      profession: "Architect",
      content: "The level of expertise at Exquisite Dentistry is outstanding. Dr. Aguil combines technical skill with an artistic eye, resulting in dental work that looks completely natural. I've received numerous compliments on my smile since completing treatment.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop",
      procedure: "Porcelain Veneers"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      profession: "Financial Analyst",
      content: "From the moment you walk in, it's clear that Exquisite Dentistry is different from other dental offices. The elegant environment, attentive staff, and state-of-the-art technology all contribute to an exceptional experience. I wouldn't trust my smile to anyone else.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
      procedure: "Teeth Whitening"
    },
    {
      id: 6,
      name: "Robert Johnson",
      profession: "Attorney",
      content: "As someone who speaks publicly for a living, having a confident smile is essential. Dr. Aguil understood this and worked with me to achieve results that enhance my appearance while still looking completely natural. The investment in my smile has been invaluable.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
      procedure: "Full Mouth Reconstruction"
    }
  ];

  const testimonialHighlights = [
    "Gentle, painless procedures",
    "Spa-like office environment",
    "Clear communication throughout treatment",
    "Expert cosmetic results",
    "Friendly, attentive staff",
    "Convenient scheduling options"
  ];

  const carouselTestimonials = testimonials.map(t => ({
    id: t.id,
    name: t.name,
    content: t.content.substring(0, 150) + "...",
    stars: t.stars
  }));

  return (
    <div className="min-h-screen pt-16 md:pt-20 page-transition-in">
      {/* Hero Section */}
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1513757271804-385fb022e70c?q=80&w=2070&auto=format&fit=crop"
        title={<>Patient <span className="text-gold">Stories</span></>}
        subtitle="Discover why our patients love Exquisite Dentistry and the results they've achieved with Dr. Aguil."
        height="medium"
        overlayColor="gradient"
        primaryCta={{
          text: "Book a Consultation",
          href: "/contact"
        }}
        secondaryCta={{
          text: "View Our Work",
          href: "/services"
        }}
      />

      {/* Introduction Section */}
      <section className="px-4 py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-sm text-gold font-medium mb-3">WHAT OUR PATIENTS SAY</span>
              <h2 className="heading-lg mb-6">Real Stories from Real Patients</h2>
              <div className="separator"></div>
              <p className="paragraph mt-6">
                We're proud of the relationships we build with our patients and the positive impact our care has on their lives.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-8 mb-10">
              {testimonialHighlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded-sm p-3 shadow-sm">
                  <CheckCircle size={16} className="text-gold shrink-0" />
                  <span className="text-xs md:text-sm font-medium">{highlight}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center space-x-1 mt-8">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} size={20} className="text-gold fill-gold" />
              ))}
            </div>
            <p className="text-base md:text-lg font-medium text-gold mt-2 text-center">Over 500 5-Star Reviews</p>
          </div>
        </div>
      </section>

      {/* Testimonial Carousel - Mobile-Friendly */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">FEATURED TESTIMONIALS</span>
            <h2 className="heading-md mb-6">What Our Patients Are Saying</h2>
            <div className="separator"></div>
          </div>
          
          <TestimonialCarousel testimonials={carouselTestimonials} autoplaySpeed={5000} />
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="px-4 py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">GOOGLE REVIEWS</span>
            <h2 className="heading-md mb-6">Our Latest Google Reviews</h2>
            <div className="separator"></div>
            <p className="paragraph mt-6">
              See what patients are saying about their experiences on Google.
            </p>
          </div>
          
          <GoogleReviews />
        </div>
      </section>

      {/* Testimonials Grid - Mobile First */}
      <section className="px-4 py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">PATIENT TESTIMONIALS</span>
            <h2 className="heading-md mb-6">More Patient Stories</h2>
            <div className="separator"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={cn(
                  "bg-white rounded-sm shadow-sm p-6 relative opacity-0 border border-gray-100",
                  index % 2 === 0 ? "animate-fade-in-left" : "animate-fade-in-right"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Quote size={24} className="text-gold/20 absolute top-6 right-6" />
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-base text-black">{testimonial.name}</h3>
                    <p className="text-xs text-gold">{testimonial.profession}</p>
                  </div>
                </div>
                
                <div className="bg-gold/10 text-black px-2 py-1 rounded-sm inline-block text-xs font-medium mb-3">
                  {testimonial.procedure}
                </div>
                
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={cn(
                        i < testimonial.stars ? "text-gold fill-gold" : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                
                <p className="text-black-light/80 text-sm italic mb-4">{testimonial.content.length > 150 
                  ? `"${testimonial.content.substring(0, 150)}..."` 
                  : `"${testimonial.content}"`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonial Section - Simplified Mobile First */}
      <section className="px-4 py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">VIDEO TESTIMONIALS</span>
            <h2 className="heading-md mb-6">Hear From Our Patients</h2>
            <div className="separator"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Sarah's Smile Transformation",
                description: "Sarah shares her experience with cosmetic dentistry and how it has improved her confidence.",
                procedure: "Porcelain Veneers"
              },
              {
                title: "Michael's Experience",
                description: "Michael discusses his journey to overcome dental anxiety and find comfort at our practice.",
                procedure: "Invisalign Treatment"
              }
            ].map((video, index) => (
              <div key={index} className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
                <div className="aspect-video bg-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="gold" size="lg" className="rounded-full w-12 h-12 p-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" fill="white" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <div className="bg-gold/10 text-black px-2 py-1 rounded-sm inline-block text-xs font-medium mb-2">
                    {video.procedure}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium mb-2">{video.title}</h3>
                  <p className="text-black-light/80 text-sm mb-4">{video.description}</p>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gold ml-2">5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before and After Gallery - Mobile First */}
      <section className="px-4 py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">BEFORE & AFTER</span>
            <h2 className="heading-md mb-6">Smile Transformations</h2>
            <div className="separator"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { procedure: "Porcelain Veneers", image: "https://images.unsplash.com/photo-1616702451225-05bbeaae073f?q=80&w=1770&auto=format&fit=crop" },
              { procedure: "Smile Makeover", image: "https://images.unsplash.com/photo-1581871737046-24c48381c75f?q=80&w=1858&auto=format&fit=crop" },
              { procedure: "Invisalign", image: "https://images.unsplash.com/photo-1537212013133-060fd2e24791?q=80&w=1767&auto=format&fit=crop" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
                <div className="aspect-square sm:aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={`${item.procedure} before and after`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <div className="bg-gold/90 text-white px-2 py-1 rounded-sm inline-block text-xs font-medium mb-2">
                        {item.procedure}
                      </div>
                      <h3 className="text-white text-sm font-medium">Amazing Transformation</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story Section - Mobile First */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-sm p-6 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-sans font-semibold text-white leading-tight mb-4 md:mb-6">
              Share Your <span className="text-gold">Experience</span>
            </h2>
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 font-light">
              We value your feedback and would love to hear about your experience at Exquisite Dentistry.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
              <Button size="lg" fullWidth={true} className="sm:w-auto">Leave a Review</Button>
              <Button variant="outline" size="lg" fullWidth={true} className="border-white text-white hover:bg-white/10 sm:w-auto">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
