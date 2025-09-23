import React, { useState, useCallback } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { usePerformance } from '@/hooks/use-performance';

interface BlogSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  resultCount: number;
}

const BlogSearch: React.FC<BlogSearchProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  resultCount
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { isSlowConnection } = usePerformance();

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  const clearSearch = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  const clearFilters = useCallback(() => {
    onSearchChange('');
    onCategoryChange(null);
  }, [onSearchChange, onCategoryChange]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Enhanced Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <div className={`relative backdrop-blur-sm bg-white/10 dark:bg-black/10 rounded-2xl border border-white/20 transition-all duration-300 search-glow ${isSearchFocused ? 'scale-105 shadow-2xl ring-2 ring-gold/30' : 'shadow-lg'}`}>
          <Search className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 md:w-6 md:h-6" />
          <input
            type="text"
            placeholder="Search articles, tips, and insights..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-12 md:pl-16 pr-12 py-4 md:py-5 text-base md:text-lg bg-transparent placeholder-muted-foreground/70 text-foreground focus:outline-none rounded-2xl"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Search Results Counter */}
        {searchTerm && (
          <div className="mt-2 text-center text-sm text-muted-foreground">
            {resultCount} article{resultCount !== 1 ? 's' : ''} found
          </div>
        )}
      </div>

      {/* Enhanced Category Pills */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        <button
          onClick={() => onCategoryChange(null)}
          className={`category-pill group px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium rounded-full transition-all duration-300 min-h-[48px] md:min-h-[52px] touch-manipulation relative overflow-hidden ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground border-primary shadow-lg scale-105 [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]'
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
            onClick={() => onCategoryChange(category)}
            className={`category-pill group px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium rounded-full transition-all duration-300 min-h-[48px] md:min-h-[52px] touch-manipulation relative overflow-hidden ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground border-primary shadow-lg scale-105 [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]'
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

      {/* Clear Filters Button */}
      {(searchTerm || selectedCategory) && (
        <div className="text-center">
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogSearch;