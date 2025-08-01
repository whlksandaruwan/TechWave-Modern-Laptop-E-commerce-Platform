import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, ShoppingCart } from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import { Product } from '../../types';
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

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Laptop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:3000/api/laptops'); // Fetch all laptops
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Laptop[] = await response.json();
        const featured = data.filter(product => product.featured); // Filter for featured products
        setFeaturedProducts(featured);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        setError('Failed to load featured products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: Laptop) => {
    e.preventDefault();
    addItem(product.id, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = async (e: React.MouseEvent, product: Laptop) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      return;
    }
    
    try {
      const inWishlist = isInWishlist(product.id);
      if (inWishlist) {
        // Find the wishlist item ID for this product
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      // Error is already handled by the store and shown via toast
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading featured products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-red-500">
          <h2 className="text-xl font-medium mb-2">Error loading featured products</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-medium mb-2">No featured products found</h2>
          <p className="text-gray-600">Check back later for exciting new arrivals!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our handpicked selection of premium laptops, designed to meet the needs of professionals, gamers, and creators.
            </p>
          </div>
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary-600 font-medium mt-4 md:mt-0 group"
          >
            View All Products 
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link 
                to={`/products/${product.id}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative"
              >
                {/* Product image */}
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={product.images[0]} 
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
                
                {/* Discount badge - not available from backend for now */}
                {/* {product.discountPercentage && (
                  <div className="absolute top-4 left-4 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discountPercentage}% OFF
                  </div>
                )} */}
                
                {/* Product info */}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">Category ID: {product.categoryId}</div>
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
                    {/* No rating or numReviews from backend for now */}
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
      </div>
    </section>
  );
};

export default FeaturedProducts;