
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, GraduationCap, Check, ArrowUpRight } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import VideoHero from '@/components/VideoHero';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCard from '@/components/TestimonialCard';
import ReviewWidget from '@/components/ReviewWidget';
import { useIsMobile } from '@/hooks/use-mobile';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const HERO_VIMEO_ID = "1076433847";

const Index = () => {
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      <VideoHero
        posterSrc="/lovable-uploads/a88d0fa1-399a-4043-ba91-b3a84e19149a.png"
        vimeoId={HERO_VIMEO_ID}
        title={<>Beverly Hills <span className="text-gold">Cosmetic Dentistry</span></>}
        subtitle="Experience the perfect blend of artistry and science at Exquisite Dentistry, where we create beautiful, natural-looking smiles in a luxurious, comfortable environment."
        primaryCta={{ 
          text: "Book Consultation",
          href: SCHEDULING_URL,
          onClick: () => window.open(SCHEDULING_URL, '_blank') 
        }}
        secondaryCta={{ text: "Meet Dr. Aguil", href: "/about" }}
        overlayColor="gradient"
        height="auto"
        scrollIndicator={false}
        alignment="left"
      />

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-4">
              Our <span className="text-gold">Services</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive cosmetic and restorative dental solutions tailored to your unique needs
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Top row - 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <ServiceCard
                title="Porcelain Veneers"
                description="Transform your smile with custom-designed, ultra-thin porcelain shells that cover imperfections and create a naturally beautiful appearance."
                href="/services#veneers"
                index={0}
              />
              <ServiceCard
                title="Smile Makeovers"
                description="Comprehensive treatment plans combining multiple procedures to completely transform your smile's appearance."
                href="/services#smile-makeovers"
                index={1}
              />
              <ServiceCard
                title="Invisalign"
                description="Discreet clear aligners that gradually straighten teeth without the need for traditional metal braces."
                href="/services#invisalign"
                index={2}
                className="sm:col-span-2 md:col-span-1"
              />
            </div>
            
            {/* Bottom row - 2 cards centered */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
              <div className="w-full sm:w-[calc(50%-1rem)] md:max-w-[400px]">
                <ServiceCard
                  title="Dental Implants"
                  description="Permanent, natural-looking tooth replacements that restore both function and aesthetics to your smile."
                  href="/services#implants"
                  index={3}
                />
              </div>
              <div className="w-full sm:w-[calc(50%-1rem)] md:max-w-[400px]">
                <ServiceCard
                  title="Full Mouth Reconstruction"
                  description="Comprehensive restoration of all teeth in both jaws through a combination of restorative procedures."
                  href="/services#reconstruction"
                  index={4}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button 
                variant="outline" 
                className="border-gold text-black hover:bg-gold/5 group"
              >
                View All Services
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-4">
              Our Client <span className="text-gold">Reviews</span>
            </h2>
            <p className="text-lg text-black-light max-w-3xl mx-auto">
              Read verified reviews from our satisfied clients
            </p>
          </div>
          <ReviewWidget />
        </div>
      </section>

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
              <Link to="/client-experience">
                <Button>
                  Discover the Experience
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
