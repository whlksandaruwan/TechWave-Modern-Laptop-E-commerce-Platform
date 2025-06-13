import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Star 
} from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import { Product } from '../types';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

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

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Laptop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/laptops/${slug}`);
        if (!response.ok) {
          if (response.status === 404) {
            navigate('/products', { replace: true });
            return;
          }
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }
        const data: Laptop = await response.json();
        setProduct(data);
        document.title = `${data.name} - TechWave`;
      } catch (err) {
        console.error("Error fetching product:", err);
        setError('Failed to load product details.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem(product.id, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
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

  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      }).catch((err) => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (!product) return;
    
    if (direction === 'prev') {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const displayPrice = product?.price || 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16 md:mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16 md:mt-20">
        <div className="text-center text-red-500">
          <h2 className="text-2xl font-bold mb-4">Error Loading Product</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16 md:mt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 md:pt-20"
    >
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link 
                  to={`/products?category=${product.categoryId.toLowerCase()}`} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  {product.categoryId}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-900 font-medium truncate">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product images */}
          <div>
            <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4 aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
              
              {/* Image navigation buttons */}
              <button
                onClick={() => handleImageNavigation('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <button
                onClick={() => handleImageNavigation('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            {/* Thumbnail navigation */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                    currentImageIndex === index ? 'border-primary-600' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-16 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product details */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Category ID: {product.categoryId}</p>
            <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
            
            <p className="text-gray-800 text-2xl font-bold mb-4">{formatPrice(displayPrice)}</p>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-lg px-3 py-2">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="text-gray-600 hover:text-gray-800 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input 
                  type="text" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center border-none focus:ring-0 px-0 bg-transparent text-lg font-medium"
                />
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button
                onClick={handleToggleWishlist}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
              </button>
            </div>
            
            <div className="text-gray-600 text-sm mb-6">
              <p className="mb-1">Only {product.stock} items left in stock</p>
              <p>Delivery: 3-5 business days</p>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-700 mb-8">
              <span className="flex items-center">
                <Truck className="w-5 h-5 mr-2" /> Free Shipping
              </span>
              <span className="flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2" /> 2-Year Warranty
              </span>
              <span className="flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" /> 30-Day Returns
              </span>
            </div>
            
            <div className="border-b mb-6">
              <nav className="flex -mb-px space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={cn(
                    "whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === 'description' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={cn(
                    "whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === 'specifications' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={cn(
                    "whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors",
                    activeTab === 'reviews' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  Reviews
                </button>
              </nav>
            </div>
            
            <div>
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-medium text-lg mb-4">Technical Specifications</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div className="flex flex-col">
                      <dt className="font-medium text-gray-700">Processor</dt>
                      <dd className="text-gray-900">{product.specs.processor}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="font-medium text-gray-700">RAM</dt>
                      <dd className="text-gray-900">{product.specs.ram}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="font-medium text-gray-700">Storage</dt>
                      <dd className="text-gray-900">{product.specs.storage}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="font-medium text-gray-700">Display</dt>
                      <dd className="text-gray-900">{product.specs.display}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="font-medium text-gray-700">Graphics</dt>
                      <dd className="text-gray-900">{product.specs.graphics}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="font-medium text-gray-700">Battery Life</dt>
                      <dd className="text-gray-900">{product.specs.battery}</dd>
                    </div>
                  </dl>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="text-center py-8">
                  <h3 className="text-xl font-medium mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-4">Be the first to review this product!</p>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;