export const DEFAULT_VIDEO_HERO_POSTER = "/lovable-uploads/exquisite-black-gold-hero.png";

export const VIDEO_HERO_POSTERS_BY_ROUTE = {
  "/": DEFAULT_VIDEO_HERO_POSTER,
  "/about": DEFAULT_VIDEO_HERO_POSTER,
  "/services": DEFAULT_VIDEO_HERO_POSTER,
  "/blog": DEFAULT_VIDEO_HERO_POSTER,
  "/contact": DEFAULT_VIDEO_HERO_POSTER,
  "/cosmetic-dentistry": DEFAULT_VIDEO_HERO_POSTER,
  "/culver-city-teeth-whitening": DEFAULT_VIDEO_HERO_POSTER,
  "/dental-implants": DEFAULT_VIDEO_HERO_POSTER,
  "/emergency-dentist": DEFAULT_VIDEO_HERO_POSTER,
  "/faqs": DEFAULT_VIDEO_HERO_POSTER,
  "/graduation": DEFAULT_VIDEO_HERO_POSTER,
  "/insurance": DEFAULT_VIDEO_HERO_POSTER,
  "/invisalign": DEFAULT_VIDEO_HERO_POSTER,
  "/share-your-story": DEFAULT_VIDEO_HERO_POSTER,
  "/smile-gallery": DEFAULT_VIDEO_HERO_POSTER,
  "/teeth-whitening": DEFAULT_VIDEO_HERO_POSTER,
  "/testimonials": DEFAULT_VIDEO_HERO_POSTER,
  "/transformation-stories": DEFAULT_VIDEO_HERO_POSTER,
  "/veneers": DEFAULT_VIDEO_HERO_POSTER,
  "/wedding": DEFAULT_VIDEO_HERO_POSTER,
  "/zoom-whitening": DEFAULT_VIDEO_HERO_POSTER,
} as const;

const normalizePosterPathname = (pathname?: string): string => {
  if (!pathname) return "/";

  const trimmedPath = pathname.trim();
  if (!trimmedPath || trimmedPath === "/") return "/";

  const normalizedPath = trimmedPath.startsWith("/") ? trimmedPath : `/${trimmedPath}`;
  return normalizedPath.replace(/\/+$/, "") || "/";
};

export const getVideoHeroPosterForPath = (pathname?: string): string => {
  const normalizedPath = normalizePosterPathname(pathname);
  return VIDEO_HERO_POSTERS_BY_ROUTE[normalizedPath as keyof typeof VIDEO_HERO_POSTERS_BY_ROUTE] ?? DEFAULT_VIDEO_HERO_POSTER;
};
