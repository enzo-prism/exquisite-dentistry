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
  }
];