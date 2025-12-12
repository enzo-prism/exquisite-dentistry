import React from 'react';
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
import FloatingActionButton from '@/components/mobile/FloatingActionButton';
import ProgressiveLoader from '@/components/mobile/ProgressiveLoader';
import { useRevealOnScroll } from '@/hooks/use-reveal-on-scroll';
import { ROUTE_METADATA } from '@/constants/metadata';

const HOMEPAGE_TESTIMONIALS: VideoTestimonialItem[] = transformationStories.map((story) => {
  const thumbnailUrl = story.thumbnailUrl ?? story.video.poster ?? '';
  const isVimeo = story.video.src.includes('vimeo.com');

  if (isVimeo) {
    const match = story.video.src.match(/video\/(\d+)/);
    const vimeoId = match?.[1] ?? story.id;

    return {
      id: `${story.id}-testimonial`,
      type: 'vimeo' as const,
      vimeoId,
      thumbnailUrl,
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
    title: story.title,
    uploadDate: '2024-01-01',
    duration: 'PT2M0S'
  };
});

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
        title={<>Los Angeles' Premier <span className="text-gold">Cosmetic Dentist</span></>} 
        subtitle="Transform your smile at Los Angeles' most trusted cosmetic dentistry practice near Beverly Hills. Celebrity clientele, spa-like environment, and Hollywood-quality results with Dr. Alexie Aguil." 
        primaryCta={{
          text: "Schedule a Consultation",
          href: "https://scheduling.simplifeye.co#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
        }}
        secondaryCta={{
          text: "View Smile Gallery",
          href: "/smile-gallery"
        }}
        useGradient={false}
      />
      
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
                Where Celebrity Smiles Are Made - Los Angeles Excellence
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Located in Los Angeles near Beverly Hills, Exquisite Dentistry is where A-list celebrities, industry executives, and discerning patients come for unparalleled cosmetic dental artistry. Dr. Alexie Aguil's exclusive practice combines cutting-edge technology with old-world craftsmanship to create the stunning, natural-looking smiles that define Hollywood glamour.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  Why Choose Exquisite Dentistry?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Located in Los Angeles, conveniently serving Beverly Hills and the surrounding area, our practice combines advanced dental 
                  technology with artistic vision to create stunning, natural-looking smile 
                  transformations. Dr. Aguil's expertise in cosmetic dentistry has made her 
                  the trusted choice for patients throughout Los Angeles, West Hollywood, 
                  Santa Monica, and surrounding areas.
                </p>
                <p className="text-muted-foreground">
                  With over a decade of experience and thousands of successful treatments, 
                  Dr. Aguil understands that every smile is unique. She takes time to listen 
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
                      that create perfect, Hollywood-worthy smiles
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Professional Teeth Whitening:</strong> Safe, effective treatments 
                      that brighten teeth up to 8 shades in one visit
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
      <FloatingActionButton />
    </>
  );
};

export default IndexPage;
