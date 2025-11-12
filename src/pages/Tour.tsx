import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageSEO from '@/components/seo/PageSEO';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import useRevealOnScroll from '@/hooks/use-reveal-on-scroll';
import ImageComponent from '@/components/Image';

const studioImages = [
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964432/Screenshot_2025-11-12_at_8.16.11_AM_tyxnyo.png', alt: 'Reception lounge with custom marble welcome desk', grid: 'lg:col-span-2', aspectClass: 'aspect-[3/2]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964431/Screenshot_2025-11-12_at_8.16.52_AM_ikhcjl.png', alt: 'Treatment suite framed by artisan lighting', aspectClass: 'aspect-[3/4]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964431/Screenshot_2025-11-12_at_8.16.41_AM_nk055e.png', alt: 'Hydration bar with curated refreshments', aspectClass: 'aspect-[5/4]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964432/Screenshot_2025-11-12_at_8.15.55_AM_ohilow.png', alt: 'Consultation seating area', aspectClass: 'aspect-[4/3]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964430/Screenshot_2025-11-12_at_8.18.03_AM_bk17gc.png', alt: 'Boutique-inspired treatment suite', aspectClass: 'aspect-[3/2]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964430/Screenshot_2025-11-12_at_8.17.55_AM_x95qqt.png', alt: 'Finishing studio with glam mirror', aspectClass: 'aspect-[4/5]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964430/Screenshot_2025-11-12_at_8.18.09_AM_fn0drs.png', alt: 'Private suite with warm wood textures', aspectClass: 'aspect-[3/4]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964430/Screenshot_2025-11-12_at_8.17.43_AM_gwfng6.png', alt: 'Sculpted hallway with statement lighting', grid: 'lg:col-span-2', aspectClass: 'aspect-[21/9]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964429/Screenshot_2025-11-12_at_8.19.00_AM_eoxxrj.png', alt: 'Hydration bar and apothecary shelving', aspectClass: 'aspect-[4/3]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/c_crop,g_auto,h_1000,w_800/v1762964429/Screenshot_2025-11-12_at_8.19.00_AM_eoxxrj.png', alt: 'Shelving detail and florals', aspectClass: 'aspect-[5/8]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964429/Screenshot_2025-11-12_at_8.18.44_AM_z0ke2q.png', alt: 'Open concept operatory with bespoke partitions', grid: 'lg:col-span-2', aspectClass: 'aspect-[16/9]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/c_crop,g_auto,h_900,w_900/v1762964429/Screenshot_2025-11-12_at_8.18.44_AM_z0ke2q.png', alt: 'Close-up of brushed brass fixtures', aspectClass: 'aspect-square' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/c_crop,g_face,h_900,w_700/v1762964429/Screenshot_2025-11-12_at_8.18.44_AM_z0ke2q.png', alt: 'Soft seating vignette', aspectClass: 'aspect-[3/4]' },
  { src: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762964431/Screenshot_2025-11-12_at_8.16.41_AM_nk055e.png', alt: 'Luxe beverage station second angle', aspectClass: 'aspect-[4/3]' }
];

const getImageIdentifier = (src: string) => {
  const withoutQuery = src.split('?')[0];
  const parts = withoutQuery.split('/');
  return parts[parts.length - 1] ?? withoutQuery;
};

const uniqueStudioImages = studioImages.filter((image, index, self) => {
  const identifier = getImageIdentifier(image.src);
  return self.findIndex((item) => getImageIdentifier(item.src) === identifier) === index;
});

const Tour = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const heroHeading = useRevealOnScroll({ delayClass: 'reveal-delay-100' });
  const galleryReveal = useRevealOnScroll({ animation: 'scale', delayClass: 'reveal-delay-100' });

  return (
    <>
      <MasterStructuredData
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        additionalSchemas={[{
          '@context': 'https://schema.org',
          '@type': 'ItemPage',
          '@id': getCanonicalUrl('/tour#page'),
          name: 'Studio Tour | Exquisite Dentistry Los Angeles',
          description: 'Step inside Exquisite Dentistry in Beverly Hills. Explore the luxury dental studio, private suites, and sensory touches curated for calm, elevated care.',
          url: getCanonicalUrl('/tour')
        }]}
      />

      <PageSEO
        title="Luxury Dental Studio Tour | Exquisite Dentistry LA"
        description="Take a guided tour of our Beverly Hills dental studio. Explore the arrival lounge, consultation salon, private treatment suites, and finishing studio designed for a five-star experience."
        keywords="dental office tour, Beverly Hills dental studio, luxury dentist office, Exquisite Dentistry interiors"
        path="/tour"
      />

      {/* Hero Section */}
      <section className="bg-black text-white py-16 sm:py-24 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h1 ref={heroHeading.ref} className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight ${heroHeading.animationClass}`}>
            Office Gallery
          </h1>
          <p className="text-white/70 text-base sm:text-lg">
            Take a virtual tour of the 5 star interior design of Exquisite Dentistry
          </p>
          <Link
            to="/testimonials"
            className="inline-flex justify-center text-xs uppercase tracking-[0.35em] text-white/70 hover:text-white transition"
          >
            5-star experience · 200+ Google reviews · 100+ Yelp reviews
          </Link>
        </div>
      </section>

      <section
        ref={galleryReveal.ref}
        className={`py-16 sm:py-24 bg-white ${galleryReveal.animationClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance]">
            {uniqueStudioImages.map((image) => (
              <div
                key={image.src}
                className="break-inside-avoid-column rounded-3xl border border-black/5 bg-white shadow-[0_25px_60px_-35px_rgba(15,23,42,0.25)] overflow-hidden"
              >
                <ImageComponent
                  src={image.src}
                  alt={image.alt}
                  className="block w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
};

export default Tour;
