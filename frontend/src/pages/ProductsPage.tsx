import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  SortAsc, 
  SortDesc, 
  Search, 
  X, 
  Eye, 
  GitCompare, 
  Star,
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import { FilterOptions } from '../types';
import { toast } from 'sonner';

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
  createdAt: Date;
  updatedAt: Date;
}

interface QuickViewProduct extends Laptop {
  rating?: number;
  reviews?: number;
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
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'newest' | 'popular'>('newest');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuickView, setShowQuickView] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [compareProducts, setCompareProducts] = useState<string[]>([]);
  const [showCompareBar, setShowCompareBar] = useState(false);

  useEffect(() => {
    document.title = 'Shop All Laptops - TechWave';
    
    // Set active category based on URL params
    const categoryParam = searchParams.get('category');
    setActiveCategory(categoryParam || 'all');
  }, [searchParams]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: 'name' | 'price' | 'rating' | 'newest' | 'popular') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  const handleQuickView = (product: Laptop) => {
    // Add mock rating and reviews for demo
    const quickViewProduct: QuickViewProduct = {
      ...product,
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      reviews: Math.floor(Math.random() * 100) + 10 // 10-110 reviews
    };
    setQuickViewProduct(quickViewProduct);
    setShowQuickView(true);
  };

  const handleCompareToggle = (productId: string) => {
    setCompareProducts(prev => {
      if (prev.includes(productId)) {
        const newList = prev.filter(id => id !== productId);
        if (newList.length === 0) {
          setShowCompareBar(false);
        }
        return newList;
      } else {
        const newList = [...prev, productId];
        if (newList.length === 1) {
          setShowCompareBar(true);
        }
        if (newList.length > 3) {
          toast.error('You can only compare up to 3 products at a time');
          return prev;
        }
        return newList;
      }
    });
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'popular', label: 'Popular', icon: TrendingUp },
    { value: 'price', label: 'Price', icon: null },
    { value: 'name', label: 'Name', icon: null },
    { value: 'rating', label: 'Rating', icon: Star },
  ];

  const categories = [
    { id: 'all', name: 'All Laptops', icon: '💻' },
    { id: 'apple', name: 'MacBooks', icon: '🍎' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'student', name: 'Student', icon: '📚' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-b from-gray-900 to-black min-h-screen pt-20"
    >
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-b from-gray-900 to-black py-12 relative overflow-hidden">
        {/* Background animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Discover Your Perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {" "}Laptop
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our curated collection of premium laptops for every need
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search laptops, brands, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Enhanced Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => navigate(category.id === 'all' ? '/products' : `/products?category=${category.id}`)}
                  className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                    activeCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105' 
                      : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
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
            {/* Enhanced Toolbar */}
            <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsMobileFiltersOpen(true)}
                    className="lg:hidden inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </button>

                  {/* Enhanced Sort Options */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-300 font-medium">Sort by:</span>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value as any)}
                            className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                              sortBy === option.value 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm' 
                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                            }`}
                          >
                            {Icon && <Icon className="w-4 h-4 mr-1" />}
                            {option.label}
                            {sortBy === option.value && (
                              sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-300 font-medium">View:</span>
                  <div className="flex bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'grid' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all duration-200 ${
                        viewMode === 'list' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid 
              filters={filters} 
              searchQuery={searchQuery}
              sortBy={sortBy}
              sortOrder={sortOrder}
              viewMode={viewMode}
              onQuickView={handleQuickView}
              onCompareToggle={handleCompareToggle}
              compareProducts={compareProducts}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden">
        <ProductFilters
          onFilterChange={handleFilterChange}
          isMobileFiltersOpen={isMobileFiltersOpen}
          setIsMobileFiltersOpen={setIsMobileFiltersOpen}
        />
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuickView(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">{quickViewProduct.name}</h2>
                  <button
                    onClick={() => setShowQuickView(false)}
                    className="p-2 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-700 rounded-lg overflow-hidden">
                    <img
                      src={quickViewProduct.images[0] || 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < (quickViewProduct.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-gray-400">
                        {quickViewProduct.rating} ({quickViewProduct.reviews} reviews)
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{quickViewProduct.description}</p>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-sm text-gray-300">{quickViewProduct.specs.processor}</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-sm text-gray-300">{quickViewProduct.specs.ram}</span>
                      </div>
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-blue-400 mr-3" />
                        <span className="text-sm text-gray-300">{quickViewProduct.specs.storage}</span>
                      </div>
                    </div>
                    
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6">
                      ${quickViewProduct.price.toLocaleString()}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200">
                        Add to Cart
                      </button>
                      <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors text-gray-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compare Bar */}
      <AnimatePresence>
        {showCompareBar && compareProducts.length > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 shadow-lg z-40"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-300">
                    Compare ({compareProducts.length}/3)
                  </span>
                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    Compare Now
                  </button>
                </div>
                <button
                  onClick={() => {
                    setCompareProducts([]);
                    setShowCompareBar(false);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-400"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductsPage;
