
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User, Sparkles, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={`group relative overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-gold/40 bg-card/95 backdrop-blur-sm transform hover:-translate-y-1 hover:scale-[1.01] h-full flex flex-col ${featured ? 'ring-2 ring-gold/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge - Repositioned to avoid content conflicts */}
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-gold to-gold/80 text-white shadow-lg border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}
      
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="aspect-[16/10] w-full overflow-hidden bg-muted relative">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* View Icon on Hover - Positioned to avoid featured badge conflict */}
          <div className={`absolute ${featured ? 'top-4 left-4' : 'top-4 right-4'} p-2 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <Eye className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      <CardContent className="p-4 md:p-6 space-y-4 relative flex-1 flex flex-col">
        {/* Enhanced Meta Information */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Badge 
            variant="outline" 
            className="text-xs font-medium bg-muted/50 border-muted-foreground/20 text-muted-foreground hover:bg-gold/10 hover:border-gold/30 hover:text-gold transition-all duration-200"
          >
            {post.category}
          </Badge>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span className="font-medium">{post.date}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span className="font-medium">{post.readTime}</span>
          </div>
        </div>

        {/* Enhanced Title */}
        <h3 className={`text-lg md:text-xl font-bold text-card-foreground transition-all duration-300 leading-tight blog-card-title ${featured ? 'xl:text-2xl' : ''}`}>
          <span className="bg-gradient-to-r from-foreground to-foreground group-hover:from-gold group-hover:to-gold/80 bg-clip-text group-hover:text-transparent transition-all duration-300">
            {post.title}
          </span>
        </h3>

        {/* Enhanced Excerpt */}
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base flex-grow blog-card-excerpt">
          {post.excerpt}
        </p>

        {/* Tags Preview */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs bg-muted/60 text-muted-foreground rounded-full hover:bg-gold/10 hover:text-gold transition-colors duration-200"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-3 py-1 text-xs text-muted-foreground">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Enhanced Author and CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gold" />
            </div>
            <div>
              <span className="text-sm font-medium text-foreground">{post.author}</span>
              <div className="text-xs text-muted-foreground">Dental Expert</div>
            </div>
          </div>
          
          <Link to={`/blog/${post.slug}`} className="group/link">
            <Button 
              variant="outline" 
              size="sm" 
              className="group/btn bg-background/50 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[44px] md:min-h-auto"
            >
              <span className="font-medium">Read More</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
