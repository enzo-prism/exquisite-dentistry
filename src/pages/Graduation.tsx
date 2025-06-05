import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, GraduationCap, Check } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import VideoHero from '@/components/VideoHero';
import { Helmet } from 'react-helmet-async';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const Graduation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Graduation Smile Makeover Los Angeles | Student Dental Packages</title>
        <meta name="description" content="Look your best for graduation photos with our quick cosmetic dental treatments in Los Angeles. Teeth whitening, bonding, and smile makeovers perfect for graduates. Book now!" />
        <meta name="keywords" content="graduation smile makeover, student dental packages, graduation teeth whitening, quick cosmetic dentistry, student discounts dental, graduation photo smile" />
        <meta property="og:title" content="Graduation Smile Makeover Los Angeles | Student Dental Packages" />
        <meta property="og:description" content="Look your best for graduation photos with quick cosmetic dental treatments including teeth whitening and smile makeovers." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://exquisitedentistryla.com/graduation" />
      </Helmet>

      <div className="min-h-screen page-transition-in">
        <VideoHero
          posterSrc="/lovable-uploads/ed8ac06c-537d-4671-ad56-dceafa37deb8.png"
          title={<>Graduation <span className="text-gold">Smile</span></>}
          subtitle="Make your graduation photos memorable with our quick and effective cosmetic dental treatments designed specifically for graduates."
          primaryCta={{ 
            text: "Book Consultation",
            href: SCHEDULING_URL
          }}
          badgeText="GRAD SPECIALS"
          scrollIndicator={true}
          alignment="center"
        />

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
                Quick <span className="text-gold">Solutions</span>
              </h2>
              <p className="text-lg text-black-light">
                Short on time before graduation? We have fast, effective treatments to ensure you look your best.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 1-2 Week Solutions */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-xl font-medium">1-2 Week Solutions</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Professional teeth whitening (in-office)</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Cosmetic dental bonding for chips/gaps</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Professional cleaning and polishing</span>
                  </li>
                </ul>
              </div>

              {/* 2-4 Week Solutions */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <Star size={24} />
                  </div>
                  <h3 className="text-xl font-medium">2-4 Week Solutions</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Take-home whitening kits with custom trays</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Gingivectomy for gummy smile correction</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Single-tooth porcelain crown</span>
                  </li>
                </ul>
              </div>

              {/* 1-3 Month Solutions */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-xl font-medium">1-3 Month Solutions</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Porcelain veneers (full set)</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Multiple crowns or bridges</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Limited orthodontic treatment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/ed8ac06c-537d-4671-ad56-dceafa37deb8.png"
                  alt="Graduates with beautiful smiles" 
                  className="w-full h-auto object-cover rounded-sm shadow-md"
                  loading="lazy"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-sans font-semibold text-black leading-tight mb-4">
                  Picture-Perfect <span className="text-gold">Graduation Smiles</span>
                </h2>
                <p className="text-lg text-black-light mb-6">
                  Your graduation photos will be cherished for a lifetime. Our specialized dental treatments ensure your smile is as bright and confident as your future. From quick touch-ups to comprehensive smile makeovers, we have solutions that fit your timeline and budget.
                </p>
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  <Button>Schedule Your Grad Smile Consultation</Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
                Popular <span className="text-gold">Treatments</span>
              </h2>
              <p className="text-lg text-black-light">
                These treatments are favorites among graduates for their quick results and lasting impact.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#9A8360] via-black/10 to-black/5" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">One-Hour Power Whitening</h3>
                  <p className="text-black-light mb-4">
                    Our most popular graduation treatment, this in-office whitening procedure brightens your smile by up to 8 shades in just one hour – perfect for last-minute preparations.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>60-90 minutes, single appointment</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-black/10 via-[#9A8360] to-black/5" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">Graduation Smile Package</h3>
                  <p className="text-black-light mb-4">
                    This comprehensive package includes professional cleaning, in-office whitening, and minor cosmetic bonding to perfect your smile for graduation photos.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>2-3 hours, can be done in one day</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#9A8360] to-black/10" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">Express Cosmetic Bonding</h3>
                  <p className="text-black-light mb-4">
                    Repair chips, close small gaps, or reshape teeth in just one visit with our artistic composite bonding technique – no anesthesia required.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>30-60 minutes per tooth, same-day results</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-black/5 via-[#9A8360] to-black/10" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">Front Teeth Veneers</h3>
                  <p className="text-black-light mb-4">
                    Transform your most visible teeth with our limited veneer set, focusing on the front 4-6 teeth for maximum impact with faster treatment time.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>Two appointments over 2-3 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
                Graduate <span className="text-gold">Confidently</span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
                Don't wait! Schedule your consultation today and let us help you create a graduation-ready smile.
              </p>
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="xl">Book Consultation</Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Graduation;
