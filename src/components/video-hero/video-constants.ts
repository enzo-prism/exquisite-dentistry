
// Height options
export const getHeightClasses = (height: 'small' | 'medium' | 'large' | 'full' | 'auto') => {
  switch (height) {
    case 'small':
      return 'min-h-[50vh]';
    case 'medium':
      return 'min-h-[70vh]';
    case 'large':
      return 'min-h-[90vh]';
    case 'full':
      return 'min-h-screen';
    case 'auto':
    default:
      return 'min-h-[80vh]';
  }
};

// YouTube video IDs
export const YOUTUBE_VIDEOS = {
  SMILE: "D6fILR2L5ik",
  PATIENT: "U32NScY_qCQ",
  PROCEDURE: "3pNo4sKFB58",
  LOBBY: "bq6NufaDR_w",
  OFFICE: "bq6NufaDR_w" // Adding OFFICE which was referenced but missing
};

// Default Vimeo ID for the main hero video across all pages
export const DEFAULT_HERO_VIMEO_ID = "1082215464";
