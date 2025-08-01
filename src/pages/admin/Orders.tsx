import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Truck, 
  Clock, 
  XCircle 
} from 'lucide-react';
import { formatPrice } from '../../lib/utils';
import { Order } from '../../types';

const Orders = () => {
  useEffect(() => {
    document.title = 'Manage Orders - TechWave Admin';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <button
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Download className="w-5 h-5 mr-2" />
          Export Orders
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 p-8 text-center text-gray-500">
        Real order data will appear here once integrated.
      </div>
    </motion.div>
  );
};

export default Orders;