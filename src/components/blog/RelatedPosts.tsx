
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost, getRelatedPosts } from '@/data/blogPosts';

interface RelatedPostsProps {
  currentPost: BlogPost;
  limit?: number;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPost, limit = 3 }) => {
  const relatedPosts = getRelatedPosts(currentPost, limit);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid gap-4">
        {relatedPosts.map((post) => (
          <Link key={post.id} to={`/blog/${post.slug}`} className="group">
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
    </section>
  );
};

export default RelatedPosts;
