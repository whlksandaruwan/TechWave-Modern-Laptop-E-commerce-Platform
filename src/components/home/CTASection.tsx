import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

const CTASection = () => {
  const features = [
    'Free shipping on orders over $999',
    '30-day money-back guarantee',
    '24/7 technical support',
    'Extended warranty options',
    'Price match guarantee',
    'Secure checkout'
  ];

  return (
    <section className="py-20 bg-primary-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Upgrade Your Computing Experience?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-primary-100 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Join thousands of satisfied customers who have found their perfect laptop with TechWave. Browse our collection and find the ideal device that matches your needs and budget.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-accent-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors group"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg transition-colors"
              >
                Contact Sales
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Professional using a laptop" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20">
                    <div className="text-lg font-medium mb-2">Limited Time Offer</div>
                    <div className="text-2xl font-bold mb-3">Save up to 15% on select models</div>
                    <Link 
                      to="/products?sale=true" 
                      className="inline-block w-full text-center bg-white text-primary-900 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent-500 rounded-full opacity-20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-400 rounded-full opacity-10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;