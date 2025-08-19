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
    thumbnailUrl: '/lovable-uploads/8b7b3e48-76a3-4f37-91e3-2b3a8c681841.png',
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
  },
  {
    id: 'shannon-langhorne',
    slug: 'shannon-langhorne',
    patientName: 'Shannon Langhorne',
    title: 'Shannon Langhorne\'s Story — A Dental Visit That Feels Like Stepping Into a Spa',
    shortDescription: 'For Shannon, going to the dentist used to be just another appointment on the calendar. That changed the first time she visited Exquisite Dentistry where it feels like walking into a spa.',
    videoId: '3O6FuKufvL4',
    videoType: 'youtube',
    thumbnailUrl: 'https://img.youtube.com/vi/3O6FuKufvL4/maxresdefault.jpg',
    location: 'Los Angeles, CA',
    goal: 'Finding dental care that feels comfortable and relaxing, like a spa experience',
    keyTakeaways: [
      'Spa-like environment: Calm, welcoming, and designed to put patients at ease.',
      'Friendly faces: A team that makes you feel cared for from the moment you arrive.',
      'Confidence boost: Results that leave you smiling more — and feeling proud of it.'
    ],
    quotes: [
      {
        text: 'I like coming here because it feels like I\'m walking into a spa… everyone\'s friendly, they\'re smiling, Dr. Lexi\'s excited to see me.',
        context: 'About the spa-like atmosphere'
      },
      {
        text: 'I come here and it\'s always a nice, relaxing vibe. I just feel more confident about my smile than I have before.',
        context: 'About confidence and relaxation'
      }
    ],
    whyChoseUs: [
      {
        title: 'Spa-like Environment',
        description: 'Calm, welcoming, and designed to put patients at ease.'
      },
      {
        title: 'Friendly Faces',
        description: 'A team that makes you feel cared for from the moment you arrive.'
      },
      {
        title: 'Confidence Boost',
        description: 'Results that leave you smiling more — and feeling proud of it.'
      }
    ],
    whatChanged: [
      {
        category: 'Dental Experience',
        description: 'Dental visits went from something to check off the list to something she looked forward to.'
      },
      {
        category: 'Atmosphere',
        description: 'Every detail felt intentional — from genuine smiles to Dr. Lexi\'s excitement to see her.'
      },
      {
        category: 'Confidence',
        description: 'Shannon feels more confident about her smile than ever before.'
      }
    ],
    faqs: [
      {
        question: 'What makes your office feel like a spa?',
        answer: 'We focus on creating a calm, welcoming environment with friendly staff and a relaxing atmosphere that puts patients at ease from the moment they arrive.'
      },
      {
        question: 'How do you help patients feel comfortable during visits?',
        answer: 'Our team greets every patient with genuine care and excitement. We believe that positive energy and intentional details make all the difference in your experience.'
      },
      {
        question: 'Can dental care really boost confidence?',
        answer: 'Absolutely! When you love your smile and feel cared for during the process, it naturally increases your confidence and makes you want to smile more.'
      }
    ],
    seo: {
      title: 'Shannon Langhorne\'s Story | Spa-Like Dental Experience | Exquisite Dentistry Los Angeles',
      description: 'See how Shannon found a dental office that feels like a spa at Exquisite Dentistry in Los Angeles. Watch her testimonial about the relaxing atmosphere and confidence boost.',
      keywords: 'spa-like dental office Los Angeles, relaxing dentist LA, comfortable dental care, patient testimonial Los Angeles, confidence boost dental'
    }
  }
];