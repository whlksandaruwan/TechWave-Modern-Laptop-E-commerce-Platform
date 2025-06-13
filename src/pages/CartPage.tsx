import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingCart, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
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

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCartStore();
  const [cartProducts, setCartProducts] = useState<(Laptop & { quantity: number })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    const calculateTotals = async () => {
      const cartTotal = await getCartTotal();
      const shippingCost = cartTotal > 999 ? 0 : 30;
      setSubtotal(cartTotal);
      setShipping(shippingCost);
      setTotal(cartTotal + shippingCost);
    };
    
    calculateTotals();
  }, [getCartTotal, items]);

  useEffect(() => {
    // Update page title
    document.title = 'Your Cart - TechWave';
    
    // Fetch cart products
    const fetchCartProducts = async () => {
      setIsLoading(true);
      try {
        const products = await Promise.all(
          items.map(async (item) => {
            try {
              const response = await fetch(`http://localhost:3000/api/laptops/${item.productId}`);
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const product: Laptop = await response.json();
              return {
                ...product,
                quantity: item.quantity
              };
            } catch (error) {
              console.error(`Failed to fetch product ${item.productId}:`, error);
              return null;
            }
          })
        );
        
        setCartProducts(products.filter(Boolean) as (Laptop & { quantity: number })[]);
      } catch (error) {
        console.error('Failed to fetch cart products:', error);
        toast.error('Failed to load cart items. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartProducts();
  }, [items]);

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast.success('Item removed from cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    if (cartProducts.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    navigate('/checkout');
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
          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : cartProducts.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
              <ShoppingCart className="w-8 h-8 text-gray-500" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet. Start shopping to add items to your cart.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <h2 className="font-medium">Shopping Cart ({cartProducts.length} items)</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Clear Cart
                  </button>
                </div>
                
                <div>
                  {cartProducts.map((product) => (
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
                            <p className="text-gray-500 text-sm">Category: {product.categoryId}</p>
                          </div>
                          
                          <div className="mt-2 sm:mt-0 text-right">
                            <div className="font-bold">
                              {formatPrice(product.price * product.quantity)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4">
                          <div className="flex items-center">
                            <div className="mr-4">
                              <label htmlFor={`quantity-${product.id}`} className="sr-only">
                                Quantity
                              </label>
                              <div className="flex">
                                <button
                                  onClick={() => handleUpdateQuantity(product.id, Math.max(1, product.quantity - 1))}
                                  className="px-2 py-1 border border-gray-300 bg-gray-50 text-gray-600 rounded-l-md hover:bg-gray-100"
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  id={`quantity-${product.id}`}
                                  min="1"
                                  max={product.stock}
                                  value={product.quantity}
                                  onChange={(e) => handleUpdateQuantity(product.id, Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                                  className="w-12 text-center border-y border-gray-300 py-1 focus:ring-0 focus:outline-none"
                                />
                                <button
                                  onClick={() => handleUpdateQuantity(product.id, Math.min(product.stock, product.quantity + 1))}
                                  className="px-2 py-1 border border-gray-300 bg-gray-50 text-gray-600 rounded-r-md hover:bg-gray-100"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveItem(product.id)}
                              className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </button>
                          </div>
                          
                          <div className="mt-4 sm:mt-0 flex items-center text-sm text-gray-600">
                            <CheckCircle className={`w-4 h-4 mr-1 ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`} />
                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Link 
                  to="/products" 
                  className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  
                  {shipping === 0 && (
                    <div className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      You qualify for free shipping!
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;