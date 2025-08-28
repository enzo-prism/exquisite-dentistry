import React from 'react';
import { ExternalLink, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VeneerCTAProps {
  variant?: 'inline' | 'banner' | 'prominent';
  className?: string;
}

const VeneerCTA: React.FC<VeneerCTAProps> = ({ variant = 'inline', className = '' }) => {
  const veneerSiteUrl = 'https://exquisiteveneersla.com/';

  if (variant === 'inline') {
    return (
      <div className={`my-6 p-4 bg-gradient-to-r from-gold/10 to-gold/5 rounded-lg border border-gold/20 ${className}`}>
        <div className="flex items-center gap-3">
          <Star size={20} className="text-gold flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700 mb-2">
              Want to learn more about our veneer expertise?
            </p>
            <a 
              href={veneerSiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors text-sm font-medium"
            >
              Visit Exquisite Veneers LA
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <Card className={`my-8 border-gold/30 bg-gradient-to-r from-gold/15 via-gold/10 to-gold/5 ${className}`}>
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gold/20 rounded-full flex items-center justify-center">
              <Star size={32} className="text-gold" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black">
              Explore Our Veneer Expertise
            </h3>
            <p className="text-gray-600 mb-4">
              Discover our complete veneer gallery, detailed pricing, and exclusive content on our dedicated veneer site.
            </p>
            <a href={veneerSiteUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10">
                Visit Exquisite Veneers LA
                <ExternalLink size={16} className="ml-2" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Prominent variant
  return (
    <div className={`my-12 bg-gradient-to-br from-gold/20 via-gold/15 to-gold/10 rounded-2xl p-8 md:p-12 text-center ${className}`}>
      <div className="max-w-2xl mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
          <Star size={40} className="text-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
          Ready to Transform Your Smile with Veneers?
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Explore our comprehensive veneer gallery, detailed treatment options, and exclusive pricing on our dedicated veneer site.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={veneerSiteUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="default">
              Explore Veneer Options
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </a>
          <a href={veneerSiteUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">
              View Veneer Gallery
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default VeneerCTA;