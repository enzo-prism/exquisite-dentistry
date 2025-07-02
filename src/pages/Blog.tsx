
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

      {/* Header Section - Mobile First */}
      <div className="relative blog-header-spacing overflow-hidden bg-gradient-to-br from-gold/10 via-gold/5 to-white">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto mobile-optimized-padding text-center">
          <h1 className="heading-lg mb-3 md:mb-4">
            Dental Blog
          </h1>
          <p className="paragraph max-w-2xl lg:max-w-3xl mx-auto">
            Expert insights, tips, and advice for optimal oral health and beautiful smiles
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="section-spacing bg-white">
        <div className="max-w-7xl mx-auto mobile-optimized-padding">
          {/* Search and Filter - Mobile First */}
          <div className="search-filter-spacing space-y-4 md:space-y-6">
            {/* Search Bar */}
            <div className="max-w-sm md:max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input-mobile"
              />
            </div>

            {/* Category Filter */}
            <div className="category-filter-container">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`category-button ${
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

          {/* Blog Posts Grid - Mobile First */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 blog-grid-spacing">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <p className="text-gray-600 text-base md:text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
