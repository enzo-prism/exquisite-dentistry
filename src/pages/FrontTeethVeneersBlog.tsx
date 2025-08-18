
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { ArrowRight, Check, Sparkles, Calendar, Eye, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import VeneerCTA from '@/components/VeneerCTA';
import BlogStructuredData from '@/components/BlogStructuredData';
import ArticleStructuredData from '@/components/seo/ArticleStructuredData';
import SEOMetaTags from '@/components/seo/SEOMetaTags';
import { PageSEO } from '@/components/seo/PageSEO';

const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const FrontTeethVeneersBlog = () => {
  const blogPost = {
    id: '1',
    title: "Choosing Veneers for the Front 4 Teeth",
    excerpt: "Your Complete Guide to Transforming Your Smile Zone - Learn everything about getting porcelain veneers for your front 4 teeth. Discover costs, benefits, process, and why treating the smile zone together delivers the best results.",
    content: "front-4-veneers",
    author: "Dr. Alexie Aguil",
    date: "2024-12-15",
    readTime: "15 min read",
    category: "Cosmetic Dentistry",
    tags: ["veneers", "front teeth", "smile zone", "porcelain veneers", "cosmetic dentistry"],
    slug: "choosing-veneers-for-the-front-4-teeth",
    featuredImage: "https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png",
    published: true
  };
  const benefits = [
    "Transform your smile center with perfectly matched veneers",
    "Correct chips, cracks, gaps, and discoloration simultaneously",
    "Achieve symmetrical and proportionate front teeth",
    "Create a natural-looking smile line",
    "Long-lasting results with proper care (15-20 years)",
    "Minimal tooth preparation required"
  ];

  const considerations = [
    {
      icon: <Eye size={24} />,
      title: "Aesthetic Harmony",
      description: "Your front 4 teeth are the focal point of your smile. Veneers ensure they complement each other perfectly in shape, size, and color."
    },
    {
      icon: <Shield size={24} />,
      title: "Comprehensive Coverage",
      description: "Treating all 4 front teeth together prevents color mismatching and ensures uniform appearance as teeth naturally age."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Smile Design",
      description: "Custom design allows for subtle variations that look natural while achieving your ideal smile aesthetics."
    }
  ];

  const processSteps = [
    {
      step: "1",
      title: "Consultation & Smile Design",
      description: "Digital smile design to preview your new smile and discuss your aesthetic goals"
    },
    {
      step: "2",
      title: "Preparation",
      description: "Minimal enamel removal (0.5mm) to create space for ultra-thin veneers"
    },
    {
      step: "3",
      title: "Impressions",
      description: "Digital impressions taken for precise veneer fabrication"
    },
    {
      step: "4",
      title: "Temporary Veneers",
      description: "Beautiful temporaries allow you to 'test drive' your new smile"
    },
    {
      step: "5",
      title: "Final Placement",
      description: "Custom veneers bonded permanently with color-matched cement"
    }
  ];

  return (
    <>
      <PageSEO 
        title="Choosing Veneers for the Front 4 Teeth | Complete Smile Transformation Guide"
        description="Learn everything about getting porcelain veneers for your front 4 teeth. Discover costs, benefits, process, and why treating the smile zone together delivers the best results. Expert insights from Dr. Alexie Aguil."
        keywords="veneers front 4 teeth, front teeth veneers, 4 veneers cost, smile zone veneers, upper front teeth veneers, porcelain veneers Los Angeles"
        path="/blog/front-teeth-veneers-complete-guide"
        ogType="article"
        articleAuthor="Dr. Alexie Aguil"
        articlePublishedTime="2024-12-15T00:00:00Z"
      />
      <BlogStructuredData post={blogPost} />

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choosing Veneers for the Front 4 Teeth
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your Complete Guide to Transforming Your Smile Zone
          </p>
        </div>
      </section>

      <article className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Author Info */}
          <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Written by</p>
              <p className="font-semibold">Dr. Alexie Aguil</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  December 15, 2024
                </span>
                <span>15 min read</span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl leading-relaxed">
              When it comes to creating a stunning smile, your front four teeth—the central and lateral incisors—play the starring role. These teeth are the focal point of your smile and the first thing people notice when you speak or laugh. If you're considering porcelain veneers for these essential teeth, you're making a decision that can dramatically transform your appearance and boost your confidence.
            </p>
            
            <VeneerCTA variant="inline" />
          </div>

          {/* Why Front 4 Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Focus on the Front 4 Teeth?</h2>
            <div className="bg-gray-50 p-8 rounded-lg mb-8">
              <p className="text-lg mb-4">
                Your upper front teeth, often called the "smile zone" or "aesthetic zone," are visible in virtually every facial expression. Research shows that when people look at your face, their eyes naturally focus on this area within the first few seconds of interaction.
              </p>
              <p className="text-lg">
                By addressing all four front teeth together, you ensure complete harmony in your smile. This approach prevents the common mistake of having one or two teeth that don't match the others in color, shape, or size.
              </p>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Benefits of Getting Veneers for Your Front 4 Teeth</h2>
            <div className="grid gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <Check className="text-gold mt-1 flex-shrink-0" size={20} />
                  <p className="ml-3 text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Key Considerations */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Key Considerations for Front Teeth Veneers</h2>
            <div className="grid gap-6">
              {considerations.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold flex-shrink-0">
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Cost Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Investment in Your Smile</h2>
            <div className="bg-gold/10 p-8 rounded-lg">
              <p className="text-lg mb-4">
                The cost of veneers for your front 4 teeth varies based on several factors including the complexity of your case, the type of veneers chosen, and the expertise of your cosmetic dentist. At Exquisite Dentistry, we offer:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="text-gold mt-1 flex-shrink-0" size={20} />
                  <span className="ml-3">Transparent pricing with detailed treatment plans</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-gold mt-1 flex-shrink-0" size={20} />
                  <span className="ml-3">Flexible payment options and financing plans</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-gold mt-1 flex-shrink-0" size={20} />
                  <span className="ml-3">Complimentary consultation to discuss your investment</span>
                </li>
              </ul>
            </div>
          </section>

          <VeneerCTA variant="banner" />

          {/* Process Timeline */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">The Process: From Consultation to Perfect Smile</h2>
            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <p className="font-semibold mb-2">Timeline:</p>
              <p>The entire process typically takes 2-3 weeks with just 2-3 appointments.</p>
            </div>
          </section>

          {/* Who is a Good Candidate */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Are You a Good Candidate?</h2>
            <p className="text-lg mb-6">
              Veneers for your front 4 teeth might be perfect for you if you have:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">Cosmetic Concerns:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Discolored or stained teeth</li>
                  <li>• Chips or minor fractures</li>
                  <li>• Gaps between teeth</li>
                  <li>• Uneven or worn teeth</li>
                  <li>• Minor misalignment</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-3">Good Oral Health:</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Healthy gums</li>
                  <li>• No active decay</li>
                  <li>• Sufficient enamel</li>
                  <li>• Good oral hygiene habits</li>
                  <li>• Realistic expectations</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Maintenance Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Caring for Your New Veneers</h2>
            <p className="text-lg mb-6">
              With proper care, your front 4 veneers can last 15-20 years or more. Here's how to protect your investment:
            </p>
            <div className="bg-gray-50 p-8 rounded-lg">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>Brush gently twice daily with non-abrasive toothpaste</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>Floss daily to maintain gum health</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>Visit us every 6 months for professional cleanings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>Wear a nightguard if you grind your teeth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-3">•</span>
                  <span>Avoid biting hard objects or using teeth as tools</span>
                </li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Why not just get veneers on 2 teeth?</h3>
                <p className="text-gray-600">
                  While it's possible to veneer just 2 teeth, treating all 4 front teeth ensures color matching and symmetry. Your natural teeth may change color over time, but veneers won't, potentially creating a mismatch.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Will my veneers look fake?</h3>
                <p className="text-gray-600">
                  Modern porcelain veneers are incredibly lifelike. At Exquisite Dentistry, we customize the shape, size, and shade to complement your facial features and create a natural-looking smile.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How long will I be without teeth?</h3>
                <p className="text-gray-600">
                  You'll never be without teeth! We provide beautiful temporary veneers that you'll wear while your permanent veneers are being crafted.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-12 bg-black text-white rounded-lg">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Smile?
            </h2>
            <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
              Schedule your consultation today and discover how veneers for your front 4 teeth can give you the confident, beautiful smile you deserve.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  Book Free Consultation
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </a>
              <a href="https://exquisiteveneersla.com/" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Explore Veneer Gallery
                </Button>
              </a>
              <Link to="/smile-gallery">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  View Smile Gallery
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Or call us at (310) 393-5133
            </p>
          </section>

          {/* Related Articles */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid gap-4">
              <Link to="/blog/single-tooth-veneers-perfect-solutions" className="group">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold group-hover:text-gold transition-colors">
                      Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections
                    </h3>
                    <p className="text-gray-600 mt-2">Learn about single veneer options →</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
};

export default FrontTeethVeneersBlog;
