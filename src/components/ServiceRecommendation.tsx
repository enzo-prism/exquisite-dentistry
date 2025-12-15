import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Clock, DollarSign } from 'lucide-react';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

interface ServiceItem {
  title: string;
  href: string;
  description: string;
  duration?: string;
  popularity?: number;
  priceRange?: string;
  combination?: boolean;
}

interface ServiceRecommendationProps {
  currentService: string;
  recommendations: ServiceItem[];
  title?: string;
  context?: 'complement' | 'alternative' | 'upgrade' | 'combination';
  className?: string;
}

const ServiceRecommendation: React.FC<ServiceRecommendationProps> = ({
  currentService,
  recommendations,
  title,
  context = 'complement',
  className = ''
}) => {
  const getContextTitle = () => {
    if (title) return title;
    
    switch (context) {
      case 'complement':
        return 'Complete Your Transformation';
      case 'alternative':
        return 'Alternative Options';
      case 'upgrade':
        return 'Enhanced Treatments';
      case 'combination':
        return 'Popular Combinations';
      default:
        return 'Patients Also Consider';
    }
  };

  const getContextDescription = () => {
    switch (context) {
      case 'complement':
        return 'Enhance your results with these complementary treatments';
      case 'alternative':
        return 'Explore different approaches to achieve your goals';
      case 'upgrade':
        return 'Premium options for enhanced results';
      case 'combination':
        return 'Popular treatment packages for comprehensive results';
      default:
        return 'Recommended treatments based on your interest';
    }
  };

  return (
    <div className={`bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {getContextTitle()}
        </h3>
        <p className="text-sm text-gray-600">
          {getContextDescription()}
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((service, index) => (
          <Link
            key={index}
            to={normalizeInternalHref(service.href)}
            className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-gold/50 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-gray-900 group-hover:text-gold transition-colors">
                    {service.title}
                  </h4>
                  {service.combination && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Popular Combo
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {service.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  {service.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </div>
                  )}
                  
                  {service.popularity && (
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{service.popularity}% choose this</span>
                    </div>
                  )}
                  
                  {service.priceRange && (
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>{service.priceRange}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link
          to="/contact/"
          className="inline-flex items-center text-sm text-gold hover:text-gold/80 transition-colors"
        >
          Discuss combination options with Dr. Aguil
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceRecommendation;
