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
import { formatPrice } from '../lib/utils';

interface OrderItem {
  productId: string;
  quantity: number;
  name: string; // Assuming name is returned with order item
  image: string; // Assuming image is returned with order item
  price: number; // Assuming price is returned with order item
}

interface Order {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

const ProfilePage = () => {
  const [searchParams] = useSearchParams();
  const { user, logout, isAuthenticated, token } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payment' | 'wishlist' | 'settings'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);
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

    const fetchOrders = async () => {
      if (!isAuthenticated || !token) {
        setIsLoadingOrders(false);
        return;
      }

      try {
        setIsLoadingOrders(true);
        setOrdersError(null);
        const response = await fetch('http://localhost:3000/api/orders', { // Assuming /api/orders endpoint
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }
        const data: Order[] = await response.json();

        // For each order, fetch product details for items if needed (mock data had product details)
        const ordersWithProductDetails = await Promise.all(data.map(async (order) => {
          const itemsWithDetails = await Promise.all(order.items.map(async (item) => {
            // If the backend directly provides name, image, price for order items, use that.
            // Otherwise, fetch from /api/laptops/productId
            if (item.name && item.image && item.price) {
              return item;
            } else {
              try {
                const productResponse = await fetch(`http://localhost:3000/api/laptops/${item.productId}`);
                if (!productResponse.ok) {
                  console.error(`Failed to fetch product for order item ${item.productId}:`, productResponse.statusText);
                  return { ...item, name: 'Unknown Product', image: '/placeholder.jpg', price: 0 }; // Fallback
                }
                const productData = await productResponse.json();
                return {
                  ...item,
                  name: productData.name,
                  image: productData.images[0] || '/placeholder.jpg',
                  price: productData.price,
                };
              } catch (productError) {
                console.error(`Error fetching product for order item ${item.productId}:`, productError);
                return { ...item, name: 'Unknown Product', image: '/placeholder.jpg', price: 0 }; // Fallback
              }
            }
          }));
          return { ...order, items: itemsWithDetails };
        }));

        setOrders(ordersWithProductDetails);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrdersError('Failed to load orders. Please try again later.');
      } finally {
        setIsLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [searchParams, isAuthenticated, token]);

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
              <h1 className="text-2xl font-bold mb-1">Welcome, {user?.firstName} {user?.lastName}</h1>
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
                
                {isLoadingOrders ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                  </div>
                ) : ordersError ? (
                  <div className="text-center py-12 text-red-500">Error: {ordersError}</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-600">
                    You haven't placed any orders yet.
                  </div>
                ) : (
                  <div className="divide-y">
                    {orders.map((order) => (
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-medium mb-4">My Addresses</h2>
                <div className="text-gray-600">
                  No addresses added yet.
                </div>
                {/* Add address form/list here */}
              </div>
            )}
            
            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-medium mb-4">Payment Methods</h2>
                <div className="text-gray-600">
                  No payment methods added yet.
                </div>
                {/* Add payment method form/list here */}
              </div>
            )}
            
            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-medium mb-4">My Wishlist</h2>
                <p className="text-gray-600">This section will display your wishlist items.</p>
                {/* Wishlist content will be rendered by the WishlistPage component directly */}
                <Link to="/wishlist" className="text-primary-600 hover:underline mt-4 inline-block">
                  Go to Wishlist
                </Link>
              </div>
            )}
            
            {/* Account Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-medium mb-4">Account Settings</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        defaultValue={`${user?.firstName || ''} ${user?.lastName || ''}`}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        defaultValue={user?.email || ''}
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save Changes
                    </button>
                  </form>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Password</h3>
                  <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
                      <input
                        type="password"
                        id="current-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
                      <input
                        type="password"
                        id="new-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Change Password
                    </button>
                  </form>
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