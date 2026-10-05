import type { BlogPost } from '@/data/blogPosts';

/** Veneer articles get veneer-specific CTA copy and secondary links. */
export const isVeneerPost = (post: Pick<BlogPost, 'slug' | 'title'>) =>
  /veneer/i.test(post.slug) || /veneer/i.test(post.title);
