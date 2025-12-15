
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Video } from 'lucide-react';
import { BlogPost, getRelatedPosts } from '@/data/blogPosts';
import { transformationStories, type TransformationStory } from '@/data/transformationStories';
import InternalLinkingWidget from '@/components/InternalLinkingWidget';
import ServiceRecommendation from '@/components/ServiceRecommendation';

interface RelatedPostsProps {
  currentPost: BlogPost;
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, limit = 3 }) => {
  const relatedPosts = getRelatedPosts(currentPost, limit);

  // Determine context based on blog post category and tags
  const getContextFromPost = (post: BlogPost): 'veneer' | 'invisalign' | 'whitening' | 'wedding' | 'graduation' | 'cost' | 'oral-health' | 'general' => {
    const tags = post.tags.join(' ').toLowerCase();
    const category = post.category.toLowerCase();
    const title = post.title.toLowerCase();

    if (tags.includes('veneer') || category.includes('veneer')) return 'veneer';
    if (tags.includes('invisalign') || tags.includes('orthodontic') || category.includes('orthodontic')) return 'invisalign';
    if (tags.includes('whitening') || category.includes('whitening')) return 'whitening';
    if (tags.includes('wedding')) return 'wedding';
    if (tags.includes('graduation')) return 'graduation';
    if (tags.includes('cost') || tags.includes('price') || tags.includes('financing')) return 'cost';
    // Oral health detection for lifestyle/health posts
    if (tags.includes('oral') || tags.includes('health') || tags.includes('smoking') ||
        tags.includes('alcohol') || tags.includes('gum') || tags.includes('cracked') ||
        tags.includes('floss') || tags.includes('cancer') || tags.includes('marijuana') ||
        title.includes('oral') || title.includes('teeth healthy') || title.includes('gum disease') ||
        category.includes('oral health') || category.includes('prevention')) return 'oral-health';
    return 'general';
  };

  // Get related transformation stories based on blog post context
  const getRelatedTransformationStories = (post: BlogPost): TransformationStory[] => {
    const tags = post.tags.join(' ').toLowerCase();
    const category = post.category.toLowerCase();
    const title = post.title.toLowerCase();

    // Match stories based on context
    const matchedStories: TransformationStory[] = [];

    // Invisalign/orthodontics posts → Nick's Invisalign story
    if (tags.includes('invisalign') || tags.includes('straighten') || tags.includes('orthodontic') || tags.includes('aligner')) {
      const nickStory = transformationStories.find(s => s.slug === 'nick-invisalign');
      if (nickStory) matchedStories.push(nickStory);
    }

    // Anxiety/fear/comfort posts → Anxiety to Ease story
    if (tags.includes('fear') || tags.includes('anxiety') || tags.includes('comfort') || tags.includes('nervous') || title.includes('fear') || category.includes('patient experience')) {
      const anxietyStory = transformationStories.find(s => s.slug === 'anxiety-to-ease');
      if (anxietyStory && !matchedStories.some(s => s.slug === anxietyStory.slug)) {
        matchedStories.push(anxietyStory);
      }
    }

    // Veneer/cosmetic posts → Virginia's story (artistry), Brandon (comfort)
    if (tags.includes('veneer') || tags.includes('cosmetic') || category.includes('cosmetic')) {
      const virginiaStory = transformationStories.find(s => s.slug === 'virginia');
      const brandonStory = transformationStories.find(s => s.slug === 'brandon-gray');
      if (virginiaStory && !matchedStories.some(s => s.slug === virginiaStory.slug)) {
        matchedStories.push(virginiaStory);
      }
      if (brandonStory && !matchedStories.some(s => s.slug === brandonStory.slug) && matchedStories.length < 2) {
        matchedStories.push(brandonStory);
      }
    }

    // Spa/Netflix/experience posts → Taylor, Shannon, Rob stories
    if (tags.includes('netflix') || tags.includes('spa') || tags.includes('experience') || title.includes('spa')) {
      const taylorStory = transformationStories.find(s => s.slug === 'taylor-vasek');
      const shannonStory = transformationStories.find(s => s.slug === 'shannon-langhorne');
      if (taylorStory && !matchedStories.some(s => s.slug === taylorStory.slug)) {
        matchedStories.push(taylorStory);
      }
      if (shannonStory && !matchedStories.some(s => s.slug === shannonStory.slug) && matchedStories.length < 2) {
        matchedStories.push(shannonStory);
      }
    }

    // Shannon for comfort/relaxing posts (expand matching criteria)
    if (tags.includes('relaxing') || tags.includes('calm') || title.includes('comfort') ||
        category.includes('patient experience')) {
      const shannonStory = transformationStories.find(s => s.slug === 'shannon-langhorne');
      if (shannonStory && !matchedStories.some(s => s.slug === shannonStory.slug)) {
        matchedStories.push(shannonStory);
      }
    }

    // Christian for general cosmetic/confidence posts (straightening, everyday confidence)
    if (tags.includes('confidence') || tags.includes('smile') || tags.includes('straighten') ||
        category.includes('cosmetic') || title.includes('transform')) {
      const christianStory = transformationStories.find(s => s.slug === 'christian-fernandez');
      if (christianStory && !matchedStories.some(s => s.slug === christianStory.slug) && matchedStories.length < 2) {
        matchedStories.push(christianStory);
      }
    }

    // General: if no matches yet, show comfort-focused stories (including Christian)
    if (matchedStories.length === 0) {
      const robStory = transformationStories.find(s => s.slug === 'rob-talbert');
      const christianStory = transformationStories.find(s => s.slug === 'christian-fernandez');
      if (robStory) matchedStories.push(robStory);
      if (christianStory && matchedStories.length < 2) matchedStories.push(christianStory);
    }

    return matchedStories.slice(0, 2);
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
      case 'oral-health':
        return [
          {
            title: "Dental Health Checkup",
            href: "/contact",
            description: "Comprehensive oral health evaluation",
            duration: "45 min",
            popularity: 90
          },
          {
            title: "Restorative Options",
            href: "/services#restorative",
            description: "Solutions for damaged or aging teeth",
            popularity: 75
          },
          {
            title: "Preventive Care",
            href: "/services",
            description: "Protect your teeth for life",
            popularity: 85
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
          currentPage={`/blog/${currentPost.slug}/`}
        />
      </section>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid gap-4 mb-12">
        {relatedPosts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}/`} className="group">
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

      {/* Related Transformation Stories */}
      {(() => {
        const relatedStories = getRelatedTransformationStories(currentPost);
        if (relatedStories.length === 0) return null;

        return (
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">Real Patient Stories</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedStories.map((story) => (
                <Link
                  key={story.slug}
                  to={`/transformation-stories/${story.slug}/`}
                  className="group"
                >
                  <Card className="hover:shadow-lg transition-shadow hover:border-gold/50">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 text-gold mb-2">
                        <Video className="h-4 w-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Video Story</span>
                      </div>
                      <h4 className="font-semibold group-hover:text-gold transition-colors line-clamp-1">
                        {story.patientName}'s Story
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {story.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Enhanced Internal Linking */}
      <div className="grid md:grid-cols-2 gap-8">
        <InternalLinkingWidget
          context={getContextFromPost(currentPost)}
          variant="expanded"
          currentPage={`/blog/${currentPost.slug}/`}
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
