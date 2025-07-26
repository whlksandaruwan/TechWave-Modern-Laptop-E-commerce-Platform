import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import { Product, FilterOptions } from '../../types';
import { toast } from 'sonner';

interface ProductGridProps {
  filters?: FilterOptions;
  searchQuery?: string;
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

const ProductGrid = ({ filters, searchQuery }: ProductGridProps) => {
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

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">
        <h3 className="text-xl font-medium mb-2">Error Loading Products</h3>
        <p className="mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-gray-600 mb-6">Try changing your filters or search query.</p>
        <Link
          to="/products"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          View All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Link
            to={`/products/${product.id}`}
            className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Product image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
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
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
              </button>
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
            <div className="p-6">
              <div className="text-sm text-primary-600 font-medium mb-2 capitalize">{product.categoryId}</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              {/* Key specs */}
              <div className="text-xs text-gray-500 mb-3 space-y-1">
                <div>💻 {product.specs.processor}</div>
                <div>🧠 {product.specs.ram}</div>
                <div>💾 {product.specs.storage}</div>
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
