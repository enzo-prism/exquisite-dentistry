
import React, { useEffect, useRef } from 'react';
import PageSEO from '@/components/seo/PageSEO';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';
import VideoHero from '@/components/VideoHero';
import { patientTransformations, type GalleryCategory } from '@/data/patientTransformations';
import PatientTransformationCard from '@/components/PatientTransformation';
import { closeUpTransformations } from '@/data/closeUpTransformations';
import CloseUpTransformationCard from '@/components/CloseUpTransformation';
import ImageGalleryStructuredData from '@/components/ImageGalleryStructuredData';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';
import { ROUTE_METADATA } from '@/constants/metadata';
import FinancingOptionsSection from '@/components/FinancingOptionsSection';
import { CHERRY_CREDIT_REPORTING_DISCLOSURE } from '@/constants/cherry';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import ConsultationCtaBand from '@/components/about/ConsultationCtaBand';

const SmileGallery = () => {
  const { hash } = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const filters: { value: GalleryCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All treatments' },
    { value: 'veneers', label: 'Veneers' },
    { value: 'alignment', label: 'Alignment' },
    { value: 'implants', label: 'Implants' },
    { value: 'combined', label: 'Combined treatments' },
  ];
  const requestedCategory = searchParams.get('treatment');
  const category = filters.find((filter) => filter.value === requestedCategory)?.value || 'all';
  const setCategory = (nextCategory: GalleryCategory | 'all') => {
    const nextParams = new URLSearchParams(searchParams);
    if (nextCategory === 'all') nextParams.delete('treatment');
    else nextParams.set('treatment', nextCategory);
    setSearchParams(nextParams, { preventScrollReset: true });
  };
  const filteredPatients = patientTransformations.filter((patient) => category === 'all' || patient.categories.includes(category));

  const meta = ROUTE_METADATA['/smile-gallery'];
  const sliderSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let following = false;
    let expectedScrollY: number | null = null;
    let disconnectTimer: number | undefined;

    const SCROLL_SLACK = 16;

    const isGallerySection = (target: Element | null): target is HTMLElement => (
      target instanceof HTMLElement && target.tagName === 'SECTION'
    );

    const hashSection = () => {
      const raw = window.location.hash.slice(1);
      if (!raw) return null;
      let id = raw;
      try {
        id = decodeURIComponent(raw);
      } catch {
        // Keep the raw fragment when it is not URI-encoded.
      }
      const target = document.getElementById(id);
      return isGallerySection(target) ? target : null;
    };

    const sectionOffset = (target: HTMLElement) => {
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      return target.getBoundingClientRect().top - margin;
    };

    const isAtHashTarget = () => {
      const target = hashSection();
      return !!target && Math.abs(sectionOffset(target)) <= SCROLL_SLACK;
    };

    const observer = new ResizeObserver(() => {
      followLayout();
    });

    const stopFollowing = () => {
      following = false;
      expectedScrollY = null;
      observer.disconnect();
      window.clearTimeout(disconnectTimer);
    };

    const scheduleIdleDisconnect = () => {
      window.clearTimeout(disconnectTimer);
      disconnectTimer = window.setTimeout(() => {
        if (!cancelled) stopFollowing();
      }, 3_000);
    };

    const observeLayout = () => {
      observer.observe(document.documentElement);
      if (document.body) observer.observe(document.body);
    };

    const armFollow = () => {
      following = true;
      observeLayout();
      scheduleIdleDisconnect();
    };

    const scrollToHash = (restartFollow = false) => {
      const target = hashSection();
      if (!target) return;
      if (restartFollow) armFollow();
      if (!following) return;
      expectedScrollY = Math.max(0, window.scrollY + sectionOffset(target));
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      expectedScrollY = window.scrollY;
    };

    // Images above a lower section can load after the first scroll and shift it.
    const followLayout = () => {
      if (cancelled || !following) return;
      scheduleIdleDisconnect();
      scrollToHash();
    };

    scrollToHash(true);
    const onHashChange = () => scrollToHash(true);
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('load', followLayout);
    const onImageLoad = (event: Event) => {
      if (event.target instanceof HTMLImageElement) followLayout();
    };
    document.addEventListener('load', onImageLoad, true);

    const onUserIntent = () => stopFollowing();
    // Cancel only when scroll moves off the position we set (or off the hash
    // target). Layout shifts and late scrollIntoView settles must not look
    // like user input; a fixed ignore window is too short in WebKit.
    const onScroll = () => {
      if (!following) return;
      if (expectedScrollY !== null && Math.abs(window.scrollY - expectedScrollY) <= SCROLL_SLACK) return;
      if (isAtHashTarget()) {
        expectedScrollY = window.scrollY;
        return;
      }
      stopFollowing();
    };
    window.addEventListener('wheel', onUserIntent, { capture: true, passive: true });
    window.addEventListener('touchstart', onUserIntent, { capture: true, passive: true });
    window.addEventListener('keydown', onUserIntent, { capture: true });
    window.addEventListener('pointerdown', onUserIntent, { capture: true });
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });

    const onSameHashClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (`${url.pathname}${url.search}` !== `${window.location.pathname}${window.location.search}`) return;
      if (!url.hash || url.hash !== window.location.hash) return;
      // Same-page, same-hash clicks do not fire hashchange or change React's hash.
      scrollToHash(true);
    };
    document.addEventListener('click', onSameHashClick);

    return () => {
      cancelled = true;
      stopFollowing();
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('load', followLayout);
      document.removeEventListener('load', onImageLoad, true);
      window.removeEventListener('wheel', onUserIntent, { capture: true });
      window.removeEventListener('touchstart', onUserIntent, { capture: true });
      window.removeEventListener('keydown', onUserIntent, { capture: true });
      window.removeEventListener('pointerdown', onUserIntent, { capture: true });
      window.removeEventListener('scroll', onScroll, { capture: true });
      document.removeEventListener('click', onSameHashClick);
    };
  }, [hash]);

  const handleViewGallery = () => {
    sliderSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <MasterStructuredData includeBusiness={true} />
      <ImageGalleryStructuredData galleryType="smile-transformations" />
      <PageSEO
        title={meta.title}
        description={meta.description}
        keywords={meta.keywords}
        path="/smile-gallery"
        ogImage={meta.ogImage}
      />
      <WebPageStructuredData
        title="Smile Gallery"
        description={meta.description}
        url="https://exquisitedentistryla.com/smile-gallery"
        breadcrumbs={[
          { name: 'Smile Gallery', url: 'https://exquisitedentistryla.com/smile-gallery/' }
        ]}
      />

      {/* Hero Section with VideoHero */}
      <VideoHero 
        title={<>Smile <span className="text-gold">Gallery</span></>} 
        subtitle="See the results our patients have achieved with our dental care." 
        primaryCta={{
          text: "View Gallery",
          onClick: handleViewGallery
        }}
        secondaryCta={{
          text: "Schedule Consultation",
          href: SCHEDULE_CONSULTATION_PATH
        }}
        height="medium" 
        badgeText="SMILE GALLERY" 
        scrollIndicator={true} 
      />

      <div className="container mx-auto px-4 mt-6 max-w-6xl">
        <Breadcrumbs items={[{ label: 'Smile Gallery', to: '/smile-gallery/' }]} />
      </div>

      {/* Patient Stories Section */}
      <section ref={sliderSectionRef} id="smile-gallery-cases" className="scroll-mt-28 bg-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Patient cases"
              title={<>Client <em>Smile Transformations</em></>}
              description="Real transformations from our clients who trusted us with their smiles"
            />
            <Reveal as="p" variant="up" delay={220} className="mx-auto mt-4 max-w-2xl text-center text-sm text-gray-600">
              Planning a full transformation? Explore our{" "}
              <Link to="/smile-makeover-los-angeles/" className="text-gold-dark underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold">
                Smile Makeover in Los Angeles guide
              </Link>
              .
            </Reveal>
            <Reveal variant="up" delay={280} className="mx-auto mt-10 max-w-4xl">
              <div className="grid gap-5 rounded-2xl border border-gold/15 bg-ivory px-6 py-6 text-left md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8 md:px-8">
                <div>
                  <p className="eyebrow">
                    Real Patients, Real Results
                  </p>
                  <p className="mt-3 text-base leading-7 text-gray-600">
                    These are actual Exquisite Dentistry transformations, not AI renderings. Browse
                    the before-and-after cases, then compare them with patient reviews for another
                    layer of trust before planning your own smile goals.
                  </p>
                </div>
                <Link
                  to="/testimonials/"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-gold/40 bg-white px-5 py-3 text-sm font-semibold text-gold-dark transition hover:border-gold"
                >
                  Read Patient Reviews
                </Link>
              </div>
            </Reveal>
          </div>
          
          <div role="group" aria-label="Filter transformations by treatment" className="mb-5 flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                aria-pressed={category === filter.value}
                aria-controls="patient-cases"
                onClick={() => setCategory(filter.value)}
                className={`min-h-11 rounded-sm border px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark ${category === filter.value ? 'border-black bg-black text-white' : 'border-gold/40 bg-white text-gray-900 hover:bg-gold/10'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p role="status" aria-live="polite" aria-atomic="true" className="mb-3 text-center text-sm text-gray-600">
            Showing {filteredPatients.length} of {patientTransformations.length} patient cases
          </p>
          <p className="mb-8 text-center text-sm text-gray-600">Drag a comparison, or use the arrow keys when it has focus. Results vary by patient.</p>
          <div id="patient-cases" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPatients.map((patient, index) => (
              <Reveal key={patient.name} variant="up" delay={(index % 3) * 80} className="h-full">
                <PatientTransformationCard patient={patient} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Up Close Transformations Section */}
      <section
        className="scroll-mt-28 bg-ivory py-16 md:py-24"
        id="smile-gallery-sliders"
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading
            className="mb-12"
            eyebrow="In detail"
            title={<>Up Close <em>Transformations</em></>}
            description={<>
              See the detail and precision of our cosmetic dental work.
              Drag the slider or use the arrow keys to compare the photos. These additional
              close-ups have no treatment labels and are shown separately from the filtered cases.
            </>}
          />
          
          {/* Close-up transformations grid - standardized responsive breakpoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {closeUpTransformations.map((transformation, index) => (
              <Reveal key={transformation.id} variant="up" delay={(index % 3) * 80} className="h-full">
                <CloseUpTransformationCard
                  transformation={transformation}
                  className="h-full rounded-2xl border border-gold/15 shadow-[0_24px_60px_-40px_rgba(23,18,10,0.35)]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCtaBand
        id="smile-gallery-consultation"
        className="scroll-mt-28 bg-white"
        source="smile_gallery_cta"
        eyebrow="Your smile"
        title={<>Talk through <em className="whitespace-nowrap">your own</em> smile goals</>}
        description="Bring the cases you liked to a consultation. Dr. Aguil will look at your teeth and explain which options fit your case. Results vary by patient."
      />

      <FinancingOptionsSection
        className="bg-ivory"
        eyebrow="Smile Gallery Financing"
        title="Inspired by a transformation? Review payment options before you book."
        description="If one of these real patient cases helps you picture a larger smile plan, Cherry can help eligible patients review possible monthly payment options for veneers, implants, Invisalign, whitening, or a complete smile makeover."
        disclaimer={`Financing is optional, and financing decisions are handled through Cherry. ${CHERRY_CREDIT_REPORTING_DISCLOSURE} You can explore payment options first or schedule a consultation and talk through treatment details with our team.`}
        primaryCtaText="Review Payment Options"
        secondaryCtaText="Schedule Consultation"
        secondaryCtaHref={SCHEDULE_CONSULTATION_PATH}
      />

    </>
  );
};

export default SmileGallery;
