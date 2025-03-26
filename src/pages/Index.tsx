
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smile, Shield, Wrench, Award, Camera, Monitor, Headphones, Heart, GraduationCap } from 'lucide-react';
import Button from '@/components/Button';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
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
        youtubeId={YOUTUBE_VIDEOS.SMILE}
        title={<>Award-Winning <span className="text-gold">Cosmetic Dentistry</span> in Los Angeles & Beyond</>}
        subtitle="Experience the perfect blend of artistry and science at Dr. Alexie Aguil's refined dental practice, where patient comfort meets clinical excellence."
        primaryCta={{ text: "Book an Appointment" }}
        secondaryCta={{ text: "Learn More About Our Services", href: "/services" }}
        overlayColor="gradient"
        scrollIndicator={true}
        badgeText="EXQUISITE DENTISTRY"
      />

      {/* Seasonal CTAs Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block text-sm text-gold font-medium mb-3">SPECIAL OCCASIONS</span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-4">Get Ready For Your Big Day</h2>
            <p className="text-lg text-black-light">
              Looking your best for an upcoming special event? We offer specialized cosmetic treatments to help you shine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wedding CTA - Updated with new image */}
            <div className="relative overflow-hidden rounded-sm shadow-lg group">
              {/* Enhanced dark overlay with stronger gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 transition-all duration-300 group-hover:from-black/95"></div>
              <img 
                src="/lovable-uploads/3c9eee1c-2df4-485f-bbfc-56ee7a757eb9.png" 
                alt="Wedding Smile" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/40 flex items-center justify-center mx-auto text-white mb-4 backdrop-blur-sm shadow-lg">
                  <Heart size={32} className="drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-lg">Wedding Smile Makeover</h3>
                <p className="text-white text-lg mb-6 max-w-md drop-shadow-lg font-medium leading-snug">
                  Look picture-perfect for your special day with our customized wedding smile treatments.
                </p>
                <Link to="/wedding">
                  <Button variant="gold" size="lg" className="group shadow-lg">
                    Wedding Smile Guide
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Graduation CTA */}
            <div className="relative overflow-hidden rounded-sm shadow-lg group">
              {/* Enhanced dark overlay with stronger gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50 transition-all duration-300 group-hover:from-black/95"></div>
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop" 
                alt="Graduation Smile" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gold/40 flex items-center justify-center mx-auto text-white mb-4 backdrop-blur-sm shadow-lg">
                  <GraduationCap size={32} className="drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 drop-shadow-lg">Graduation Smile Treatment</h3>
                <p className="text-white text-lg mb-6 max-w-md drop-shadow-lg font-medium leading-snug">
                  Graduate with confidence with our quick, effective smile enhancement solutions.
                </p>
                <Link to="/graduation">
                  <Button variant="gold" size="lg" className="group shadow-lg">
                    Graduation Smile Guide
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redesigned Introduction Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
            {/* Content Column */}
            <div className="w-full lg:w-1/2 space-y-6 opacity-0 animate-fade-in-left">
              <div className="inline-flex items-center gap-2">
                <div className="h-1 w-10 bg-gold rounded-full"></div>
                <span className="text-sm text-gold font-medium uppercase tracking-wider">Meet Dr. Alexie Aguil</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-black leading-tight">
                Leading Cosmetic Dentistry Expert in Los Angeles
              </h2>
              
              <p className="text-lg text-black-light leading-relaxed">
                At Exquisite Dentistry, Dr. Alexie Aguil combines artistic vision with advanced dental techniques to create stunning, natural-looking smiles. His patient-centric approach ensures each visit is comfortable and stress-free in our spa-like environment.
              </p>
              
              <p className="text-lg text-black-light leading-relaxed">
                From convenient scheduling options including same-day emergency appointments to amenities like noise-canceling headphones and aromatherapy, we've reimagined what dental care can be.
              </p>
              
              <div className="flex items-center gap-4 pt-4">
                <Link to="/about">
                  <Button className="group">
                    Learn About Dr. Aguil
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Image Column */}
            <div className="w-full lg:w-1/2 opacity-0 animate-fade-in-right">
              <div className="relative mx-auto max-w-md lg:max-w-full">
                {/* Main Image with Frame */}
                <div className="relative z-10 bg-white p-3 rounded-sm shadow-xl">
                  <div className="aspect-[3/4] overflow-hidden rounded-sm">
                    <img 
                      src="/lovable-uploads/a88d0fa1-399a-4043-ba91-b3a84e19149a.png" 
                      alt="Dr. Alexie Aguil" 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                {/* Award Badge */}
                <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-20 bg-white rounded-sm shadow-xl p-4 max-w-[200px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award size={20} className="text-gold" />
                    <span className="text-sm font-medium text-black">Invisalign Lifetime Achievement</span>
                  </div>
                  <p className="text-xs text-black-light">
                    Top provider in Beverly Hills & West Hollywood
                  </p>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-8 -right-4 w-20 h-20 bg-gold/10 rounded-full filter blur-xl"></div>
                <div className="absolute -bottom-10 right-16 w-32 h-32 bg-gold/10 rounded-full filter blur-xl"></div>
                <div className="absolute -z-10 -top-6 -left-6 w-full h-full border-2 border-gold/30 rounded-sm"></div>
              </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-sm shadow-md opacity-0 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img 
                  src="/lovable-uploads/3c9eee1c-2df4-485f-bbfc-56ee7a757eb9.png"
                  alt="Wedding Couple Testimonial" 
                  className="w-full aspect-square object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3">
                <div className="text-gold mb-3">★★★★★</div>
                <p className="text-base italic mb-4">
                  "As a bride, I wanted my smile to be perfect for our wedding photos. Dr. Aguil created a custom treatment plan that gave me the confidence to smile brightly on our special day!"
                </p>
                <p className="font-medium">Amanda S.</p>
                <p className="text-sm text-black-light">Wedding Client, Beverly Hills</p>
              </div>
            </div>
          </div>
          
          <TestimonialCarousel 
            testimonials={testimonials} 
            className="opacity-0 animate-fade-in delay-300"
          />
        </div>

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
