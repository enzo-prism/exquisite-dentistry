
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

// Video testimonials configuration - All using Vimeo IDs
export const VIDEO_TESTIMONIALS = {
  shannon: {
    vimeoId: "1082192427",
    thumbnailUrl: "/lovable-uploads/review 1 Shannon.webp",
    title: "Shannon Langhorne Patient Testimonial"
  },
  taylor: {
    vimeoId: "1082192501",
    thumbnailUrl: "/lovable-uploads/review 2 Taylor.webp", 
    title: "Taylor Vasek Patient Testimonial"
  },
  christian: {
    vimeoId: "1088876675",
    thumbnailUrl: "/lovable-uploads/review 3 christian.webp",
    title: "Christian Fernandez Patient Testimonial"
  },
  rob: {
    vimeoId: "1088877336",
    thumbnailUrl: "/lovable-uploads/review 4 Rob.webp",
    title: "Rob Talbert Patient Testimonial"
  },
  patient5: {
    vimeoId: "1088878160",
    thumbnailUrl: "/lovable-uploads/review 5.webp",
    title: "Patient Testimonial"
  }
} as const;

// YouTube video constants (added for compatibility)
export const YOUTUBE_VIDEOS = {
  practice: "W3GDynIsi6s",
  testimonial: "BMd3Y-Ma8nM"
};

// Poster images for video backgrounds
export const VIDEO_POSTERS = {
  hero: "/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png",
  practice: "/lovable-uploads/45895aca-ec41-480b-b5a3-b4261464edef.png"
} as const;
