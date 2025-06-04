import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { FilterOptions } from '../types';
import { cn } from '../lib/utils';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    categories: [],
    priceRange: { min: 0, max: 5000 },
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    // Update page title
    document.title = 'Shop All Laptops - TechWave';
    
    // Check for search query in URL
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The search query is already in the state, and ProductGrid will use it
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-16 md:mt-20"
    >
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Shop All Laptops</h1>
            <p className="text-gray-600 max-w-3xl">
              Explore our comprehensive range of laptops, from high-performance gaming machines to lightweight ultrabooks, all designed to meet your specific needs.
            </p>
            
            <form onSubmit={handleSearchSubmit} className="mt-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for laptops by name, brand, or features..."
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center text-gray-700 mr-4"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </button>
            
            <div className="hidden md:block text-gray-600">
              Showing {searchQuery ? 'results for "' + searchQuery + '"' : 'all products'}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-gray-600 text-sm mr-2 hidden sm:block">View:</div>
            <button
              onClick={() => setView('grid')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
              )}
              aria-label="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn(
                "p-1.5 rounded-md transition-colors",
                view === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-500 hover:bg-gray-100'
              )}
              aria-label="List view"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          <ProductFilters 
            onFilterChange={handleFilterChange} 
            isMobileFiltersOpen={isMobileFiltersOpen}
            setIsMobileFiltersOpen={setIsMobileFiltersOpen}
          />
          
          <div className="flex-1">
            <ProductGrid filters={filters} searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;