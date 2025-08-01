import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Eye, GitCompare, Star } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import { Product, FilterOptions } from '../../types';
import { toast } from 'sonner';

interface ProductGridProps {
  filters?: FilterOptions;
  searchQuery?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
  viewMode?: 'grid' | 'list';
  onQuickView?: (product: Laptop) => void;
  onCompareToggle?: (productId: string) => void;
  compareProducts?: string[];
}

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

const ProductGrid = ({ 
  filters, 
  searchQuery = '', 
  sortBy = 'newest',
  sortOrder = 'desc',
  viewMode = 'grid',
  onQuickView,
  onCompareToggle,
  compareProducts = []
}: ProductGridProps) => {
  const [products, setProducts] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching products from API...');
        const response = await fetch('http://localhost:3000/api/laptops');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Laptop[] = await response.json();
        console.log('Fetched products:', data);

        let filteredData = [...data];

        // Apply filters from URL search params
        const categoryParam = searchParams.get('category');
        console.log('Category filter:', categoryParam);

        if (categoryParam) {
          filteredData = filteredData.filter(p =>
            p.categoryId.toLowerCase() === categoryParam.toLowerCase() ||
            p.categoryId === categoryParam
          );
          console.log('Filtered by category:', filteredData);
        }

        // Apply additional filters if provided as props
        if (filters) {
          if (filters.brands.length > 0) {
            filteredData = filteredData.filter(p =>
              filters.brands.some(brand => p.name.toLowerCase().includes(brand.toLowerCase()))
            );
          }

          if (filters.categories.length > 0) {
            filteredData = filteredData.filter(p =>
              filters.categories.includes(p.categoryId)
            );
          }

          if (filters.priceRange) {
            filteredData = filteredData.filter(p =>
              p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
            );
          }
        }

        // Apply search query if provided
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredData = filteredData.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.specs.processor.toLowerCase().includes(query) ||
            p.specs.ram.toLowerCase().includes(query) ||
            p.specs.storage.toLowerCase().includes(query) ||
            p.specs.display.toLowerCase().includes(query) ||
            p.specs.graphics.toLowerCase().includes(query)
          );
        }

        console.log('Final filtered products:', filteredData);
        setProducts(filteredData);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchQuery, searchParams]);

  // Sort products based on sortBy and sortOrder
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => {
          const result = a.name.localeCompare(b.name);
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'price':
        sorted.sort((a, b) => {
          const result = a.price - b.price;
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'rating':
        // Mock rating for demo - in real app this would come from API
        sorted.sort((a, b) => {
          const ratingA = Math.floor(Math.random() * 2) + 4; // 4-5 stars
          const ratingB = Math.floor(Math.random() * 2) + 4;
          const result = ratingA - ratingB;
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'newest':
        sorted.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          const result = dateA - dateB;
          return sortOrder === 'asc' ? result : -result;
        });
        break;
      case 'popular':
        // Mock popularity based on stock (lower stock = more popular)
        sorted.sort((a, b) => {
          const result = a.stock - b.stock;
          return sortOrder === 'asc' ? result : -result;
        });
        break;
    }
    
    return sorted;
  }, [products, sortBy, sortOrder]);

  const handleAddToCart = (e: React.MouseEvent, product: Laptop) => {
    e.preventDefault();
    addItem(product.id, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent, product: Laptop) => {
    e.preventDefault();

    if (!isAuthenticated) {
      const shouldNavigate = window.confirm('Please sign in to manage your wishlist. Would you like to sign in now?');
      if (shouldNavigate) {
        navigate('/login', { state: { from: location.pathname } });
      }
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product.id);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  const handleQuickView = (e: React.MouseEvent, product: Laptop) => {
    e.preventDefault();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleCompareToggle = (e: React.MouseEvent, product: Laptop) => {
    e.preventDefault();
    if (onCompareToggle) {
      onCompareToggle(product.id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-400">
        <h3 className="text-xl font-medium mb-2">Error Loading Products</h3>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200"
        >
          Retry
        </button>
      </div>
    );
  }

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2 text-white">No products found</h3>
        <p className="text-gray-400 mb-6">
          {searchQuery ? `No products match "${searchQuery}"` : 'Try changing your filters or search query.'}
        </p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white font-medium rounded-lg transition-all duration-200"
        >
          View All Products
        </Link>
      </div>
    );
  }

  const ProductCard = ({ product, index }: { product: Laptop; index: number }) => {
    const isInCompare = compareProducts.includes(product.id);
    const mockRating = Math.floor(Math.random() * 2) + 4; // 4-5 stars for demo

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className={`group block bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative border border-gray-700 ${
          viewMode === 'list' ? 'flex' : ''
        }`}
      >
        <Link
          to={`/products/${product.id}`}
          className={`block ${viewMode === 'list' ? 'flex flex-1' : ''}`}
        >
          {/* Product image */}
          <div className={`overflow-hidden bg-gray-700 ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
            <img
              src={product.images[0] || 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Quick action buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={(e) => handleToggleWishlist(e, product)}
              className="p-2 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-700 transition-colors border border-gray-600"
              aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-300"}`} />
            </button>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="p-2 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-700 transition-colors border border-gray-600"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-5 h-5 text-gray-300" />
            </button>
            {onQuickView && (
              <button
                onClick={(e) => handleQuickView(e, product)}
                className="p-2 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-gray-700 transition-colors border border-gray-600"
                aria-label="Quick view"
              >
                <Eye className="w-5 h-5 text-gray-300" />
              </button>
            )}
            {onCompareToggle && (
              <button
                onClick={(e) => handleCompareToggle(e, product)}
                className={`p-2 backdrop-blur-sm rounded-full shadow-sm transition-colors border ${
                  isInCompare 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500' 
                    : 'bg-gray-800/90 text-gray-300 hover:bg-gray-700 border-gray-600'
                }`}
                aria-label={isInCompare ? "Remove from compare" : "Add to compare"}
              >
                <GitCompare className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Stock status */}
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
              Only {product.stock} left
            </div>
          )}
          
          {product.stock === 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}

          {/* Product info */}
          <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-blue-400 font-medium capitalize">{product.categoryId}</div>
              {viewMode === 'list' && (
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < mockRating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-gray-400">({mockRating})</span>
                </div>
              )}
            </div>
            
            <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition-colors text-white">
              {product.name}
            </h3>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            
            {/* Key specs */}
            <div className="text-xs text-gray-400 mb-3 space-y-1">
              <div>💻 {product.specs.processor}</div>
              <div>🧠 {product.specs.ram}</div>
              <div>💾 {product.specs.storage}</div>
              {viewMode === 'list' && (
                <>
                  <div>🖥️ {product.specs.display}</div>
                  <div>🎮 {product.specs.graphics}</div>
                </>
              )}
            </div>
            
            <div className="flex items-end justify-between">
              <div>
                <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="text-xs text-gray-400">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className={viewMode === 'list' ? 'space-y-4' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
      {sortedProducts.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
