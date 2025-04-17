
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, GraduationCap, Check, ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import VideoHero from '@/components/VideoHero';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Scheduling URL constant
const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

// Default streamable URL
const DEFAULT_STREAMABLE_URL = "https://streamable.com/wzbe79";

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      {/* Hero Section with Streamable Video */}
      <VideoHero
        posterSrc="/lovable-uploads/a88d0fa1-399a-4043-ba91-b3a84e19149a.png"
        streamableUrl={DEFAULT_STREAMABLE_URL}
        title={<>Beverly Hills <span className="text-gold">Cosmetic Dentistry</span></>}
        subtitle="Experience the perfect blend of artistry and science at Exquisite Dentistry, where we create beautiful, natural-looking smiles in a luxurious, comfortable environment."
        primaryCta={{ 
          text: "Book Consultation",
          href: SCHEDULING_URL,
          onClick: () => window.open(SCHEDULING_URL, '_blank') 
        }}
        secondaryCta={{ text: "Meet Dr. Aguil", href: "/about" }}
        overlayColor="gradient"
        height="full"
        scrollIndicator={true}
      />

      {/* Services Overview Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-4">
              Our <span className="text-gold">Services</span>
            </h2>
            <p className="text-lg text-black-light max-w-3xl mx-auto">
              Comprehensive cosmetic and restorative dental solutions tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <ServiceCard
              title="Porcelain Veneers"
              description="Transform your smile with custom-designed, ultra-thin porcelain shells that cover imperfections and create a naturally beautiful appearance."
              icon={<Star className="h-6 w-6" />}
              href="/services#veneers"
            />
            <ServiceCard
              title="Smile Makeovers"
              description="Comprehensive treatment plans combining multiple procedures to completely transform your smile's appearance."
              icon={<Star className="h-6 w-6" />}
              href="/services#smile-makeovers"
            />
            <ServiceCard
              title="Teeth Whitening"
              description="Professional-grade whitening treatments that safely and effectively remove stains and discoloration for a brighter smile."
              icon={<Star className="h-6 w-6" />}
              href="/services#whitening"
            />
            <ServiceCard
              title="Invisalign"
              description="Discreet clear aligners that gradually straighten teeth without the need for traditional metal braces."
              icon={<Star className="h-6 w-6" />}
              href="/services#invisalign"
            />
            <ServiceCard
              title="Dental Implants"
              description="Permanent, natural-looking tooth replacements that restore both function and aesthetics to your smile."
              icon={<Star className="h-6 w-6" />}
              href="/services#implants"
            />
            <ServiceCard
              title="Full Mouth Reconstruction"
              description="Comprehensive restoration of all teeth in both jaws through a combination of restorative procedures."
              icon={<Star className="h-6 w-6" />}
              href="/services#reconstruction"
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" className="group">
                View All Services
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seasonal CTAs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-4">
              Seasonal <span className="text-gold">Treatments</span>
            </h2>
            <p className="text-lg text-black-light max-w-3xl mx-auto">
              Special services for life's important moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wedding Card */}
            <div className="relative overflow-hidden group rounded-sm shadow-md">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Wedding celebration" 
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6">
                <div className="w-14 h-14 bg-gold/90 rounded-full flex items-center justify-center mb-4">
                  <Calendar size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Wedding Smile Packages</h3>
                <p className="text-center max-w-xs mb-6">
                  Look your absolute best on your special day with our customized wedding smile treatments.
                </p>
                <Link to="/wedding" className="inline-flex items-center justify-center">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Wedding Smile Guide
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Graduation Card */}
            <div className="relative overflow-hidden group rounded-sm shadow-md">
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
              <img 
                src="/lovable-uploads/ed8ac06c-537d-4671-ad56-dceafa37deb8.png"
                alt="Graduation celebration" 
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-6">
                <div className="w-14 h-14 bg-gold/90 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Graduation Smile Treatment</h3>
                <p className="text-center max-w-xs mb-6">
                  Graduate with confidence with our quick, effective smile enhancement solutions.
                </p>
                <Link to="/graduation" className="inline-flex items-center justify-center">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Graduation Smile Guide
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img 
                src="/lovable-uploads/a88d0fa1-399a-4043-ba91-b3a84e19149a.png" 
                alt="Dr. Alexie Aguil performing cosmetic dentistry" 
                className="w-full h-auto object-cover rounded-sm shadow-md"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-sans font-semibold text-black leading-tight mb-4">
                The <span className="text-gold">Exquisite</span> Experience
              </h2>
              <p className="text-lg text-black-light mb-6">
                At Exquisite Dentistry, we believe that dental care should be a luxurious, comfortable experience. Our state-of-the-art Beverly Hills practice combines the latest technology with a spa-like atmosphere to ensure your comfort at every step.
              </p>
              <p className="text-lg text-black-light mb-6">
                Dr. Alexie Aguil's artistic approach to cosmetic dentistry creates smiles that are not just beautiful, but perfectly suited to your unique facial features and personality.
              </p>
              <Link to="/patient-experience">
                <Button>
                  Discover the Experience
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-4">
              Patient <span className="text-gold">Testimonials</span>
            </h2>
            <p className="text-lg text-black-light max-w-3xl mx-auto">
              Hear what our patients have to say about their experience at Exquisite Dentistry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Dr. Aguil completely transformed my smile with porcelain veneers. The attention to detail and personalized care I received was exceptional."
              author="Jennifer L."
              location="Beverly Hills, CA"
              rating={5}
            />
            <TestimonialCard
              quote="After years of being self-conscious about my smile, Exquisite Dentistry gave me the confidence I've always wanted. The results exceeded my expectations."
              author="Michael T."
              location="Los Angeles, CA"
              rating={5}
            />
            <TestimonialCard
              quote="The entire team at Exquisite Dentistry made me feel comfortable from the moment I walked in. My smile makeover was painless and the results are stunning."
              author="Sarah K."
              location="West Hollywood, CA"
              rating={5}
            />
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button variant="outline" className="group">
                Read More Testimonials
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
              Transform Your <span className="text-gold">Smile</span> Today
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
              Schedule your consultation with Dr. Alexie Aguil and take the first step toward the smile you've always wanted.
            </p>
            <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
              <Button size={isMobile ? "default" : "lg"}>
                Book Your Consultation
                <ArrowUpRight size={16} className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
