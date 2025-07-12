
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Choosing Veneers for the Front 4 Teeth: Complete Smile Transformation Guide',
    slug: 'choosing-veneers-for-the-front-4-teeth',
    excerpt: 'Learn everything about getting porcelain veneers for your front 4 teeth. Discover costs, benefits, process, and why treating the smile zone together delivers the best results.',
    content: 'front-4-veneers', // This will map to the existing component
    author: 'Dr. Alexie Aguil',
    authorBio: 'With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.',
    date: 'December 15, 2024',
    readTime: '15 min read',
    category: 'Cosmetic Dentistry',
    tags: ['veneers', 'front teeth', 'smile zone', 'porcelain veneers', 'cosmetic dentistry'],
    featuredImage: '/lovable-uploads/5453516e-5298-4daa-9f2c-f98804ddcd5e.webp',
    seoTitle: 'Choosing Veneers for the Front 4 Teeth | Complete Smile Transformation Guide',
    seoDescription: 'Learn everything about getting porcelain veneers for your front 4 teeth. Discover costs, benefits, process, and why treating the smile zone together delivers the best results. Expert insights from Dr. Alexie Aguil.',
    seoKeywords: 'veneers front 4 teeth, front teeth veneers, 4 veneers cost, smile zone veneers, upper front teeth veneers, porcelain veneers Los Angeles',
    published: true
  },
  {
    id: '2',
    title: 'Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections',
    slug: 'single-tooth-veneers-perfect-solutions',
    excerpt: 'Discover how a single veneer can transform your smile when one tooth needs special attention. Learn about the process, benefits, and what makes single-tooth veneers an ideal cosmetic solution.',
    content: 'single-tooth-veneers', // This will map to the existing component
    author: 'Dr. Alexie Aguil',
    authorBio: 'With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.',
    date: 'June 19, 2025',
    readTime: '6 min read',
    category: 'Cosmetic Dentistry',
    tags: ['single veneer', 'porcelain veneers', 'cosmetic dentistry', 'smile makeover', 'tooth restoration'],
    seoTitle: 'Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections',
    seoDescription: 'Discover how a single veneer can transform your smile when one tooth needs special attention. Learn about the process, benefits, and what makes single-tooth veneers an ideal cosmetic solution.',
    seoKeywords: 'single tooth veneers, porcelain veneers, cosmetic dentistry, smile makeover, dental veneers Los Angeles, tooth restoration',
    published: true
  }
];

export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.published);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category && post.published);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag) && post.published);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.published && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
};

export const getAllTags = (): string[] => {
  const tags = new Set(blogPosts.flatMap(post => post.tags));
  return Array.from(tags);
};
