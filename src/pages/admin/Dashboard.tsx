import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Users, Package, AlertTriangle, TrendingUp, TrendingDown, ArrowRight, BarChart3 } from 'lucide-react';
import { mockDashboardStats, mockProducts } from '../../data/mockData';
import { formatPrice } from '../../lib/utils';

const Dashboard = () => {
  const [stats, setStats] = useState(mockDashboardStats);
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('week');
  
  useEffect(() => {
    // Update page title
    document.title = 'Admin Dashboard - TechWave';
  }, []);

  // Function to get percentage change
  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  // Top products that need restocking
  const lowStockProducts = mockProducts
    .filter(product => product.stock < 15)
    .sort((a, b) => a.stock - b.stock)
    .slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, Admin! Here's what's happening with your store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-500 text-sm font-medium">Total Revenue</h2>
            <div className="p-2 bg-blue-50 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">{formatPrice(stats.totalRevenue)}</div>
          <div className="flex items-center">
            <div className="flex items-center text-green-500 mr-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">8.2%</span>
            </div>
            <span className="text-gray-500 text-sm">vs. last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-500 text-sm font-medium">Total Orders</h2>
            <div className="p-2 bg-purple-50 rounded-full">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">{stats.totalOrders}</div>
          <div className="flex items-center">
            <div className="flex items-center text-green-500 mr-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">5.3%</span>
            </div>
            <span className="text-gray-500 text-sm">vs. last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-500 text-sm font-medium">Total Customers</h2>
            <div className="p-2 bg-green-50 rounded-full">
              <Users className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">{stats.totalCustomers}</div>
          <div className="flex items-center">
            <div className="flex items-center text-green-500 mr-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">12.1%</span>
            </div>
            <span className="text-gray-500 text-sm">vs. last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-500 text-sm font-medium">Low Stock Items</h2>
            <div className="p-2 bg-amber-50 rounded-full">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">{stats.lowStockProducts}</div>
          <div className="flex items-center">
            <div className="flex items-center text-red-500 mr-2">
              <TrendingDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">2 items</span>
            </div>
            <span className="text-gray-500 text-sm">need attention</span>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium">Revenue Overview</h2>
            <div className="flex space-x-2">
              {(['day', 'week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeRange === range
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p>Chart visualization would appear here with actual data</p>
              <p>Showing revenue data for the last {timeRange}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-medium">Top Selling Products</h2>
            <Link 
              to="/admin/products" 
              className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-6">
            {stats.topSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-medium text-gray-700">
                  {index + 1}
                </div>
                <div className="ml-3 flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.units} units</div>
                </div>
                <div className="font-medium">{formatPrice(product.revenue)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders and Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="font-medium">Recent Orders</h2>
            <Link 
              to="/admin/orders" 
              className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      John Doe
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(Date.now() - Math.random() * 604800000).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(Math.floor(Math.random() * 2000) + 500)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        index % 3 === 0 
                          ? 'bg-green-100 text-green-800' 
                          : index % 3 === 1 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {index % 3 === 0 ? 'Completed' : index % 3 === 1 ? 'Shipped' : 'Processing'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="font-medium">Low Stock Alert</h2>
            <Link 
              to="/admin/products" 
              className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockProducts.map((product) => (
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.stock} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.stock < 5 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.stock < 5 ? 'Critical' : 'Low'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-800">
                        Restock
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;