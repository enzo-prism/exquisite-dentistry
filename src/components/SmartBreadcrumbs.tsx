import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { normalizeInternalHref } from '@/utils/normalizeInternalHref';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  related?: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
}

interface SmartBreadcrumbsProps {
  items: BreadcrumbItem[];
  showRelated?: boolean;
  className?: string;
}

const SmartBreadcrumbs: React.FC<SmartBreadcrumbsProps> = ({
  items,
  showRelated = false,
  className = ''
}) => {
  const currentItem = items.find(item => item.current);
  const hasRelated = showRelated && currentItem?.related && currentItem.related.length > 0;

  return (
    <div className={`${className}`}>
      {/* Main breadcrumb navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
        <Link
          to="/"
          className="flex items-center hover:text-gold transition-colors"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            
            {item.current ? (
              <span className="text-gray-900 font-medium">
                {item.label}
              </span>
            ) : (
              <Link
                to={normalizeInternalHref(item.href || '/')}
                className="hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Related links section */}
      {hasRelated && (
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Related to {currentItem?.label}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentItem?.related?.map((related, index) => (
              <Link
                key={index}
                to={normalizeInternalHref(related.href)}
                className="block p-3 bg-white rounded-md hover:bg-gold/5 hover:border-gold/20 border border-gray-200 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-900 group-hover:text-gold transition-colors">
                      {related.label}
                    </h5>
                    {related.description && (
                      <p className="text-xs text-gray-600 mt-1">
                        {related.description}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-gold transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartBreadcrumbs;
