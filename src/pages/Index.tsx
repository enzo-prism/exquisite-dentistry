
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smile, Shield, Wrench, Star, Award, Camera, Monitor, Headphones } from 'lucide-react';
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
              Award-Winning <span className="text-gold">Cosmetic Dentistry</span> in Los Angeles & Beyond
            </h1>
            <p className="text-xl text-white/90 mb-8 font-light max-w-2xl">
              Experience the perfect blend of artistry and science at Dr. Alexie Aguil's refined dental practice, where patient comfort meets clinical excellence.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg">Book an Appointment</Button>
              <Link to="/services">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More About Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 opacity-0 animate-fade-in-left">
            <span className="inline-block text-sm text-gold font-medium">MEET DR. ALEXIE AGUIL</span>
            <h2 className="heading-lg">Leading Cosmetic Dentistry Expert in Los Angeles</h2>
            <div className="separator-left"></div>
            <p className="paragraph">
              At Exquisite Dentistry, Dr. Alexie Aguil combines artistic vision with advanced dental techniques to create stunning, natural-looking smiles. His patient-centric approach ensures each visit is comfortable and stress-free in our spa-like environment.
            </p>
            <p className="paragraph">
              From convenient scheduling options including same-day emergency appointments to amenities like noise-canceling headphones and aromatherapy, we've reimagined what dental care can be.
            </p>
            <div className="pt-4">
              <Link to="/about">
                <Button className="group">
                  Learn About Dr. Aguil
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative opacity-0 animate-fade-in-right">
            <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1968&auto=format&fit=crop" 
                alt="Dr. Alexie Aguil" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-sm shadow-lg p-6 max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <Award size={20} className="text-gold" />
                <span className="text-sm font-medium text-black">Invisalign Lifetime Achievement Award</span>
              </div>
              <p className="text-sm text-black-light">
                Top provider in Beverly Hills & West Hollywood
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
              From advanced cosmetic procedures to general and restorative treatments, we offer a full spectrum of dental services tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Cosmetic Dentistry" 
              description="Transform your smile with our range of cosmetic services including veneers, teeth whitening, Invisalign, and complete smile makeovers."
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

          <div className="text-center mt-12 opacity-0 animate-fade-in delay-600">
            <Link to="/services">
              <Button variant="outline" className="group">
                View All Services
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Advanced Technology Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
          <span className="inline-block text-sm text-gold font-medium mb-3">ADVANCED TECHNOLOGY</span>
          <h2 className="heading-lg mb-6">Cutting-Edge Dental Equipment</h2>
          <div className="separator"></div>
          <p className="paragraph">
            We utilize the latest dental technology to enhance precision, comfort, and results for all our treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-sm shadow-md text-center opacity-0 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold mb-6">
              <Camera size={32} />
            </div>
            <h3 className="heading-sm mb-4">Intraoral Cameras</h3>
            <p className="text-black-light/80">
              High-definition intraoral cameras allow us to show you exactly what we see, helping you understand your treatment needs.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-sm shadow-md text-center opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold mb-6">
              <Monitor size={32} />
            </div>
            <h3 className="heading-sm mb-4">Digital X-Rays</h3>
            <p className="text-black-light/80">
              Digital radiography provides immediate, high-quality images with significantly reduced radiation exposure.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-sm shadow-md text-center opacity-0 animate-fade-in" style={{ animationDelay: '450ms' }}>
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold mb-6">
              <span className="text-2xl font-bold">3D</span>
            </div>
            <h3 className="heading-sm mb-4">3Shape Trios Scanner</h3>
            <p className="text-black-light/80">
              Our advanced 3D scanner creates precise digital impressions without the discomfort of traditional methods.
            </p>
          </div>
        </div>
      </section>

      {/* Patient Experience Section */}
      <section className="py-24 bg-gray-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">PATIENT EXPERIENCE</span>
            <h2 className="heading-lg mb-6">Spa-Like Comfort & Amenities</h2>
            <div className="separator"></div>
            <p className="paragraph">
              We've reimagined the dental experience with amenities designed for your ultimate comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 opacity-0 animate-fade-in-left">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                  <Headphones size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Comfort Amenities</h3>
                  <p className="text-black-light/80">
                    Enjoy soft lighting, warm blankets, noise-canceling headphones, aromatherapy, and post-treatment hot lemongrass cloths during your visit.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Flexible Scheduling</h3>
                  <p className="text-black-light/80">
                    We offer same-day emergency appointments, early morning and lunchtime slots, and family block appointments for your convenience.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Patient Involvement</h3>
                  <p className="text-black-light/80">
                    We believe in clear communication and active patient participation in all treatment decisions to ensure your confidence and satisfaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative h-full opacity-0 animate-fade-in-right">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1521453510357-5c7a77db7074?q=80&w=2144&auto=format&fit=crop" 
                  alt="Spa-like dental environment" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-sm shadow-lg p-6 max-w-xs">
                <p className="text-black-light italic text-sm">
                  "Our Los Angeles and Melrose offices are designed to provide a calming, stress-free environment with all the comforts you deserve."
                </p>
              </div>
            </div>
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
          className="opacity-0 animate-fade-in delay-300"
        />

        <div className="text-center mt-12 opacity-0 animate-fade-in delay-600">
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
