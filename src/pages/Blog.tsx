
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Button from '@/components/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections',
    excerpt: 'Discover how a single veneer can transform your smile when one tooth needs special attention. Learn about the process, benefits, and what makes single-tooth veneers an ideal cosmetic solution.',
    author: 'Dr. Alexie Aguil',
    date: 'June 19, 2025',
    readTime: '6 min read',
    category: 'Cosmetic Dentistry',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=400&fit=crop',
    slug: 'single-tooth-veneers-perfect-solutions'
  }
];

const categories = ['All', 'Cosmetic Dentistry'];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Dental Blog - Tips, Insights & Expert Advice | Exquisite Dentistry</title>
        <meta name="description" content="Stay informed with our dental blog featuring expert tips, treatment insights, and oral health advice from Dr. Alexie Aguil in Los Angeles." />
        <meta name="keywords" content="dental blog, oral health tips, cosmetic dentistry advice, single tooth veneers, dental care Los Angeles" />
      </Helmet>

      <PageHeader
        title="Dental Blog"
        subtitle="Expert insights, tips, and advice for optimal oral health and beautiful smiles"
        bgImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=600&fit=crop"
      />

      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto mobile-optimized-padding">
          {/* Category Filter */}
          <div className="mb-8 md:mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-gold text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Post */}
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-8">
              <span className="section-title">Featured Article</span>
              <h2 className="section-heading">Latest Insights</h2>
            </div>
            
            <Card className="overflow-hidden shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={400}
                  />
                </div>
                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-medium">
                      {blogPosts[0].category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{blogPosts[0].date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-4">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={16} />
                      <span>{blogPosts[0].author}</span>
                    </div>
                    <Button variant="outline" className="group">
                      Read More
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 md:mt-20">
            <Card className="bg-gradient-to-r from-gray-50 to-gold/5 border-gold/20">
              <CardContent className="p-8 md:p-12 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold mb-4">
                  Stay Updated with Our Latest Articles
                </h3>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and receive expert dental tips, treatment updates, and exclusive insights directly in your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold"
                  />
                  <Button variant="gold" size="lg" className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
