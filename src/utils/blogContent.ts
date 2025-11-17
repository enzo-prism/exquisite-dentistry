import type { BlogPost } from '@/data/blogPosts';

const stripTags = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const tokenize = (value?: string) => {
  if (!value) return [];
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2);
};

const hasStrongTokenOverlap = (heading: string, post: BlogPost) => {
  const headingTokens = tokenize(heading);
  if (headingTokens.length === 0) return false;

  const comparisons = [post.title, post.seoTitle];
  for (const candidate of comparisons) {
    const titleTokens = tokenize(candidate);
    if (titleTokens.length === 0) continue;

    const intersection = headingTokens.filter(token => titleTokens.includes(token)).length;
    const coverage = intersection / Math.max(titleTokens.length, 1);
    if (coverage >= 0.6) {
      return true;
    }
  }

  return false;
};

export const sanitizeBlogHtml = (post: BlogPost) => {
  if (!post.content) return '';

  const headingRegex = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i;
  const match = headingRegex.exec(post.content);

  if (!match) {
    return post.content.trim();
  }

  const headingText = stripTags(match[1]);
  if (!hasStrongTokenOverlap(headingText, post)) {
    return post.content.trim();
  }

  const before = post.content.slice(0, match.index);
  const after = post.content.slice(match.index + match[0].length);
  return `${before}${after}`.trim();
};
