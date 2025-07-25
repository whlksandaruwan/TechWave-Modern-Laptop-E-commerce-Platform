import { useEffect, useState } from 'react';
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
  Code,
  Lightbulb,
  Rocket
} from 'lucide-react';

const AboutPage = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);

  useEffect(() => {
    document.title = 'About Us - TechWave';
  }, []);

  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Years of Experience', value: '15+', icon: Award },
    { label: 'Products Sold', value: '100,000+', icon: Star },
    { label: 'Countries Served', value: '25+', icon: Globe },
  ];

  const timeline = [
    {
      year: '2009',
      title: 'The Beginning',
      description: 'Founded in a small garage with a vision to democratize access to premium laptops.',
      icon: Lightbulb
    },
    {
      year: '2012',
      title: 'First Milestone',
      description: 'Reached 1,000 customers and expanded to our first physical showroom.',
      icon: Rocket
    },
    {
      year: '2016',
      title: 'Going Global',
      description: 'Launched international shipping and opened offices in 5 countries.',
      icon: Globe
    },
    {
      year: '2020',
      title: 'Digital Innovation',
      description: 'Launched our advanced AI-powered laptop recommendation system.',
      icon: Code
    },
    {
      year: '2024',
      title: 'Industry Leader',
      description: 'Became the #1 trusted laptop retailer with 50,000+ satisfied customers.',
      icon: Award
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every laptop undergoes rigorous testing to ensure it meets our high standards for performance and reliability.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above all else, providing exceptional support and service at every step.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We stay ahead of technology trends to bring you the latest and most advanced laptop solutions.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Our expert team carefully curates each product to match your specific needs and requirements.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'With over 20 years in the tech industry, Sarah founded TechWave to make premium laptops accessible to everyone.'
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'Michael leads our technical team, ensuring we offer the most cutting-edge laptop technology available.'
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Customer Success',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'Emily oversees our customer support team, making sure every customer has an exceptional experience.'
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'David Thompson',
      role: 'Product Manager',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      bio: 'David curates our laptop selection, working with top manufacturers to bring you the best products.'
      linkedin: '#',
      twitter: '#'
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
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Story of Innovation
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              From a small garage startup to the world's most trusted laptop retailer - discover the journey that shaped TechWave
            </p>
            <motion.div 
              className="w-24 h-1 bg-accent-500 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1, delay: 0.5 }}
            ></motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fifteen years of innovation, growth, and dedication to bringing you the best laptop technology.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 to-primary-600"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  onMouseEnter={() => setActiveTimeline(index)}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-lg bg-primary-100 text-primary-600 ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10">
                    <motion.div
                      className="absolute inset-0 bg-primary-400 rounded-full"
                      animate={{
                        scale: activeTimeline === index ? [1, 1.5, 1] : 1,
                        opacity: activeTimeline === index ? [1, 0.5, 1] : 1
                      }}
                      transition={{ duration: 1, repeat: activeTimeline === index ? Infinity : 0 }}
                    />
                  </div>
                  
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className="text-3xl font-bold text-primary-600">{item.year}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">By the Numbers</h2>
            <p className="text-gray-600">Our achievements speak for themselves</p>
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
                <motion.div 
                  className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <stat.icon className="w-8 h-8" />
                </motion.div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The TechWave Mission</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At TechWave, we believe that the right laptop can transform lives. Whether you're a student pursuing your dreams, 
                  a professional building your career, or a creator bringing ideas to life, we're here to power your journey.
                </p>
                <p>
                  Our commitment goes beyond just selling laptops. We're technology consultants, problem solvers, and innovation partners. 
                  Every recommendation we make is backed by deep expertise and genuine care for your success.
                </p>
                <p>
                  We've built lasting relationships with leading manufacturers, allowing us to offer exclusive models, 
                  competitive pricing, and extended warranties that you won't find anywhere else.
                </p>
                <p>
                  Join the TechWave family and discover why thousands of customers trust us with their most important technology decisions.
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
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="TechWave team working" 
                  className="rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-2xl"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <div className="font-bold text-gray-900">Award Winning</div>
                    <div className="text-sm text-gray-600">Customer Service</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-primary-600 text-white p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">4.9/5</div>
                  <div className="text-sm opacity-90">Customer Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that drive our decisions and define our culture.
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
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-2"
              >
                <motion.div 
                  className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-lg mb-4 group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 10 }}
                >
                  <value.icon className="w-6 h-6" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The visionaries and experts who guide TechWave's mission to revolutionize laptop retail.
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
                className="text-center group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
                <div className="flex justify-center space-x-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={member.linkedin} className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gradient-to-br from-primary-900 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Driving the future of technology retail through innovation, expertise, and unwavering commitment to our customers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-primary-100">
                To empower individuals and businesses with cutting-edge laptop technology, 
                exceptional service, and expert guidance that transforms how they work, create, and connect.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-primary-100">
                To be the global leader in laptop retail, setting new standards for customer experience, 
                product innovation, and technological excellence in the digital age.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The TechWave Advantage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for laptop buyers worldwide.
            </p>
          </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Lightning Fast Delivery</h3>
              <p className="text-gray-600">
                Free shipping on orders over $999 with same-day processing and tracking. Your perfect laptop, delivered fast.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Comprehensive Protection</h3>
              <p className="text-gray-600">
                Industry-leading 2-year warranty plus optional extended coverage. Your investment is protected.
              </p>
            </motion.div>
              </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-6">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Expert Guidance</h3>
              <p className="text-gray-600">
                24/7 support from certified laptop specialists. Get personalized recommendations and technical assistance.
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
export default AboutPage;