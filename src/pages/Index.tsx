import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VideoHero from '@/components/VideoHero';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import PageSEO from '@/components/seo/PageSEO';
import ServicesSection from '@/components/ServicesSection';
import ReviewWidget from '@/components/ReviewWidget';
import SeasonalTreatments from '@/components/SeasonalTreatments';
import PracticeVideoSection from '@/components/PracticeVideoSection';
import SimpleTestimonialEmbed from '@/components/SimpleTestimonialEmbed';
import DoctorIntroSection from '@/components/DoctorIntroSection';
import SmileGalleryPreview from '@/components/SmileGalleryPreview';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import ImageComponent from '@/components/Image';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';
import { transformationStories } from '@/data/transformationStories';
import { useRevealOnScroll } from '@/hooks/use-reveal-on-scroll';
import { useIsMobile } from '@/hooks/use-mobile';
import { ROUTE_METADATA } from '@/constants/metadata';

const LazyFloatingActionButton = lazy(() => import('@/components/mobile/FloatingActionButton'));

const toOptimizedLocalThumbnail = (thumbnailUrl: string): { thumbnailUrl: string; thumbnailFallbackUrl?: string } => {
  const match = thumbnailUrl.match(/^\/lovable-uploads\/([^/]+)\.(png|jpe?g)$/i);
  if (!match) return { thumbnailUrl };

  return {
    thumbnailUrl: `/optimized/${match[1]}-md.webp`,
    thumbnailFallbackUrl: thumbnailUrl,
  };
};

const HOMEPAGE_TESTIMONIALS: VideoTestimonialItem[] = transformationStories.map((story) => {
  const rawThumbnailUrl = story.thumbnailUrl ?? story.video.poster ?? '';
  const { thumbnailUrl, thumbnailFallbackUrl } = toOptimizedLocalThumbnail(rawThumbnailUrl);
  const isVimeo = story.video.src.includes('vimeo.com');

  if (isVimeo) {
    const match = story.video.src.match(/video\/(\d+)/);
    const vimeoId = match?.[1] ?? story.id;

    return {
      id: `${story.id}-testimonial`,
      type: 'vimeo' as const,
      vimeoId,
      thumbnailUrl,
      thumbnailFallbackUrl,
      title: story.title,
      uploadDate: '2024-01-01',
      duration: 'PT2M0S'
    };
  }

  return {
    id: `${story.id}-testimonial`,
    type: 'file' as const,
    videoUrl: story.video.src,
    thumbnailUrl,
    thumbnailFallbackUrl,
    title: story.title,
    uploadDate: '2024-01-01',
    duration: 'PT2M0S'
  };
});

