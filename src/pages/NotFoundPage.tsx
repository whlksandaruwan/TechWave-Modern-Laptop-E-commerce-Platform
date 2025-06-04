import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Frown, Home, Search } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 md:pt-20"
    >
      <div className="max-w-md">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Frown className="w-12 h-12 text-gray-500" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/" 
            className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <Link 
            to="/products" 
            className="flex items-center justify-center px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Products
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;