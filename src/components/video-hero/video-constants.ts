
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

// Video testimonials configuration - All using Vimeo IDs
export const VIDEO_TESTIMONIALS = {
  shannon: {
    vimeoId: "1082192427",
    thumbnailUrl: "/lovable-uploads/170fd524-ca56-476e-a690-aaf050e4bc10.png",
    title: "Shannon Langhorne Patient Testimonial"
  },
  taylor: {
    vimeoId: "1082192501",
    thumbnailUrl: "/lovable-uploads/3fc5e882-2dba-4c8d-9fee-db4aff70e72d.png", 
    title: "Taylor Vasek Patient Testimonial"
  },
  christian: {
    vimeoId: "1088876675",
    thumbnailUrl: "/lovable-uploads/60f35dcc-6df4-4a03-8671-f376215511aa.png",
    title: "Christian Fernandez Patient Testimonial"
  },
  rob: {
    vimeoId: "1088877336",
    thumbnailUrl: "/lovable-uploads/2a73bbae-4539-4d3b-90f1-c45b83a322c3.png",
    title: "Rob Talbert Patient Testimonial"
  },
  patient5: {
    vimeoId: "1088878160",
    thumbnailUrl: "/lovable-uploads/8d641c62-63b0-4c7c-b467-ec104a44198c.png",
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
