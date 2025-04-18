import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Star, Heart, Check, Clock, Diamond } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';

const Wedding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      <VideoHero
        vimeoId="1076745525"
        title={<>Perfect <span className="text-gold">Wedding Smiles</span></>}
        subtitle="Look and feel your best on your special day with our customized wedding smile makeover treatments."
        primaryCta={{ text: "Book Your Wedding Smile Consultation" }}
        secondaryCta={{ text: "Learn About Our Wedding Packages", href: "#packages" }}
        overlayColor="gradient"
        height="large"
        badgeText="WEDDING SPECIALS"
        scrollIndicator={true}
        alignment="center"
      />

      {/* Timeline Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Your Wedding Smile <span className="text-gold">Timeline</span>
            </h2>
            <p className="text-lg text-black-light">
              Planning is essential for your perfect wedding smile. Here's our recommended timeline for treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 6+ Months Before */}
            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                  <Calendar size={24} />
                </div>
                <h3 className="text-xl font-medium">6+ Months Before</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Initial consultation and smile assessment</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Start Invisalign treatment if needed</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Begin any necessary restorative work</span>
                </li>
              </ul>
            </div>

            {/* 3-6 Months Before */}
            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                  <Clock size={24} />
                </div>
                <h3 className="text-xl font-medium">3-6 Months Before</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Continue Invisalign treatment</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Prepare for porcelain veneers if desired</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Schedule professional cleaning</span>
                </li>
              </ul>
            </div>

            {/* 1-3 Months Before */}
            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                  <Diamond size={24} />
                </div>
                <h3 className="text-xl font-medium">1-3 Months Before</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Professional teeth whitening treatments</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Final placement of veneers or bonding</span>
                </li>
                <li className="flex items-start">
                  <Check size={18} className="text-gold mt-1 mr-2 shrink-0" />
                  <span>Touch-up whitening 1-2 weeks before</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Recommended <span className="text-gold">Treatments</span>
            </h2>
            <p className="text-lg text-black-light">
              Our most popular cosmetic dental procedures for picture-perfect wedding photos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#FEF7CD] via-[#FDE1D3] to-white" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Professional Teeth Whitening</h3>
                <p className="text-black-light mb-4">
                  Achieve a brilliant white smile for your wedding photos with our premium in-office whitening treatment, delivering results up to 8 shades brighter in just one visit.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Optimal Timeline:</span>
                  <span>1-2 weeks before your event</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-white via-[#FEF7CD] to-[#FDE1D3]" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Porcelain Veneers</h3>
                <p className="text-black-light mb-4">
                  Transform your smile with custom-designed, thin porcelain shells that cover the front surface of teeth to improve color, shape, and alignment.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Optimal Timeline:</span>
                  <span>1-3 months before your event</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#FDE1D3] via-white to-[#FEF7CD]" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Invisalign Express</h3>
                <p className="text-black-light mb-4">
                  For minor alignment issues, Invisalign Express can provide quick results with fewer aligners than traditional treatment, perfect for pre-wedding adjustments.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Optimal Timeline:</span>
                  <span>6+ months before your event</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#FEF7CD] to-[#FDE1D3]" />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-medium mb-3">Cosmetic Bonding</h3>
                <p className="text-black-light mb-4">
                  A quick solution for chips, gaps or discoloration, cosmetic bonding uses tooth-colored composite resin to enhance your smile with minimal preparation.
                </p>
                <div className="flex items-center text-sm text-black-light mt-auto">
                  <span className="font-medium mr-2">Optimal Timeline:</span>
                  <span>2-4 weeks before your event</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
              Wedding Day <span className="text-gold">Smile Stories</span>
            </h2>
            <p className="text-lg text-black-light">
              Hear from our patients who trusted us with their wedding smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="md:w-1/3">
                <img 
                  src="/lovable-uploads/3c9eee1c-2df4-485f-bbfc-56ee7a757eb9.png"
                  alt="Happy Wedding Couple" 
                  className="w-full h-full object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <Heart size={24} className="text-gold mr-3" />
                  <div className="text-gold">★★★★★</div>
                </div>
                <p className="text-lg italic mb-4">
                  "Dr. Aguil and his team helped me achieve the smile I always wanted for my wedding day. The Invisalign and whitening combination was perfect, and my photos came out amazing!"
                </p>
                <div>
                  <p className="font-medium">Jessica T.</p>
                  <p className="text-sm text-black-light">Bride, Los Angeles</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
              <div className="flex items-center mb-6">
                <Heart size={24} className="text-gold mr-3" />
                <div className="text-gold">★★★★★</div>
              </div>
              <p className="text-lg italic mb-6">
                "With just 3 months before our wedding, Dr. Aguil recommended porcelain veneers to fix my chipped front teeth. The results were incredible, and my wife couldn't stop complimenting my smile!"
              </p>
              <div>
                <p className="font-medium">Michael R.</p>
                <p className="text-sm text-black-light">Groom, Beverly Hills</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-white leading-tight mb-6">
              Ready for Your <span className="text-gold">Wedding Smile Transformation?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
              Schedule your wedding smile consultation today and let us create your picture-perfect smile for your special day.
            </p>
            <Button size="xl">Book Your Wedding Smile Consultation</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wedding;
