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
import { mockProducts } from '../data/mockData';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useAuthStore } from '../store/authStore';
import { Product } from '../types';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  // Fetch product data
  useEffect(() => {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.slug === slug);
      
      if (foundProduct) {
        setProduct(foundProduct);
        document.title = `${foundProduct.name} - TechWave`;
      } else {
        navigate('/products', { replace: true });
      }
      
      setIsLoading(false);
    }, 500);
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
        text: product?.shortDescription,
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

  const discountedPrice = product?.price ? (
    product.discountPercentage 
      ? product.price * (1 - product.discountPercentage / 100) 
      : product.price
  ) : 0;

  // Related products (products from the same category)
  const relatedProducts = product 
    ? mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-16 md:mt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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
                  to={`/products?category=${product.category.toLowerCase()}`} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  {product.category}
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
              
              {/* Discount badge */}
              {product.discountPercentage && (
                <div className="absolute top-4 left-4 bg-accent-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                  {product.discountPercentage}% OFF
                </div>
              )}
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
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Link 
                  to={`/products?brand=${product.brand.toLowerCase()}`} 
                  className="text-primary-600 hover:underline font-medium"
                >
                  {product.brand}
                </Link>
                <span className="mx-2 text-gray-300">|</span>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2">{product.rating.toFixed(1)} ({product.numReviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <p className="text-gray-600 mb-6">
                {product.shortDescription}
              </p>
              
              <div className="mb-6">
                {product.discountPercentage ? (
                  <div className="flex items-end space-x-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(discountedPrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Save {formatPrice(product.price - discountedPrice)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              {/* Availability */}
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={product.stock > 0 ? 'text-green-700' : 'text-red-700'}>
                  {product.stock > 0 
                    ? product.stock > 10 
                      ? 'In Stock' 
                      : `Only ${product.stock} left in stock - order soon` 
                    : 'Out of Stock'}
                </span>
              </div>
              
              {/* Actions */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-32">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <div className="flex">
                      <button
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="px-3 py-2 border border-gray-300 bg-gray-50 text-gray-600 rounded-l-md hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                        className="w-full text-center border-y border-gray-300 py-2 focus:ring-0 focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                        className="px-3 py-2 border border-gray-300 bg-gray-50 text-gray-600 rounded-r-md hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      className={cn(
                        "w-full flex items-center justify-center px-8 py-3 rounded-lg font-medium transition-colors",
                        product.stock > 0 
                          ? "bg-primary-600 hover:bg-primary-700 text-white" 
                          : "bg-gray-300 cursor-not-allowed text-gray-500"
                      )}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={handleToggleWishlist}
                    className={cn(
                      "flex items-center justify-center px-4 py-2 border rounded-lg font-medium transition-colors",
                      isInWishlist(product.id)
                        ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <Heart className={cn(
                      "w-5 h-5 mr-2",
                      isInWishlist(product.id) && "fill-red-500 text-red-500"
                    )} />
                    {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                  
                  <button
                    onClick={handleShareProduct}
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>
              
              {/* Features */}
              <div className="border-t border-b py-6 space-y-4 mb-8">
                <div className="flex items-start">
                  <Truck className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Free Shipping</h3>
                    <p className="text-sm text-gray-600">Free standard shipping on orders over $999</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ShieldCheck className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">2-Year Warranty</h3>
                    <p className="text-sm text-gray-600">All our laptops come with a 2-year manufacturer warranty</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <RotateCcw className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">30-Day Returns</h3>
                    <p className="text-sm text-gray-600">Not satisfied? Return within 30 days for a full refund</p>
                  </div>
                </div>
              </div>
              
              {/* Key specs */}
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <h3 className="font-medium mb-3">Key Specifications</h3>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Processor:</span> {product.specs.processor}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">RAM:</span> {product.specs.ram}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Storage:</span> {product.specs.storage}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Display:</span> {product.specs.display}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Graphics:</span> {product.specs.graphics}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <Check className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span className="text-sm">
                      <span className="font-medium">Battery:</span> {product.specs.battery}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs for Description, Specs, and Reviews */}
        <div className="mt-12">
          <div className="border-b">
            <nav className="flex space-x-8">
              {(['description', 'specifications', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "py-4 px-1 font-medium border-b-2 transition-colors",
                    activeTab === tab
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-lg max-w-none">
                <p>{product.description}</p>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Processor</span>
                        <span>{product.specs.processor}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">RAM</span>
                        <span>{product.specs.ram}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Storage</span>
                        <span>{product.specs.storage}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Graphics</span>
                        <span>{product.specs.graphics}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Display</span>
                        <span>{product.specs.display}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Operating System</span>
                        <span>{product.specs.os}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Battery</span>
                        <span>{product.specs.battery}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Weight</span>
                        <span>{product.specs.weight}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Ports</span>
                        <span>{product.specs.ports.join(', ')}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b pb-2">
                        <span className="font-medium">Warranty</span>
                        <span>2-year manufacturer warranty</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">In the Box</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>{product.name}</li>
                    <li>Power Adapter</li>
                    <li>Quick Start Guide</li>
                    <li>Warranty Information</li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                  <button className="text-primary-600 font-medium hover:underline">Write a Review</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="text-5xl font-bold mb-2">{product.rating.toFixed(1)}</div>
                    <div className="flex justify-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <div className="text-gray-600">{product.numReviews} reviews</div>
                  </div>
                  
                  <div className="md:col-span-3">
                    <div className="space-y-6">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="border-b pb-6">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">John Doe</div>
                            <div className="text-gray-500 text-sm">2 weeks ago</div>
                          </div>
                          <div className="flex mb-2">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Star 
                                key={j} 
                                className={`w-4 h-4 ${j < 5 - i ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                              />
                            ))}
                          </div>
                          <h4 className="font-medium mb-2">Excellent performance and battery life</h4>
                          <p className="text-gray-600">
                            I've been using this laptop for about two weeks now and I'm extremely impressed with its performance. Battery life is exceptional and the display is gorgeous. Highly recommended!
                          </p>
                        </div>
                      ))}
                      
                      <button className="text-primary-600 font-medium hover:underline">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        {formatPrice(relatedProduct.discountPercentage 
                          ? relatedProduct.price * (1 - relatedProduct.discountPercentage / 100) 
                          : relatedProduct.price
                        )}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{relatedProduct.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;