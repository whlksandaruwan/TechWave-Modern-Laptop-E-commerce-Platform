import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { mockCategories } from '../../data/mockData';

const CategorySection = () => {
  const categories = [
    { 
      id: 'gaming', 
      name: 'Gaming Laptops', 
      description: 'High-performance machines built for immersive gaming experiences.',
      image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-red-500/80 to-purple-600/80'
    },
    { 
      id: 'business', 
      name: 'Business Laptops', 
      description: 'Professional-grade laptops designed for productivity and reliability.',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-blue-500/80 to-indigo-600/80'
    },
    { 
      id: 'ultraportable', 
      name: 'Ultrabooks', 
      description: 'Thin and light laptops offering the perfect balance of portability and performance.',
      image: 'https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-teal-500/80 to-emerald-600/80'
    },
    { 
      id: 'content-creation', 
      name: 'Creator Laptops', 
      description: 'Powerful machines optimized for video editing, 3D modeling, and design work.',
      image: 'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      color: 'from-orange-500/80 to-pink-600/80'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop By Category</h2>
          <p className="text-gray-600">
            We offer a wide range of laptops to meet your specific needs, whether you're a gamer, professional, student, or content creator.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative h-80 rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{category.description}</p>
                <Link 
                  to={`/products?category=${category.id}`}
                  className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  View Collection
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-6 text-center hover:shadow-md transition-shadow"
            >
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} products</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;