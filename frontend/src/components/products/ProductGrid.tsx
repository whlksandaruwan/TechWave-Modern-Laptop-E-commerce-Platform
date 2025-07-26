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
        const response = await fetch('http://localhost:3000/api/laptops');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Laptop[] = await response.json();

        let filteredData = [...data];

        // Apply filters from URL search params
        const categoryParam = searchParams.get('category');
        const brandParam = searchParams.get('brand');
        const priceMinParam = searchParams.get('priceMin');
        const priceMaxParam = searchParams.get('priceMax');
        const saleParam = searchParams.get('sale');

        if (categoryParam) {
          filteredData = filteredData.filter(p =>
            p.categoryId.toLowerCase() === categoryParam.toLowerCase() ||
            p.categoryId === categoryParam
          );
        }

        if (brandParam) {
          filteredData = filteredData.filter(p =>
            p.name.toLowerCase().includes(brandParam.toLowerCase())
          );
        }

        if (priceMinParam) {
          const min = parseFloat(priceMinParam);
          filteredData = filteredData.filter(p => p.price >= min);
        }

        if (priceMaxParam) {
          const max = parseFloat(priceMaxParam);
          filteredData = filteredData.filter(p => p.price <= max);
        }

        if (saleParam === 'true') {
          // This filter needs 'discountPercentage' in Laptop interface or calculated from backend
          filteredData = filteredData.filter(p => false); // Placeholder as no discount info
        }

        // Apply additional filters if provided as props
        if (filters) {
          if (filters.brands.length > 0) {
            // This filter might need adjustment based on how brands are associated in your backend
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

          if (filters.rating) {
            // This filter needs 'rating' in Laptop interface or calculated from backend
            filteredData = filteredData.filter(p => false); // Placeholder as no rating info
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
    return <div className="text-center py-16">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <Link
            to={`/products/${product.id}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Product image */}
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img
                src={product.images[0]} // Assuming images array is not empty
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

            {/* Discount badge */}
            {/* Assuming no discountPercentage directly from backend for now */}
            {/* {product.discountPercentage && (
              <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discountPercentage}% OFF
              </div>
            )} */}

            {/* Product info */}
            <div className="p-6">
              <div className="text-sm text-gray-500 mb-2">Category ID: {product.categoryId}</div> {/* Displaying category ID for now */}
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex items-end justify-between">
                <div>
                  <span className="font-bold text-lg">
                    {formatPrice(product.price)}
                  </span>
                </div>
                {/* Assuming no rating or numReviews from backend for now */}
                {/* <div className="flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
                </div> */}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
