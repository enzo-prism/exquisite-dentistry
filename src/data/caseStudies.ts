export interface CaseStudy {
  id: string;
  slug: string;
  patientName: string;
  title: string;
  shortDescription: string;
  videoId: string;
  videoType: 'youtube' | 'vimeo';
  thumbnailUrl?: string;
  location: string;
  goal: string;
  keyTakeaways: string[];
  quotes: Array<{
    text: string;
    context?: string;
  }>;
  whyChoseUs: Array<{
    title: string;
    description: string;
  }>;
  whatChanged: Array<{
    category: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  seo: {
    title: string;
    description: string;
    keywords?: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'christian-fernandez',
    slug: 'christian-fernandez',
    patientName: 'Christian Fernandez',
    title: 'Christian Fernandez — A Confidence-Boosting Smile Story',
    shortDescription: 'Christian came to Exquisite Dentistry wanting to feel great about her smile every day. After her smile-straightening journey with our team, she left feeling more confident, cared for, and part of the Exquisite Dentistry family.',
    videoId: '3pNo4sKFB58',
    videoType: 'youtube',
    thumbnailUrl: '/lovable-uploads/c9638a7e-6ecb-4be0-b755-71e2d2918efd.png',
    location: 'Los Angeles, CA',
    goal: 'A straighter, better-looking smile — and the confidence that comes with it',
    keyTakeaways: [
      'Everyday confidence is up.',
      'She feels truly taken care of by the team.',
      'The practice feels like family, and she trusts the process.'
    ],
    quotes: [
      {
        text: 'Exquisite Dentistry has impacted me in many ways… they make me feel more confident in my everyday life.',
        context: 'About the overall impact'
      },
      {
        text: 'They make me feel… taken care of… like [I\'m] part of the Exquisite Dentistry family.',
        context: 'About the care and relationship'
      }
    ],
    whyChoseUs: [
      {
        title: 'Trust & Care',
        description: 'She felt she could count on the team at every step.'
      },
      {
        title: 'Comfort First',
        description: 'Appointments felt easy, friendly, and well-organized.'
      },
      {
        title: 'Results That Matter',
        description: 'A noticeably straighter smile and a boost in day-to-day confidence.'
      }
    ],
    whatChanged: [
      {
        category: 'Confidence',
        description: 'Christian now smiles more freely — at work, socially, and in everyday moments.'
      },
      {
        category: 'Smile Aesthetics',
        description: 'Straighter teeth and a cleaner overall look.'
      },
      {
        category: 'Peace of Mind',
        description: 'She feels looked after by a team that treats her like family.'
      }
    ],
    faqs: [
      {
        question: 'How long will my smile-straightening journey take?',
        answer: 'It depends on your goals and clinical needs. We\'ll outline a clear timeline after your consultation.'
      },
      {
        question: 'Will I need to take time off work?',
        answer: 'Most visits are quick and scheduled around your day. We\'ll plan ahead so it fits your routine.'
      },
      {
        question: 'Is follow-up required?',
        answer: 'Yes — simple check-ins help ensure your smile looks great long-term.'
      }
    ],
    seo: {
      title: 'Christian\'s Smile Story | Exquisite Dentistry Los Angeles',
      description: 'See how Christian gained everyday confidence with a straighter smile at Exquisite Dentistry in Los Angeles. Watch her video testimonial and learn our approach.',
      keywords: 'smile transformation Los Angeles, teeth straightening case study, cosmetic dentistry results, patient testimonial, Dr. Alexie Aguil'
    }
  },
  {
    id: 'taylor-vasek',
    slug: 'taylor-vasek',
    patientName: 'Taylor Vasek',
    title: 'Taylor Vasek\'s Story — From "No Dentist" to Looking Forward to Every Visit',
    shortDescription: 'After moving to Los Angeles, Taylor needed a new dentist he could trust. From the moment he walked in, the experience felt different: warm faces, easy check-in, and a relaxed energy that made dental visits something to enjoy.',
    videoId: 'dpd6glBbZVU',
    videoType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/dpd6glBbZVU/maxresdefault.jpg',
    location: 'Los Angeles, CA',
    goal: 'Finding a new dentist after moving to LA who provides comfortable, trustworthy care',
    keyTakeaways: [
      'People first: A friendly, attentive team that treats you like a person, not a time slot.',
      'Modern comfort: Entertainment at the chair (hello, Netflix) to keep anxiety low and the visit flying by.',
      'The overall vibe: Welcoming, unrushed, and refreshingly human — more like visiting people you trust than "going to the dentist."'
    ],
    quotes: [
      {
        text: 'I didn\'t have a dentist — I\'d already moved out here — and the difference between Exquisite and the other ones that I\'ve gone to… it doesn\'t really feel like an appointment.',
        context: 'About the experience difference'
      },
      {
        text: 'You can watch Netflix. The staff — the people here — is just really wonderful. Makes it easy to enjoy.',
        context: 'About the comfort and staff'
      },
      {
        text: 'It doesn\'t really feel like an appointment — it\'s kind of like a fun hangout.',
        context: 'About the overall atmosphere'
      }
    ],
    whyChoseUs: [
      {
        title: 'People First',
        description: 'A friendly, attentive team that treats you like a person, not a time slot.'
      },
      {
        title: 'Modern Comfort',
        description: 'Entertainment at the chair (hello, Netflix) to keep anxiety low and the visit flying by.'
      },
      {
        title: 'The Overall Vibe',
        description: 'Welcoming, unrushed, and refreshingly human — more like visiting people you trust.'
      }
    ],
    whatChanged: [
      {
        category: 'Dental Experience',
        description: 'Found a dental office that feels more like visiting trusted friends than "going to the dentist."'
      },
      {
        category: 'Anxiety Level',
        description: 'Dental anxiety replaced with actual enjoyment and anticipation.'
      },
      {
        category: 'Routine Care',
        description: 'Discovered that routine care can be comfortable, entertaining, and stress-free.'
      }
    ],
    faqs: [
      {
        question: 'Do you really have Netflix at the dental chair?',
        answer: 'Yes! We provide entertainment options including Netflix to help you relax and enjoy your visit.'
      },
      {
        question: 'What makes your office different from other dental practices?',
        answer: 'We focus on creating a welcoming, personal atmosphere where patients feel like valued people, not just appointments.'
      },
      {
        question: 'How do you help patients with dental anxiety?',
        answer: 'Through our comfortable environment, entertainment options, and genuinely caring staff who take time to make you feel at ease.'
      }
    ],
    seo: {
      title: 'Taylor Vasek\'s Story | Patient Experience | Exquisite Dentistry Los Angeles',
      description: 'See how Taylor found the perfect dentist after moving to LA. Watch his testimonial about Netflix at the chair and why dental visits became fun hangouts at Exquisite Dentistry.',
      keywords: 'dental patient story Los Angeles, comfortable dentist LA, Netflix dental chair, patient testimonial Los Angeles, anxiety-free dental care'
    }
  }
];