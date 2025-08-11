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
    imageSrc: '/lovable-uploads/c196ed70-82dd-480f-b40d-760be7e2b38f.png',
    imageAlt: 'Radiant bride with genuine laugh and perfect wedding day smile - professional dental makeover results',
    icon: Heart
  },
  {
    id: 'graduation',
    title: 'Graduation Smile Treatment',
    description: 'Celebrate your achievements with confidence - get graduation-ready with our smile enhancement treatments',
    buttonText: 'Get Graduation Ready',
    buttonLink: '/graduation',
    imageSrc: '/lovable-uploads/graduation smile.webp',
    imageAlt: 'Happy graduate with perfect smile - ready for new beginnings',
    icon: GraduationCap
  }
];