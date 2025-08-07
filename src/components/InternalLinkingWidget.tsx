
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

interface LinkItem {
  title: string;
  href: string;
  description: string;
  category: 'service' | 'blog' | 'experience';
}

interface InternalLinkingWidgetProps {
  currentPage?: string;
  context?: 'veneer' | 'cost' | 'experience' | 'general';
  variant?: 'compact' | 'expanded';
}

const InternalLinkingWidget: React.FC<InternalLinkingWidgetProps> = ({ 
  currentPage = '', 
  context = 'general',
  variant = 'compact' 
}) => {
  const getContextualLinks = (): LinkItem[] => {
    switch (context) {
      case 'veneer':
        return [
          {
            title: 'Porcelain Veneers Service',
            href: '/veneers',
            description: 'Complete veneer treatments and smile transformations',
            category: 'service'
          },
          {
            title: 'Single Tooth Veneers Guide',
            href: '/blog/single-tooth-veneers-perfect-solutions',
            description: 'Perfect solutions for individual tooth improvements',
            category: 'blog'
          },
          {
            title: '2 Front Teeth Veneers Cost',
            href: '/blog/2-front-teeth-veneers-cost-los-angeles',
            description: 'Transparent pricing for targeted improvements',
            category: 'blog'
          },
          {
            title: '4 Front Teeth Veneers Investment',
            href: '/blog/4-front-teeth-veneers-cost-los-angeles',
            description: 'Complete smile zone transformation guide',
            category: 'blog'
          }
        ];
      
      case 'cost':
        return [
          {
            title: 'Financing Options',
            href: '/contact',
            description: 'Flexible payment plans and consultation scheduling',
            category: 'service'
          },
          {
            title: 'Netflix During Procedures',
            href: '/blog/netflix-streaming-during-dental-procedures',
            description: 'Comfortable, entertainment-focused dental experience',
            category: 'blog'
          },
          {
            title: 'Client Experience',
            href: '/client-experience',
            description: 'What to expect during your transformation',
            category: 'experience'
          }
        ];
      
      case 'experience':
        return [
          {
            title: 'Smile Gallery',
            href: '/smile-gallery',
            description: 'Before & after transformations from real patients',
            category: 'experience'
          },
          {
            title: 'Patient Testimonials',
            href: '/testimonials',
            description: 'Stories from satisfied patients',
            category: 'experience'
          },
          {
            title: 'Wedding Smile Prep',
            href: '/wedding',
            description: 'Perfect smile for your special day',
            category: 'service'
          },
          {
            title: 'Graduation Smile',
            href: '/graduation',
            description: 'Look your best for graduation photos',
            category: 'service'
          }
        ];
      
      default:
        return [
          {
            title: 'Our Services',
            href: '/services',
            description: 'Complete cosmetic dentistry treatments',
            category: 'service'
          },
          {
            title: 'About Dr. Aguil',
            href: '/about',
            description: 'Meet your expert cosmetic dentist',
            category: 'experience'
          },
          {
            title: 'Blog & Resources',
            href: '/blog',
            description: 'Latest insights and dental guides',
            category: 'blog'
          }
        ];
    }
  };

  const links = getContextualLinks().filter(link => !currentPage.includes(link.href));
  const displayLinks = variant === 'compact' ? links.slice(0, 3) : links;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'service':
        return <Star className="w-4 h-4 text-gold" />;
      case 'blog':
        return <ArrowRight className="w-4 h-4 text-blue-500" />;
      case 'experience':
        return <ArrowRight className="w-4 h-4 text-gold" />;
      default:
        return <ArrowRight className="w-4 h-4 text-gray-500" />;
    }
  };

  if (displayLinks.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-gold/5 to-gold/10 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">
        {context === 'veneer' ? 'Related Veneer Information' :
         context === 'cost' ? 'Next Steps & Resources' :
         context === 'experience' ? 'Explore More Experiences' :
         'Helpful Resources'}
      </h3>
      
      <div className={`grid gap-3 ${variant === 'expanded' ? 'md:grid-cols-2' : ''}`}>
        {displayLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            className="flex items-start gap-3 p-3 bg-white rounded-md hover:bg-gray-50 transition-colors group"
          >
            <div className="flex-shrink-0 mt-1">
              {getCategoryIcon(link.category)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 group-hover:text-gold transition-colors">
                {link.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {link.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InternalLinkingWidget;
