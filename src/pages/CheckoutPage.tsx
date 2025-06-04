import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatPrice } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import { generateId } from '../lib/utils';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 999 ? 0 : 30;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Update page title
    document.title = 'Checkout - TechWave';
    
    // Fetch cart products
    setIsLoading(true);
    
    const products = items.map(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      if (!product) {
        return null;
      }
      
      const price = product.discountPercentage 
        ? product.price * (1 - product.discountPercentage / 100) 
        : product.price;
        
      return {
        ...product,
        quantity: item.quantity,
        totalPrice: price * item.quantity
      };
    }).filter(Boolean);
    
    setCartProducts(products);
    setIsLoading(false);
    
    // If cart is empty, redirect to cart page
    if (items.length === 0) {
      navigate('/cart');
      toast.error('Your cart is empty');
    }
  }, [items, navigate]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shipping info
    const { fullName, email, phone, address, city, state, zipCode } = shippingInfo;
    if (!fullName || !email || !phone || !address || !city || !state || !zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment info
    const { cardNumber, cardName, expiryDate, cvv } = paymentInfo;
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Simple card number validation
    if (cardNumber.replace(/\s/g, '').length !== 16) {
      toast.error('Please enter a valid card number');
      return;
    }
    
    setStep('review');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order in backend
      const orderId = generateId();
      
      // Clear cart
      clearCart();
      
      // Show success and redirect
      toast.success('Order placed successfully!');
      navigate(`/profile?order=${orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackStep = () => {
    if (step === 'payment') {
      setStep('shipping');
    } else if (step === 'review') {
      setStep('payment');
    }
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 md:pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
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
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-gray-600">
            Complete your purchase
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Checkout steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step === 'shipping' ? 'bg-primary-600 text-white' : 'bg-primary-100 text-primary-600'
              }`}>
                1
              </div>
              <div className="text-sm font-medium">Shipping</div>
            </div>
            
            <div className="flex-1 flex items-center">
              <div className={`flex-1 h-1 ${
                step === 'shipping' ? 'bg-gray-300' : 'bg-primary-600'
              }`}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step === 'payment' ? 'bg-primary-600 text-white' : step === 'review' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <div className="text-sm font-medium">Payment</div>
            </div>
            
            <div className="flex-1 flex items-center">
              <div className={`flex-1 h-1 ${
                step === 'review' ? 'bg-primary-600' : 'bg-gray-300'
              }`}></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step === 'review' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                3
              </div>
              <div className="text-sm font-medium">Review</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            {/* Shipping Step */}
            {step === 'shipping' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">Shipping Information</h2>
                </div>
                
                <form onSubmit={handleShippingSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="state"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Payment Step */}
            {step === 'payment' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">Payment Method</h2>
                </div>
                
                <form onSubmit={handlePaymentSubmit} className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 border border-primary-200 bg-primary-50 rounded-md p-4 mb-4">
                      <CreditCard className="w-6 h-6 text-primary-600" />
                      <span className="font-medium">Credit Card</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <Lock className="w-4 h-4 mr-2" />
                      Your payment information is secured with 256-bit encryption
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => {
                          // Format card number with spaces
                          const value = e.target.value.replace(/\s/g, '');
                          const formattedValue = value
                            .replace(/\D/g, '')
                            .match(/.{1,4}/g)
                            ?.join(' ') || '';
                          setPaymentInfo({ ...paymentInfo, cardNumber: formattedValue });
                        }}
                        maxLength={19}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 4) {
                              const month = value.slice(0, 2);
                              const year = value.slice(2);
                              const formattedValue = month + (year ? '/' + year : '');
                              setPaymentInfo({ ...paymentInfo, expiryDate: formattedValue });
                            }
                          }}
                          maxLength={5}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 4) {
                              setPaymentInfo({ ...paymentInfo, cvv: value });
                            }
                          }}
                          maxLength={4}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={paymentInfo.saveCard}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, saveCard: e.target.checked })}
                        className="rounded text-primary-600 focus:ring-primary-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Save this card for future purchases
                      </span>
                    </label>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back to Shipping
                    </button>
                    
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
            
            {/* Review Step */}
            {step === 'review' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">Review Your Order</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-medium mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium">{shippingInfo.fullName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                        <p>{shippingInfo.country}</p>
                        <p className="mt-2">{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <CreditCard className="w-5 h-5 text-gray-700 mr-2" />
                          <span className="font-medium">Credit Card</span>
                        </div>
                        <p>
                          **** **** **** {paymentInfo.cardNumber.slice(-4)}
                        </p>
                        <p>{paymentInfo.cardName}</p>
                        <p>Expires: {paymentInfo.expiryDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-3">Order Items</h3>
                  <div className="border rounded-lg overflow-hidden mb-8">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Product
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {cartProducts.map((product) => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                                    <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                    <div className="text-sm text-gray-500">{product.brand}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {formatPrice(product.discountPercentage 
                                    ? product.price * (1 - product.discountPercentage / 100) 
                                    : product.price
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{product.quantity}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{formatPrice(product.totalPrice)}</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleBackStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      disabled={isProcessing}
                    >
                      Back to Payment
                    </button>
                    
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="order-first lg:order-last">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-24">
              <div className="px-6 py-4 border-b">
                <h2 className="font-medium">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cartProducts.map((product) => (
                    <div key={product.id} className="flex justify-between">
                      <div className="flex-1">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-gray-500"> × {product.quantity}</span>
                      </div>
                      <div>
                        {formatPrice(product.totalPrice)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-4">
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
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>
                  
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                
                {shipping === 0 && (
                  <div className="mt-4 text-sm text-green-600 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    You qualify for free shipping!
                  </div>
                )}
                
                <div className="mt-6 text-sm text-gray-600 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  All transactions are secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;