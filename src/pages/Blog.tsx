
import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getPublishedPosts, getAllCategories } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';
import BlogListingStructuredData from '@/components/BlogListingStructuredData';
import SEOMetaTags from '@/components/seo/SEOMetaTags';
import PageLoader from '@/components/ui/page-loader';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/use-scroll-animations';
import { usePerformance } from '@/hooks/use-performance';
import { Search, Filter, Sparkles } from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
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

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({
    threshold: 0.2,
    triggerOnce: true,
    animationClass: 'fade-in'
  });

  const { triggerAnimation, getItemProps } = useStaggeredAnimation(
    filteredPosts.length,
    isSlowConnection ? 50 : 100,
    'scale-in'
  );

  useEffect(() => {
    // Simulate loading for smooth entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
      filteredPosts.forEach((_, index) => {
        setTimeout(() => triggerAnimation(index), index * (isSlowConnection ? 50 : 100));
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [filteredPosts, triggerAnimation, isSlowConnection]);

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

      {/* Enhanced Header Section */}
      <header 
        ref={headerRef}
        className="relative py-16 md:py-20 lg:py-24 xl:py-28 overflow-hidden bg-gradient-to-br from-gold/15 via-gold/8 to-background/95"
      >
        {/* Multi-layer Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/25 via-gold/10 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/20"></div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-2xl opacity-40"></div>
        </div>
        
        <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-gold mr-3 animate-pulse" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-gold bg-clip-text text-transparent">
              Dental Blog
            </h1>
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-gold ml-3 animate-pulse" />
          </div>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto font-light">
            Expert insights, cutting-edge techniques, and personalized advice for your perfect smile journey
          </p>
          <div className="mt-6 md:mt-8 text-sm md:text-base text-muted-foreground/80">
            Discover the latest in cosmetic dentistry and oral health
          </div>
        </div>
      </header>

      {/* Enhanced Main Content Section */}
      <main className="py-20 md:py-24 lg:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <PageLoader variant="minimal" message="Loading articles..." />
          ) : (
            <>
              {/* Enhanced Search and Filter Interface */}
              <div className="mb-12 md:mb-16 lg:mb-20 space-y-6 md:space-y-8">
                {/* Glassmorphism Search Bar */}
                <div className="max-w-2xl mx-auto relative">
                  <div className={`relative backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 transition-all duration-300 ${isSearchFocused ? 'scale-105 shadow-2xl ring-2 ring-gold/30' : 'shadow-lg'}`}>
                    <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 md:w-6 md:h-6" />
                    <input
                      type="text"
                      placeholder="Search articles, tips, and insights..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      className="w-full pl-12 md:pl-16 pr-6 py-4 md:py-5 text-base md:text-lg bg-transparent placeholder-muted-foreground/70 text-foreground focus:outline-none rounded-2xl"
                    />
                    {searchTerm && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <button
                          onClick={() => setSearchTerm('')}
                          className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Category Pills */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`group px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium rounded-full transition-all duration-300 min-h-[48px] md:min-h-[52px] touch-manipulation relative overflow-hidden ${
                      selectedCategory === null
                        ? 'bg-gradient-to-r from-gold to-gold/80 text-white shadow-lg scale-105'
                        : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:shadow-md hover:scale-105 hover:text-foreground'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      All Articles
                    </span>
                    {selectedCategory === null && (
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-50"></div>
                    )}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`group px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium rounded-full transition-all duration-300 min-h-[48px] md:min-h-[52px] touch-manipulation relative overflow-hidden ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-gold to-gold/80 text-white shadow-lg scale-105'
                          : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:shadow-md hover:scale-105 hover:text-foreground'
                      }`}
                    >
                      <span className="relative z-10">{category}</span>
                      {selectedCategory === category && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-50"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Blog Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 md:gap-10 lg:gap-12">
                  {filteredPosts.map((post, index) => (
                    <div
                      key={post.id}
                      {...getItemProps(index)}
                      className="transform transition-all duration-500"
                    >
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
                      className="mt-4 px-6 py-2 bg-gold text-white rounded-full hover:bg-gold/90 transition-colors"
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
