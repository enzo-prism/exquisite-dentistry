
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

// Video testimonials configuration - All using Vimeo IDs
export const VIDEO_TESTIMONIALS = {
  shannon: {
    vimeoId: "1082192427",
    thumbnailUrl: "/lovable-uploads/2a2add42-9603-4324-85a5-fd56e72c250f.png",
    title: "Shannon Langhorne Patient Testimonial"
  },
  taylor: {
    vimeoId: "1082192501",
    thumbnailUrl: "/lovable-uploads/bf03611a-af7c-4cef-8cb7-30940864a436.png", 
    title: "Taylor Vasek Patient Testimonial"
  },
  christian: {
    vimeoId: "1088876675",
    thumbnailUrl: "/lovable-uploads/2b45d18d-0cb1-4c57-93bf-036d39abdd09.png",
    title: "Christian Fernandez Patient Testimonial"
  },
  rob: {
    vimeoId: "1088877336",
    thumbnailUrl: "/lovable-uploads/f02e130e-c4ef-4e51-b0fc-d9f60b2ff191.png",
    title: "Rob Talbert Patient Testimonial"
  },
  patient5: {
    vimeoId: "1088878160",
    thumbnailUrl: "/lovable-uploads/f9cfc2b1-dffc-482a-9c87-74368f6b3d7d.png",
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
