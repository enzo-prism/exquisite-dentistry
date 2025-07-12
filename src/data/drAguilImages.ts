// Dr. Aguil Professional Image Catalog
// These images are now available in your project's public/lovable-uploads/ directory

export const drAguilImages = {
  // Professional Portrait - Perfect for About page hero, team section
  professionalPortrait: {
    src: '/lovable-uploads/e2d3dd68-6f1f-4361-8749-59f510dfbc6c.png',
    alt: 'Dr. Alexie Aguil, DDS - Professional dental portrait in clinical setting',
    description: 'Dr. Aguil in professional dental attire with crossed arms, warm smile',
    usage: ['about-hero', 'team-section', 'professional-bio'],
    aspectRatio: '16:9',
    quality: 'high-resolution'
  },

  // Digital Consultation - Modern technology showcase
  digitalConsultation: {
    src: '/lovable-uploads/63fc4977-eb81-43be-af9a-48baa86296c2.png',
    alt: 'Dr. Aguil using advanced digital technology for patient consultation',
    description: 'Dr. Aguil demonstrating digital dental technology with patient',
    usage: ['services-technology', 'consultation-process', 'modern-dentistry'],
    aspectRatio: '16:9',
    quality: 'high-resolution'
  },

  // X-Ray Analysis - Educational/Expertise demonstration
  xrayExplanation: {
    src: '/lovable-uploads/e5f3343d-b25b-4340-a728-57b8756ac156.png',
    alt: 'Dr. Aguil explaining dental X-rays and treatment planning',
    description: 'Dr. Aguil pointing at dental X-rays, explaining treatment options',
    usage: ['diagnostic-services', 'education-content', 'expertise-showcase'],
    aspectRatio: '16:9',
    quality: 'high-resolution'
  },

  // Patient Care - Human connection and comfort
  patientConsultation: {
    src: '/lovable-uploads/cc21ce69-7e31-4fa0-851a-4ea17ff473a1.png',
    alt: 'Dr. Aguil providing compassionate dental care to patient',
    description: 'Dr. Aguil smiling while treating patient, showing caring approach',
    usage: ['patient-experience', 'comfort-care', 'testimonial-sections'],
    aspectRatio: '16:9',
    quality: 'high-resolution'
  },

  // Studio Portrait - Premium branding
  studioPortrait: {
    src: '/lovable-uploads/bc828af8-ab4e-4c39-abbf-6934123e34dd.png',
    alt: 'Dr. Aguil professional studio portrait',
    description: 'Clean studio portrait of Dr. Aguil in professional attire',
    usage: ['premium-branding', 'bio-headshot', 'marketing-materials'],
    aspectRatio: '4:5',
    quality: 'studio-grade'
  }
};

// Suggested implementation areas for these images
export const implementationSuggestions = {
  aboutPage: {
    hero: 'studioPortrait', // Clean, professional hero image
    biography: 'professionalPortrait', // Warm, approachable for bio section
    expertise: 'xrayExplanation' // Shows professional competence
  },
  
  homePage: {
    doctorSection: 'professionalPortrait', // Main doctor introduction
    technologyShowcase: 'digitalConsultation', // Modern dental tech
    patientCare: 'patientConsultation' // Human touch, patient comfort
  },
  
  servicesPage: {
    consultationSection: 'digitalConsultation', // Tech-forward approach
    diagnosticServices: 'xrayExplanation', // Educational/expertise
    generalHeader: 'professionalPortrait' // Professional overview
  },
  
  testimonialsPage: {
    doctorIntro: 'patientConsultation', // Shows caring relationship
    header: 'studioPortrait' // Professional credibility
  }
};

// WebP optimization notes:
// - All images are high-resolution and will be auto-optimized by your existing system
// - OptimizedImage component will automatically serve WebP format when supported
// - Responsive sizes (320px, 640px, 1024px, 1920px) will be generated automatically
// - Fallback to original PNG format for older browsers