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

  // NEW: Professional Studio Portrait - Premium business headshot
  businessPortrait: {
    src: '/lovable-uploads/9683bb53-6591-4e0a-9a1d-6f49d54ea2b1.png',
    alt: 'Dr. Alexie Aguil, DDS - Premium business portrait with professional smile',
    description: 'Elegant studio portrait of Dr. Aguil in professional business attire',
    usage: ['about-hero', 'homepage-hero', 'premium-branding', 'leadership'],
    aspectRatio: '4:5',
    quality: 'studio-grade'
  },

  // NEW: Black & White Clinical Portrait - Artistic professional shot
  clinicalPortrait: {
    src: '/lovable-uploads/96c9493a-c97f-4076-b224-591c2e9c50e6.png',
    alt: 'Dr. Alexie Aguil, DDS - Artistic black and white clinical portrait',
    description: 'Sophisticated B&W portrait showcasing Dr. Aguil\'s clinical expertise',
    usage: ['about-expertise', 'clinical-excellence', 'artistic-branding'],
    aspectRatio: '4:5',
    quality: 'artistic-grade'
  },

  // NEW: Casual Office Portrait - Approachable and friendly
  casualOfficePortrait: {
    src: '/lovable-uploads/a174d17a-ee21-411d-9034-2dfe2fa0dcd3.png',
    alt: 'Dr. Alexie Aguil, DDS - Friendly office portrait in dental setting',
    description: 'Warm, approachable portrait of Dr. Aguil in his office environment',
    usage: ['homepage-doctor-section', 'about-personality', 'patient-comfort'],
    aspectRatio: '4:5',
    quality: 'high-resolution'
  },

  // NEW: Beautiful Smile Close-up - Results showcase
  smileCloseup: {
    src: '/lovable-uploads/ced61c9e-85aa-49c9-8378-f0ed60da48fc.png',
    alt: 'Dr. Alexie Aguil, DDS - Professional smile showcasing beautiful dental work',
    description: 'Close-up portrait highlighting Dr. Aguil\'s beautiful smile and dental artistry',
    usage: ['results-showcase', 'smile-gallery', 'testimonials', 'before-after'],
    aspectRatio: '16:9',
    quality: 'detail-focused'
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
    hero: 'businessPortrait', // NEW: Premium business portrait for maximum impact
    biography: 'casualOfficePortrait', // NEW: Warm, approachable for bio section
    expertise: 'clinicalPortrait', // NEW: Artistic B&W for clinical excellence
    philosophy: 'xrayExplanation' // Shows professional competence
  },
  
  homePage: {
    hero: 'businessPortrait', // NEW: Premium portrait for homepage hero
    doctorSection: 'casualOfficePortrait', // NEW: Approachable office portrait
    technologyShowcase: 'digitalConsultation', // Modern dental tech
    patientCare: 'patientConsultation', // Human touch, patient comfort
    resultsShowcase: 'smileCloseup' // NEW: Beautiful smile for results
  },
  
  servicesPage: {
    consultationSection: 'digitalConsultation', // Tech-forward approach
    diagnosticServices: 'xrayExplanation', // Educational/expertise
    generalHeader: 'professionalPortrait', // Professional overview
    results: 'smileCloseup' // NEW: Smile showcase for results
  },
  
  testimonialsPage: {
    doctorIntro: 'patientConsultation', // Shows caring relationship
    header: 'businessPortrait', // NEW: Premium credibility
    results: 'smileCloseup' // NEW: Beautiful outcomes showcase
  },

  galleryPage: {
    featured: 'businessPortrait', // NEW: Premium portrait as featured
    clinical: 'clinicalPortrait', // NEW: Artistic B&W for sophistication
    personality: 'casualOfficePortrait', // NEW: Approachable side
    results: 'smileCloseup' // NEW: Beautiful smile showcase
  }
};

// WebP optimization notes:
// - All images are high-resolution and will be auto-optimized by your existing system
// - OptimizedImage component will automatically serve WebP format when supported
// - Responsive sizes (320px, 640px, 1024px, 1920px) will be generated automatically
// - Fallback to original PNG format for older browsers