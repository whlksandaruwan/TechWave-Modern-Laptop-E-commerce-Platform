import { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import NewProductsBanner from '../components/home/NewProductsBanner';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const HomePage = () => {
  useEffect(() => {
    // Update page title
    document.title = 'TechWave - Premium Laptops for Professionals';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <HeroSection />
      <FeaturedProducts />
      <CategorySection />
      <NewProductsBanner />
      <TestimonialsSection />
      <CTASection />
    </motion.div>
  );
};

export default HomePage;