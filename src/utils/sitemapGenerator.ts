
import { getPublishedPosts } from '@/data/blogPosts';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemapData = (): SitemapUrl[] => {
  const baseUrl = 'https://exquisitedentistryla.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages with optimized priorities and frequencies
  const staticPages: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/veneers`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/zoom-whitening`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/testimonials`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/client-experience`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/smile-gallery`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/faqs`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/wedding`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/graduation`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/privacy-policy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/terms-of-service`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/hipaa-compliance`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
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
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: postDate,
      changefreq: 'monthly' as const,
      priority: isHighValuePost ? 0.8 : 0.7
    };
  });

  return [...staticPages, ...blogPages].sort((a, b) => b.priority - a.priority);
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
