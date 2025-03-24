
import React, { useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

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
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      profession: "Software Engineer",
      content: "I've been to many dentists, but Exquisite Dentistry truly lives up to its name. The attention to detail and quality of care is unmatched. Dr. Aguil took the time to understand my concerns and created a personalized treatment plan that addressed all my needs.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Jennifer Wallace",
      profession: "Teacher",
      content: "After years of being afraid of dental work, I finally found a practice that puts patient comfort first. The team is professional and genuinely caring. They took extra steps to ensure I was relaxed throughout my procedure, and the results exceeded my expectations.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?q=80&w=1960&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "David Chen",
      profession: "Architect",
      content: "The level of expertise at Exquisite Dentistry is outstanding. Dr. Aguil combines technical skill with an artistic eye, resulting in dental work that looks completely natural. I've received numerous compliments on my smile since completing treatment.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1780&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      profession: "Financial Analyst",
      content: "From the moment you walk in, it's clear that Exquisite Dentistry is different from other dental offices. The elegant environment, attentive staff, and state-of-the-art technology all contribute to an exceptional experience. I wouldn't trust my smile to anyone else.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Robert Johnson",
      profession: "Attorney",
      content: "As someone who speaks publicly for a living, having a confident smile is essential. Dr. Aguil understood this and worked with me to achieve results that enhance my appearance while still looking completely natural. The investment in my smile has been invaluable.",
      stars: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen pt-24 page-transition-in">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute top-0 inset-0 bg-[url('https://images.unsplash.com/photo-1513757271804-385fb022e70c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center h-[50vh]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6">
              TESTIMONIALS
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6">
              Patient <span className="text-gold">Stories</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="-mt-32 relative z-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="heading-lg mb-6">What Our Patients Say</h2>
              <div className="separator"></div>
              <p className="paragraph mb-8">
                We're proud of the relationships we build with our patients and the positive impact our care has on their lives. Here are some of their stories and experiences with Exquisite Dentistry.
              </p>
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={24} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-lg font-medium text-gold mt-2">Over 500 5-Star Reviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={cn(
                "bg-white rounded-sm shadow-md p-8 relative opacity-0",
                index % 2 === 0 ? "animate-fade-in-left" : "animate-fade-in-right"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote size={30} className="text-gold/20 absolute top-6 right-6" />
              
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg text-black">{testimonial.name}</h3>
                  <p className="text-sm text-gold">{testimonial.profession}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={cn(
                      i < testimonial.stars ? "text-gold fill-gold" : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              
              <p className="text-black-light/80 italic mb-6">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Testimonial Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-sm text-gold font-medium mb-3">VIDEO TESTIMONIALS</span>
            <h2 className="heading-lg mb-6">Hear From Our Patients</h2>
            <div className="separator"></div>
            <p className="paragraph">
              Watch these videos to hear directly from our patients about their experiences and results at Exquisite Dentistry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item, index) => (
              <div key={item} className="bg-white rounded-sm shadow-md overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="gold" size="lg" className="rounded-full w-16 h-16 p-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3" fill="white" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="heading-sm mb-2">
                    {index === 0 ? "Sarah's Smile Transformation" : "Michael's Experience"}
                  </h3>
                  <p className="text-black-light/80 mb-4">
                    {index === 0 
                      ? "Sarah shares her experience with cosmetic dentistry and how it has improved her confidence." 
                      : "Michael discusses his journey to overcome dental anxiety and find comfort at our practice."}
                  </p>
                  <div className="flex items-center">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gold ml-2">5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto bg-black rounded-sm p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
            Share Your <span className="text-gold">Experience</span>
          </h2>
          <p className="text-lg text-white/80 mb-8 font-light">
            We value your feedback and would love to hear about your experience at Exquisite Dentistry. Your testimonial helps us improve our services and assists others in making informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button size="lg">Leave a Review</Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
