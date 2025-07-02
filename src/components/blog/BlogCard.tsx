
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/Button';
import OptimizedImage from '@/components/OptimizedImage';
import { BlogPost } from '@/data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-48 bg-gradient-to-br from-gold/30 via-gold/10 to-gold/5">
        {post.featuredImage ? (
          <OptimizedImage
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
            objectFit="cover"
            objectPosition="center"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-t from-gold/40 via-transparent to-gold/20">
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="text-center p-6">
                <div className="w-14 h-14 mx-auto mb-3 bg-white/80 rounded-full flex items-center justify-center">
                  <User size={28} className="text-gold" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {post.title.includes('Front 4') ? 'Front 4 Veneers' : 
                   post.title.includes('Single') ? 'Single Tooth Veneers' : 
                   'Dental Insights'}
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
      <CardContent className="p-6">
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
        <h3 className={`font-semibold mb-3 line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
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
