
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/Button';
import { BlogPost } from '@/data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-gold h-full flex flex-col">
      <CardContent className="blog-card-padding flex-1 flex flex-col">
        <div className="flex flex-wrap items-center gap-2 md:gap-3 blog-meta-mobile">
          <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20 text-xs">
            {post.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Calendar size={12} className="md:w-4 md:h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} className="md:w-4 md:h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className={`blog-card-title ${featured ? 'md:text-2xl' : ''}`}>
          {post.title}
        </h3>
        
        <p className="blog-card-excerpt flex-1">
          {post.excerpt}
        </p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
            <User size={14} className="md:w-4 md:h-4" />
            <span>{post.author}</span>
          </div>
          <Link to={`/blog/${post.slug}`} className="self-start sm:self-auto">
            <Button variant="outline" size="sm" className="group text-xs md:text-sm min-h-[44px] md:min-h-auto">
              Read More
              <ArrowRight size={12} className="md:w-4 md:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
