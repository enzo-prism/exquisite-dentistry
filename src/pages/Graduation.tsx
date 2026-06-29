import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Star, GraduationCap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/seo';
import VideoHero from '@/components/VideoHero';
import PageSEO from '@/components/seo/PageSEO';
import GraduationServiceStructuredData from '@/components/GraduationServiceStructuredData';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';

const Graduation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <GraduationServiceStructuredData />
      <PageSEO 
        title="Graduation Smile Prep LA | Student Dental Packages"
        description="Graduate with confidence! Quick cosmetic dental treatments in LA: whitening, bonding, minor adjustments. Student-friendly packages available."
        keywords="graduation smile makeover, student dental packages, graduation teeth whitening, quick cosmetic dentistry, student discounts dental, graduation photo smile"
        path="/graduation"
      />

      <div className="min-h-screen page-transition-in">
        <VideoHero
          title={<>Graduation <span className="text-gold">Smile</span></>}
          subtitle="Make your graduation photos memorable with our quick and effective cosmetic dental treatments designed specifically for graduates."
          primaryCta={{ 
            text: "Schedule Consultation",
            href: SCHEDULE_CONSULTATION_PATH
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
                If your timeline before graduation is short, several treatments can be completed in a few weeks or less.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 1 to 2 Week Solutions */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <Calendar size={24} />
                  </div>
                  <h3 className="text-xl font-medium">1 to 2 Week Solutions</h3>
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

              {/* 2 to 4 Week Solutions */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <Star size={24} />
                  </div>
                  <h3 className="text-xl font-medium">2 to 4 Week Solutions</h3>
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

              {/* 1 to 3 Month Solutions */}
              <div className="bg-gray-50 p-8 rounded-sm shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mr-4">
                    <GraduationCap size={24} />
                  </div>
                  <h3 className="text-xl font-medium">1 to 3 Month Solutions</h3>
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
                <OptimizedImage
                  src="/lovable-uploads/ed8ac06c-537d-4671-ad56-dceafa37deb8.png"
                  alt="Graduates with beautiful smiles"
                  className="w-full h-auto object-cover rounded-sm shadow-md"
                  sizes="(min-width: 768px) 50vw, 90vw"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-sans font-semibold text-black leading-tight mb-4">
                  Smiles for <span className="text-gold">Graduation Photos</span>
                </h2>
                <p className="text-lg text-black-light mb-6">
                  Graduation photos last a long time, so some patients like to prepare their smile beforehand. Our treatments range from quick touch-ups to fuller smile work, matched to your timeline and budget.
                </p>
                <p className="text-md text-gray-500 mb-6">
                  We see students ahead of UCLA (June), USC (May), LMU (May), and local high school graduations across Los Angeles County, and we plan treatment around your academic schedule.
                </p>
                <Button asChild>
                  <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-6">
                Graduation <span className="text-gold">Treatments</span>
              </h2>
              <p className="text-lg text-black-light">
                These treatments fit common graduation timelines, from short appointments to fuller smile work.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-sm shadow-sm">
                <div className="md:w-1/3">
                  <div className="w-full h-full min-h-[200px] rounded-sm bg-gradient-to-br from-[#9A8360] via-black/10 to-black/5" />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-medium mb-3">In-Office Whitening</h3>
                  <p className="text-black-light mb-4">
                    An in-office whitening session that can lighten natural teeth by up to 8 shades in a single appointment.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>60 to 90 minutes, single appointment</span>
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
                    A combined visit that includes professional cleaning, in-office whitening, and minor cosmetic bonding to prepare your smile for graduation photos.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>2 to 3 hours, can be done in one day</span>
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
                    Repair chips, close small gaps, or reshape teeth in a single visit with composite bonding. No anesthesia is required.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>30 to 60 minutes per tooth, same-day results</span>
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
                    A limited veneer set focused on the front 4 to 6 teeth, which keeps treatment time shorter than a full set.
                  </p>
                  <div className="flex items-center text-sm text-black-light mt-auto">
                    <span className="font-medium mr-2">Treatment Time:</span>
                    <span>Two appointments over 2 to 3 weeks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black leading-tight mb-4">
                Plan Your Graduation Smile
              </h2>
              <p className="text-lg text-black-light">
                Combine treatments to suit your photos, interviews, and celebrations.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Teeth Whitening',
                  description: 'Fast brightness for ceremonies and headshots.',
                  href: '/teeth-whitening/'
                },
                {
                  title: 'Porcelain Veneers',
                  description: 'A longer-term smile change for major milestones.',
                  href: '/veneers/'
                },
                {
                  title: 'Front Teeth Veneers',
                  description: 'Target 2 to 4 teeth for quick upgrades.',
                  href: '/veneers/front-teeth-veneers-los-angeles/'
                },
                {
                  title: 'Invisalign',
                  description: 'Align teeth discreetly before graduation events.',
                  href: '/invisalign/'
                },
                {
                  title: 'Dental Implants',
                  description: 'Replace missing teeth with confidence.',
                  href: '/dental-implants/'
                },
                {
                  title: 'Emergency Dentist',
                  description: 'Same-day help for chipped or painful teeth.',
                  href: '/emergency-dentist/'
                }
              ].map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:border-gold/60 hover:shadow-md"
                >
                  <h3 className="text-lg font-semibold text-black group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-black-light leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>

            <InternalLinkingWidget
              context="graduation"
              variant="expanded"
              currentPage="/graduation/"
              className="mt-12"
            />
          </div>
        </section>

        {/* Graduation Smile FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Graduation Smile Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Common questions about preparing your smile for graduation
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  How soon before graduation should I start treatment?
                </h3>
                <p className="text-gray-600">
                  For shorter treatments like teeth whitening or bonding, 2 to 4 weeks is usually enough. For veneers and other longer treatments, plan to start 2 to 3 months before your ceremony to allow for healing and adjustments.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Do you offer student discounts for graduation treatments?
                </h3>
                <p className="text-gray-600">
                  Yes. We offer graduation packages and flexible payment plans, which can help with the cost for students and recent graduates.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Can I schedule around my final exams and graduation events?
                </h3>
                <p className="text-gray-600">
                  Yes. We work around your academic schedule with early morning and evening appointments. Our Beverly Hills location is convenient for UCLA, USC, and other LA-area students.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  What if I'm starting a new job after graduation?
                </h3>
                <p className="text-gray-600">
                  Many graduates choose to address their smile as they move into their careers. If a new job is ahead, it can be a practical time to plan treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        <FinancingOptionsSection
          className="bg-white pb-0"
          title="Need a little flexibility before graduation?"
          description="If whitening, bonding, or veneer work is part of your graduation timeline, review Cherry payment options first so your treatment plan can move quickly."
        />

        <section className="bg-gradient-to-r from-gray-50 to-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to plan your graduation smile?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Book a consultation and we can map out the right treatments and timeline before your ceremony.
            </p>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-dark text-white px-8 py-4 text-lg font-semibold"
              asChild
            >
              <Link to={SCHEDULE_CONSULTATION_PATH}>Schedule Consultation</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Graduation;
