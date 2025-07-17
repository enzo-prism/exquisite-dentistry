// Smart positioning presets for different types of dental photography
export const DENTAL_PHOTO_PRESETS = {
  // Full face shots - focus on smile area
  FULL_FACE: 'center 25%',
  // Close-up smile shots - center on teeth
  CLOSE_UP_SMILE: 'center 30%',
  // Profile shots - adjust for side view
  PROFILE_LEFT: '60% 25%',
  PROFILE_RIGHT: '40% 25%',
  // Wide smile shots - center horizontally, slightly up
  WIDE_SMILE: 'center 20%',
  // Portrait with smile - balance face and smile
  PORTRAIT: 'center 35%',
} as const;

export type DentalPhotoPreset = keyof typeof DENTAL_PHOTO_PRESETS;

// Analyze image content to suggest best positioning
export const suggestOptimalPositioning = (
  imageUrl: string,
  photoType?: DentalPhotoPreset
): Promise<string> => {
  return new Promise((resolve) => {
    // If a specific type is provided, use the preset
    if (photoType && DENTAL_PHOTO_PRESETS[photoType]) {
      resolve(DENTAL_PHOTO_PRESETS[photoType]);
      return;
    }

    // For now, return a smart default based on common dental photography
    // In a more advanced implementation, this could use image analysis
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      
      // Wider images are likely full face shots
      if (aspectRatio > 1.2) {
        resolve(DENTAL_PHOTO_PRESETS.FULL_FACE);
      }
      // Taller images are likely close-ups or portraits
      else if (aspectRatio < 0.8) {
        resolve(DENTAL_PHOTO_PRESETS.PORTRAIT);
      }
      // Square-ish images are likely close-up smiles
      else {
        resolve(DENTAL_PHOTO_PRESETS.CLOSE_UP_SMILE);
      }
    };
    img.onerror = () => {
      // Fallback to close-up preset
      resolve(DENTAL_PHOTO_PRESETS.CLOSE_UP_SMILE);
    };
    img.src = imageUrl;
  });
};

// Validate that important content isn't cropped
export const validateImageFraming = (
  imageUrl: string,
  objectPosition: string,
  containerAspectRatio: number
): Promise<{ isValid: boolean; suggestions?: string[] }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const imageAspectRatio = img.naturalWidth / img.naturalHeight;
      const suggestions: string[] = [];
      
      // Check if image is much wider/taller than container
      const aspectRatioDiff = Math.abs(imageAspectRatio - containerAspectRatio);
      
      if (aspectRatioDiff > 0.5) {
        if (imageAspectRatio > containerAspectRatio) {
          suggestions.push('Image is much wider than container - consider adjusting horizontal positioning');
        } else {
          suggestions.push('Image is much taller than container - consider adjusting vertical positioning');
        }
      }
      
      // Parse object position to check for extreme values
      const [horizontal, vertical] = objectPosition.split(' ');
      const verticalPercent = parseInt(vertical?.replace('%', '') || '50');
      
      if (verticalPercent < 10 || verticalPercent > 90) {
        suggestions.push('Extreme vertical positioning may crop important content');
      }
      
      resolve({
        isValid: suggestions.length === 0,
        suggestions: suggestions.length > 0 ? suggestions : undefined
      });
    };
    img.onerror = () => {
      resolve({ isValid: false, suggestions: ['Could not load image for validation'] });
    };
    img.src = imageUrl;
  });
};

// Calculate optimal aspect ratio bounds for dental photography
export const getDentalPhotoAspectRatioBounds = () => {
  return {
    min: 0.7,  // Tall portrait-style photos
    max: 1.8,  // Wide landscape photos
    default: 1.2 // Slightly wider than square, good for smile focus
  };
};