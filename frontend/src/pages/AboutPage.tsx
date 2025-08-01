import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Award, 
  Shield, 
  Truck, 
  Heart, 
  Star,
  CheckCircle,
  Target,
  Zap,
  Globe,
  Building,
  Lightbulb,
  Rocket
} from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    document.title = 'About Us - TechWave';
  }, []);

  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: Users, color: 'from-tech-primary to-primary-500' },
    { label: 'Years of Experience', value: '15+', icon: Award, color: 'from-tech-secondary to-purple-500' },
    { label: 'Products Sold', value: '100,000+', icon: Star, color: 'from-accent-500 to-orange-500' },
    { label: 'Countries Served', value: '25+', icon: Globe, color: 'from-secondary-500 to-primary-500' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every laptop undergoes rigorous testing to ensure it meets our high standards for performance and reliability.',
      gradient: 'from-tech-primary to-primary-500'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above all else, providing exceptional support and service at every step.',
      gradient: 'from-tech-secondary to-purple-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to bring you the latest and most advanced laptop solutions.',
      gradient: 'from-accent-500 to-orange-500'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Our expert team carefully curates each product to match your specific needs and requirements.',
      gradient: 'from-secondary-500 to-primary-500'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'With over 20 years in the tech industry, Sarah founded TechWave to make premium laptops accessible to everyone.',
      gradient: 'from-tech-primary to-primary-500'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'Michael leads our technical team, ensuring we offer the most cutting-edge laptop technology available.',
      gradient: 'from-tech-secondary to-purple-500'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Customer Success',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'Emily oversees our customer support team, making sure every customer has an exceptional experience.',
      gradient: 'from-accent-500 to-orange-500'
    },
    {
      name: 'David Thompson',
      role: 'Product Manager',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'David curates our laptop selection, working with top manufacturers to bring you the best products.',
      gradient: 'from-secondary-500 to-primary-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="pt-16 md:pt-20"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full">
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="w-full h-full bg-gradient-to-br from-tech-primary/20 to-primary-500/20 rounded-full"
            />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 min-h-screen flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}TechWave
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Empowering professionals, creators, and enthusiasts with premium laptop technology since 2009
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-24 h-1 bg-gradient-to-r from-tech-primary to-primary-500 mx-auto rounded-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}Achievements
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Numbers that tell our story of growth, trust, and excellence in the laptop industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} text-white rounded-full mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                  {" "}Story
                </span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2009 by tech enthusiast Sarah Johnson, TechWave began as a small startup with a simple mission: 
                  to make high-quality laptops accessible to everyone, from students to professionals to creative artists.
                </p>
                <p>
                  What started in a small garage has grown into one of the most trusted names in laptop retail. We've built 
                  our reputation on three core principles: quality products, exceptional customer service, and competitive pricing.
                </p>
                <p>
                  Today, we serve customers in over 25 countries and have helped more than 50,000 people find their perfect 
                  laptop. Our team of experts works tirelessly to curate the best selection of laptops from top manufacturers, 
                  ensuring that every product meets our rigorous standards.
                </p>
                <p>
                  We're not just a retailer – we're your technology partner, committed to helping you find the perfect laptop 
                  that will empower your work, creativity, and digital lifestyle.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="TechWave team working" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white shadow-2xl p-6 rounded-xl border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-tech-primary to-primary-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">15+ Years</div>
                    <div className="text-sm text-gray-600">of Excellence</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Core
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}Values
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our customers every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${value.gradient} text-white rounded-lg mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Meet Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}Team
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our passionate team of technology experts is dedicated to helping you find the perfect laptop solution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="relative w-48 h-48 mx-auto">
                    <div className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="relative w-full h-full rounded-full object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                <p className={`text-transparent bg-clip-text bg-gradient-to-r ${member.gradient} font-medium mb-3`}>{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Why Choose
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}TechWave?
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're more than just a laptop retailer – we're your trusted technology partner.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-tech-primary to-primary-500 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on all orders over $999. Fast, secure delivery to your doorstep with tracking included.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-tech-secondary to-purple-500 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">2-Year Warranty</h3>
              <p className="text-gray-600">
                Comprehensive warranty coverage on all laptops, plus extended warranty options for extra peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent-500 to-orange-500 rounded-full mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Expert Support</h3>
              <p className="text-gray-600">
                24/7 customer support from our team of laptop experts. Get help choosing, setting up, or troubleshooting.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;