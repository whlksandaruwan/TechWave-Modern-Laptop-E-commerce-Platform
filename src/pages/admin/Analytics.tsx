import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { formatPrice } from '../../lib/utils';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
}

interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

const Analytics = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Analytics - TechWave Admin';
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Generate realistic mock data based on time range
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
      const mockSalesData: SalesData[] = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Generate realistic revenue (higher on weekends, seasonal variations)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        const baseRevenue = isWeekend ? 18000 : 12000;
        const variation = Math.random() * 8000 - 4000;
        const revenue = Math.max(5000, baseRevenue + variation);
        const orders = Math.floor(revenue / 180); // Average order value ~$180
        
        mockSalesData.push({
          date: date.toISOString().split('T')[0],
          revenue: Math.round(revenue),
          orders
        });
      }

      const mockCategoryData: CategoryData[] = [
        { name: 'Gaming Laptops', value: 45200, percentage: 35, color: '#3B82F6' },
        { name: 'Business Laptops', value: 38900, percentage: 30, color: '#10B981' },
        { name: 'Ultrabooks', value: 25600, percentage: 20, color: '#F59E0B' },
        { name: 'Creator Laptops', value: 19300, percentage: 15, color: '#EF4444' },
      ];

      setSalesData(mockSalesData);
      setCategoryData(mockCategoryData);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalOrders = salesData.reduce((sum, day) => sum + day.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
  // Calculate growth compared to previous period
  const currentPeriodRevenue = salesData.slice(-Math.floor(salesData.length / 2)).reduce((sum, day) => sum + day.revenue, 0);
  const previousPeriodRevenue = salesData.slice(0, Math.floor(salesData.length / 2)).reduce((sum, day) => sum + day.revenue, 0);
  const revenueGrowth = previousPeriodRevenue > 0 ? ((currentPeriodRevenue - previousPeriodRevenue) / previousPeriodRevenue) * 100 : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Detailed insights into your store performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(totalRevenue)}</p>
              <div className="flex items-center mt-2">
                {revenueGrowth >= 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs previous period</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalOrders.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">8.2%</span>
                <span className="text-sm text-gray-500 ml-1">vs previous period</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(avgOrderValue)}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">5.4%</span>
                <span className="text-sm text-gray-500 ml-1">vs previous period</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <p className="text-sm text-gray-500 mt-1">Daily revenue over the selected period</p>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between space-x-1">
              {salesData.slice(-14).map((day, index) => {
                const maxRevenue = Math.max(...salesData.map(d => d.revenue));
                const height = (day.revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div
                      className="w-full bg-primary-500 rounded-t-sm transition-all duration-300 hover:bg-primary-600 cursor-pointer relative"
                      style={{ height: `${height}%`, minHeight: '4px' }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {formatPrice(day.revenue)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-left">
                      {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Sales by Category</h2>
            <p className="text-sm text-gray-500 mt-1">Revenue breakdown by product category</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">{category.percentage}%</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(category.value)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <div className="flex rounded-full overflow-hidden h-3">
                {categoryData.map((category, index) => (
                  <div
                    key={index}
                    className="h-full transition-all duration-300 hover:opacity-80"
                    style={{
                      backgroundColor: category.color,
                      width: `${category.percentage}%`
                    }}
                    title={`${category.name}: ${category.percentage}%`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
          <p className="text-sm text-gray-500 mt-1">Key performance indicators for your store</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">2.4%</div>
              <div className="text-sm text-gray-500 mt-1">Conversion Rate</div>
              <div className="text-xs text-green-600 mt-1">+0.3% from last month</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">3.2</div>
              <div className="text-sm text-gray-500 mt-1">Avg Items per Order</div>
              <div className="text-xs text-green-600 mt-1">+0.1 from last month</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">12.5%</div>
              <div className="text-sm text-gray-500 mt-1">Return Rate</div>
              <div className="text-xs text-red-600 mt-1">+1.2% from last month</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-500 mt-1">Customer Rating</div>
              <div className="text-xs text-green-600 mt-1">+0.2 from last month</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;