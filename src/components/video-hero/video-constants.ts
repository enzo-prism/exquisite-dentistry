
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

// Video testimonials configuration - All using Vimeo IDs
export const VIDEO_TESTIMONIALS = {
  shannon: {
    vimeoId: "1082192427",
    thumbnailUrl: "/lovable-uploads/9e823f53-f866-40f9-a3e2-78373640ee8f.png",
    title: "Shannon Langhorne Patient Testimonial"
  },
  taylor: {
    vimeoId: "1082192501",
    thumbnailUrl: "/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png", 
    title: "Taylor Vasek Patient Testimonial"
  },
  christian: {
    vimeoId: "1088876675",
    thumbnailUrl: "/lovable-uploads/9b312c68-79f9-4cbe-b6a4-7028b9470bbf.png",
    title: "Christian Fernandez Patient Testimonial"
  },
  rob: {
    vimeoId: "1088877336",
    thumbnailUrl: "/lovable-uploads/7738901f-6840-4eaf-beed-66eccb335723.png",
    title: "Rob Talbert Patient Testimonial"
  },
  patient5: {
    vimeoId: "1088878160",
    thumbnailUrl: "/lovable-uploads/a478e28f-fd88-427c-b049-31f7d99099f1.png",
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
