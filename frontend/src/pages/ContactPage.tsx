import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Headphones,
  Shield,
  CheckCircle,
  Sparkles,
  Zap,
  Users,
  ArrowRight,
  Star,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us - TechWave';
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM PST',
      gradient: 'from-tech-primary to-primary-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@techwave.com',
      description: 'We reply within 24 hours',
      gradient: 'from-tech-secondary to-purple-500'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '1234 Innovation Way, San Francisco, CA 94107',
      description: 'Visit our showroom',
      gradient: 'from-accent-500 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9AM-6PM PST',
      description: 'Sat-Sun: 10AM-4PM PST',
      gradient: 'from-secondary-500 to-primary-500'
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      action: 'Start Chat',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Headphones,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      action: 'Call Now',
      gradient: 'from-violet-500 to-purple-500'
    },
    {
      icon: Shield,
      title: 'Technical Support',
      description: 'Get help with setup and troubleshooting',
      action: 'Get Help',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className=""
    >
      {/* Hero Section - Different Style */}
      <section className="relative min-h-screen bg-gradient-to-br from-tech-dark via-primary-900 to-tech-dark overflow-hidden">
        {/* Different Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full bg-gradient-to-br from-tech-primary/30 to-primary-500/30 rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-full h-full">
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full h-full bg-gradient-to-br from-primary-500/20 to-tech-primary/20 rounded-full"
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-tech-primary to-primary-500 rounded-full mb-8 shadow-2xl"
            >
              <MessageSquare className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Let's Start a
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                {" "}Conversation
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Ready to find your perfect laptop? Our team is here to help you make the right choice.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {[
                { icon: Star, text: "Expert Advice" },
                { icon: Shield, text: "Secure Support" },
                { icon: Globe, text: "24/7 Available" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-gray-300">
                  <item.icon className="w-4 h-4 text-tech-primary" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info - Different Layout */}
      <section className="py-20 bg-gradient-to-b from-tech-dark to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Get in
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}Touch
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose your preferred way to reach us. We're here to help you find the perfect laptop.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 space-y-6"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${info.gradient} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                      <p className="text-gray-200 font-medium">{info.details}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form - Center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-purple-500/20"
            >
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Send us a Message</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white backdrop-blur-sm"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales Question</option>
                    <option value="support">Technical Support</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Options - Different Style */}
      <section className="py-20 bg-gradient-to-b from-black to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Need
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}Immediate Help?
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get instant support through our various channels. We're here 24/7 to assist you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{option.title}</h3>
                  <p className="text-gray-300 mb-6">{option.description}</p>
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto">
                    <span>{option.action}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - Different Style */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Common
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}Questions
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Quick answers to the most frequently asked questions about our services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What's your return policy?",
                answer: "We offer a 30-day return policy for all laptops. Items must be in original condition with all accessories included."
              },
              {
                question: "Do you offer warranty on laptops?",
                answer: "Yes, all our laptops come with a minimum 2-year manufacturer warranty. Extended warranty options are also available."
              },
              {
                question: "How long does shipping take?",
                answer: "Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available for an additional fee."
              },
              {
                question: "Do you offer technical support?",
                answer: "Yes, we provide 24/7 technical support for all our customers. You can reach us via phone, email, or live chat."
              },
              {
                question: "Can I customize my laptop?",
                answer: "Many of our laptops offer customization options for RAM, storage, and other components. Contact us for specific models."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers. We also offer financing options for qualified customers."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer">
                    <h3 className="font-semibold text-white pr-4">{faq.question}</h3>
                    <div className="ml-4 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center group-open:rotate-45 transition-transform duration-300">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section - Different Style */}
      <section className="py-20 bg-gradient-to-b from-black to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">
              Visit Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-primary to-primary-400">
                {" "}Showroom
              </span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience our laptops in person at our San Francisco showroom. 
              Our experts are ready to help you find the perfect device.
            </p>
          </motion.div>

          <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md rounded-2xl h-96 flex items-center justify-center border border-purple-500/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-medium text-lg mb-2">Interactive Map</p>
              <p className="text-gray-400">1234 Innovation Way, San Francisco, CA 94107</p>
              <div className="mt-6">
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;