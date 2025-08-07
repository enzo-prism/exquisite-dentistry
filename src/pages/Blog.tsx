
import React, { useState, useMemo, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPublishedPosts, getAllCategories } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';
import BlogListingStructuredData from '@/components/BlogListingStructuredData';
import SEOMetaTags from '@/components/seo/SEOMetaTags';
import PageLoader from '@/components/ui/page-loader';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const allPosts = useMemo(() => getPublishedPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);

  const filteredPosts = useMemo(() => {
    return allPosts.filter(post => {
      const matchesCategory = selectedCategory === null || post.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      <BlogListingStructuredData posts={allPosts} />
      
      <SEOMetaTags
        title="Dental Blog - Tips, Insights & Expert Advice | Exquisite Dentistry"
        description="Stay informed with our dental blog featuring expert tips, treatment insights, and oral health advice from Dr. Alexie Aguil in Los Angeles."
        keywords="dental blog, oral health tips, cosmetic dentistry advice, single tooth veneers, dental care Los Angeles"
        canonical="https://exquisitedentistryla.com/blog"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      {/* Header Section - Mobile First */}
      <header className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-gold/10 via-gold/5 to-background">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Dental Blog
          </h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl lg:max-w-3xl mx-auto">
            Expert insights, tips, and advice for optimal oral health and beautiful smiles
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-16 md:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<PageLoader variant="minimal" message="Loading articles..." />}>
            {/* Search and Filter - Mobile First */}
            <div className="mb-8 md:mb-12 space-y-4 md:space-y-6">
              {/* Search Bar */}
              <div className="max-w-sm md:max-w-lg lg:max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 md:px-5 md:py-4 text-base md:text-lg border border-border rounded-lg focus:ring-2 focus:ring-gold focus:border-gold transition-colors placeholder-muted-foreground bg-background text-foreground"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-full transition-all duration-200 min-h-[44px] md:min-h-[48px] touch-manipulation ${
                    selectedCategory === null
                      ? 'bg-gold text-white shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:shadow-sm'
                  }`}
                >
                  All Articles
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium rounded-full transition-all duration-200 min-h-[44px] md:min-h-[48px] touch-manipulation ${
                      selectedCategory === category
                        ? 'bg-gold text-white shadow-md'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:shadow-sm'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid - Mobile First */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-12">
                <p className="text-muted-foreground text-base md:text-lg">No articles found matching your criteria.</p>
              </div>
            )}
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default Blog;
