
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPublishedPosts, getAllCategories } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const allPosts = getPublishedPosts();
  const categories = ['All', ...getAllCategories()];

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

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
          {/* Search and Filter */}
          <div className="mb-8 md:mb-12 space-y-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
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
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
