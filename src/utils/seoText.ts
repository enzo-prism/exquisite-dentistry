/** Shared metadata formatting for prerendered documents and client navigation. */
export const toMeta = (input: string, max = 155): string => {
  const text = (input || '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/["<>]/g, '')
    .trim();
  if (text.length <= max) return text;
  const window = text.slice(0, max);
  const end = Math.max(window.lastIndexOf('. '), window.lastIndexOf('! '), window.lastIndexOf('? '));
  if (end >= max * 0.6) return window.slice(0, end + 1).trim();
  return `${window.replace(/\s+\S*$/, '').replace(/[\s,;:—–-]+$/, '')}…`;
};

const stripTrailingSeparators = (input: string) => input.replace(/[\s|–—:-]+$/g, '').trim();
const truncateTitle = (input: string, max = 70) => {
  const text = stripTrailingSeparators(input);
  return text.length <= max ? text : stripTrailingSeparators(text.slice(0, max).replace(/\s+\S*$/, ''));
};

export const buildSeoTitle = (title: string): string => {
  const append = !title.toLowerCase().includes('exquisite dentistry');
  const branded = append ? `${title} | Exquisite Dentistry Los Angeles` : title;
  return truncateTitle(append && branded.length > 70 ? title : branded);
};
