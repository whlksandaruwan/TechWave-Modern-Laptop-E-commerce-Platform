import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, SortAsc, SortDesc } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { FilterOptions } from '../types';

interface Laptop {
  id: string;
  name: string;
  description: string;
  price: number;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    graphics: string;
    battery: string;
  };
  images: string[];
  stock: number;
  categoryId: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    categories: [],
    priceRange: { min: 0, max: 5000 },
    rating: undefined
  });
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    document.title = 'Shop All Laptops - TechWave';
  }, []);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: 'name' | 'price' | 'rating') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 md:pt-20"
    >
      {/* Header Section */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">All Laptops</h1>
          <p className="text-gray-600">
            Discover our complete collection of premium laptops
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <ProductFilters
                onFilterChange={handleFilterChange}
                isMobileFiltersOpen={isMobileFiltersOpen}
                setIsMobileFiltersOpen={setIsMobileFiltersOpen}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </button>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <button
                    onClick={() => handleSortChange('name')}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      sortBy === 'name' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Name
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSortChange('price')}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      sortBy === 'price' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Price
                    {sortBy === 'price' && (
                      sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                    )}
                  </button>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <ProductFilters
        onFilterChange={handleFilterChange}
        isMobileFiltersOpen={isMobileFiltersOpen}
        setIsMobileFiltersOpen={setIsMobileFiltersOpen}
      />
    </motion.div>
  );
};

export default ProductsPage;
