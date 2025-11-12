import React, { useEffect } from 'react';
import PageSEO from '@/components/seo/PageSEO';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Calendar, Clock, MapPin, UserPlus, Sparkles, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoHero from '@/components/VideoHero';

import { Card, CardContent } from '@/components/ui/card';
import ReviewWidget from '@/components/ReviewWidget';
import { cn } from '@/lib/utils';
import ImageComponent from '@/components/Image';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const introHeading = useRevealOnScroll<HTMLDivElement>({ delayClass: 'reveal-delay-100' });
  const introParagraph = useRevealOnScroll<HTMLParagraphElement>({ delayClass: 'reveal-delay-200' });
  const doctorText = useRevealOnScroll<HTMLDivElement>({ delayClass: 'reveal-delay-100' });
  const doctorImage = useRevealOnScroll<HTMLDivElement>({ animation: 'skew', delayClass: 'reveal-delay-200' });
  const philosophyCards = [
    useRevealOnScroll<HTMLDivElement>({ delayClass: 'reveal-delay-100' }),
    useRevealOnScroll<HTMLDivElement>({ delayClass: 'reveal-delay-200' }),
    useRevealOnScroll<HTMLDivElement>({ delayClass: 'reveal-delay-300' })
  ];
  const techHeading = useRevealOnScroll<HTMLElement>();
  const techCards = [
    useRevealOnScroll<HTMLDivElement>({ delayClass: 'reveal-delay-100', animation: 'scale' }),
    useRevealOnScroll<HTMLDivElement>({ delayClass: 'reveal-delay-200', animation: 'scale' })
  ];
  const reviewsHeading = useRevealOnScroll<HTMLElement>({ delayClass: 'reveal-delay-100' });
  const ctaBlock = useRevealOnScroll<HTMLElement>({ animation: 'scale' });
  const patientImages = [
    {
      src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964431/Screenshot_2025-11-12_at_8.16.21_AM_ptqbrm.png',
      alt: 'Dr. Alexie Aguil celebrating a smile reveal with a patient',
      caption: 'Celebrating a just-completed smile transformation.'
    },
    {
      src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/c_crop,g_auto,h_900,w_900/v1762964431/Screenshot_2025-11-12_at_8.16.21_AM_ptqbrm.png',
      alt: 'Dr. Aguil sharing a candid moment with a happy patient',
      caption: 'Human moments that show how personal every makeover feels.'
    }
  ];
  const soloPortraits = [
    {
      src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964432/Screenshot_2025-11-12_at_8.16.03_AM_lktwxr.png',
      alt: 'Studio portrait of Dr. Alexie Aguil',
      caption: 'Studio portrait highlighting Dr. Aguil’s meticulous style.'
    },
    {
      src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/c_crop,g_face,h_1100,w_850/v1762964432/Screenshot_2025-11-12_at_8.16.03_AM_lktwxr.png',
      alt: 'Dr. Aguil smiling inside the Beverly Hills studio',
      caption: 'A candid smile from inside the Beverly Hills studio.'
    },
    {
      src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/c_crop,g_auto,h_950,w_950/v1762964432/Screenshot_2025-11-12_at_8.16.03_AM_lktwxr.png',
      alt: 'Close-up portrait of Dr. Aguil',
      caption: 'Close-up portrait that emphasizes calm, confident care.'
    }
  ];

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          '@id': getCanonicalUrl('/about#page'),
          name: 'About Dr. Alexie Aguil | Top Cosmetic Dentist Los Angeles',
          description: 'Meet Dr. Alexie Aguil and our team. We combine modern cosmetic techniques with gentle, personalized care to create natural, long-lasting smiles in Los Angeles.',
          url: getCanonicalUrl('/about'),
          isPartOf: {
            '@id': 'https://exquisitedentistryla.com/#website'
          },
          about: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          },
          mainEntity: {
            '@id': 'https://exquisitedentistryla.com/#doctor'
          }
        }]}
      />
      <PageSEO
        title="Dr. Alexie Aguil | Award-Winning LA Cosmetic Dentist"
        description="Meet Dr. Alexie Aguil, Los Angeles' award-winning cosmetic dentist with 15+ years creating celebrity smiles. Artistic vision meets gentle care."
        keywords="Dr. Alexie Aguil, cosmetic dentist Los Angeles, dental expertise, smile transformation, porcelain veneers specialist, Beverly Hills dentist"
        path="/about"
      />

      {/* Hero Section with VideoHero */}
      <VideoHero
        title={<>Meet Dr. Alexie Aguil - <span className="text-gold">Award-Winning Cosmetic Dentist</span></>}
        subtitle="Discover the artistic vision, advanced training, and personalized philosophy that has made Dr. Aguil Beverly Hills' most sought-after cosmetic dentist for over 15 years."
        primaryCta={{ 
          text: "Schedule a Personal Consultation" 
        }}
        secondaryCta={{ text: "View Services", href: "/services" }}
        height="medium"
        badgeText="MEET THE DOCTOR"
        scrollIndicator={true}
      />

      {/* Dr. Aguil Introduction */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row gap-8 sm:gap-12 items-center">
            {/* Content Column */}
            <div ref={doctorText.ref} className={`w-full lg:w-1/2 space-y-4 sm:space-y-6 ${doctorText.animationClass}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-semibold text-black leading-tight">
                The Artist Behind Beverly Hills' Most Beautiful Smiles
              </h2>
              
              <p className="text-base sm:text-lg text-black-light">
                Dr. Alexie Aguil didn't just become a dentist—he became an artist who happens to work in dentistry. His Beverly Hills practice represents the pinnacle of cosmetic dental artistry, where each smile is meticulously crafted as a unique work of art. Dr. Aguil's philosophy centers on the belief that exceptional dentistry requires both technical mastery and an artist's eye for beauty, proportion, and harmony.
              </p>
              
              <p className="text-base sm:text-lg text-black-light">
                Trained at prestigious institutions and mentored by the world's leading cosmetic dentists, Dr. Aguil has spent over 15 years perfecting techniques that preserve maximum tooth structure while achieving dramatic aesthetic improvements. His celebrity clientele includes A-list actors, musicians, and industry leaders who trust him with their most valuable asset—their smile.
              </p>
              
              <p className="text-base sm:text-lg text-black-light">
                Beyond his technical expertise, Dr. Aguil is known for his meticulous attention to detail and commitment to patient comfort. His practice features a spa-like environment with amenities typically found in five-star resorts, because he believes that exceptional dental care should be delivered in an atmosphere of luxury and relaxation.
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link to="/services">
                  <Button className="group w-full sm:w-auto">
                    Explore Our Services
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <a href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="group w-full sm:w-auto">
                    Schedule a Consultation
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Image Column */}
            <div ref={doctorImage.ref} className={`w-full lg:w-1/2 ${doctorImage.animationClass}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative mx-auto max-w-sm sm:max-w-full lg:max-w-full sm:col-span-2">
                  {/* Main Image with Frame */}
                  <div className="relative z-10 bg-white p-2 sm:p-3 rounded-sm shadow-xl">
                    <div className="aspect-[3/4] overflow-hidden rounded-sm">
                      <ImageComponent
                        src="/lovable-uploads/1575f241-2d2e-4530-b7e7-6fd4ff56ccf5.png"
                        alt="Dr. Alexie Aguil - Premium business portrait"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Award Badge */}
                  <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 md:-bottom-8 md:-left-8 z-20 bg-white rounded-sm shadow-xl p-3 sm:p-4 max-w-[180px] sm:max-w-[200px]">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award size={18} className="text-secondary flex-shrink-0" />
                      <span className="text-xs sm:text-sm font-medium text-black">Invisalign Lifetime Achievement</span>
                    </div>
                    <p className="text-xs text-black-light">
                      Top provider in Beverly Hills & West Hollywood
                    </p>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 sm:top-8 -right-3 sm:-right-4 w-16 sm:w-20 h-16 sm:h-20 bg-secondary/10 rounded-full filter blur-xl"></div>
                  <div className="absolute -bottom-8 sm:-bottom-10 right-12 sm:right-16 w-24 sm:w-32 h-24 sm:h-32 bg-secondary/10 rounded-full filter blur-xl"></div>
                  <div className="absolute -z-10 -top-4 sm:-top-6 -left-4 sm:-left-6 w-full h-full border-2 border-secondary/30 rounded-sm"></div>
                </div>

                {patientImages.map((image) => (
                  <div
                    key={image.src}
                    className="bg-white/90 border border-secondary/10 rounded-sm shadow-lg p-3 flex flex-col gap-3"
                  >
                    <div className="aspect-[4/5] rounded-sm overflow-hidden">
                      <ImageComponent
                        src={image.src}
                        alt={image.alt}
                        objectFit="cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-black-light">{image.caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dr. Aguil's Expertise */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={introHeading.ref} className={`text-center max-w-3xl mx-auto mb-12 md:mb-16 ${introHeading.animationClass}`}>
            <span className="inline-block text-sm text-secondary font-medium mb-3">EXPERTISE</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-black leading-tight mb-6">
              Meet Dr. Alexie Aguil
            </h2>
            <div className="h-1 w-20 bg-secondary rounded-full mx-auto mb-8"></div>
            <p ref={introParagraph.ref} className={`text-lg text-black-light ${introParagraph.animationClass}`}>
              With exceptional skills, training, and a commitment to excellence, Dr. Aguil delivers world-class cosmetic and restorative dentistry.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-sm shadow-md">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3">
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                    {soloPortraits.map((image) => (
                      <div
                        key={image.src}
                        className="bg-gray-50 rounded-sm shadow-sm border border-gray-100 p-2 flex flex-col"
                      >
                        <div className="aspect-[3/4] rounded-sm overflow-hidden">
                          <ImageComponent
                            src={image.src}
                            alt={image.alt}
                            objectFit="cover"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-black-light mt-2">{image.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-2/3 space-y-4">
                  <h3 className="text-2xl font-semibold text-black">Dr. Alexie Aguil</h3>
                  <p className="text-secondary font-medium">Founder & Lead Dentist</p>
                  
                  <p className="text-lg text-black-light">
                    With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.
                  </p>
                  
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Award size={20} className="text-secondary flex-shrink-0 mt-1" />
                      <span>Invisalign Lifetime Achievement Award</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <UserPlus size={20} className="text-secondary flex-shrink-0 mt-1" />
                      <span>Member of the American Academy of Cosmetic Dentistry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock size={20} className="text-secondary flex-shrink-0 mt-1" />
                      <span>Over 1,000 smile transformations completed</span>
                    </li>
                  </ul>
                  
                  <div className="pt-4">
                    <a href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="group">
                        Schedule With Dr. Aguil
                        <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="inline-block text-sm text-secondary font-medium mb-3">OUR PHILOSOPHY</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-black leading-tight mb-6">
              Our Approach to Dental Care
            </h2>
            <div className="h-1 w-20 bg-secondary rounded-full mx-auto mb-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card ref={philosophyCards[0].ref} className={`bg-white shadow-md rounded-sm border-none hover:-translate-y-1 transition ${philosophyCards[0].animationClass}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7 11 2-2-2-2" />
                    <path d="M11 13h4" />
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Personalized Treatment</h3>
                <p className="text-black-light">
                  Dr. Aguil takes the time to understand each patient's unique needs, goals, and concerns to create truly customized treatment plans.
                </p>
              </CardContent>
            </Card>
            
            <Card ref={philosophyCards[1].ref} className={`bg-white shadow-md rounded-sm border-none hover:-translate-y-1 transition ${philosophyCards[1].animationClass}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Exceptional Quality</h3>
                <p className="text-black-light">
                  We never compromise on quality. Dr. Aguil uses only the finest materials and works with top dental laboratories to ensure outstanding results.
                </p>
              </CardContent>
            </Card>
            
            <Card ref={philosophyCards[2].ref} className={`bg-white shadow-md rounded-sm border-none hover:-translate-y-1 transition ${philosophyCards[2].animationClass}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Patient Comfort</h3>
                <p className="text-black-light">
                  Creating a comfortable, stress-free environment is a top priority. Dr. Aguil and his team go above and beyond to ensure each visit is a positive experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section ref={techHeading.ref} className={`py-16 md:py-24 bg-black text-white ${techHeading.animationClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs tracking-[0.32em] text-gold font-semibold mb-3">TECHNOLOGY</span>
            <h2 className="text-3xl md:text-4xl font-sans font-semibold mb-4">Precision Tools, Human Touch</h2>
            <p className="text-white/80">
              From Pearl AI diagnostics to the iTero Element 5D scanner, every piece of technology in our studio is selected to make care more
              accurate, more comfortable, and more collaborative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div ref={techCards[0].ref} className={`bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4 hover:border-gold/30 transition ${techCards[0].animationClass}`}>
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Sparkles className="w-6 h-6 animate-pulse-sparkle" />
              </div>
              <h3 className="text-xl font-semibold">iTero 3D Scanning</h3>
              <p className="text-white/80">
                Mess-free digital impressions capture every angle of your smile for Invisalign, veneers, crowns, and more.
                The scan uploads instantly so you can preview results with Dr. Aguil in real time.
              </p>
              <Link to="/itero-scanner" className="inline-flex items-center text-gold font-semibold hover:text-gold/80 transition-colors">
                Learn about the iTero scanner
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            <div ref={techCards[1].ref} className={`bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4 hover:border-gold/30 transition ${techCards[1].animationClass}`}>
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                <Cpu className="w-6 h-6 animate-pulse-sparkle" />
              </div>
              <h3 className="text-xl font-semibold">Pearl AI Diagnostics</h3>
              <p className="text-white/80">
                Artificial intelligence reviews every radiograph alongside Dr. Aguil, highlighting microfractures, incipient decay, and bone changes
                so treatment stays proactive and precise.
              </p>
              <Link to="/services#technology" className="inline-flex items-center text-gold font-semibold hover:text-gold/80 transition-colors">
                Explore our technology suite
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section ref={reviewsHeading.ref} className={`py-16 md:py-24 bg-gray-50 ${reviewsHeading.animationClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-sans font-semibold text-black mb-6">
              Patient <span className="text-gold">Reviews</span>
            </h2>
            <p className="text-lg text-black-light">
              See what our patients say about their experience with Dr. Aguil
            </p>
          </div>
          <ReviewWidget />
        </div>
      </section>


      {/* CTA Section */}
      <section ref={ctaBlock.ref} className={`py-16 md:py-24 bg-black ${ctaBlock.animationClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready to Experience <span className="text-secondary">Exceptional Dental Care?</span>
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 md:mb-10 font-light">
              Schedule your consultation with Dr. Aguil today and take the first step towards the smile you've always wanted.
            </p>
            <a href="https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="motion-safe:animate-pulse-subtle">Book an Appointment</Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
