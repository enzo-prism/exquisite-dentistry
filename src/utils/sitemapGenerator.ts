
import { getPublishedPosts } from '../data/blogPosts';
import { transformationStories } from '../data/transformationStories';
import { getCanonicalUrl } from './schemaValidation';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const getStableLastModified = (path: string, maxDaysAgo: number, referenceDate: Date): string => {
  const offset = hashString(path) % Math.max(maxDaysAgo, 1);
  const computedDate = new Date(referenceDate.getTime() - offset * DAY_IN_MS);
  return computedDate.toISOString().split('T')[0];
};

export const generateSitemapData = (): SitemapUrl[] => {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  
  // Static pages with optimized priorities and frequencies
  const staticPages: SitemapUrl[] = [
    {
      loc: getCanonicalUrl('/'),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: getCanonicalUrl('/about'),
      lastmod: getStableLastModified('/about', 30, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/services'),
      lastmod: getStableLastModified('/services', 14, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/contact'),
      lastmod: getStableLastModified('/contact', 30, now),
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: getCanonicalUrl('/veneers'),
      lastmod: getStableLastModified('/veneers', 14, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/zoom-whitening'),
      lastmod: getStableLastModified('/zoom-whitening', 14, now),
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/testimonials'),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/client-experience'),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/smile-gallery'),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/faqs'),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/blog'),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: getCanonicalUrl('/wedding'),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/graduation'),
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: getCanonicalUrl('/privacy-policy'),
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: getCanonicalUrl('/terms-of-service'),
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: getCanonicalUrl('/hipaa-compliance'),
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: getCanonicalUrl('/transformation-stories'),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    }
  ];

  // Dynamic blog posts with actual publish dates
  const publishedPosts = getPublishedPosts();
  const blogPages: SitemapUrl[] = publishedPosts.map(post => {
    // Convert blog post date to ISO format
    const postDate = new Date(post.date).toISOString().split('T')[0];
    
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
