export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio?: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Choosing Veneers for the Front 4 Teeth: Complete Smile Transformation Guide',
    slug: 'choosing-veneers-for-the-front-4-teeth',
    excerpt: 'Learn everything about getting porcelain veneers for your front 4 teeth. Discover costs, benefits, process, and why treating the smile zone together delivers the best results.',
    content: 'front-4-veneers', // This will map to the existing component
    author: 'Dr. Alexie Aguil',
    authorBio: 'With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.',
    date: 'December 15, 2024',
    readTime: '15 min read',
    category: 'Cosmetic Dentistry',
    tags: ['veneers', 'front teeth', 'smile zone', 'porcelain veneers', 'cosmetic dentistry'],
    featuredImage: '/lovable-uploads/5453516e-5298-4daa-9f2c-f98804ddcd5e.png',
    seoTitle: 'Choosing Veneers for the Front 4 Teeth | Complete Smile Transformation Guide',
    seoDescription: 'Learn everything about getting porcelain veneers for your front 4 teeth. Discover costs, benefits, process, and why treating the smile zone together delivers the best results. Expert insights from Dr. Alexie Aguil.',
    seoKeywords: 'veneers front 4 teeth, front teeth veneers, 4 veneers cost, smile zone veneers, upper front teeth veneers, porcelain veneers Los Angeles',
    published: true
  },
  {
    id: '2',
    title: 'Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections',
    slug: 'single-tooth-veneers-perfect-solutions',
    excerpt: 'Discover how a single veneer can transform your smile when one tooth needs special attention. Learn about the process, benefits, and what makes single-tooth veneers an ideal cosmetic solution.',
    content: 'single-tooth-veneers', // This will map to the existing component
    author: 'Dr. Alexie Aguil',
    authorBio: 'With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.',
    date: 'June 19, 2025',
    readTime: '6 min read',
    category: 'Cosmetic Dentistry',
    tags: ['single veneer', 'porcelain veneers', 'cosmetic dentistry', 'smile makeover', 'tooth restoration'],
    seoTitle: 'Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections',
    seoDescription: 'Discover how a single veneer can transform your smile when one tooth needs special attention. Learn about the process, benefits, and what makes single-tooth veneers an ideal cosmetic solution.',
    seoKeywords: 'single tooth veneers, porcelain veneers, cosmetic dentistry, smile makeover, dental veneers Los Angeles, tooth restoration',
    published: true
  },
  {
    id: '3',
    title: 'Relax and Binge Netflix\'s Hottest Shows During Your Cosmetic Dentistry Visit',
    slug: 'netflix-streaming-during-dental-procedures',
    excerpt: 'Turn your dental anxiety into entertainment bliss! Discover how streaming Netflix during cosmetic procedures at Exquisite Dentistry creates a spa-like experience while achieving your perfect smile.',
    content: `<div class="prose prose-lg max-w-none">
        <p class="text-xl text-gray-600 leading-relaxed mb-8">
          Are you searching for a <strong>cosmetic dentist</strong> who turns a routine dental procedure into a spa-like escape? If dental anxiety has kept you from achieving that perfect smile, it's time to discover a new way to experience dentistry. At Exquisite Dentistry, we specialize in <strong>comfortable patient experiences</strong> that let you sit back, relax, and enjoy the latest Netflix hits right from the dental chair. Imagine transforming your veneers, teeth whitening, or smile makeover appointment into a mini binge-watching session—sounds dreamy, right?
        </p>

        <p class="mb-6">
          In this blog post, we'll explore how our innovative approach to <strong>entertainment during dental procedures</strong> is revolutionizing cosmetic dentistry. Whether you're a fan of thrilling dramas or feel-good comedies, our setup ensures your visit is as enjoyable as it is effective. Let's dive in!
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Why Choose a Cosmetic Dentist with a Focus on Comfort?</h2>

        <p class="mb-6">
          Finding the right <strong>cosmetic dentist</strong> isn't just about expertise—it's about feeling at ease throughout the process. Many patients dread dental visits due to discomfort or boredom, but at Exquisite Dentistry, we've flipped the script. Our state-of-the-art clinic is designed for ultimate relaxation, combining advanced cosmetic treatments with modern amenities that cater to your entertainment needs.
        </p>

        <p class="mb-6">
          Cosmetic dentistry procedures like dental implants, Invisalign, or porcelain veneers can take time, and we understand that. That's why we prioritize a <strong>comfortable dental experience</strong> where you can unwind without a care. No more staring at the ceiling or counting the minutes—our patients rave about how our entertainment options make procedures feel shorter and more enjoyable.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Sit Back, Relax, and Stream Netflix's Newest Hits</h2>

        <p class="mb-6">
          Picture this: You're reclined in our plush dental chair, noise-canceling headphones on, and the latest episode of your favorite show playing on a personal screen. At Exquisite Dentistry, we offer <strong>Netflix during dental procedures</strong> as part of our commitment to patient comfort. It's not just any streaming—it's tailored to help you zone out and forget you're even at the dentist.
        </p>

        <p class="mb-6">
          As of July 2025, Netflix is buzzing with must-watch content that's perfect for distracting and delighting during your visit. Here are some of the <strong>newest and greatest hits</strong> our patients are loving right now:
        </p>

        <ul class="mb-6 space-y-2">
          <li><strong>Squid Game (Season 3)</strong>: Dive into the high-stakes drama that's topping global charts with over 106 million views. Its intense plot will keep you hooked while we perfect your smile.</li>
          <li><strong>The Waterfront</strong>: This family crime saga is the No. 1 English TV show in the U.S.—ideal for those who enjoy gripping stories with a touch of Southern charm.</li>
          <li><strong>Adolescence</strong>: A thought-provoking limited series about teen trials that's racked up 141 million views. It's a great pick for reflective viewing during longer procedures.</li>
          <li><strong>The Old Guard 2</strong>: Action-packed and star-studded with Charlize Theron, this sequel is dominating movie lists with 37.5 million debut views—perfect for adrenaline junkies.</li>
          <li><strong>KPop Demon Hunters</strong>: An animated comedy blending music and fantasy, scoring high on Rotten Tomatoes and appealing to pop culture fans.</li>
        </ul>

        <p class="mb-6">
          Whether you're catching up on these trends or queuing up your personal favorites, our seamless Netflix integration ensures crystal-clear streaming without interruptions. It's all part of creating a <strong>relaxing dental experience</strong> that feels more like a luxury retreat than a medical appointment.
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">The Benefits of Entertainment in Cosmetic Dentistry</h2>

        <p class="mb-4">
          Incorporating <strong>entertainment during procedures</strong> isn't just a perk—it's backed by benefits that enhance your overall visit:
        </p>

        <ul class="mb-6 space-y-2">
          <li><strong>Reduces Anxiety</strong>: Studies show that distractions like watching TV can lower stress levels, making it easier to undergo treatments without fear.</li>
          <li><strong>Time Flies By</strong>: What feels like hours can pass in the blink of an eye when you're immersed in a captivating story.</li>
          <li><strong>Personalized Comfort</strong>: Choose your shows, adjust the volume, and even pause if needed—it's your session, your way.</li>
          <li><strong>Modern Patient-Centered Care</strong>: At Exquisite Dentistry, we use the latest technology to ensure your cosmetic results are stunning while prioritizing your well-being.</li>
        </ul>

        <p class="mb-6">
          Our patients often tell us they look forward to their appointments because of this unique feature. One recent review shared, "I finally got my veneers done while bingeing Squid Game—it was the most relaxing dental experience ever!"
        </p>

        <h2 class="text-2xl font-bold mt-8 mb-4">Ready to Upgrade Your Smile with Netflix Vibes?</h2>

        <p class="mb-6">
          If you're a <strong>cosmetic dental patient prospect</strong> tired of traditional dentistry and ready for a <strong>comfortable, entertaining experience</strong>, Exquisite Dentistry is here for you. We serve clients seeking top-tier cosmetic services in a welcoming environment where relaxation is key.
        </p>

        <p class="mb-6">
          Don't let dental jitters hold you back from your dream smile. <a href="/contact" class="text-gold hover:text-gold/80 underline">Schedule a consultation today</a> and experience the difference—complete with Netflix's hottest shows. Your perfect, stress-free smile awaits!
        </p>

        <p class="text-sm text-gray-500 italic">
          Keywords: cosmetic dentist, comfortable patient experience, entertainment during dental procedure, Netflix in dentist office, relaxing cosmetic dentistry
        </p>
      </div>`,
    author: 'Dr. Alexie Aguil',
    authorBio: 'With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.',
    date: 'July 21, 2025',
    readTime: '8 min read',
    category: 'Patient Experience',
    tags: ['patient comfort', 'entertainment', 'dental anxiety', 'netflix', 'cosmetic dentistry'],
    seoTitle: 'Netflix During Dental Procedures | Entertainment at Exquisite Dentistry LA',
    seoDescription: 'Experience anxiety-free cosmetic dentistry while streaming Netflix\'s hottest shows. Discover how our entertainment-focused approach transforms dental visits into relaxing, enjoyable experiences.',
    seoKeywords: 'entertainment during dental procedures, Netflix dentist office, comfortable cosmetic dentistry, dental anxiety relief, relaxing dental experience Los Angeles',
    published: true
  }
];

export const getPublishedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.published);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category && post.published);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts.filter(post => post.tags.includes(tag) && post.published);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.published && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};

export const getAllCategories = (): string[] => {
  const categories = new Set(blogPosts.map(post => post.category));
  return Array.from(categories);
};

export const getAllTags = (): string[] => {
  const tags = new Set(blogPosts.flatMap(post => post.tags));
  return Array.from(tags);
};
