import React from 'react';
import { Link } from 'react-router-dom';
import { SCHEDULING_URL } from '@/constants/urls';
import { cn } from '@/lib/utils';

interface LinkItem {
  title: string;
  href: string;
  description: string;
  category: 'service' | 'blog' | 'experience' | 'consultation' | 'gallery' | 'special';
  priority?: number;
  seasonal?: boolean;
}

interface InternalLinkingWidgetProps {
  currentPage?: string;
  context?: 'veneer' | 'cost' | 'experience' | 'general' | 'orthodontics' | 'whitening' | 'wedding' | 'graduation' | 'consultation' | 'invisalign' | 'oral-health';
  variant?: 'compact' | 'expanded' | 'sidebar';
  className?: string;
  title?: string;
}

const InternalLinkingWidget: React.FC<InternalLinkingWidgetProps> = ({ 
  currentPage = '', 
  context = 'general',
  variant = 'compact',
  className,
  title
}) => {
  const getContextualLinks = (): LinkItem[] => {
    switch (context) {
      case 'veneer':
        return [
          {
            title: 'Front Teeth Veneers (2–4 Teeth)',
            href: '/veneers/front-teeth-veneers-los-angeles',
            description: 'Cost, design, and process for the smile zone',
            category: 'service',
            priority: 1
          },
          {
            title: 'Porcelain Veneers Service',
            href: '/veneers',
            description: 'Complete veneer treatments and smile transformations',
            category: 'service',
            priority: 2
          },
          {
            title: 'Veneers Los Angeles',
            href: '/veneers-los-angeles',
            description: 'Handcrafted veneers tailored to LA lifestyles',
            category: 'service',
            priority: 3
          },
          {
            title: 'Single Tooth Veneers Guide',
            href: '/blog/choosing-veneers-for-just-one-tooth',
            description: 'Perfect solutions for individual tooth improvements',
            category: 'blog',
            priority: 4
          },
          {
            title: '4 Front Teeth Veneers Cost',
            href: '/blog/4-front-teeth-veneers-cost-los-angeles',
            description: 'Pricing guide for front teeth veneers in LA',
            category: 'blog',
            priority: 5
          },
          {
            title: 'Are Veneers Covered by Insurance?',
            href: '/blog/are-veneers-covered-by-insurance',
            description: 'Understanding insurance and veneer financing',
            category: 'blog',
            priority: 6
          },
          {
            title: 'Wedding Smile Makeover',
            href: '/wedding',
            description: 'Perfect veneers for your special day',
            category: 'special',
            priority: 8,
            seasonal: true
          },
          {
            title: 'Smile Gallery',
            href: '/smile-gallery',
            description: 'See real veneer transformations',
            category: 'gallery',
            priority: 7
          },
          // Underlinked veneer blog posts
          {
            title: 'Veneers vs Bonding Comparison',
            href: '/blog/dental-veneers-vs-bonding',
            description: 'Compare veneers and bonding for your smile goals',
            category: 'blog',
            priority: 9
          },
          {
            title: 'Hollywood Veneers Guide',
            href: '/blog/how-hollywood-veneers-can-transform-your-smile',
            description: 'Discover how Hollywood-style veneers create stunning smiles',
            category: 'blog',
            priority: 10
          },
          {
            title: 'Veneer Materials Explained',
            href: '/blog/the-material-options-for-dental-veneers',
            description: 'Porcelain vs composite: which material is right for you',
            category: 'blog',
            priority: 11
          },
          {
            title: 'Veneer Maintenance Tips',
            href: '/blog/restoration-and-maintenance-for-dental-veneers',
            description: 'Keep your veneers looking perfect for years',
            category: 'blog',
            priority: 12
          },
          {
            title: 'Veneer Styles & Shapes',
            href: '/blog/the-shapes-and-styles-of-dental-veneers',
            description: 'Find the perfect veneer shape for your face',
            category: 'blog',
            priority: 13
          },
          {
            title: 'Do Veneers Require Surgery?',
            href: '/blog/do-you-need-surgery-for-dental-veneers',
            description: 'Understanding the veneer procedure and what to expect',
            category: 'blog',
            priority: 14
          },
          {
            title: 'Veneer Replacement Guide',
            href: '/blog/the-process-of-veneer-replacemen',
            description: 'When and how to replace your veneers',
            category: 'blog',
            priority: 15
          },
          {
            title: 'Long-Term Cosmetic Solutions',
            href: '/blog/long-term-cosmetic-dentistry-solutions',
            description: 'Lasting options for your smile transformation',
            category: 'blog',
            priority: 16
          }
        ];
      
      case 'orthodontics':
      case 'invisalign':
        return [
          {
            title: 'Invisalign Treatment',
            href: '/invisalign',
            description: 'Clear aligners for discreet teeth straightening',
            category: 'service',
            priority: 1
          },
          {
            title: 'iTero 3D Scanner',
            href: '/itero-scanner',
            description: 'See how digital impressions accelerate Invisalign planning',
            category: 'service',
            priority: 2
          },
          {
            title: 'Does Invisalign Hurt?',
            href: '/blog/invisalign-hurt-mouth',
            description: 'What to expect during treatment',
            category: 'blog',
            priority: 3
          },
          {
            title: 'Best Teeth Straightening for Adults',
            href: '/blog/the-best-teeth-straightening-for-adults',
            description: 'Options for adult orthodontic treatment',
            category: 'blog',
            priority: 4
          },
          {
            title: 'How Long to Fix Crooked Teeth?',
            href: '/blog/long-will-take-fix-crooked-teeth',
            description: 'Treatment timeline expectations',
            category: 'blog',
            priority: 5
          },
          {
            title: 'Patient Testimonials',
            href: '/testimonials',
            description: 'Stories from Invisalign patients',
            category: 'experience',
            priority: 6
          },
          {
            title: 'Graduation Smile Prep',
            href: '/graduation',
            description: 'Straighten your smile before graduation',
            category: 'special',
            priority: 8,
            seasonal: true
          }
        ];
      
      case 'whitening':
        return [
          {
            title: 'Teeth Whitening Service',
            href: '/teeth-whitening',
            description: 'Professional teeth whitening programs',
            category: 'service',
            priority: 1
          },
          {
            title: 'Zoom Whitening',
            href: '/zoom-whitening',
            description: 'In-office treatment for instant brightness',
            category: 'service',
            priority: 2
          },
          {
            title: 'Veneers vs Whitening',
            href: '/veneers',
            description: 'Compare whitening with veneer options',
            category: 'service',
            priority: 3
          },
          {
            title: 'Wedding Whitening',
            href: '/wedding',
            description: 'Brighten your smile for your wedding day',
            category: 'special',
            priority: 5,
            seasonal: true
          },
          {
            title: 'Client Experience',
            href: '/client-experience',
            description: 'Comfortable whitening experience',
            category: 'experience',
            priority: 4
          }
        ];
      
      case 'wedding':
        return [
          {
            title: 'Wedding Smile Makeover',
            href: '/wedding',
            description: 'Complete smile transformation for your special day',
            category: 'service',
            priority: 1
          },
          {
            title: 'Porcelain Veneers',
            href: '/veneers',
            description: 'Perfect teeth for your wedding photos',
            category: 'service',
            priority: 2
          },
          {
            title: 'Teeth Whitening',
            href: '/zoom-whitening',
            description: 'Brighten your smile for the big day',
            category: 'service',
            priority: 3
          },
          {
            title: 'Before & After Gallery',
            href: '/smile-gallery',
            description: 'Wedding smile transformations',
            category: 'gallery',
            priority: 4
          },
          {
            title: 'Wedding Smile Tips',
            href: '/blog/how-to-maintain-the-perfect-wedding-smile',
            description: 'Expert tips for your perfect wedding day smile',
            category: 'blog',
            priority: 5
          },
          {
            title: 'Valentine\'s Dental Tips',
            href: '/blog/how-sweet-ideas-for-keeping-teeth-healthy-on-valentines-day',
            description: 'Keep your smile healthy for special occasions',
            category: 'blog',
            priority: 6
          }
        ];
      
      case 'graduation':
        return [
          {
            title: 'Graduation Smile Package',
            href: '/graduation',
            description: 'Look your best for graduation photos',
            category: 'service',
            priority: 1
          },
          {
            title: 'Quick Smile Fixes',
            href: '/veneers',
            description: 'Fast solutions for immediate results',
            category: 'service',
            priority: 2
          },
          {
            title: 'Invisalign for Students',
            href: '/invisalign',
            description: 'Discreet treatment during school',
            category: 'service',
            priority: 3
          },
          {
            title: 'Student Success Stories',
            href: '/testimonials',
            description: 'Graduation transformations',
            category: 'experience',
            priority: 4
          }
        ];
      
      case 'consultation':
        return [
          {
            title: 'What to Expect',
            href: '/client-experience',
            description: 'Your first visit experience',
            category: 'experience',
            priority: 1
          },
          {
            title: 'Our Services',
            href: '/services',
            description: 'Complete range of treatments',
            category: 'service',
            priority: 2
          },
          {
            title: 'Patient Stories',
            href: '/testimonials',
            description: 'Hear from our satisfied patients',
            category: 'experience',
            priority: 3
          },
          {
            title: 'Smile Gallery',
            href: '/smile-gallery',
            description: 'See actual patient results',
            category: 'gallery',
            priority: 4
          }
        ];
      
      case 'cost':
        return [
          {
            title: 'Front Teeth Veneers Pricing',
            href: '/veneers/front-teeth-veneers-los-angeles',
            description: 'See 2 vs 4 veneer investments and planning',
            category: 'service',
            priority: 1
          },
          {
            title: 'Financing Options',
            href: SCHEDULING_URL,
            description: 'Flexible payment plans and consultation scheduling',
            category: 'consultation',
            priority: 2
          },
          {
            title: 'Netflix During Procedures',
            href: '/blog/netflix-streaming-during-dental-procedures',
            description: 'Comfortable, entertainment-focused dental experience',
            category: 'blog',
            priority: 3
          },
          {
            title: 'Value of Investment',
            href: '/about',
            description: 'Why quality dentistry matters',
            category: 'experience',
            priority: 4
          },
          {
            title: 'Free Consultation',
            href: SCHEDULING_URL,
            description: 'Get personalized treatment planning',
            category: 'consultation',
            priority: 5
          }
        ];
      
      case 'experience':
        return [
          {
            title: 'Smile Gallery',
            href: '/smile-gallery',
            description: 'Before & after transformations from real patients',
            category: 'gallery',
            priority: 1
          },
          {
            title: 'Patient Testimonials',
            href: '/testimonials',
            description: 'Stories from satisfied patients',
            category: 'experience',
            priority: 2
          },
          {
            title: 'Transformation Stories',
            href: '/transformation-stories',
            description: 'Complete patient journey stories',
            category: 'experience',
            priority: 3
          },
          {
            title: 'Overcome Dental Fear',
            href: '/blog/can-help-get-fear-dentist',
            description: 'Tips for a comfortable dental experience',
            category: 'blog',
            priority: 4
          },
          {
            title: 'Finding a Good Dentist',
            href: '/blog/finding-good-dentist-area',
            description: 'What to look for in a dental practice',
            category: 'blog',
            priority: 5
          },
          {
            title: 'High-End Dentistry Guide',
            href: '/blog/high-end-dentistry',
            description: 'What sets premium dental care apart',
            category: 'blog',
            priority: 6
          },
          {
            title: 'Wedding Smile Prep',
            href: '/wedding',
            description: 'Perfect smile for your special day',
            category: 'special',
            priority: 7,
            seasonal: true
          },
          {
            title: 'Graduation Smile',
            href: '/graduation',
            description: 'Look your best for graduation photos',
            category: 'special',
            priority: 8,
            seasonal: true
          },
          // Underlinked oral health/experience posts
          {
            title: 'Oral Wellness As You Age',
            href: '/blog/oral-wellness-with-age-how-to-protect-your-teeth-as-you-grow-older',
            description: 'Protect your smile through every stage of life',
            category: 'blog',
            priority: 9
          },
          {
            title: 'Daily Flossing Tips',
            href: '/blog/recommendations-to-work-flossing-into-your-daily-routine',
            description: 'Build better oral health habits',
            category: 'blog',
            priority: 10
          }
        ];

      case 'oral-health':
        return [
          {
            title: 'Restorative Dentistry',
            href: '/services#restorative',
            description: 'Solutions for damaged or missing teeth',
            category: 'service',
            priority: 1
          },
          {
            title: 'Smoking & Oral Cancer Risk',
            href: '/blog/female-smokers-are-at-a-higher-risk-of-oral-cancer',
            description: 'Understanding the connection between smoking and oral health',
            category: 'blog',
            priority: 2
          },
          {
            title: 'How Alcohol Affects Teeth',
            href: '/blog/how-alcohol-affects-your-teeth',
            description: 'The impact of alcohol on your dental health',
            category: 'blog',
            priority: 3
          },
          {
            title: 'Cannabis & Gum Disease',
            href: '/blog/marijuana-use-increases-risk-gum-disease',
            description: 'Marijuana\'s effect on periodontal health',
            category: 'blog',
            priority: 4
          },
          {
            title: 'Can Teeth Repair Naturally?',
            href: '/blog/can-damaged-teeth-repair-themselves-naturally',
            description: 'The truth about natural tooth repair',
            category: 'blog',
            priority: 5
          },
          {
            title: 'Cracked Tooth Signs',
            href: '/blog/do-you-have-a-cracked-tooth',
            description: 'Recognize the symptoms of a cracked tooth',
            category: 'blog',
            priority: 6
          },
          {
            title: 'Oral Health & Aging',
            href: '/blog/oral-wellness-with-age-how-to-protect-your-teeth-as-you-grow-older',
            description: 'Protect your smile at every age',
            category: 'blog',
            priority: 7
          },
          {
            title: 'Daily Flossing Guide',
            href: '/blog/recommendations-to-work-flossing-into-your-daily-routine',
            description: 'Build effective oral hygiene habits',
            category: 'blog',
            priority: 8
          },
          {
            title: 'Schedule a Checkup',
            href: SCHEDULING_URL,
            description: 'Protect your oral health with regular visits',
            category: 'consultation',
            priority: 9
          }
        ];

      default:
        return [
          {
            title: 'Our Services',
            href: '/services',
            description: 'Complete cosmetic dentistry treatments',
            category: 'service',
            priority: 1
          },
          {
            title: 'About Dr. Aguil',
            href: '/about',
            description: 'Meet your expert cosmetic dentist',
            category: 'experience',
            priority: 2
          },
          {
            title: 'Patient Gallery',
            href: '/smile-gallery',
            description: 'Real transformation results',
            category: 'gallery',
            priority: 3
          },
          {
            title: 'Oral Wellness As You Age',
            href: '/blog/maintaining-oral-wellness-as-you-age',
            description: 'Tips for lifelong dental health',
            category: 'blog',
            priority: 4
          },
          {
            title: 'How Oral Health Affects Overall Health',
            href: '/blog/how-oral-health-problems-can-affect-your-overall-health',
            description: 'The connection between dental and general health',
            category: 'blog',
            priority: 5
          },
          {
            title: 'Finding the Best Cosmetic Dentist',
            href: '/blog/finding-the-best-cosmetic-dentist-in-los-angeles',
            description: 'Guide to choosing a cosmetic dentist in LA',
            category: 'blog',
            priority: 6
          },
          {
            title: 'Schedule Consultation',
            href: SCHEDULING_URL,
            description: 'Begin your smile transformation',
            category: 'consultation',
            priority: 7
          },
          // Underlinked local/professional posts
          {
            title: 'Adult Cosmetic Dentistry',
            href: '/blog/leading-cosmetic-dentist-for-adults-in-los-angeles-transforming-smiles-at-any-age',
            description: 'Smile transformations at any age',
            category: 'blog',
            priority: 8
          },
          {
            title: 'Visiting LA? Need a Dentist?',
            href: '/blog/need-dentist-visiting-los-angeles',
            description: 'Quality dental care for LA visitors',
            category: 'blog',
            priority: 9
          }
        ];
    }
  };

  const links = getContextualLinks()
    .filter(link => !currentPage.includes(link.href))
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));
  
  // Filter out seasonal/special links for compact variant to reduce over-promotion
  const filteredLinks = variant === 'compact' 
    ? links.filter(link => !link.seasonal && link.category !== 'special')
    : links;
  
  const displayLinks = variant === 'compact' ? filteredLinks.slice(0, 3) : 
                      variant === 'sidebar' ? links.slice(0, 4) : links;

  // Unicode icons instead of Lucide SVGs (~200 bytes saved per icon)
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service':
        return <span className="text-gold" aria-hidden="true">★</span>;
      case 'blog':
        return <span className="text-blue-500" aria-hidden="true">📄</span>;
      case 'experience':
        return <span className="text-red-500" aria-hidden="true">♥</span>;
      case 'consultation':
        return <span className="text-green-600" aria-hidden="true">📅</span>;
      case 'gallery':
        return <span className="text-purple-600" aria-hidden="true">📷</span>;
      case 'special':
        return <span className="text-pink-500" aria-hidden="true">✨</span>;
      default:
        return <span className="text-gray-500" aria-hidden="true">→</span>;
    }
  };

  if (displayLinks.length === 0) return null;

  const getContextTitle = () => {
    if (title) return title;

    switch (context) {
      case 'veneer': return 'Related Veneer Information';
      case 'orthodontics':
      case 'invisalign': return 'Invisalign & Orthodontic Resources';
      case 'whitening': return 'Teeth Whitening Options';
      case 'wedding': return 'Wedding Smile Solutions';
      case 'graduation': return 'Graduation Smile Prep';
      case 'consultation': return 'Your Next Steps';
      case 'cost': return 'Investment & Financing';
      case 'experience': return 'Explore More Experiences';
      case 'oral-health': return 'Oral Health Resources';
      default: return 'Helpful Resources';
    }
  };

  const containerClasses = cn(
    'bg-gradient-to-r from-gold/5 via-gold/10 to-white rounded-xl p-6 my-8 shadow-sm border border-gold/15',
    className
  );

  const gridClasses = cn(
    'grid gap-4',
    variant === 'sidebar' ? 'grid-cols-1' :
    variant === 'compact' ? 'grid-cols-1' :
    'grid-cols-1 sm:grid-cols-2'
  );

  const cardClasses = 'group flex h-full flex-col gap-3 rounded-lg border border-white/60 bg-white/95 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md';
  const iconWrapperClasses = 'flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold';
  const seasonalBadgeClasses = 'text-xs bg-gold/15 text-gold/90 px-2 py-1 rounded-full font-medium uppercase tracking-wide';

  return (
    <div className={containerClasses}>
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        {getContextTitle()}
      </h3>
      
      <div className={gridClasses}>
        {displayLinks.map((link, index) => {
          const isExternal = /^https?:\/\//.test(link.href);
          const linkClassName = cardClasses;
          const linkContent = (
            <>
              <div className="flex items-start gap-3">
                <span className={iconWrapperClasses}>
                  {getCategoryIcon(link.category)}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-base font-semibold text-gray-900 transition-colors group-hover:text-gold">
                      {link.title}
                    </h4>
                    {link.seasonal && (
                      <span className={seasonalBadgeClasses}>
                        Seasonal
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors group-hover:text-gold/80">
                Explore
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </>
          );

          if (isExternal) {
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClassName}
              >
                {linkContent}
              </a>
            );
          }

          return (
            <Link key={index} to={link.href} className={linkClassName}>
              {linkContent}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default InternalLinkingWidget;
