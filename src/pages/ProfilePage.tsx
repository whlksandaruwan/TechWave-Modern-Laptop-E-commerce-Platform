import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Heart, 
  Settings, 
  LogOut, 
  ShoppingBag, 
  Check, 
  Truck, 
  CheckCircle 
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { mockOrders } from '../data/mockData';
import { formatPrice } from '../lib/utils';

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payment' | 'wishlist' | 'settings'>('orders');
  const [orders, setOrders] = useState(mockOrders);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  
  useEffect(() => {
    // Update page title
    document.title = 'My Account - TechWave';
    
    // Check if we came from checkout with an order ID
    const orderId = searchParams.get('order');
    if (orderId) {
      setShowOrderSuccess(true);
      
      // Auto-hide the message after 10 seconds
      const timer = setTimeout(() => {
        setShowOrderSuccess(false);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password updated successfully');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 md:pt-20"
    >
      {showOrderSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
            <div>
              <h3 className="text-green-800 font-medium">Order Placed Successfully!</h3>
              <p className="text-green-700 text-sm">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
            </div>
            <button 
              onClick={() => setShowOrderSuccess(false)}
              className="ml-auto text-green-700 hover:text-green-900"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mr-4">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
              ) : (
                <User className="w-8 h-8 text-primary-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">Welcome, {user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <nav className="divide-y">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors ${
                    activeTab === 'orders' ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  My Orders
                </button>
                
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors ${
                    activeTab === 'addresses' ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                  }`}
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  Addresses
                </button>
                
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors ${
                    activeTab === 'payment' ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Payment Methods
                </button>
                
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors ${
                    activeTab === 'wishlist' ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                  }`}
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Wishlist
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors ${
                    activeTab === 'settings' ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                  }`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Account Settings
                </button>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-6 py-4 hover:bg-gray-50 transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">My Orders</h2>
                </div>
                
                <div className="divide-y">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="p-6">
                        <div className="flex flex-wrap justify-between items-start mb-4">
                          <div>
                            <div className="text-sm text-gray-500 mb-1">Order #{order.id.slice(0, 8)}</div>
                            <div className="font-medium">Placed on {new Date(order.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="font-bold text-lg">{formatPrice(order.totalAmount)}</div>
                            <div className="flex items-center mt-1">
                              {order.status === 'delivered' ? (
                                <>
                                  <Check className="w-4 h-4 text-green-500 mr-1" />
                                  <span className="text-sm text-green-600">Delivered</span>
                                </>
                              ) : order.status === 'shipped' ? (
                                <>
                                  <Truck className="w-4 h-4 text-blue-500 mr-1" />
                                  <span className="text-sm text-blue-600">Shipped</span>
                                </>
                              ) : (
                                <>
                                  <Package className="w-4 h-4 text-orange-500 mr-1" />
                                  <span className="text-sm text-orange-600 capitalize">{order.status}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-4">
                          {order.items.map((item) => (
                            <div key={item.productId} className="flex items-start">
                              <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                                <div className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Link 
                            to={`/orders/${order.id}`} 
                            className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                          >
                            View Order Details
                          </Link>
                          
                          {order.status === 'delivered' && (
                            <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                              Write a Review
                            </button>
                          )}
                          
                          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            Track Shipment
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                        <ShoppingBag className="w-8 h-8 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">
                        When you place an order, it will appear here.
                      </p>
                      <Link 
                        to="/products" 
                        className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">My Addresses</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4">
                        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                      <div className="font-medium mb-1">John Doe</div>
                      <div className="text-gray-600 text-sm">
                        <div>123 Main St</div>
                        <div>San Francisco, CA 94105</div>
                        <div>United States</div>
                        <div className="mt-2">555-123-4567</div>
                      </div>
                      <div className="mt-3 flex items-center">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Default Address
                        </span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center text-center">
                      <MapPin className="w-8 h-8 text-gray-400 mb-2" />
                      <h3 className="font-medium mb-1">Add a new address</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Save your shipping addresses for faster checkout
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Add Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">Payment Methods</h2>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="border rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4">
                        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                          Edit
                        </button>
                      </div>
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-6 bg-gray-200 rounded mr-3"></div>
                        <div className="font-medium">Visa ending in 4242</div>
                      </div>
                      <div className="text-gray-600 text-sm">
                        <div>John Doe</div>
                        <div>Expires 12/25</div>
                      </div>
                      <div className="mt-3 flex items-center">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Default Payment
                        </span>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center text-center">
                      <CreditCard className="w-8 h-8 text-gray-400 mb-2" />
                      <h3 className="font-medium mb-1">Add a new payment method</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Save your payment details for faster checkout
                      </p>
                      <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Add Payment Method
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">My Wishlist</h2>
                </div>
                
                <div className="p-6">
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                      <Heart className="w-8 h-8 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                    <p className="text-gray-600 mb-6">
                      Save items you're interested in for later.
                    </p>
                    <Link 
                      to="/products" 
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Discover Products
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h2 className="font-medium">Account Settings</h2>
                </div>
                
                <div className="p-6">
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                    <form onSubmit={handleUpdateProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            defaultValue={user?.name}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            defaultValue={user?.email}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                          Update Profile
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="border-t pt-8">
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <form onSubmit={handleUpdatePassword}>
                      <div className="space-y-4 mb-6">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 transition-colors"
                        >
                          Change Password
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  <div className="border-t pt-8 mt-8">
                    <h3 className="text-lg font-medium mb-4">Delete Account</h3>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, all of your data will be permanently removed.
                      This action cannot be undone.
                    </p>
                    <button
                      className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;