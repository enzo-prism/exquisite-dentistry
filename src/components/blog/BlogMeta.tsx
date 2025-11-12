
import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/data/blogTypes';

interface BlogMetaProps {
  post: BlogPost;
  showTags?: boolean;
}

const BlogMeta: React.FC<BlogMetaProps> = ({ post, showTags = false }) => {
  return (
    <div className="space-y-4">
      {/* Category and metadata */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        <Badge variant="secondary" className="bg-gold/15 text-gold border-gold/20 hover:bg-gold/20">
          {post.category}
        </Badge>
        <div className="flex items-center gap-1">
          <Calendar size={16} className="text-gold" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-gold" />
          <span>{post.readTime}</span>
        </div>
        <div className="flex items-center gap-1">
          <User size={16} className="text-gold" />
          <span>{post.author}</span>
        </div>
      </div>

      {/* Tags */}
      {showTags && post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-gold/30 text-gold/80">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogMeta;
