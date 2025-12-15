export interface ServiceTreatment {
  name: string;
  details: string;
  hasDetailPage?: boolean;
  slug?: string;
  ctaLabel?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  highlight: string;
  iconName: string;
  image: string;
  treatments: ServiceTreatment[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our comprehensive cosmetic dental services. We combine artistic vision with technical precision to create beautiful, natural-looking results that enhance your confidence.",
    highlight: "Our signature smile makeovers are custom-designed to complement your facial features and achieve your aesthetic goals.",
    iconName: "Smile",
    image: "/lovable-uploads/cosmetic-dentistry.webp",
    treatments: [
      {
        name: "Porcelain Veneers",
        details: "Custom-designed porcelain shells that cover the front surface of teeth to improve appearance",
        hasDetailPage: true,
        slug: "/veneers",
        ctaLabel: "Explore Veneers"
      },
      {
        name: "Front Teeth Veneers (2–4 Teeth)",
        details: "Focused smile-zone veneers with transparent pricing for 2 or 4 teeth",
        hasDetailPage: true,
        slug: "/veneers/front-teeth-veneers-los-angeles",
        ctaLabel: "Front Teeth Veneers"
      },
      {
        name: "Professional Teeth Whitening",
        details: "Advanced in-office and take-home whitening systems for brilliantly white teeth",
        hasDetailPage: true,
        slug: "/teeth-whitening",
        ctaLabel: "Teeth Whitening Options"
      },
      {
        name: "Smile Makeovers",
        details: "Comprehensive treatment plans combining multiple procedures for total smile transformation"
      },
      {
        name: "Cosmetic Bonding",
        details: "Tooth-colored resin applied to repair chips, cracks, and discoloration"
      }
    ]
  },
  {
    id: "restorative",
    title: "Restorative Dentistry",
    description: "Restore function and aesthetics to damaged or missing teeth with our advanced restorative solutions. We focus on long-lasting results that look and feel completely natural.",
    highlight: "Our metal-free restorations provide superior strength without compromising aesthetics.",
    iconName: "Wrench",
    image: "/lovable-uploads/restorative-dentistry.webp",
    treatments: [
      {
        name: "Porcelain Crowns & Bridges",
        details: "Beautiful, durable restorations to repair damaged teeth or replace missing teeth"
      },
      {
        name: "Inlays & Onlays",
        details: "Conservative alternatives to full crowns that preserve more of your natural tooth structure"
      },
      {
        name: "Dental Implants",
        details: "Permanent tooth replacement that looks, feels, and functions like natural teeth",
        hasDetailPage: true,
        slug: "/dental-implants",
        ctaLabel: "Learn About Implants"
      },
      {
        name: "Full & Partial Dentures",
        details: "Removable appliances to replace multiple missing teeth and restore function"
      }
    ]
  },
  {
    id: "preventive",
    title: "Preventive Care",
    description: "Maintain optimal oral health with our comprehensive preventive care services. Regular preventive care helps detect issues early, saving you time, discomfort, and expense in the long run.",
    highlight: "Our preventive approach includes thorough oral cancer screenings at every regular check-up.",
    iconName: "Shield",
    image: "/lovable-uploads/preventive-care.webp",
    treatments: [
      {
        name: "Comprehensive Exams",
        details: "Thorough evaluation of your oral health, including teeth, gums, and supporting structures"
      },
      {
        name: "Professional Cleaning",
        details: "Removal of plaque and tartar to prevent cavities and gum disease"
      },
      {
        name: "Digital X-Rays",
        details: "Low-radiation imaging to detect issues not visible during a visual examination"
      },
      {
        name: "Oral Cancer Screenings",
        details: "Early detection of abnormal tissues that may indicate precancerous conditions"
      }
    ]
  },
  {
    id: "specialty",
    title: "Specialty Services",
    description: "Access specialized dental care without being referred elsewhere. Our comprehensive range of specialty services allows us to address complex dental issues with the same attention to comfort and quality.",
    highlight: "Dr. Aguil's advanced training allows us to offer specialized care that many general practices cannot provide.",
    iconName: "Stethoscope",
    image: "/lovable-uploads/specialty-services.webp",
    treatments: [
      {
        name: "Invisalign® Clear Aligners",
        details: "Discreet orthodontic treatment to straighten teeth without metal braces",
        hasDetailPage: true,
        slug: "/invisalign",
        ctaLabel: "Invisalign Details"
      },
      {
        name: "Laser Gum Therapy",
        details: "Minimally invasive treatment for gum disease and cosmetic gum procedures"
      },
      {
        name: "Full Mouth Reconstruction",
        details: "A comprehensive, holistic, and multi-layered dental treatment involving a series of procedures aimed at transforming your smile, restoring the functionality of your teeth, and enhancing the overall health of your mouth"
      },
      {
        name: "Emergency Dentistry",
        details: "Same-day care for toothaches, fractures, and trauma with after-hours support",
        hasDetailPage: true,
        slug: "/emergency-dentist",
        ctaLabel: "Emergency Dentist Info"
      }
    ]
  }
];
