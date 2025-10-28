
import React, { useState, useMemo, useEffect } from 'react';
import { getPublishedPosts, getAllCategories } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';
import BlogListingStructuredData from '@/components/BlogListingStructuredData';
import PageSEO from '@/components/seo/PageSEO';
import PageLoader from '@/components/ui/page-loader';
import VideoHero from '@/components/VideoHero';
import { usePerformance } from '@/hooks/use-performance';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import MasterStructuredData from '@/components/seo/MasterStructuredData';

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

  const { seoTitle, seoDescription } = useMemo(() => {
    const resultCountText = filteredPosts.length === 1 ? '1 article' : `${filteredPosts.length} articles`;
    if (searchTerm.trim()) {
      return {
        seoTitle: `Search results for "${searchTerm}" | Exquisite Dentistry Blog`,
        seoDescription: `Review ${resultCountText} matching "${searchTerm}" from Exquisite Dentistry’s Los Angeles cosmetic dental experts covering treatments, technology, and patient care.`
      };
    }

    if (selectedCategory) {
      return {
        seoTitle: `${selectedCategory} Articles & Guides | Exquisite Dentistry Blog`,
        seoDescription: `Explore ${resultCountText} on ${selectedCategory.toLowerCase()} from Dr. Aguil’s Los Angeles cosmetic dentistry team, featuring expert techniques and patient insights.`
      };
    }

    return {
      seoTitle: 'Los Angeles Cosmetic Dentistry Blog | Expert Insights & Techniques',
      seoDescription: 'Stay current with Exquisite Dentistry’s Los Angeles cosmetic dental insights. Discover veneers, whitening breakthroughs, patient stories, and advanced oral health techniques.'
    };
  }, [filteredPosts.length, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <MasterStructuredData includeBusiness={true} includeWebsite={true} />
      <BlogListingStructuredData posts={allPosts} />
      
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        keywords="dental blog, cosmetic dentistry, oral health, dental tips, Dr. Alexie Aguil, dental expert insights, Beverly Hills dentist"
        path="/blog"
        ogImage="https://exquisitedentistryla.com/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />

      {/* Hero Section */}
      <VideoHero
        title={<>Expert Dental Insights & <span className="text-primary">Patient Education</span></>}
        subtitle="Stay informed with the latest in cosmetic dentistry, oral health innovations, and expert guidance from Dr. Alexie Aguil and our Los Angeles dental team near Beverly Hills."
        height="medium"
        badgeText="EXPERT INSIGHTS"
        scrollIndicator={true}
      />

      {/* Search and Filter Section */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-lg text-muted-foreground mb-8">
              Access exclusive insights from Los Angeles' leading cosmetic dentist serving Beverly Hills, featuring advanced treatment techniques, patient success stories, and the latest innovations in dental care.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-8">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-12 text-base border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Enhanced Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2.5">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "group relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-out",
                  "border-2 transform active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background",
                  selectedCategory === null 
                    ? [
                        "bg-gradient-to-r from-primary via-primary to-primary/90",
                        "text-white blog-filter-selected-text border-primary",
                        "shadow-lg shadow-primary/25",
                        "hover:shadow-xl hover:shadow-primary/30 hover:scale-105",
                        "[text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]",
                        "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                      ]
                    : [
                        "bg-background text-muted-foreground border-border",
                        "hover:bg-primary/5 hover:text-foreground hover:border-primary/30 hover:shadow-md hover:scale-102",
                        "hover:shadow-primary/10 active:bg-primary/10"
                      ]
                )}
              >
                <span className="relative z-10">All Articles</span>
                {selectedCategory === null && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent animate-pulse-subtle" />
                )}
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "group relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ease-out",
                    "border-2 transform active:scale-95",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background",
                    selectedCategory === category 
                      ? [
                          "bg-gradient-to-r from-primary via-primary to-primary/90",
                          "text-white blog-filter-selected-text border-primary",
                          "shadow-lg shadow-primary/25",
                          "hover:shadow-xl hover:shadow-primary/30 hover:scale-105",
                          "[text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]",
                          "before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                        ]
                      : [
                          "bg-background text-muted-foreground border-border",
                          "hover:bg-primary/5 hover:text-foreground hover:border-primary/30 hover:shadow-md hover:scale-102",
                          "hover:shadow-primary/10 active:bg-primary/10"
                        ]
                  )}
                >
                  <span className="relative z-10 capitalize">{category}</span>
                  {selectedCategory === category && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent animate-pulse-subtle" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content Section */}
      <main className="py-12 md:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Loading State */}
          {isLoading ? (
            <PageLoader />
          ) : (
            <div className="max-w-6xl mx-auto">
              
              {/* Results Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <p className="text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                  {(selectedCategory || searchTerm) && (
                    <>
                      {selectedCategory && (
                        <span> in <strong>{selectedCategory}</strong></span>
                      )}
                      {searchTerm && (
                        <span> for "<strong>{searchTerm}</strong>"</span>
                      )}
                    </>
                  )}
                </p>
                
                {(selectedCategory || searchTerm) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Clear filters
                  </button>
                )}
              </div>
              
              {/* Blog Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-card rounded-lg">
                  <p className="text-muted-foreground mb-6">
                    No articles found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blog;
