
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { getRelatedPosts } from '@/data/blogPosts';
import { BlogPost } from '@/data/blogTypes';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';

interface RelatedPostsProps {
  currentPost: BlogPost;
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, limit = 3 }) => {
  const relatedPosts = getRelatedPosts(currentPost, limit);

  // Determine context based on blog post category and tags
  const getContextFromPost = (post: BlogPost): 'veneer' | 'invisalign' | 'whitening' | 'wedding' | 'graduation' | 'cost' | 'general' => {
    const tags = post.tags.join(' ').toLowerCase();
    const category = post.category.toLowerCase();
    
    if (tags.includes('veneer') || category.includes('veneer')) return 'veneer';
    if (tags.includes('invisalign') || tags.includes('orthodontic') || category.includes('orthodontic')) return 'invisalign';
    if (tags.includes('whitening') || category.includes('whitening')) return 'whitening';
    if (tags.includes('wedding')) return 'wedding';
    if (tags.includes('graduation')) return 'graduation';
    if (tags.includes('cost') || tags.includes('price') || tags.includes('financing')) return 'cost';
    return 'general';
  };

  const getServiceRecommendations = (post: BlogPost) => {
    const context = getContextFromPost(post);
    
    switch (context) {
      case 'veneer':
        return [
          {
            title: "Porcelain Veneers Consultation",
            href: "/veneers",
            description: "Schedule your custom veneer consultation",
            duration: "60 min",
            popularity: 90
          },
          {
            title: "Smile Gallery",
            href: "/smile-gallery",
            description: "See real veneer transformations",
            popularity: 85
          },
          {
            title: "Wedding Preparation",
            href: "/wedding",
            description: "Perfect veneers for your special day",
            duration: "2-3 weeks",
            popularity: 70,
            combination: true
          }
        ];
      case 'invisalign':
        return [
          {
            title: "Invisalign Consultation",
            href: "/services#invisalign",
            description: "Free Invisalign assessment and planning",
            duration: "45 min",
            popularity: 95
          },
          {
            title: "Digital Treatment Preview",
            href: "/contact",
            description: "See your future smile before treatment",
            popularity: 88
          }
        ];
      default:
        return [
          {
            title: "Complete Consultation",
            href: "/contact",
            description: "Comprehensive smile analysis and planning",
            duration: "60 min",
            popularity: 85
          },
          {
            title: "Smile Gallery",
            href: "/smile-gallery",
            description: "Explore transformation possibilities",
            popularity: 80
          }
        ];
    }
  };

  if (relatedPosts.length === 0) {
    return (
      <section className="mt-16">
        <InternalLinkingWidget 
          context={getContextFromPost(currentPost)} 
          variant="expanded"
          currentPage={`/blog/${currentPost.slug}`}
        />
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid gap-4 mb-12">
        {relatedPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold group-hover:text-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-3 text-sm text-gray-500">
                  {post.category} • {post.readTime}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Enhanced Internal Linking */}
      <div className="grid md:grid-cols-2 gap-8">
        <InternalLinkingWidget 
          context={getContextFromPost(currentPost)} 
          variant="expanded"
          currentPage={`/blog/${currentPost.slug}`}
        />
        
        <ServiceRecommendation
          currentService={`${currentPost.category} Blog`}
          context="complement"
          recommendations={getServiceRecommendations(currentPost)}
          title="Ready to Take Action?"
        />
      </div>
    </section>
  );
};

export default RelatedPosts;
