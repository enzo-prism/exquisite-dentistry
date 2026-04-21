export const DEFAULT_VIDEO_HERO_POSTER = "/lovable-uploads/cosmetic-dentistry.webp";

export const VIDEO_HERO_POSTERS_BY_ROUTE = {
  "/": "/lovable-uploads/cosmetic-dentistry.webp",
  "/about": "/lovable-uploads/e2d3dd68-6f1f-4361-8749-59f510dfbc6c.png",
  "/services": "/lovable-uploads/45895aca-ec41-480b-b5a3-b4261464edef.png",
  "/blog": "/lovable-uploads/e5f3343d-b25b-4340-a728-57b8756ac156.png",
  "/contact": "/lovable-uploads/cc21ce69-7e31-4fa0-851a-4ea17ff473a1.png",
  "/cosmetic-dentistry": "/lovable-uploads/4820b0df-82b4-4e9b-9724-b8d1f720712b.webp",
  "/culver-city-teeth-whitening": "/lovable-uploads/5b6f933b-b603-4576-b24d-667cb00cc3a3.png",
  "/dental-implants": "/lovable-uploads/restorative-dentistry.webp",
  "/emergency-dentist": "/lovable-uploads/client-experience.webp",
  "/faqs": "/lovable-uploads/63fc4977-eb81-43be-af9a-48baa86296c2.png",
  "/graduation": "/lovable-uploads/ed8ac06c-537d-4671-ad56-dceafa37deb8.png",
  "/insurance": "/lovable-uploads/preventive-care.webp",
  "/invisalign": "/lovable-uploads/specialty-services.webp",
  "/share-your-story": "/lovable-uploads/Dr. Alexie with painting from patient.webp",
  "/smile-gallery": "/lovable-uploads/442f1b06-f170-43a9-ab81-6c7d7e27dda8.webp",
  "/teeth-whitening": "/lovable-uploads/52dd6454-e5d1-4a7e-aa17-65a34cbc8044.webp",
  "/testimonials": "/lovable-uploads/f88f1b17-04d5-4a21-9fd5-0294d68af115.png",
  "/transformation-stories": "/lovable-uploads/c9638a7e-6ecb-4be0-b755-71e2d2918efd.png",
  "/veneers": "/lovable-uploads/f4b9ce7c-33fc-45a7-85e9-123f3e7ce0ed.webp",
  "/veneers-los-angeles": "/lovable-uploads/e5666e84-eae4-42d0-a75c-f034454be491.webp",
  "/wedding": "/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png",
  "/zoom-whitening": "/lovable-uploads/4a8dedf8-1a60-4e9a-9c1f-91c1a1c96c92.webp",
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
