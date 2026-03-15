export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  sourceSlug?: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  date: string;
  publishedAt?: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  faqs?: BlogFaq[];
  published: boolean;
}
