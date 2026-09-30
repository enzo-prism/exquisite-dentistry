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
import { Button } from '@/components/ui/button';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import type { VideoTestimonialItem } from '@/components/video-hero/video-constants';
import { VIDEO_TESTIMONIALS } from '@/components/video-hero/video-constants';
import { ROUTE_METADATA } from '@/constants/metadata';
import { featuredReviews } from '@/data/featuredReviews';
import HomepageDoctorProof from '@/components/HomepageDoctorProof';
import SmileGalleryPreview from '@/components/SmileGalleryPreview';
import { HOMEPAGE_HERO_PROOF_LINKS, INSURANCE_HERO_BADGE } from '@/data/insurance';

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
        badgeText={INSURANCE_HERO_BADGE}
        proofLinks={[...HOMEPAGE_HERO_PROOF_LINKS]}
        useGradient={false}
        preferStaticOnMobile={true}
      />

      <HomepageDoctorProof />
      <SmileGalleryPreview />
      <ServicesSection />
      <InsurancePaymentBand />

      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm text-gold-dark font-medium mb-3">
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

          {/* Video reviews — every card stays in the DOM; the carousel only
              changes how many are in view at once. */}
          <div className="mb-16">
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
          </div>

          {/* Written reviews, kept visually distinct from the video set. */}
          <div>
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
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/testimonials/" className="w-full sm:w-auto">
              <span className="inline-flex w-full items-center justify-center rounded-sm bg-black px-8 py-3 text-sm font-semibold text-white transition hover:bg-black/90 sm:w-auto">
                Read More Reviews
                <ArrowRight size={16} className="ml-2" aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-black py-10 text-white md:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold md:text-3xl">Cosmetic dentistry in Los Angeles, designed for you</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-white/80">
            Near Beverly Hills, Exquisite Dentistry provides porcelain veneers, Invisalign,
            professional whitening, dental implants, and smile makeovers. Explore your options,
            see real patient cases, and discuss your goals with Dr. Aguil.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="!bg-gold !text-white hover:!bg-gold-dark hover:!text-white">
              <Link to="/schedule-consultation/">Plan your first visit</Link>
            </Button>
            <Button asChild variant="outline" className="border-gold/40 !bg-transparent !text-white hover:!bg-white/10">
              <Link to="/beverly-hills-dentist/">Serving Beverly Hills</Link>
            </Button>
          </div>
        </div>
      </section>

    </>
  );
};

export default IndexPage;
