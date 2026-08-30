import type { BlogPost } from '@/data/blogPosts';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

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

const normalizeBlogAnchorHrefs = (html: string) => {
  const anchorHrefRegex = /<a\b([^>]*?)\bhref=(["'])([^"']+)\2/gi;
  return html.replace(anchorHrefRegex, (match, beforeAttrs: string, quote: string, href: string) => {
    const normalizedHref = normalizeInternalHref(href);
    if (normalizedHref === href) return match;
    return `<a${beforeAttrs}href=${quote}${normalizedHref}${quote}`;
  });
};

const unwrapNestedProseShell = (html: string) => {
  const trimmed = html.trim();
  const match = trimmed.match(/^<div\b[^>]*\bclass=(["'])([^"']*\bprose\b[^"']*)\1[^>]*>([\s\S]*)<\/div>\s*$/i);
  if (!match) return trimmed;
  return match[3].trim();
};

const repairAuditedLegacyVeneerCostPost = (post: BlogPost, html: string) => {
  if (post.slug !== 'the-cost-of-dental-veneers-in-los-angeles') return html;

  return html
    .replace(
      '<p>About $50,000 for a 32-unit veneer design Cost per Tooth: $1800 to $2500 The cost can be dependant on the number of teeth treated. The price may also vary due to diagnostic costs and the delivery method that is used. Why The Best Dental Veneers are Well-Worth the Price A Natural Look Top-quality porcelain veneers are virtually indistinguishable from natural teeth.</p>',
      '<p>About $50,000 for a 32-unit veneer design.</p><h3>Cost per tooth</h3><p>$1,800 to $2,500. The cost can depend on the number of teeth treated, diagnostic costs, and the delivery method used.</p><h2>Why high-quality dental veneers can be worth the price</h2><h3>A natural look</h3><p>High-quality porcelain veneers are designed to look like natural teeth.</p>'
    )
    .replace('<h3>CONTACT EXQUISITE DENTISTRY</h3>', '<h3>Contact Exquisite Dentistry</h3>')
    .replace('<h3>Call</h3>', '<h3>Schedule a consultation</h3>');
};

export const sanitizeBlogHtml = (post: BlogPost) => {
  if (!post.content) return '';

  const repairedContent = unwrapNestedProseShell(
    repairAuditedLegacyVeneerCostPost(post, post.content),
  );

  const headingRegex = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i;
  const match = headingRegex.exec(repairedContent);

  if (!match) {
    return normalizeBlogAnchorHrefs(repairedContent.trim());
  }

  const headingText = stripTags(match[1]);
  if (!hasStrongTokenOverlap(headingText, post)) {
    return normalizeBlogAnchorHrefs(repairedContent.trim());
  }

  const before = repairedContent.slice(0, match.index);
  const after = repairedContent.slice(match.index + match[0].length);
  return normalizeBlogAnchorHrefs(`${before}${after}`.trim());
};
