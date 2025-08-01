import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, LogIn } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { Product } from '../types';
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

const WishlistPage = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const [wishlistProducts, setWishlistProducts] = useState<Laptop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update page title
    document.title = 'Your Wishlist - TechWave';
    
    const fetchWishlistProducts = async () => {
      setIsLoading(true);
      setError(null);
      const fetchedProducts: Laptop[] = [];
      
      for (const productId of items) {
        try {
          const response = await fetch(`http://localhost:3000/api/laptops/${productId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch product ${productId}: ${response.statusText}`);
          }
          const product: Laptop = await response.json();
          fetchedProducts.push(product);
        } catch (err) {
          console.error(`Error fetching product ${productId}:`, err);
          setError('Failed to load some wishlist items.');
        }
      }
      setWishlistProducts(fetchedProducts);
      setIsLoading(false);
    };

    fetchWishlistProducts();
  }, [items]);

  const handleRemoveItem = (productId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      return;
    }
    removeItem(productId);
    toast.success('Item removed from wishlist');
  };

  const handleAddToCart = (product: Laptop) => {
    addToCart(product.id, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleClearWishlist = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to manage your wishlist');
      return;
    }
    clearWishlist();
    toast.success('Wishlist cleared');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 md:pt-20"
    >
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
          <p className="text-gray-600">
            Save items you love and add them to cart later
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {!isAuthenticated && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
            <div className="flex items-center text-primary-800">
              <LogIn className="w-5 h-5 mr-2" />
              <span className="font-medium">Please sign in to manage your wishlist</span>
            </div>
            <p className="text-primary-600 mt-1 mb-3">
              Create an account or sign in to save your wishlist permanently and access it from any device.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">Error: {error}</div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <Heart className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">
              Browse our products and add items you love to your wishlist.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <h2 className="font-medium">Wishlist ({wishlistProducts.length} items)</h2>
                <button
                  onClick={handleClearWishlist}
                  className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Clear Wishlist
                </button>
              </div>
              
              <div>
                {wishlistProducts.map((product) => {
                  const price = product.price; // No discountPercentage from backend for now
                    
                  return (
                    <div 
                      key={product.id} 
                      className="flex flex-col sm:flex-row items-start p-6 border-b last:border-b-0"
                    >
                      <div className="sm:w-24 sm:h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden mb-4 sm:mb-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="sm:ml-6 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                          <div>
                            <Link 
                              to={`/products/${product.id}`}
                              className="text-lg font-medium hover:text-primary-600 transition-colors"
                            >
                              {product.name}
                            </Link>
                            <p className="text-gray-500 text-sm">Category ID: {product.categoryId}</p> {/* Displaying category ID for now */}
                          </div>
                          
                          <div className="mt-2 sm:mt-0 text-right">
                            <div className="font-bold">
                              {formatPrice(price)}
                            </div>
                            {/* Discounted price not available from backend for now */}
                            {/* {product.discountPercentage && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(product.price)}
                              </div>
                            )} */}
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </button>
                            
                            <button
                              onClick={() => handleRemoveItem(product.id)}
                              className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </button>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 flex items-center text-sm text-gray-600">
                            {product.stock > 0 ? (
                              <span className="text-green-600">In Stock</span>
                            ) : (
                              <span className="text-red-600">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link 
                to="/products" 
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WishlistPage; 