
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smile, Shield, Wrench, Award, Camera, Monitor, Headphones } from 'lucide-react';
import Button from '@/components/Button';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import VideoHero from '@/components/VideoHero';
import { cn } from '@/lib/utils';
import PatientExperienceSection from '@/components/PatientExperienceSection';

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
      {/* Hero Section with YouTube Video */}
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1936&auto=format&fit=crop"
        youtubeId="GfC4M9HRR_A"
        title={<>Award-Winning <span className="text-gold">Cosmetic Dentistry</span> in Los Angeles & Beyond</>}
        subtitle="Experience the perfect blend of artistry and science at Dr. Alexie Aguil's refined dental practice, where patient comfort meets clinical excellence."
        primaryCta={{ text: "Book an Appointment" }}
        secondaryCta={{ text: "Learn More About Our Services", href: "/services" }}
        overlayColor="gradient"
      />

      {/* Introduction Section */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
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
                loading="lazy"
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
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0 animate-fade-in">
            <span className="inline-block text-sm text-gold font-medium mb-3">OUR SERVICES</span>
            <h2 className="heading-lg mb-6">Comprehensive Dental Services</h2>
            <div className="separator"></div>
            <p className="paragraph">
              From advanced cosmetic procedures to general and restorative treatments, we offer a full spectrum of dental services tailored to your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard 
              title="Cosmetic Dentistry" 
              description="Transform your smile with our range of cosmetic services including porcelain veneers, Invisalign, teeth whitening, and complete smile makeovers."
              icon={<Smile size={32} />}
              index={0}
            />
            <ServiceCard 
              title="General Dentistry" 
              description="Maintain optimal oral health with professional cleanings, oral cancer screenings, and same-day emergency appointments at our Melrose location."
              icon={<Shield size={32} />}
              index={1}
            />
            <ServiceCard 
              title="Restorative Dentistry" 
              description="Restore function and aesthetics with dental implants, porcelain crowns, bridges, and full mouth restorations for a natural-looking smile."
              icon={<Wrench size={32} />}
              index={2}
            />
          </div>

          <div className="text-center mt-10 md:mt-12 opacity-0 animate-fade-in delay-600">
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
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0 animate-fade-in">
          <span className="inline-block text-sm text-gold font-medium mb-3">ADVANCED TECHNOLOGY</span>
          <h2 className="heading-lg mb-6">Cutting-Edge Dental Equipment</h2>
          <div className="separator"></div>
          <p className="paragraph">
            We utilize the latest dental technology to enhance precision, comfort, and results for all our treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-md text-center opacity-0 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold mb-6">
              <Camera size={32} />
            </div>
            <h3 className="heading-sm mb-4">Intraoral Cameras</h3>
            <p className="text-black-light/80">
              High-definition intraoral cameras allow us to show you exactly what we see, helping you understand your treatment needs.
            </p>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-md text-center opacity-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold mb-6">
              <Monitor size={32} />
            </div>
            <h3 className="heading-sm mb-4">Digital X-Rays</h3>
            <p className="text-black-light/80">
              Digital radiography provides immediate, high-quality images with significantly reduced radiation exposure.
            </p>
          </div>
          
          <div className="bg-white p-6 md:p-8 rounded-sm shadow-md text-center opacity-0 animate-fade-in" style={{ animationDelay: '450ms' }}>
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
      <PatientExperienceSection />

      {/* Testimonials Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 opacity-0 animate-fade-in">
          <span className="inline-block text-sm text-gold font-medium mb-3">PATIENT TESTIMONIALS</span>
          <h2 className="heading-lg mb-6">What Our Patients Say</h2>
          <div className="separator"></div>
        </div>

        <TestimonialCarousel 
          testimonials={testimonials} 
          className="opacity-0 animate-fade-in delay-300"
        />

        <div className="text-center mt-10 md:mt-12 opacity-0 animate-fade-in delay-600">
          <Link to="/testimonials">
            <Button variant="outline" className="group">
              Read More Patient Stories
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto opacity-0 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready for Your <span className="text-gold">Smile Transformation?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
              Schedule your consultation today and take the first step towards the smile you've always wanted.
            </p>
            <Button size="xl" className="animate-pulse-subtle">Book an Appointment</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
