import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getPublishedPosts, type BlogPost } from '@/data/blogPosts';

interface RelatedArticlesProps {
  /** Tags to match against blog posts */
  tags?: string[];
  /** Category to filter by */
  category?: string;
  /** Maximum number of articles to display */
  limit?: number;
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** Current page URL to exclude from results */
  currentPage?: string;
}

/**
 * Displays a grid of related blog articles based on tags or category.
 * Used on service pages to provide internal links to relevant blog content.
 */
const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  tags = [],
  category,
  limit = 4,
  title = 'Related Articles',
  subtitle = 'Learn more about this treatment from our blog',
  currentPage
}) => {
  const allPosts = getPublishedPosts();

  // Filter posts by tags or category
  const matchingPosts = allPosts.filter(post => {
    // Exclude current page if provided
    if (currentPage && `/blog/${post.slug}` === currentPage) {
      return false;
    }

    // Match by category if provided
    if (category && post.category.toLowerCase() === category.toLowerCase()) {
      return true;
    }

    // Match by tags
    if (tags.length > 0) {
      const postTagsLower = post.tags.map(t => t.toLowerCase());
      const searchTagsLower = tags.map(t => t.toLowerCase());
      return searchTagsLower.some(tag =>
        postTagsLower.some(postTag => postTag.includes(tag) || tag.includes(postTag))
      );
    }

    return false;
  });

  // Score and sort by relevance (number of matching tags)
  const scoredPosts = matchingPosts.map(post => {
    const postTagsLower = post.tags.map(t => t.toLowerCase());
    const searchTagsLower = tags.map(t => t.toLowerCase());
    const tagMatchCount = searchTagsLower.filter(tag =>
      postTagsLower.some(postTag => postTag.includes(tag) || tag.includes(postTag))
    ).length;
    const categoryMatch = category && post.category.toLowerCase() === category.toLowerCase() ? 2 : 0;
    return { post, score: tagMatchCount + categoryMatch };
  });

  // Sort by score descending, then by date descending
  scoredPosts.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  const articlesToShow = scoredPosts.slice(0, limit).map(item => item.post);

  if (articlesToShow.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articlesToShow.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-gold/50">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 text-gold mb-3">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs font-medium uppercase tracking-wide">{post.category}</span>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-gold transition-colors line-clamp-2 text-sm">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
          >
            View All Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;
