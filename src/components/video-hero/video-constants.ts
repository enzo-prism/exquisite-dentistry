
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

// Video testimonials - simplified array format
export const VIDEO_TESTIMONIALS = [
  {
    vimeoId: "1082192427",
    thumbnailUrl: "/lovable-uploads/f88acd79-6f67-4a5b-a586-6b67cd9f154f.png",
    title: "Shannon Langhorne Patient Testimonial"
  },
  {
    vimeoId: "1082192501",
    thumbnailUrl: "/lovable-uploads/42773f00-4b49-4cbf-ab77-d2f56c5afdb8.png", 
    title: "Taylor Vasek Patient Testimonial"
  },
  {
    vimeoId: "1088876675",
    thumbnailUrl: "/lovable-uploads/c9638a7e-6ecb-4be0-b755-71e2d2918efd.png",
    title: "Christian Fernandez Patient Testimonial"
  },
  {
    vimeoId: "1088877336",
    thumbnailUrl: "/lovable-uploads/254a9f08-39bf-4d85-91e5-ca54e3e8bb34.png",
    title: "Rob Talbert Patient Testimonial"
  },
  {
    vimeoId: "1088878160",
    thumbnailUrl: "/lovable-uploads/a21508d3-d058-400c-b7ce-30b4cdaf9a01.png",
    title: "Patient Testimonial"
  }
] as const;

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
