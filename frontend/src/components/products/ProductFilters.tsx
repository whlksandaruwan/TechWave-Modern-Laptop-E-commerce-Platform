import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, ChevronDown, Check, Sliders, Sparkles } from 'lucide-react';
import { FilterOptions } from '../../types';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  isMobileFiltersOpen: boolean;
  setIsMobileFiltersOpen: (isOpen: boolean) => void;
}

const ProductFilters = ({ 
  onFilterChange, 
  isMobileFiltersOpen, 
  setIsMobileFiltersOpen 
}: ProductFiltersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 5000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    categories: true,
    rating: true
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories and brands from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const response = await fetch('http://localhost:3000/api/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Categories fetched:', data);
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    const fetchBrands = async () => {
      try {
        console.log('Fetching brands...');
        const response = await fetch('http://localhost:3000/api/laptops');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Laptops for brands:', data);
        // Extract unique brands from laptop names (first word)
        const uniqueBrands = Array.from(new Set(data.map((laptop: any) => {
          const firstWord = laptop.name.split(' ')[0];
          return firstWord;
        }))).filter((brand): brand is string => typeof brand === 'string');
        console.log('Extracted brands:', uniqueBrands);
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const priceMinParam = searchParams.get('priceMin');
    const priceMaxParam = searchParams.get('priceMax');
    const ratingParam = searchParams.get('rating');
    
    const newBrands: string[] = [];
    const newCategories: string[] = [];
    
    if (brandParam) {
      newBrands.push(brandParam);
    }
    
    if (categoryParam) {
      newCategories.push(categoryParam);
    }
    
    if (priceMinParam || priceMaxParam) {
      const newPriceRange = { ...priceRange };
      if (priceMinParam) newPriceRange.min = parseInt(priceMinParam);
      if (priceMaxParam) newPriceRange.max = parseInt(priceMaxParam);
      setPriceRange(newPriceRange);
    }
    
    if (ratingParam) {
      setSelectedRating(parseInt(ratingParam));
    }
    
    setSelectedBrands(newBrands);
    setSelectedCategories(newCategories);
  }, []);

  // Update filters when state changes
  useEffect(() => {
    const filters: FilterOptions = {
      brands: selectedBrands,
      categories: selectedCategories,
      priceRange,
      rating: selectedRating
    };
    
    onFilterChange(filters);
    
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    
    // Clear existing filter params
    newParams.delete('brand');
    newParams.delete('category');
    newParams.delete('priceMin');
    newParams.delete('priceMax');
    newParams.delete('rating');
    
    // Add new filter params
    if (selectedBrands.length === 1) {
      newParams.set('brand', selectedBrands[0]);
    }
    
    if (selectedCategories.length === 1) {
      newParams.set('category', selectedCategories[0]);
    }
    
    if (priceRange.min > 0) {
      newParams.set('priceMin', priceRange.min.toString());
    }
    
    if (priceRange.max < 5000) {
      newParams.set('priceMax', priceRange.max.toString());
    }
    
    if (selectedRating) {
      newParams.set('rating', selectedRating.toString());
    }
    
    setSearchParams(newParams);
  }, [selectedBrands, selectedCategories, priceRange, selectedRating]);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const toggleRating = (rating: number) => {
    setSelectedRating(prev => prev === rating ? undefined : rating);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 5000 });
    setSelectedRating(undefined);
    toast.success('All filters cleared');
  };

  const hasActiveFilters = 
    selectedBrands.length > 0 || 
    selectedCategories.length > 0 || 
    priceRange.min > 0 || 
    priceRange.max < 5000 ||
    selectedRating !== undefined;

  const FilterSection = ({ 
    title, 
    isExpanded, 
    onToggle, 
    children,
    icon: Icon
  }: { 
    title: string; 
    isExpanded: boolean; 
    onToggle: () => void; 
    children: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  }) => (
    <div className="border-b border-gray-700 py-4 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left font-medium text-gray-200 hover:text-blue-400 transition-colors"
      >
        <div className="flex items-center">
          {Icon && <Icon className="w-4 h-4 mr-2 text-blue-400" />}
          {title}
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="mt-4">
          {children}
        </div>
      </motion.div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile filter dialog */}
      <div className={cn(
        "fixed inset-0 bg-black bg-opacity-30 z-50 lg:hidden transition-opacity",
        isMobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: isMobileFiltersOpen ? 0 : '100%' }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-gray-800 shadow-xl overflow-y-auto border-l border-gray-700"
        >
          <div className="sticky top-0 z-10 bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center">
              <Sliders className="w-5 h-5 mr-2 text-blue-400" />
              <h2 className="text-lg font-medium text-white">Filters</h2>
            </div>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="p-2 -mr-2 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-4 py-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="w-full text-sm text-blue-400 font-medium mb-4 p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors"
              >
                ✨ Clear all filters
              </button>
            )}
            
            <div className="space-y-2">
              <FilterSection
                title="Price Range"
                isExpanded={expandedSections.price}
                onToggle={() => toggleSection('price')}
                icon={Sparkles}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="bg-blue-500/20 rounded-md px-3 py-1.5 text-blue-300 font-medium">
                      ${priceRange.min.toLocaleString()}
                    </div>
                    <span className="text-gray-400 px-2">to</span>
                    <div className="bg-blue-500/20 rounded-md px-3 py-1.5 text-blue-300 font-medium">
                      ${priceRange.max.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="min-price-mobile" className="block text-sm text-gray-400 mb-1">Min Price</label>
                      <input
                        type="number"
                        id="min-price-mobile"
                        min="0"
                        max={priceRange.max}
                        value={priceRange.min}
                        onChange={(e) => handlePriceChange(e, 'min')}
                        className="w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                      />
                    </div>
                    <div>
                      <label htmlFor="max-price-mobile" className="block text-sm text-gray-400 mb-1">Max Price</label>
                      <input
                        type="number"
                        id="max-price-mobile"
                        min={priceRange.min}
                        max="5000"
                        value={priceRange.max}
                        onChange={(e) => handlePriceChange(e, 'max')}
                        className="w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </FilterSection>

              <FilterSection
                title="Brands"
                isExpanded={expandedSections.brands}
                onToggle={() => toggleSection('brands')}
              >
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-200">{brand}</span>
                      {selectedBrands.includes(brand) && (
                        <Check className="w-4 h-4 text-blue-400 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Categories"
                isExpanded={expandedSections.categories}
                onToggle={() => toggleSection('categories')}
              >
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-200">{category.name}</span>
                      {selectedCategories.includes(category.id) && (
                        <Check className="w-4 h-4 text-blue-400 ml-auto" />
                      )}
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection
                title="Rating"
                isExpanded={expandedSections.rating}
                onToggle={() => toggleSection('rating')}
              >
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => toggleRating(rating)}
                      className={cn(
                        "flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors",
                        selectedRating === rating ? "bg-blue-500/20 border border-blue-500/30" : "hover:bg-gray-700"
                      )}
                    >
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-300 font-medium">
                        {rating === 5 ? "5 stars" : `${rating} & up`}
                      </span>
                      {selectedRating === rating && (
                        <Check className="w-4 h-4 text-blue-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </FilterSection>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Sliders className="w-5 h-5 mr-2 text-blue-400" />
              <h2 className="text-lg font-medium text-white">Filters</h2>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-400 font-medium hover:text-blue-300 transition-colors"
              >
                ✨ Clear all
              </button>
            )}
          </div>

          <div className="space-y-2">
            <FilterSection
              title="Price Range"
              isExpanded={expandedSections.price}
              onToggle={() => toggleSection('price')}
              icon={Sparkles}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="bg-blue-500/20 rounded-md px-3 py-1.5 text-blue-300 font-medium">
                    ${priceRange.min.toLocaleString()}
                  </div>
                  <span className="text-gray-400 px-2">to</span>
                  <div className="bg-blue-500/20 rounded-md px-3 py-1.5 text-blue-300 font-medium">
                    ${priceRange.max.toLocaleString()}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="min-price" className="block text-sm text-gray-400 mb-1">Min Price</label>
                    <input
                      type="number"
                      id="min-price"
                      min="0"
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange(e, 'min')}
                      className="w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="block text-sm text-gray-400 mb-1">Max Price</label>
                    <input
                      type="number"
                      id="max-price"
                      min={priceRange.min}
                      max="5000"
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange(e, 'max')}
                      className="w-full rounded-lg border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
            </FilterSection>

            <FilterSection
              title="Brands"
              isExpanded={expandedSections.brands}
              onToggle={() => toggleSection('brands')}
            >
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-200">{brand}</span>
                    {selectedBrands.includes(brand) && (
                      <Check className="w-4 h-4 text-blue-400 ml-auto" />
                    )}
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Categories"
              isExpanded={expandedSections.categories}
              onToggle={() => toggleSection('categories')}
            >
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-200">{category.name}</span>
                    {selectedCategories.includes(category.id) && (
                      <Check className="w-4 h-4 text-blue-400 ml-auto" />
                    )}
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Rating"
              isExpanded={expandedSections.rating}
              onToggle={() => toggleSection('rating')}
            >
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => toggleRating(rating)}
                    className={cn(
                      "flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors",
                      selectedRating === rating ? "bg-blue-500/20 border border-blue-500/30" : "hover:bg-gray-700"
                    )}
                  >
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-300 font-medium">
                      {rating === 5 ? "5 stars" : `${rating} & up`}
                    </span>
                    {selectedRating === rating && (
                      <Check className="w-4 h-4 text-blue-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </FilterSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilters;
