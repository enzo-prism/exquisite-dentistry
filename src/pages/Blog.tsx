
import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPublishedPosts, getAllCategories } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';
import BlogListingStructuredData from '@/components/BlogListingStructuredData';
import SEOMetaTags from '@/components/seo/SEOMetaTags';
import PageLoader from '@/components/ui/page-loader';
import { usePerformance } from '@/hooks/use-performance';
import { Search, Filter, Sparkles } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const allPosts = useMemo(() => getPublishedPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const { isSlowConnection } = usePerformance();

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

  // Simplified loading without complex animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filteredPosts]);

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

      {/* Simplified Hero Section */}
      <header className="relative py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/20">
        
        {/* Content Container */}
        <div className="container mx-auto px-4 text-center max-w-4xl">
          
          {/* Title Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Dental Blog
              </h1>
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              Expert insights, cutting-edge techniques, and personalized advice for your perfect smile journey
            </p>
            
            <p className="text-base text-muted-foreground/80">
              Discover the latest in cosmetic dentistry and oral health
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-8">
            {/* Simple Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Simple Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                }`}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                All Articles
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Streamlined Main Content Section */}
      <main className="py-12 md:py-16 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <PageLoader variant="minimal" message="Loading articles..." />
          ) : (
            <>
              {/* Results Counter */}
              <div className="text-center mb-8 md:mb-12">
                <p className="text-muted-foreground">
                  {filteredPosts.length === 1 
                    ? '1 article found' 
                    : `${filteredPosts.length} articles found`}
                  {(searchTerm || selectedCategory) && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory(null);
                      }}
                      className="ml-2 text-primary hover:text-primary/80 underline text-sm"
                    >
                      Clear filters
                    </button>
                  )}
                </p>
              </div>

              {/* Blog Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
                  {filteredPosts.map((post, index) => (
                    <div key={post.id} className="transform transition-all duration-300 hover:scale-105">
                      <BlogCard post={post} featured={index === 0} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 md:py-20 lg:py-24">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground">No articles found</h3>
                    <p className="text-muted-foreground text-base md:text-lg">
                      Try adjusting your search terms or category filters
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory(null);
                      }}
                      className="mt-4 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium rounded-full"
                      aria-label="Clear all search filters"
                    >
                      Clear filters
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