const DeferredMobileFab: React.FC = () => {
  const isMobile = useIsMobile();
  const [shouldLoadFab, setShouldLoadFab] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      setShouldLoadFab(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (!isMobile || !shouldLoadFab) return null;

  return (
    <Suspense fallback={null}>
      <LazyFloatingActionButton />
    </Suspense>
  );
};

const IndexPage: React.FC = () => {
  const totalTestimonials = HOMEPAGE_TESTIMONIALS.length;
  const meta = ROUTE_METADATA['/'];

  // CSS-based reveal animations (replacing Framer Motion)
  const practiceVideo = useRevealOnScroll({ animation: 'up' });
  const doctorIntro = useRevealOnScroll({ animation: 'up', delayClass: 'stagger-1' });
  const smileGallery = useRevealOnScroll({ animation: 'up' });
  const services = useRevealOnScroll({ animation: 'up' });
  const seasonal = useRevealOnScroll({ animation: 'fade' });
  const clientExperience = useRevealOnScroll({ animation: 'scale' });
  const testimonials = useRevealOnScroll({ animation: 'fade' });

  return (
    <>
      <MasterStructuredData 
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
      />
      <PageSEO 
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path=""
        ogImage={meta.ogImage}
      />
      
      <VideoHero
        title={<>Los Angeles <span className="text-gold">Cosmetic Dentist</span></>} 
        subtitle="High-end cosmetic dentistry near Beverly Hills, focused on porcelain veneers, Invisalign, teeth whitening, and smile makeovers. Led by Dr. Alexie Aguil, DDS, with a calm, spa-like patient experience." 
        primaryCta={{
          text: "Schedule Consultation",
          href: "/schedule-consultation/"
        }}
        secondaryCta={{
          text: "Smile Gallery",
          href: "/smile-gallery/"
        }}
        useGradient={false}
      />

      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs tracking-[0.35em] uppercase text-gold/80">
                Most Requested
              </p>
              <h2 className="text-lg font-semibold text-white">
                Popular Pages
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full lg:w-auto">
              {[
                { to: '/dental-implants/', label: 'Dental Implants' },
                { to: '/veneers/', label: 'Porcelain Veneers' },
                { to: '/beverly-hills-dentist/', label: 'Beverly Hills Dentist' },
                { to: '/smile-gallery/', label: 'Smile Gallery' },
                { to: '/schedule-consultation/', label: 'Schedule Consultation' }
              ].map((item) => (
                <Button
                  key={item.to}
                  variant="outline"
                  className="w-full border-gold/40 !text-white hover:bg-white/10 hover:!text-white"
                  asChild
                >
                  <Link to={item.to}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <div ref={practiceVideo.ref} className={practiceVideo.animationClass}>
        <PracticeVideoSection />
      </div>

      <div ref={doctorIntro.ref} className={doctorIntro.animationClass}>
        <DoctorIntroSection />
      </div>

      <div ref={smileGallery.ref} className={smileGallery.animationClass}>
        <SmileGalleryPreview />
      </div>

      <div ref={services.ref} className={services.animationClass}>
        <ServicesSection />
      </div>

      <div ref={seasonal.ref} className={seasonal.animationClass}>
        <SeasonalTreatments />
      </div>

      <div ref={clientExperience.ref} className={clientExperience.animationClass}>
        <ClientExperienceSection />
      </div>
      
      <section
        ref={testimonials.ref}
        className={`py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white ${testimonials.animationClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Client <span className="text-gold">Reviews</span>
            </h2>
            <div className="separator mx-auto" />
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              See what our clients are saying about their experience at Exquisite Dentistry
            </p>
          </div>

          {/* Video Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12">
            {HOMEPAGE_TESTIMONIALS.map((testimonial, index) => {
              const isCenteredSolo = totalTestimonials % 2 === 1 && index === totalTestimonials - 1;
              return (
                <div
                  key={testimonial.id}
                  className={`h-full card-animate ${isCenteredSolo ? 'sm:col-span-2 sm:max-w-3xl sm:mx-auto' : ''}`}
                >
                  <SimpleTestimonialEmbed
                    testimonial={testimonial}
                    className="h-full"
                  />
                </div>
              );
            })}
          </div>

          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>

      {/* SEO-Rich Content Section */}
      <section className="relative z-10 bg-background py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Cosmetic Dentistry in Los Angeles, Designed for You
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Located in Los Angeles near Beverly Hills, Exquisite Dentistry provides porcelain veneers, Invisalign, professional whitening, implants, and complete smile makeovers. Dr. Alexie Aguil, DDS uses digital smile design and close lab collaboration to deliver natural-looking results that fit your facial features and bite.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  Why Choose Exquisite Dentistry?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Located in Los Angeles and serving Beverly Hills and nearby neighborhoods, our practice combines advanced dental technology with artistic planning to create natural-looking smile transformations. Dr. Aguil focuses on conservative care, clear communication, and results that look believable in real life.
                </p>
                <p className="text-muted-foreground">
                  With more than a decade in practice, Dr. Aguil understands that every smile is unique. She takes time to listen 
                  to your goals and creates personalized treatment plans that enhance your 
                  natural beauty while improving oral health and function.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  Our Signature Services
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Porcelain Veneers:</strong> Ultra-thin, custom-crafted shells 
                      designed to refine shape, color, and symmetry
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Professional Teeth Whitening:</strong> Safe, effective treatments 
                      that often brighten teeth several shades in one visit
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Invisalign:</strong> Discreet clear aligners that straighten 
                      teeth without the appearance of traditional braces
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg border">
              <h3 className="text-3xl font-semibold text-foreground mb-4 text-center">
                Advanced Technology for Superior Results
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Our Los Angeles practice near Beverly Hills features cutting-edge dental technology including 
                digital X-rays, 3D imaging, computer-guided treatment planning, and same-day 
                crown technology. This advanced equipment allows for more precise diagnoses, 
                comfortable treatments, and exceptional results.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Digital Smile Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Preview your new smile before treatment begins with advanced imaging technology
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Minimally Invasive</h4>
                  <p className="text-sm text-muted-foreground">
                    Preserve more natural tooth structure while achieving beautiful results
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Comfort Focused</h4>
                  <p className="text-sm text-muted-foreground">
                    Spa-like environment with sedation options for anxious patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Floating Action Button */}
      <DeferredMobileFab />
    </>
  );
};

export default IndexPage;
