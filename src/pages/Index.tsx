import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import VideoHero from '@/components/VideoHero';
import PageSEO from '@/components/seo/PageSEO';
import ServicesSection from '@/components/ServicesSection';
import SimpleTestimonialEmbed from '@/components/SimpleTestimonialEmbed';
import ReviewCarousel from '@/components/reviews/ReviewCarousel';
import WrittenReviewCard from '@/components/reviews/WrittenReviewCard';
import InsurancePaymentBand from '@/components/InsurancePaymentBand';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import FirstVisitSteps from '@/components/FirstVisitSteps';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';
import { VIDEO_TESTIMONIALS } from '@/components/video-hero/video-constants';
import { ROUTE_METADATA } from '@/constants/metadata';
import { featuredReviews } from '@/data/featuredReviews';
import HomepageDoctorProof from '@/components/HomepageDoctorProof';
import SmileGalleryPreview from '@/components/SmileGalleryPreview';
import { HOMEPAGE_HERO_PROOF_LINKS } from '@/data/insurance';

const toOptimizedLocalThumbnail = (thumbnailUrl: string): { thumbnailUrl: string; thumbnailFallbackUrl?: string } => {
  const match = thumbnailUrl.match(/^\/lovable-uploads\/([^/]+)\.(png|jpe?g)$/i);
  if (!match) return { thumbnailUrl };

  return {
    thumbnailUrl: `/optimized/${match[1]}-md.webp`,
    thumbnailFallbackUrl: thumbnailUrl,
  };
};

const HOMEPAGE_TESTIMONIALS: VideoTestimonialItem[] = VIDEO_TESTIMONIALS.map(
  (testimonial) => {
    const { thumbnailUrl, thumbnailFallbackUrl } = toOptimizedLocalThumbnail(
      testimonial.thumbnailUrl
    );

    return {
      ...testimonial,
      thumbnailUrl,
      thumbnailFallbackUrl:
        thumbnailFallbackUrl ?? testimonial.thumbnailFallbackUrl
    };
  }
);

/**
 * A trimmed set for the homepage carousel — the full wall (with theme filters)
 * lives on /testimonials/ behind the "Read More Reviews" button.
 */
const HOMEPAGE_WRITTEN_REVIEWS = featuredReviews.filter((review) => review.quote).slice(0, 12);

const IndexPage: React.FC = () => {
  const meta = ROUTE_METADATA['/'];

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
        subtitle="High-end cosmetic dentistry near Beverly Hills, focused on porcelain veneers, Invisalign, teeth whitening, and smile makeovers. Have a PPO plan? We can help verify benefits before treatment."
        primaryCta={{
          text: "Schedule Consultation",
          href: "/schedule-consultation/",
          className: "!text-white hover:!text-white"
        }}
        secondaryCta={{
          text: "Smile Gallery",
          href: "/smile-gallery/"
        }}
        eyebrow="Near Beverly Hills · Since 2006"
        phoneCta
        height="large"
        proofLinks={[...HOMEPAGE_HERO_PROOF_LINKS]}
        useGradient={false}
        preferStaticOnMobile={true}
      />

      <HomepageDoctorProof />
      <SmileGalleryPreview />
      <ServicesSection />
      <InsurancePaymentBand />

      <section className="bg-ivory py-16 md:py-24">
        <div className="section-container">
          <SectionHeading
            eyebrow="Testimonials"
            title={<>Client <em>Reviews</em></>}
            description="See what our clients are saying about their experience at Exquisite Dentistry"
            className="mb-12 md:mb-14"
          />

          {/* Video reviews — every card stays in the DOM; the carousel only
              changes how many are in view at once. */}
          <Reveal variant="up" className="mb-16">
            <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
              Video Reviews
            </h3>
            <ReviewCarousel label="Video reviews" perView={3}>
              {HOMEPAGE_TESTIMONIALS.map((testimonial) => (
                <SimpleTestimonialEmbed
                  key={testimonial.id}
                  testimonial={testimonial}
                  className="h-full"
                />
              ))}
            </ReviewCarousel>
          </Reveal>

          {/* Written reviews, kept visually distinct from the video set. */}
          <Reveal variant="up">
            <h3 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
              Written Reviews
            </h3>
            <ReviewCarousel label="Written reviews" perView={3}>
              {HOMEPAGE_WRITTEN_REVIEWS.map((review) => (
                <WrittenReviewCard
                  key={review.name + (review.quote ?? '')}
                  review={review}
                  className="h-full"
                />
              ))}
            </ReviewCarousel>
          </Reveal>

          <div className="mt-12 flex justify-center">
            <Link to="/testimonials/" className="group inline-flex min-h-12 w-full items-center justify-center rounded-full bg-black px-8 text-sm font-semibold text-white transition hover:bg-black/90 sm:w-auto">
              Read More Reviews
              <ArrowRight size={16} className="ml-2 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FirstVisitSteps />
    </>
  );
};

export default IndexPage;
