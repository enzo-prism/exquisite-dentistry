
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

// Video testimonials configuration - All using Vimeo IDs
export const VIDEO_TESTIMONIALS = {
  shannon: {
    vimeoId: "1082192427",
    thumbnailUrl: "/lovable-uploads/e8549036-473f-407a-8c8b-58d4efd41300.png",
    title: "Shannon Langhorne Patient Testimonial"
  },
  taylor: {
    vimeoId: "1082192501",
    thumbnailUrl: "/lovable-uploads/4c09912f-01b4-4c1b-bf67-a0a2a5501ae2.png", 
    title: "Taylor Vasek Patient Testimonial"
  },
  christian: {
    vimeoId: "1088876675",
    thumbnailUrl: "/lovable-uploads/3ab289ce-7721-4356-9938-a73a3661f0ed.png",
    title: "Christian Fernandez Patient Testimonial"
  },
  rob: {
    vimeoId: "1088877336",
    thumbnailUrl: "/lovable-uploads/c5bd571e-a143-4606-936c-a67a3a42dc60.png",
    title: "Rob Talbert Patient Testimonial"
  },
  patient5: {
    vimeoId: "1088878160",
    thumbnailUrl: "/lovable-uploads/a9f7b953-6bfe-4103-a217-cdb9cb19ed30.png",
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
