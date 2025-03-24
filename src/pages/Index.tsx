
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smile, Shield, Wrench, Star } from 'lucide-react';
import Button from '@/components/Button';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    content: "Dr. Aguil is amazing! The entire staff made me feel comfortable and the results are exceptional. I couldn't be happier with my new smile.",
    stars: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    content: "I've been to many dentists, but Exquisite Dentistry truly lives up to its name. The attention to detail and quality of care is unmatched.",
    stars: 5
  },
  {
    id: 3,
    name: "Jennifer Wallace",
    content: "After years of being afraid of dental work, I finally found a practice that puts patient comfort first. The team is professional and genuinely caring.",
    stars: 5
  }
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1936&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl opacity-0 animate-fade-in">
            <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6">
              BEVERLY HILLS PREMIER DENTAL CARE
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-semibold text-white leading-tight mb-6">
              Exquisite Smiles, <br />
              <span className="text-gold">Exceptional Care</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light max-w-2xl">
              Experience the perfect blend of artistry and science at Beverly Hills' most refined dental practice.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg">Book an Appointment</Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Explore Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 opacity-0 animate-fade-in-left">
            <span className="inline-block text-sm text-gold font-medium">ABOUT EXQUISITE DENTISTRY</span>
            <h2 className="heading-lg">Crafting Beautiful Smiles With Precision</h2>
            <div className="separator-left"></div>
            <p className="paragraph">
              At Exquisite Dentistry, we believe that dental care should be a blend of artistry, science, and exceptional patient experience. Led by Dr. Alexie Aguil, our practice combines cutting-edge technology with a dedication to comfort and personalized care.
            </p>
            <p className="paragraph">
              Whether you're seeking a routine cleaning, a complete smile makeover, or advanced restorative care, our approach remains the same: to provide a level of service that exceeds expectations.
            </p>
            <div className="pt-4">
              <Link to="/about">
                <Button className="group">
                  Learn About Our Practice
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative opacity-0 animate-fade-in-right">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1968&auto=format&fit=crop" 
                alt="Modern dental office" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-sm shadow-lg p-6 max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <span className="text-sm font-medium text-black">Over 500 5-Star Reviews</span>
              </div>
              <p className="text-sm text-black-light">
                "Best dental experience I've ever had. Professional, painless, and perfect results."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">OUR SERVICES</span>
            <h2 className="heading-lg mb-6">Comprehensive Dental Services</h2>
            <div className="separator"></div>
            <p className="paragraph">
              From preventive care to advanced cosmetic and restorative treatments, we offer a full spectrum of dental services tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Cosmetic Dentistry" 
              description="Transform your smile with our range of cosmetic services including veneers, teeth whitening, and smile makeovers."
              icon={<Smile size={32} />}
              index={0}
            />
            <ServiceCard 
              title="Preventive Care" 
              description="Maintain optimal oral health with regular check-ups, cleanings, and personalized preventive care plans."
              icon={<Shield size={32} />}
              index={1}
            />
            <ServiceCard 
              title="Restorative Dentistry" 
              description="Restore function and aesthetics with our comprehensive restorative treatments including crowns, bridges, and implants."
              icon={<Wrench size={32} />}
              index={2}
            />
          </div>

          <div className="text-center mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Link to="/services">
              <Button variant="outline" className="group">
                View All Services
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <span className="inline-block text-sm text-gold font-medium mb-3">PATIENT TESTIMONIALS</span>
          <h2 className="heading-lg mb-6">What Our Patients Say</h2>
          <div className="separator"></div>
        </div>

        <TestimonialCarousel 
          testimonials={testimonials} 
          className="opacity-0 animate-fade-in"
          style={{ animationDelay: '300ms' }}
        />

        <div className="text-center mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <Link to="/testimonials">
            <Button variant="outline" className="group">
              Read More Patient Stories
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready for Your <span className="text-gold">Smile Transformation?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 font-light">
              Schedule your consultation today and take the first step towards the smile you've always wanted.
            </p>
            <Button size="lg" className="animate-pulse-subtle">Book an Appointment</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
