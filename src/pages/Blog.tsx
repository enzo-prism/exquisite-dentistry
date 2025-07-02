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
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Choosing Veneers for the Front 4 Teeth: Complete Smile Transformation Guide',
    excerpt: 'Learn everything about getting porcelain veneers for your front 4 teeth. Discover costs, benefits, process, and why treating the smile zone together delivers the best results.',
    author: 'Dr. Alexie Aguil',
    date: 'December 15, 2024',
    readTime: '15 min read',
    category: 'Cosmetic Dentistry',
    slug: '/choosing-veneers-for-the-front-4-teeth'
  },
  {
    id: '2',
    title: 'Single Tooth Veneers: Perfect Solutions for Individual Smile Imperfections',
    excerpt: 'Discover how a single veneer can transform your smile when one tooth needs special attention. Learn about the process, benefits, and what makes single-tooth veneers an ideal cosmetic solution.',
    author: 'Dr. Alexie Aguil',
    date: 'June 19, 2025',
    readTime: '6 min read',
    category: 'Cosmetic Dentistry',
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

      <div className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-gold/10 via-gold/5 to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-black">
            Dental Blog
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
            Expert insights, tips, and advice for optimal oral health and beautiful smiles
          </p>
        </div>
      </div>

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

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-gold/30 via-gold/10 to-gold/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-gold/40 via-transparent to-gold/20"></div>
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-14 h-14 mx-auto mb-3 bg-white/80 rounded-full flex items-center justify-center">
                        <User size={28} className="text-gold" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {post.title.includes('Front 4') ? 'Front 4 Veneers' : 'Single Tooth Veneers'}
                      </h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <Link to={post.slug.startsWith('/') ? post.slug : `/blog/${post.slug}`}>
                      <Button variant="outline" size="sm" className="group">
                        Read More
                        <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
