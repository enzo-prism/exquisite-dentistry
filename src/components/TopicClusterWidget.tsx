import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Camera, Calendar, FileText, Sparkles } from 'lucide-react';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

interface ClusterItem {
  title: string;
  href: string;
  description: string;
  type: 'service' | 'blog' | 'gallery' | 'testimonial' | 'consultation' | 'special';
  featured?: boolean;
}

interface TopicClusterWidgetProps {
  title: string;
  description: string;
  centralHub: ClusterItem;
  spokes: ClusterItem[];
  className?: string;
}

const TopicClusterWidget: React.FC<TopicClusterWidgetProps> = ({
  title,
  description,
  centralHub,
  spokes,
  className = ''
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Star className="w-4 h-4 text-gold" />;
      case 'blog':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'gallery':
        return <Camera className="w-4 h-4 text-purple-600" />;
      case 'testimonial':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'consultation':
        return <Calendar className="w-4 h-4 text-green-600" />;
      case 'special':
        return <Sparkles className="w-4 h-4 text-pink-500" />;
      default:
        return <ArrowRight className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'border-gold/20 bg-gold/5';
      case 'blog': return 'border-blue-200 bg-blue-50';
      case 'gallery': return 'border-purple-200 bg-purple-50';
      case 'testimonial': return 'border-red-200 bg-red-50';
      case 'consultation': return 'border-green-200 bg-green-50';
      case 'special': return 'border-pink-200 bg-pink-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>

      {/* Central Hub */}
      <div className="mb-6">
        <Link
          to={normalizeInternalHref(centralHub.href)}
          className="block p-4 bg-gradient-to-r from-gold/10 to-gold/20 rounded-lg border-2 border-gold/30 hover:border-gold/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {getTypeIcon(centralHub.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 group-hover:text-gold transition-colors">
                {centralHub.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {centralHub.description}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
          </div>
        </Link>
      </div>

      {/* Spokes */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Related Resources</h4>
        {spokes.map((spoke, index) => (
          <Link
            key={index}
            to={normalizeInternalHref(spoke.href)}
            className={`block p-3 rounded-md border transition-all hover:shadow-sm group ${getTypeColor(spoke.type)}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getTypeIcon(spoke.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium text-gray-900 group-hover:text-gold transition-colors text-sm">
                    {spoke.title}
                  </h5>
                  {spoke.featured && (
                    <span className="text-xs bg-gold text-white px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {spoke.description}
                </p>
              </div>
              <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopicClusterWidget;
