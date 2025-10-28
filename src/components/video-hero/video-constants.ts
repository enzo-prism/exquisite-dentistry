
// Default Vimeo video ID for hero sections
export const DEFAULT_HERO_VIMEO_ID = "1082215464";

interface BaseVideoTestimonialItem {
  id: string;
  thumbnailUrl: string;
  title: string;
  uploadDate: string;
  duration: string;
}

interface VimeoVideoTestimonialItem extends BaseVideoTestimonialItem {
  type: 'vimeo';
  vimeoId: string;
}

interface FileVideoTestimonialItem extends BaseVideoTestimonialItem {
  type: 'file';
  videoUrl: string;
}

export type VideoTestimonialItem = VimeoVideoTestimonialItem | FileVideoTestimonialItem;

// Video testimonials - supports Vimeo embeds and hosted MP4 videos
export const ANXIETY_TO_EASE_TESTIMONIAL: VideoTestimonialItem = {
  id: 'anxiety-to-ease-testimonial',
  type: 'file',
  videoUrl: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761503257/testimonial-painting_omnjcj.mp4',
  thumbnailUrl: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761503588/testimonial-thumbnail_lbg1ln.png',
  title: 'From Anxiety to Ease Patient Testimonial',
  uploadDate: '2024-09-05',
  duration: 'PT2M20S'
};

export const NICK_SMILE_TESTIMONIAL: VideoTestimonialItem = {
  id: 'nick-patient-testimonial',
  type: 'file',
  videoUrl: 'https://res.cloudinary.com/dhqpqfw6w/video/upload/v1761590081/Nick_homviy.mp4',
  thumbnailUrl: 'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1761590343/Nick_phiely.png',
  title: 'Nick Invisalign Transformation Testimonial',
  uploadDate: '2024-07-12',
  duration: 'PT2M10S'
};

export const VIDEO_TESTIMONIALS: readonly VideoTestimonialItem[] = [
  {
    id: 'brandon-patient-testimonial',
    type: 'file',
    videoUrl: 'https://videos-hazel-eta.vercel.app/brandon.mp4',
    thumbnailUrl: 'https://videos-hazel-eta.vercel.app/brandon-thumbnail.png',
    title: 'Brandon Patient Testimonial',
    uploadDate: '2024-08-18',
    duration: 'PT2M4S'
  },
  {
    id: 'virginia-patient-testimonial',
    type: 'file',
    videoUrl: 'https://videos-hazel-eta.vercel.app/virginia.mp4',
    thumbnailUrl: 'https://videos-hazel-eta.vercel.app/virginia-thumbnail.png',
    title: 'Virginia Patient Testimonial',
    uploadDate: '2024-08-20',
    duration: 'PT1M56S'
  },
  NICK_SMILE_TESTIMONIAL,
  {
    id: '1082192427',
    type: 'vimeo',
    vimeoId: '1082192427',
    thumbnailUrl: '/lovable-uploads/f88acd79-6f67-4a5b-a586-6b67cd9f154f.png',
    title: 'Shannon Langhorne Patient Testimonial',
    uploadDate: '2024-06-01',
    duration: 'PT2M5S'
  },
  {
    id: '1082192501',
    type: 'vimeo',
    vimeoId: '1082192501',
    thumbnailUrl: '/lovable-uploads/42773f00-4b49-4cbf-ab77-d2f56c5afdb8.png',
    title: 'Taylor Vasek Patient Testimonial',
    uploadDate: '2024-06-08',
    duration: 'PT1M48S'
  },
  {
    id: '1076745525',
    type: 'vimeo',
    vimeoId: '1076745525',
    thumbnailUrl: '/lovable-uploads/c9638a7e-6ecb-4be0-b755-71e2d2918efd.png',
    title: 'Exquisite Dentistry Testimonial _ Christian Fernandez',
    uploadDate: '2024-07-01',
    duration: 'PT1M58S'
  },
  {
    id: '1088877336',
    type: 'vimeo',
    vimeoId: '1088877336',
    thumbnailUrl: '/lovable-uploads/f88f1b17-04d5-4a21-9fd5-0294d68af115.png',
    title: 'Rob Talbert Patient Testimonial',
    uploadDate: '2024-07-15',
    duration: 'PT1M42S'
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
