
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageSEO } from '@/components/seo/PageSEO';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, User, CheckCircle, AlertCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import VeneerCTA from '@/components/VeneerCTA';
import BlogStructuredData from '@/components/BlogStructuredData';

const SingleToothVeneersBlog = () => {
  const blogPost = {
    id: '2',
    title: "Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections",
    excerpt: "Discover how a single veneer can transform your smile when one tooth needs special attention. Learn about the process, benefits, and what makes single-tooth veneers an ideal cosmetic solution.",
    content: "single-tooth-veneers",
    author: "Dr. Alexie Aguil",
    date: "2025-06-19",
    readTime: "6 min read",
    category: "Cosmetic Dentistry",
    tags: ["single tooth veneers", "porcelain veneers", "cosmetic dentistry", "smile makeover"],
    slug: "single-tooth-veneers-perfect-solutions",
    featuredImage: "https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png",
    published: true
  };

  return (
    <>
      <BlogStructuredData post={blogPost} />
      <PageSEO
        title="Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections | Exquisite Dentistry"
        description="Expert guide to single tooth veneers by Dr. Alexie Aguil. Learn when single tooth veneers are the right choice and what to expect from the treatment."
        keywords="single tooth veneers, porcelain veneers, cosmetic dentistry, smile makeover, dental veneers Los Angeles, tooth restoration"
        path="/single-tooth-veneers-guide"
        ogType="article"
      />

      {/* Header */}
      <div className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-gold/15 via-gold/8 to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/25 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-6">
              <ArrowLeft size={20} />
              Back to Blog
            </Link>
            
            {/* Redesigned metadata section */}
            <div className="mb-8">
              {/* Category badge */}
              <div className="mb-4">
                <Badge variant="secondary" className="bg-gold/15 text-gold border-gold/20 hover:bg-gold/20">
                  Cosmetic Dentistry
                </Badge>
              </div>
              
              {/* Metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-gold flex-shrink-0" />
                  <span>June 19, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gold flex-shrink-0" />
                  <span>6 min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gold flex-shrink-0" />
                  <span>Dr. Alexie Aguil</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-black leading-tight">
              Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              When just one tooth is affecting your confidence, a single veneer can provide the perfect solution. 
              Discover how this precision approach to cosmetic dentistry can transform your smile.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Hero Visual */}
          <div className="mb-12 bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 rounded-2xl p-8 md:p-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                <User size={40} className="text-gold" />
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                Transform One Tooth, Transform Your Smile
              </h2>
              <p className="text-gray-600 text-lg">
                Single tooth veneers offer precision cosmetic enhancement for individual imperfections
              </p>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Not every smile makeover requires a complete transformation. Sometimes, a single problematic tooth 
              can be the only thing standing between you and the confident smile you've always wanted. Single tooth 
              veneers represent a targeted, effective solution that addresses individual imperfections while 
              maintaining the natural beauty of your surrounding teeth.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              At Exquisite Dentistry, Dr. Alexie Aguil specializes in creating custom single tooth veneers that 
              seamlessly blend with your natural smile, providing results that are both stunning and undetectable.
            </p>
            
            <VeneerCTA variant="inline" />
          </div>

          {/* What Are Single Tooth Veneers */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
              What Are Single Tooth Veneers?
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                A single tooth veneer is a thin, custom-made shell of porcelain or composite resin that is 
                bonded to the front surface of one specific tooth. This minimally invasive procedure can 
                dramatically improve the appearance of a tooth that is:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>Discolored or stained beyond traditional whitening</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>Chipped, cracked, or worn down</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>Misshapen or irregularly sized</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>Slightly misaligned or gapped</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
              The Benefits of Single Tooth Veneers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <Star size={24} className="text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold">Precision Treatment</h3>
                  </div>
                  <p className="text-gray-600">
                    Target only the tooth that needs attention while preserving your natural teeth
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <CheckCircle size={24} className="text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold">Cost-Effective</h3>
                  </div>
                  <p className="text-gray-600">
                    More affordable than full smile makeovers when only one tooth needs correction
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <Clock size={24} className="text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold">Quick Results</h3>
                  </div>
                  <p className="text-gray-600">
                    Typically completed in just 2-3 appointments with immediate visual improvement
                  </p>
                </CardContent>
              </Card>

              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <User size={24} className="text-gold" />
                    </div>
                    <h3 className="text-xl font-semibold">Natural Appearance</h3>
                  </div>
                  <p className="text-gray-600">
                    Custom-matched to blend seamlessly with your existing teeth
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <VeneerCTA variant="banner" />

          {/* The Process */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
              The Single Tooth Veneer Process
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
                  <p className="text-gray-700">
                    Dr. Aguil examines your tooth and discusses your goals, taking detailed impressions 
                    and photographs to plan your treatment.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Preparation</h3>
                  <p className="text-gray-700">
                    A minimal amount of enamel is gently removed from the tooth surface to accommodate 
                    the veneer thickness.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Custom Creation</h3>
                  <p className="text-gray-700">
                    Your veneer is crafted in our partner lab using high-quality porcelain, 
                    precisely matched to your natural teeth.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gold text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Final Placement</h3>
                  <p className="text-gray-700">
                    The veneer is carefully bonded to your tooth using advanced adhesive techniques, 
                    then polished to perfection.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ideal Candidates */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
              Are You an Ideal Candidate?
            </h2>
            <div className="bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl p-6 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Single tooth veneers work best for patients who have:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">One or few problematic teeth</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Good overall oral health</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Sufficient tooth enamel</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Realistic expectations</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">No severe teeth grinding</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Commitment to oral hygiene</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Care Instructions */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
              Caring for Your Single Tooth Veneer
            </h2>
            <Card className="border-gold/20">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-3 mb-6">
                  <AlertCircle size={24} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Maintenance Tips</h3>
                    <p className="text-gray-700 mb-4">
                      With proper care, your single tooth veneer can last 10-15 years or more:
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li>• Brush and floss regularly with non-abrasive toothpaste</li>
                  <li>• Avoid biting hard objects like ice or fingernails</li>
                  <li>• Wear a night guard if you grind your teeth</li>
                  <li>• Schedule regular dental checkups and cleanings</li>
                  <li>• Limit staining foods and beverages when possible</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-gold/15 via-gold/10 to-gold/15 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              If you have a single tooth that's affecting your confidence, a custom veneer might be 
              the perfect solution. Schedule a consultation with Dr. Alexie Aguil to explore your options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg" className="text-lg px-8 py-4">
                <a 
                  href="https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Schedule Consultation
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <a 
                  href="https://exquisiteveneersla.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Explore Veneer Options
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4">
                <Link to="/contact" className="flex items-center justify-center">
                  Contact Our Dental Team
                </Link>
              </Button>
            </div>
          </section>

        </div>
      </article>
    </>
  );
};

export default SingleToothVeneersBlog;
