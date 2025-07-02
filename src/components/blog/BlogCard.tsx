
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
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-l-4 border-l-gold">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20">
            {post.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>
        
        <h3 className={`font-semibold mb-4 line-clamp-2 text-gray-900 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-base">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <User size={16} />
            <span>{post.author}</span>
          </div>
          <Link to={`/blog/${post.slug}`}>
            <Button variant="outline" size="sm" className="group">
              Read More
              <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
