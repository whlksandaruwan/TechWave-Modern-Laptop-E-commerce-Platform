import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart } from 'lucide-react';

interface MacBook {
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
}

const MacBookSection = () => {
  const [macBooks, setMacBooks] = useState<MacBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMacBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/laptops');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allLaptops: MacBook[] = await response.json();
        
        // Filter for MacBooks (Apple products)
        const macBookProducts = allLaptops.filter(laptop => 
          laptop.name.toLowerCase().includes('macbook') ||
          laptop.name.toLowerCase().includes('apple') ||
          laptop.categoryId.toLowerCase().includes('apple') ||
          laptop.categoryId.toLowerCase().includes('macbook')
        );
        
        setMacBooks(macBookProducts.slice(0, 3)); // Show only first 3 MacBooks
      } catch (error) {
        console.error('Failed to fetch MacBooks:', error);
        // Fallback to sample data if API fails
        setMacBooks([
          {
            id: 'macbook-air-m2',
            name: 'MacBook Air M2',
            description: 'The most versatile MacBook Air ever. With the next-generation M2 chip, it delivers incredible performance and up to 18 hours of battery life.',
            price: 1199.99,
            specs: {
              processor: 'Apple M2 chip',
              ram: '8GB unified memory',
              storage: '256GB SSD',
              display: '13.6-inch Liquid Retina display',
              graphics: 'Integrated 10-core GPU',
              battery: 'Up to 18 hours'
            },
            images: ['https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
            stock: 15,
            categoryId: 'apple',
            featured: true
          },
          {
            id: 'macbook-pro-14-m3',
            name: 'MacBook Pro 14" M3 Pro',
            description: 'The most powerful MacBook Pro ever. With the M3 Pro chip, it delivers exceptional performance for pro workflows.',
            price: 1999.99,
            specs: {
              processor: 'Apple M3 Pro chip',
              ram: '18GB unified memory',
              storage: '512GB SSD',
              display: '14.2-inch Liquid Retina XDR display',
              graphics: 'Integrated 18-core GPU',
              battery: 'Up to 22 hours'
            },
            images: ['https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
            stock: 8,
            categoryId: 'apple',
            featured: true
          },
          {
            id: 'macbook-pro-16-m3-max',
            name: 'MacBook Pro 16" M3 Max',
            description: 'The ultimate MacBook Pro. With the M3 Max chip, it delivers desktop-class performance in a portable design.',
            price: 3499.99,
            specs: {
              processor: 'Apple M3 Max chip',
              ram: '32GB unified memory',
              storage: '1TB SSD',
              display: '16.2-inch Liquid Retina XDR display',
              graphics: 'Integrated 40-core GPU',
              battery: 'Up to 22 hours'
            },
            images: ['https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'],
            stock: 5,
            categoryId: 'apple',
            featured: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMacBooks();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience the Power of Mac
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Discover the latest MacBook lineup with Apple Silicon. Unmatched performance, 
              incredible battery life, and seamless integration with the Apple ecosystem.
            </p>
          </motion.div>
        </div>

        {/* MacBook Banner Photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* MacBook Banner Image */}
            <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-gray-900 to-black">
              <img
                src="https://photos5.appleinsider.com/gallery/product_pages/293-hero.jpg"
                alt="MacBook Pro Hero Banner"
                className="w-full h-full object-cover object-center"
              />
              
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              {/* Banner Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-8">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                    MacBooks
                  </h3>
                  <p className="text-xl md:text-2xl text-gray-200 mb-6 drop-shadow-lg">
                    Supercharged by New M Series Chip
                  </p>
                  <Link
                    to="/products?category=apple"
                    className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg shadow-lg"
                  >
                    <span>Shop MacBooks</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MacBook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {macBooks.map((macBook, index) => (
            <motion.div
              key={macBook.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              {/* Product Image */}
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={macBook.images[0] || 'https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2'}
                  alt={macBook.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    Apple
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600">4.9</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                  {macBook.name}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {macBook.description}
                </p>

                {/* Key Specs */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-16">Chip:</span>
                    <span>{macBook.specs.processor}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-16">Memory:</span>
                    <span>{macBook.specs.ram}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium w-16">Storage:</span>
                    <span>{macBook.specs.storage}</span>
                  </div>
                </div>

                {/* Price and Stock */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(macBook.price)}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    macBook.stock > 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {macBook.stock > 0 ? `${macBook.stock} in stock` : 'Out of stock'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/products/${macBook.id}`}
                    className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-center font-medium"
                  >
                    View Details
                  </Link>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/products?category=apple"
            className="inline-flex items-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg"
          >
            <span>Explore All MacBooks</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MacBookSection; 