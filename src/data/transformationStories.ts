export interface TransformationStory {
  id: string;
  slug: string;
  patientName: string;
  title: string;
  shortDescription: string;
  video: {
    src: string;
    poster?: string;
  };
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

export const transformationStories: TransformationStory[] = [
  {
    id: 'virginia-art-of-a-smile',
    slug: 'virginia',
    patientName: 'Virginia',
    title: 'The Art of a Smile: Virginia’s Story at Exquisite Dentistry LA',
    shortDescription: 'Where precision meets artistry — and every detail reflects the person behind the smile.',
    video: {
      src: 'https://videos-hazel-eta.vercel.app/virginia.mp4',
      poster: 'https://videos-hazel-eta.vercel.app/virginia-thumbnail.png'
    },
    thumbnailUrl: 'https://videos-hazel-eta.vercel.app/virginia-thumbnail.png',
    location: 'Los Angeles / Beverly Grove',
    goal: 'A confident, natural-looking smile that reflects who she is',
    keyTakeaways: [
      'Attentive artistry — Dr. Aguil listens closely, notices what matters, and brings that vision to life.',
      'Ease through empathy — Calm tone, clear communication, and genuine care replace dental stress with trust.',
      'A true partnership — Every decision is explained, every step designed around comfort and confidence.'
    ],
    quotes: [
      {
        text: 'Dr. Aguil is just an amazing person. He’s very attentive and has a way of putting me at ease. He was able to give me the smile that I was actually asking for. So he absolutely is an artist.',
        context: 'Virginia, Exquisite Dentistry patient'
      }
    ],
    whyChoseUs: [
      {
        title: 'Attentive Listening Builds Trust',
        description: 'When your doctor truly hears you, treatment feels collaborative — not clinical.'
      },
      {
        title: 'Artistry Meets Precision',
        description: 'Beyond technique, Dr. Aguil designs smiles that fit facial harmony, personality, and emotion.'
      },
      {
        title: 'Comfort Transforms Confidence',
        description: 'When you’re relaxed in the chair, you show up differently in your life — smiling freely and often.'
      }
    ],
    whatChanged: [
      {
        category: 'Tension → Trust',
        description: 'Virginia felt safe, seen, and understood throughout care.'
      },
      {
        category: 'Desire → Design',
        description: 'She left with the exact smile she envisioned — balanced, bright, unmistakably hers.'
      },
      {
        category: 'Patient → Partner',
        description: 'Her journey shows what happens when dentistry becomes collaboration, not correction.'
      }
    ],
    faqs: [
      {
        question: 'How does Dr. Aguil tailor a smile design to fit me?',
        answer: 'Every transformation starts with a conversation about who you are, what you want to see, and how you want to feel. Dr. Aguil maps out each detail so the final smile reflects your personality.'
      },
      {
        question: 'What helps make the experience feel so calming?',
        answer: 'Clear communication, a relaxed tone, and thoughtful amenities keep you comfortable at every step, so the focus stays on enjoying the process—not stressing about it.'
      },
      {
        question: 'Can I be involved in every decision during treatment?',
        answer: 'Yes. We explain each recommendation, check in on your comfort, and make adjustments together so you feel like a partner in your care.'
      }
    ],
    seo: {
      title: 'Virginia’s Smile Transformation Story | Exquisite Dentistry LA',
      description: 'See how Virginia partnered with Dr. Aguil for a detail-driven smile transformation at Exquisite Dentistry in Los Angeles. Watch the video and explore her journey.',
      keywords: 'Virginia dental transformation, smile design Los Angeles, Exquisite Dentistry testimonial, artistic cosmetic dentistry LA'
    }
  },
  {
    id: 'anxiety-to-ease',
    slug: 'anxiety-to-ease',
    patientName: 'Real Patients',
    title: 'From Anxiety to Ease: Real Patient Stories at Exquisite Dentistry LA',
    shortDescription: 'A comfort-first approach that makes the dentist feel like a place you want to be — and smiles you can\'t wait to show off.',
    video: {
      src: 'https://videos-hazel-eta.vercel.app/patient-testimonial-exquisite-dentistry.mp4',
      poster: 'https://videos-hazel-eta.vercel.app/trailer-thumbnail.png'
    },
    thumbnailUrl: '/lovable-uploads/5e86bd09-59b8-479e-93a7-18bd8484a8cd.png',
    location: 'West Hollywood / Beverly Grove, Los Angeles',
    goal: 'Anxiety-friendly, experience-driven dentistry with comfort-focused care',
    keyTakeaways: [
      'Warm welcome, zero rush — You\'re greeted by name and never feel like "just another appointment."',
      'Sensory calm — A warm blanket, noise-canceling headphones, Netflix, and subtle aromatherapy to lower stress.',
      'Transparent care — What we\'re doing, why it matters, and what it will feel like explained in plain language.'
    ],
    quotes: [
      {
        text: 'They give you a bottle of water… a warm blanket… headphones… and you can watch Netflix.',
        context: 'About comfort amenities'
      },
      {
        text: 'I love the essential oils. I love being greeted at the front. I love the staff.',
        context: 'About the welcoming atmosphere'
      },
      {
        text: 'Exquisite Dentistry is the best dentist office I\'ve ever been to.',
        context: 'Overall experience'
      },
      {
        text: 'Tears of joy… it changed her life forever.',
        context: 'Doctor\'s note about patient transformation'
      }
    ],
    whyChoseUs: [
      {
        title: 'Environment Signals Safety',
        description: 'Small comforts reduce cortisol, making dentistry feel approachable.'
      },
      {
        title: 'Communication Reduces Uncertainty',
        description: 'When you know the "what & why," fear gives way to trust.'
      },
      {
        title: 'Details Compound',
        description: 'Calm mind + gentle hands + meticulous technique = consistently great outcomes.'
      }
    ],
    whatChanged: [
      {
        category: 'Anxiety → Ease',
        description: 'Patients report feeling calm, cared for, and in control throughout treatment.'
      },
      {
        category: 'Completed Care',
        description: 'With comfort and clarity, people actually finish the plan they start.'
      },
      {
        category: 'Confidence On Display',
        description: 'Smile improvements that patients are proud to show — from healthier gums to aligned, luminous teeth.'
      },
      {
        category: 'Better Habits',
        description: 'Clear at-home guidance leads to easier maintenance between visits.'
      }
    ],
    faqs: [
      {
        question: 'What\'s a comfort consult?',
        answer: 'A short, judgment-free visit where we understand your goals, explain options, and show you exactly how we keep you comfortable.'
      },
      {
        question: 'I\'m anxious about pain. Can you really make this easy?',
        answer: 'Yes. From numbing choices and gentle techniques to blankets, headphones, and Netflix — we\'ve designed every detail to lower stress.'
      },
      {
        question: 'Do you offer Invisalign?',
        answer: 'We do. After a comprehensive evaluation, we\'ll let you know if Invisalign is a good fit and map out your smile plan.'
      },
      {
        question: 'Do you work with my insurance?',
        answer: 'We\'ll help you understand benefits and provide a transparent estimate before treatment.'
      }
    ],
    seo: {
      title: 'Transformation Story: From Dental Anxiety to Ease | Exquisite Dentistry LA',
      description: 'How Exquisite Dentistry LA turns anxiety into comfort — warm blankets, essential oils, and Netflix — delivering confidence-building results patients love. Watch real patient stories.',
      keywords: 'dental anxiety Los Angeles, comfort dentistry LA, anxiety-free dental care, patient testimonials Los Angeles, spa-like dental office'
    }
  },
  {
    id: 'rob-talbert',
    slug: 'rob-talbert',
    patientName: 'Rob Talbert',
    title: 'Rob Talbert\'s Story — "It doesn\'t even feel like going to the dentist"',
    shortDescription: 'Rob walked into Exquisite Dentistry expecting dentistry. He found something different: a calm space, a team that knows him, and care that changed how he feels about his smile and his visits.',
    video: {
      src: 'https://videos-hazel-eta.vercel.app/rob.mp4',
      poster: '/lovable-uploads/f88f1b17-04d5-4a21-9fd5-0294d68af115.png'
    },
    thumbnailUrl: '/lovable-uploads/f88f1b17-04d5-4a21-9fd5-0294d68af115.png',
    location: 'Los Angeles, CA',
    goal: 'From stress to ease — and a routine he actually looks forward to',
    keyTakeaways: [
      'Calm, spa-like experience: "the environment\'s great…super calming, relaxing."',
      'Personal relationship with the doctor: Rob says the doctor remembers him and what\'s happening in his life, which signals continuity and trust.',
      'Net feeling: "It doesn\'t feel like coming to the dentist." (friction removed → higher visit compliance).'
    ],
    quotes: [
      {
        text: 'The environment\'s great—it\'s super calming and relaxing.',
        context: 'About the spa-like atmosphere'
      },
      {
        text: 'My dentist remembers me—what\'s going on in my life.',
        context: 'About personal continuity'
      },
      {
        text: 'It doesn\'t feel like coming to the dentist.',
        context: 'About the overall experience'
      }
    ],
    whyChoseUs: [
      {
        title: 'A Calming Environment',
        description: 'From the moment he arrives, the pace slows. The atmosphere is quiet and relaxing, designed to help patients breathe easier.'
      },
      {
        title: 'Personal Continuity',
        description: 'Dr. Aguil remembers Rob—his preferences, his priorities, and what\'s going on in his life—so every visit starts with context and trust.'
      },
      {
        title: 'Comfort-First Care',
        description: 'Clear explanations, gentle technique, and modern technology help keep visits efficient and low-stress, with options for anxious patients when needed.'
      }
    ],
    whatChanged: [
      {
        category: 'From tense to relaxed',
        description: 'The setting and team shifted Rob\'s mindset; appointments went from something to endure to something simple to do.'
      },
      {
        category: 'From one-off to consistent',
        description: 'When a visit "doesn\'t feel like the dentist," it\'s easy to keep up a healthy routine.'
      },
      {
        category: 'From uncertain to confident',
        description: 'Feeling known and cared for translated into confidence in his smile—and in the plan behind it.'
      }
    ],
    faqs: [
      {
        question: 'What makes the environment so calming?',
        answer: 'We\'ve designed every detail to create a spa-like atmosphere that helps you breathe easier from the moment you arrive.'
      },
      {
        question: 'How do you build personal relationships with patients?',
        answer: 'Dr. Aguil takes time to know you as a person—your preferences, priorities, and what\'s happening in your life—so every visit feels personal and connected.'
      },
      {
        question: 'What if I have dental anxiety?',
        answer: 'Our comfort-first approach includes clear explanations, gentle techniques, and modern technology, with special options for anxious patients to ensure you feel at ease.'
      },
      {
        question: 'How do you maintain consistent care?',
        answer: 'By creating an experience that doesn\'t feel like traditional dentistry, patients naturally maintain their oral health routine and look forward to visits.'
      }
    ],
    seo: {
      title: 'Rob Talbert\'s Story | Comfort-First Dental Care | Exquisite Dentistry Los Angeles',
      description: 'See how Rob found dental care that doesn\'t feel like the dentist at Exquisite Dentistry in Los Angeles. Watch his testimonial about the calming environment and personal care.',
      keywords: 'comfortable dental care Los Angeles, spa-like dentist LA, personal dental relationship, Rob Talbert testimonial, Dr. Alexie Aguil, anxiety-free dental visits'
    }
  },
  {
    id: 'christian-fernandez',
    slug: 'christian-fernandez',
    patientName: 'Christian Fernandez',
    title: 'Christian Fernandez — A Confidence-Boosting Smile Story',
    shortDescription: 'Christian came to Exquisite Dentistry wanting to feel great about her smile every day. After her smile-straightening journey with our team, she left feeling more confident, cared for, and part of the Exquisite Dentistry family.',
    video: {
      src: 'https://videos-hazel-eta.vercel.app/christian.mp4',
      poster: '/lovable-uploads/c9638a7e-6ecb-4be0-b755-71e2d2918efd.png'
    },
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
    video: {
      src: 'https://videos-hazel-eta.vercel.app/taylor.mp4',
      poster: '/lovable-uploads/8b7b3e48-76a3-4f37-91e3-2b3a8c681841.png'
    },
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
    video: {
      src: 'https://videos-hazel-eta.vercel.app/shannon.mp4',
      poster: '/lovable-uploads/01b0ec1f-3c60-4a9f-8700-38dcbe0a3995.png'
    },
    thumbnailUrl: '/lovable-uploads/01b0ec1f-3c60-4a9f-8700-38dcbe0a3995.png',
    location: 'Los Angeles, CA',
    goal: 'Finding dental care that feels comfortable and relaxing, like a spa experience',
    keyTakeaways: [
      'Spa-like environment: Calm, welcoming, and designed to put patients at ease.',
      'Friendly faces: A team that makes you feel cared for from the moment you arrive.',
      'Confidence boost: Results that leave you smiling more — and feeling proud of it.'
    ],
    quotes: [
      {
        text: 'I like coming here because it feels like I\'m walking into a spa… everyone\'s friendly, they\'re smiling, Dr. Aguil\'s excited to see me.',
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
        description: 'Every detail felt intentional — from genuine smiles to Dr. Aguil\'s excitement to see her.'
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