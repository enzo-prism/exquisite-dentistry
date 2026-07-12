
import { getBlogIndex } from '../data/blogIndex';
import { transformationStories } from '../data/transformationStories';
import { getCanonicalUrl } from './schemaValidation';
import pageLastmod from '../data/pageLastmod.json';

// Real per-file last-modified dates (git commit date, mtime fallback), generated
// by scripts/generate-file-dates.mjs at build time. Replaces the old hash-based
// fabricated dates, which Google discounts and which hurt E-E-A-T on a YMYL site.
const PAGE_LASTMOD: Record<string, string> = pageLastmod as Record<string, string>;

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Returns the real last-modified date for a source file from the build-time
// map, falling back to the build date, then the reference date. The legacy
// `fallbackDays` argument is retained for call-site compatibility but no longer
// fabricates an offset.
const getFileLastModified = (relativePath: string, _fallbackDays: number, referenceDate: Date): string => {
  return (
    PAGE_LASTMOD[relativePath] ||
    PAGE_LASTMOD.__generatedAt ||
    referenceDate.toISOString().split('T')[0]
  );
};

export const generateSitemapData = (): SitemapUrl[] => {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  
  // Static pages with optimized priorities and frequencies
  const staticPages: SitemapUrl[] = [
    {
      loc: getCanonicalUrl('/'),
      lastmod: getFileLastModified('src/pages/Index.tsx', 7, now),
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: getCanonicalUrl('/about'),
      lastmod: getFileLastModified('src/pages/About.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/tour'),
      lastmod: getFileLastModified('src/pages/Tour.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/services'),
      lastmod: getFileLastModified('src/pages/Services.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/locations'),
      lastmod: getFileLastModified('src/pages/Locations.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.75
    },
    {
      loc: getCanonicalUrl('/contact'),
      lastmod: getFileLastModified('src/pages/Contact.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/schedule-consultation'),
      lastmod: getFileLastModified('src/pages/ScheduleConsultation.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/payment-plans'),
      lastmod: getFileLastModified('src/pages/PaymentPlans.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/insurance'),
      lastmod: getFileLastModified('src/pages/Insurance.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/veneers'),
      lastmod: getFileLastModified('src/pages/Veneers.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/veneers/front-teeth-veneers-los-angeles'),
      lastmod: getFileLastModified('src/pages/FrontTeethVeneers.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/veneers/cost-los-angeles'),
      lastmod: getFileLastModified('src/pages/VeneersCostGuideLosAngeles.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/veneers/2-front-teeth-veneers-cost-los-angeles'),
      lastmod: getFileLastModified('src/pages/VeneersCostLosAngeles.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/veneers/1-tooth-veneer-los-angeles'),
      lastmod: getFileLastModified('src/pages/OneToothVeneerLosAngeles.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/zoom-whitening'),
      lastmod: getFileLastModified('src/pages/ZoomWhitening.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/teeth-cleaning'),
      lastmod: getFileLastModified('src/pages/TeethCleaning.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/teeth-whitening'),
      lastmod: getFileLastModified('src/pages/TeethWhitening.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/teeth-whitening/cost-los-angeles'),
      lastmod: getFileLastModified('src/pages/TeethWhiteningCostLosAngeles.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/teeth-whitening-beverly-hills'),
      lastmod: getFileLastModified('src/pages/TeethWhiteningBeverlyHills.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/culver-city-teeth-whitening'),
      lastmod: getFileLastModified('src/pages/CulverCityTeethWhitening.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/invisalign'),
      lastmod: getFileLastModified('src/pages/Invisalign.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/invisalign/cost-los-angeles'),
      lastmod: getFileLastModified('src/pages/InvisalignCostLosAngeles.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/invisalign-beverly-hills'),
      lastmod: getFileLastModified('src/pages/InvisalignBeverlyHills.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/itero-scanner'),
      lastmod: getFileLastModified('src/pages/IteroScanner.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.75
    },
    {
      loc: getCanonicalUrl('/dental-implants'),
      lastmod: getFileLastModified('src/pages/DentalImplants.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/dental-implants/cost-los-angeles'),
      lastmod: getFileLastModified('src/pages/DentalImplantsCostLosAngeles.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/santa-monica-dental-implants'),
      lastmod: getFileLastModified('src/pages/SantaMonicaDentalImplants.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/dental-bridge'),
      lastmod: getFileLastModified('src/pages/DentalBridge.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.75
    },
    {
      loc: getCanonicalUrl('/dental-crowns'),
      lastmod: getFileLastModified('src/pages/DentalCrowns.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/cosmetic-dentistry'),
      lastmod: getFileLastModified('src/pages/CosmeticDentistry.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/smile-makeover-los-angeles'),
      lastmod: getFileLastModified('src/pages/SmileMakeoverLosAngeles.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/emergency-dentist'),
      lastmod: getFileLastModified('src/pages/EmergencyDentist.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/same-day-dentist'),
      lastmod: getFileLastModified('src/pages/SameDayDentist.tsx', 7, now),
      changefreq: 'monthly',
      priority: 0.85
    },
    {
      loc: getCanonicalUrl('/root-canal'),
      lastmod: getFileLastModified('src/pages/RootCanal.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.75
    },
    {
      loc: getCanonicalUrl('/pain-free-dentistry'),
      lastmod: getFileLastModified('src/pages/PainFreeDentistry.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.75
    },
    {
      loc: getCanonicalUrl('/oral-cancer-screening'),
      lastmod: getFileLastModified('src/pages/OralCancerScreening.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.75
    },
    {
      loc: getCanonicalUrl('/testimonials'),
      lastmod: getFileLastModified('src/pages/Testimonials.tsx', 14, now),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/client-experience'),
      lastmod: getFileLastModified('src/pages/ClientExperience.tsx', 14, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/smile-gallery'),
      lastmod: getFileLastModified('src/pages/SmileGallery.tsx', 7, now),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/faqs'),
      lastmod: getFileLastModified('src/pages/FAQs.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/blog'),
      lastmod: getFileLastModified('src/pages/Blog.tsx', 14, now),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/wedding'),
      lastmod: getFileLastModified('src/pages/Wedding.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/graduation'),
      lastmod: getFileLastModified('src/pages/Graduation.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/privacy-policy'),
      lastmod: getFileLastModified('src/pages/PrivacyPolicy.tsx', 90, now),
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: getCanonicalUrl('/terms-of-service'),
      lastmod: getFileLastModified('src/pages/TermsOfService.tsx', 90, now),
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: getCanonicalUrl('/hipaa-compliance'),
      lastmod: getFileLastModified('src/pages/HipaaCompliance.tsx', 180, now),
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: getCanonicalUrl('/editorial-policy'),
      lastmod: getFileLastModified('src/pages/EditorialPolicy.tsx', 180, now),
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: getCanonicalUrl('/transformation-stories'),
      lastmod: getFileLastModified('src/pages/TransformationStories.tsx', 30, now),
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/west-hollywood-dentist'),
      lastmod: getFileLastModified('src/pages/WestHollywoodDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/beverly-hills-dentist'),
      lastmod: getFileLastModified('src/pages/BeverlyHillsDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/culver-city-dentist'),
      lastmod: getFileLastModified('src/pages/CulverCityDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/west-la-dentist'),
      lastmod: getFileLastModified('src/pages/WestLADentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/bel-air-dentist'),
      lastmod: getFileLastModified('src/pages/BelAirDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/90048-dentist'),
      lastmod: getFileLastModified('src/pages/Zip90048Dentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/melrose-dentist'),
      lastmod: getFileLastModified('src/pages/MelroseDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/westwood-dentist'),
      lastmod: getFileLastModified('src/pages/WestwoodDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/miracle-mile-dentist'),
      lastmod: getFileLastModified('src/pages/MiracleMileDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/larchmont-dentist'),
      lastmod: getFileLastModified('src/pages/LarchmontDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/hancock-park-dentist'),
      lastmod: getFileLastModified('src/pages/HancockParkDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/mid-wilshire-dentist'),
      lastmod: getFileLastModified('src/pages/MidWilshireDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/koreatown-dentist'),
      lastmod: getFileLastModified('src/pages/KoreatownDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    },
    {
      loc: getCanonicalUrl('/fairfax-district-dentist'),
      lastmod: getFileLastModified('src/pages/FairfaxDistrictDentist.tsx', 30, now),
      changefreq: 'monthly',
      priority: 0.65
    }
  ];

  // Dynamic blog posts with actual publish dates (lightweight index — the
  // build chain regenerates blogIndex.json before the sitemap runs)
  const publishedPosts = getBlogIndex();
  const blogPages: SitemapUrl[] = publishedPosts.map(post => {
    const postDate = post.isoDate || currentDate;
    
    // High-value blog posts get higher priority
    const isHighValuePost = post.tags.includes('veneers') || 
                           post.tags.includes('front teeth') || 
                           post.slug.includes('cost');
    
    return {
      loc: getCanonicalUrl(`/blog/${post.slug}`),
      lastmod: postDate,
      changefreq: 'monthly' as const,
      priority: isHighValuePost ? 0.8 : 0.7
    };
  });

  // Dynamic transformation story pages
  const transformationStoryPages: SitemapUrl[] = transformationStories.map(story => ({
    loc: getCanonicalUrl(`/transformation-stories/${story.slug}`),
    lastmod: currentDate,
    changefreq: 'monthly' as const,
    priority: 0.7
  }));

  return [...staticPages, ...blogPages, ...transformationStoryPages].sort((a, b) => b.priority - a.priority);
};

export const generateXmlSitemap = (): string => {
  const urls = generateSitemapData();
  
  const urlsXml = urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
};
