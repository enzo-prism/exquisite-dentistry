import { Heart, GraduationCap } from 'lucide-react';

export interface SpecialMoment {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  icon: typeof Heart | typeof GraduationCap;
}

export const specialMoments: SpecialMoment[] = [
  {
    id: 'wedding',
    title: 'Wedding Smile Preparation',
    description: 'Look radiant on your special day with our comprehensive wedding smile makeover packages',
    buttonText: 'Plan Your Perfect Smile',
    buttonLink: '/wedding',
    imageSrc: '/lovable-uploads/25b638dc-6913-4c3d-9a57-6df16b6b61e0.png',
    imageAlt: 'Laughing bride with authentic joy and perfect wedding day smile - professional dental makeover results',
    icon: Heart
  },
  {
    id: 'graduation',
    title: 'Graduation Smile Treatment',
    description: 'Celebrate your achievements with confidence - get graduation-ready with our smile enhancement treatments',
    buttonText: 'Get Graduation Ready',
    buttonLink: '/graduation',
    imageSrc: '/lovable-uploads/graduation%20smile.webp',
    imageAlt: 'Happy graduate with perfect smile - ready for new beginnings',
    icon: GraduationCap
  }
];