
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, Heart, Check } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import VideoHero from '@/components/VideoHero';
import { Helmet } from 'react-helmet-async';
import OptimizedImage from '@/components/OptimizedImage';
import WeddingServiceStructuredData from '@/components/WeddingServiceStructuredData';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const Wedding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <WeddingServiceStructuredData />
      <Helmet>
        <title>Wedding Smile Makeover Los Angeles | Perfect Bridal Dentistry</title>
        <meta name="description" content="Get the perfect wedding smile with our specialized bridal dentistry packages in Los Angeles. Teeth whitening, veneers, and smile makeovers for your special day. Book consultation!" />
        <meta name="keywords" content="wedding smile makeover, bridal dentistry Los Angeles, wedding teeth whitening, bridal veneers, perfect wedding smile, cosmetic dentistry for brides" />
        <meta property="og:title" content="Wedding Smile Makeover Los Angeles | Perfect Bridal Dentistry" />
        <meta property="og:description" content="Get the perfect wedding smile with specialized bridal dentistry packages including teeth whitening, veneers, and smile makeovers." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://exquisitedentistryla.com/wedding/" />
      </Helmet>

      <div className="min-h-screen page-transition-in">
        <VideoHero
          posterSrc="/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png"
          title={<>Wedding <span className="text-gold">Smile</span></>}
          subtitle="Look your absolute best on your special day with our customized wedding smile packages designed for brides, grooms, and wedding parties."
          primaryCta={{ 
            text: "Book Consultation",
            href: SCHEDULING_URL
          }}
          badgeText="WEDDING SPECIALS"
          scrollIndicator={true}
          alignment="center"
        />

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
                Perfect <span className="text-gold">Timeline</span>
              </h2>
              <p className="text-lg text-black-light">
                Plan your wedding smile transformation with our timeline-based treatment options.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 6-12 Month Timeline */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-xl font-medium">6-12 Months Before</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Full smile makeover with porcelain veneers</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Comprehensive orthodontic treatment</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Full mouth reconstruction</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Multiple dental implants</span>
                  </li>
                </ul>
              </div>

              {/* 3-6 Month Timeline */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <Star size={24} />
                  </div>
                  <h3 className="text-xl font-medium">3-6 Months Before</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Limited veneer sets (front 6-8 teeth)</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Invisalign clear aligner treatment</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Gum contouring and reshaping</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Single tooth implants</span>
                  </li>
                </ul>
              </div>

              {/* 1-3 Month Timeline */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <Heart size={24} />
                  </div>
                  <h3 className="text-xl font-medium">1-3 Months Before</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Professional teeth whitening</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Cosmetic dental bonding</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Porcelain crowns</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                    <span>Comprehensive dental cleaning</span>
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
                <OptimizedImage
                  src="/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png"
                  alt="Beautiful wedding couple with perfect smiles"
                  className="w-full h-auto object-cover rounded-sm shadow-md"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-sans font-semibold text-black leading-tight mb-4">
                  Your Perfect <span className="text-gold">Wedding Day Smile</span>
                </h2>
                <p className="text-lg text-black-light mb-6">
                  Your wedding day is one of the most photographed days of your life. Every smile, every laugh, every moment of joy will be captured forever. Our specialized wedding smile treatments ensure that your confidence shines through in every photo, creating memories you'll treasure for a lifetime.
                </p>
                <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                  <Button>Schedule Your Wedding Smile Consultation</Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
                Wedding <span className="text-gold">Packages</span>
              </h2>
              <p className="text-lg text-black-light">
                Specially curated packages for brides, grooms, and wedding parties to ensure everyone looks their best.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#9A8360] via-black/10 to-black/5" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">Bridal Radiance Package</h3>
                  <p className="text-black-light mb-4">
                    Our most comprehensive package designed specifically for brides, including professional whitening, cosmetic bonding, and a complete smile analysis to ensure perfection on your special day.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Timeline:</span>
                    <span>2-3 appointments over 4-6 weeks</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-black/10 via-[#9A8360] to-black/5" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">Groom's Confidence Package</h3>
                  <p className="text-black-light mb-4">
                    Tailored for grooms who want to look their best, this package includes professional whitening, dental cleaning, and minor cosmetic enhancements for a naturally handsome smile.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Timeline:</span>
                    <span>1-2 appointments over 2-3 weeks</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#9A8360] to-black/10" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">Wedding Party Glow Package</h3>
                  <p className="text-black-light mb-4">
                    Special group rates for bridesmaids, groomsmen, and family members. Includes professional cleaning and whitening to ensure the entire wedding party looks radiant.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Timeline:</span>
                    <span>Single appointment, 90 minutes per person</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-black/5 via-[#9A8360] to-black/10" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">Last-Minute Touch-Up</h3>
                  <p className="text-black-light mb-4">
                    Perfect for those final weeks before the wedding. Quick whitening treatments and cosmetic touch-ups to brighten your smile for the big day.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Timeline:</span>
                    <span>Same-day treatment, 60-90 minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
                Why Choose <span className="text-gold">Dr. Aguil</span> for Your Wedding Smile?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-medium mb-3">Personalized Care</h3>
                <p className="text-black-light">
                  Every bride and groom is unique. We create customized treatment plans that complement your natural features and wedding style.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-medium mb-3">Flexible Scheduling</h3>
                <p className="text-black-light">
                  We understand wedding planning is hectic. Our flexible scheduling ensures your treatments fit seamlessly into your timeline.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-medium mb-3">Guaranteed Results</h3>
                <p className="text-black-light">
                  We're committed to ensuring you're completely satisfied with your smile transformation before your wedding day.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
                Say "I Do" with <span className="text-gold">Confidence</span>
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
                Book your wedding smile consultation today and walk down the aisle with the confidence that comes from knowing your smile is absolutely perfect.
              </p>
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="xl">Book Your Wedding Consultation</Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Wedding;
