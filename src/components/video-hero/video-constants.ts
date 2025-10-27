
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

export type VideoTestimonialItem =
  | {
      id: string;
      type: 'vimeo';
      vimeoId: string;
      thumbnailUrl: string;
      title: string;
    }
  | {
      id: string;
      type: 'file';
      videoUrl: string;
      thumbnailUrl: string;
      title: string;
    };

// Video testimonials - supports Vimeo embeds and hosted MP4 videos
export const ANXIETY_TO_EASE_TESTIMONIAL: VideoTestimonialItem = {
  id: 'anxiety-to-ease-testimonial',
  type: 'file',
  videoUrl: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761503257/testimonial-painting_omnjcj.mp4',
  thumbnailUrl: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761503588/testimonial-thumbnail_lbg1ln.png',
  title: 'From Anxiety to Ease Patient Testimonial'
};

export const NICK_SMILE_TESTIMONIAL: VideoTestimonialItem = {
  id: 'nick-patient-testimonial',
  type: 'file',
  videoUrl: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761590081/Nick_homviy.mp4',
  thumbnailUrl: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761590343/Nick_phiely.png',
  title: 'Nick Invisalign Transformation Testimonial'
};

export const VIDEO_TESTIMONIALS: readonly VideoTestimonialItem[] = [
  {
    id: 'brandon-patient-testimonial',
    type: 'file',
    videoUrl: 'https://videos-hazel-eta.vercel.app/brandon.mp4',
    thumbnailUrl: 'https://videos-hazel-eta.vercel.app/brandon-thumbnail.png',
    title: 'Brandon Patient Testimonial'
  },
  {
    id: 'virginia-patient-testimonial',
    type: 'file',
    videoUrl: 'https://videos-hazel-eta.vercel.app/virginia.mp4',
    thumbnailUrl: 'https://videos-hazel-eta.vercel.app/virginia-thumbnail.png',
    title: 'Virginia Patient Testimonial'
  },
  NICK_SMILE_TESTIMONIAL,
  {
    id: '1082192427',
    type: 'vimeo',
    vimeoId: '1082192427',
    thumbnailUrl: '/lovable-uploads/f88acd79-6f67-4a5b-a586-6b67cd9f154f.png',
    title: 'Shannon Langhorne Patient Testimonial'
  },
  {
    id: '1082192501',
    type: 'vimeo',
    vimeoId: '1082192501',
    thumbnailUrl: '/lovable-uploads/42773f00-4b49-4cbf-ab77-d2f56c5afdb8.png',
    title: 'Taylor Vasek Patient Testimonial'
  },
  {
    id: '1076745525',
    type: 'vimeo',
    vimeoId: '1076745525',
    thumbnailUrl: '/lovable-uploads/c9638a7e-6ecb-4be0-b755-71e2d2918efd.png',
    title: 'Exquisite Dentistry Testimonial _ Christian Fernandez'
  },
  {
    id: '1088877336',
    type: 'vimeo',
    vimeoId: '1088877336',
    thumbnailUrl: '/lovable-uploads/f88f1b17-04d5-4a21-9fd5-0294d68af115.png',
    title: 'Rob Talbert Patient Testimonial'
  },
  ANXIETY_TO_EASE_TESTIMONIAL
];

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
