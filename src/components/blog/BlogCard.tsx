
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, User, Sparkles, Eye, FileText } from 'lucide-react';
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
    <Link to={`/blog/${post.slug}`} className="block h-full group">
      <Card 
        className={`relative overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-gold/40 bg-card/95 backdrop-blur-sm transform group-hover:-translate-y-1 group-hover:scale-[1.01] h-full flex flex-col ${featured ? 'ring-2 ring-gold/20' : ''}`}
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
      
      {/* Enhanced Header with Category-Based Gradient */}
      <div className="aspect-[16/10] w-full overflow-hidden relative bg-gradient-to-br from-gold/20 via-gold/10 to-background border-b border-border/30">
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 bg-gold/10 rounded-full backdrop-blur-sm border border-gold/20">
            <FileText className="w-8 h-8 text-gold" />
          </div>
        </div>
        
        {/* Category indicator in corner */}
        <div className="absolute bottom-4 left-4">
          <Badge className="bg-gold/20 text-gold border-gold/30 backdrop-blur-sm">
            {post.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 md:p-8 space-y-5 relative flex-1 flex flex-col">
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
            <span className="font-medium">{post.readTime}</span>
          </div>
        </div>

        {/* Enhanced Title */}
        <h3 className={`text-xl md:text-2xl font-bold text-card-foreground transition-all duration-300 leading-tight blog-card-title ${featured ? 'xl:text-3xl' : ''}`}>
          <span className="bg-gradient-to-r from-foreground to-foreground group-hover:from-gold group-hover:to-gold/80 bg-clip-text group-hover:text-transparent transition-all duration-300">
            {post.title}
          </span>
        </h3>

        {/* Enhanced Excerpt */}
        <p className="text-muted-foreground leading-relaxed text-base md:text-lg flex-grow blog-card-excerpt">
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
          
          <Button 
            variant="outline" 
            size="sm" 
            className="group/btn bg-background/50 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 hover:shadow-lg hover:scale-105 min-h-[44px] md:min-h-auto"
          >
            <span className="font-medium">Read More</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
        </div>
      </CardContent>
      </Card>
    </Link>
  );
};

export default BlogCard;
