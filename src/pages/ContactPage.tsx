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
  Zap,
  Calendar,
  Star,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general',
    urgency: 'normal'
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
      phone: '',
      subject: '',
      message: '',
      category: 'general',
      urgency: 'normal'
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Available 24/7 for urgent support',
      action: 'Call Now',
      color: 'bg-green-500'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'support@techwave.com',
      description: 'Response within 2 hours during business hours',
      action: 'Send Email',
      color: 'bg-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      details: 'Instant messaging support',
      description: 'Get immediate help from our experts',
      action: 'Start Chat',
      color: 'bg-purple-500'
    },
    {
      icon: Calendar,
      title: 'Schedule Call',
      details: 'Book a consultation',
      description: 'One-on-one laptop consultation',
      action: 'Book Now',
      color: 'bg-orange-500'
    }
  ];

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'General Support',
      description: 'Questions about products, orders, or account',
      responseTime: '< 2 hours',
      availability: '24/7'
    },
    {
      icon: Headphones,
      title: 'Technical Support',
      description: 'Setup assistance, troubleshooting, and repairs',
      responseTime: '< 30 minutes',
      availability: 'Business hours'
    },
    {
      icon: Shield,
      title: 'Sales Consultation',
      description: 'Expert advice on choosing the perfect laptop',
      responseTime: 'Immediate',
      availability: 'Mon-Fri 9AM-8PM'
    },
    {
      icon: Zap,
      title: 'Priority Support',
      description: 'Expedited support for business customers',
      responseTime: '< 15 minutes',
      availability: '24/7'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '1234 Innovation Way, San Francisco, CA 94107',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-6PM',
      type: 'Headquarters & Showroom'
    },
    {
      city: 'New York',
      address: '567 Tech Avenue, New York, NY 10001',
      phone: '+1 (555) 234-5678',
      hours: 'Mon-Fri: 9AM-7PM, Sat-Sun: 10AM-6PM',
      type: 'Showroom & Service Center'
    },
    {
      city: 'Austin',
      address: '890 Digital Drive, Austin, TX 78701',
      phone: '+1 (555) 345-6789',
      hours: 'Mon-Fri: 9AM-7PM, Sat: 10AM-6PM',
      type: 'Service Center'
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
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-24 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto relative z-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Whether you need product advice, technical support, or have questions about your order, 
              our expert team is ready to assist you 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-sm">4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Zap className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm">< 2 Hour Response Time</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-sm">24/7 Support Available</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Choose Your Preferred Contact Method</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us, all designed to get you the help you need as quickly as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${info.color} rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-800 font-medium mb-1">{info.details}</p>
                <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                  {info.action}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Form and Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 h-fit"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4">
                  <Send className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Send us a Message</h2>
                  <p className="text-gray-600 text-sm">We'll respond within 2 hours</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Product Information</option>
                    <option value="support">Technical Support</option>
                    <option value="warranty">Warranty & Returns</option>
                    <option value="business">Business Solutions</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="low">Low - General question</option>
                    <option value="normal">Normal - Standard inquiry</option>
                    <option value="high">High - Need quick response</option>
                    <option value="urgent">Urgent - Critical issue</option>
                  </select>
                </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:shadow-lg transform hover:-translate-y-0.5"
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

            {/* Support Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-6">Support Options</h2>
                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <option.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                          <h4 className="font-semibold text-gray-900 mb-2">{option.title}</h4>
                          <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center text-green-600">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>Response: {option.responseTime}</span>
                            </div>
                            <div className="flex items-center text-blue-600">
                              <Calendar className="w-3 h-3 mr-1" />
                              <span>{option.availability}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-6 border border-primary-100">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="font-medium text-gray-900">9:00 AM - 8:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Saturday</span>
                    <span className="font-medium text-gray-900">10:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sunday</span>
                    <span className="font-medium text-gray-900">12:00 PM - 5:00 PM PST</span>
                  </div>
                  <div className="border-t border-primary-200 pt-3 mt-3">
                    <div className="flex items-center text-green-600">
                      <Zap className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">Emergency support available 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Visit Our Locations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience our laptops in person at one of our showrooms across the country.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{location.city}</h3>
                    <p className="text-sm text-primary-600">{location.type}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{location.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{location.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{location.hours}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                  Get Directions
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Quick Answers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find instant answers to the most common questions about our products and services.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How fast is your shipping?",
                answer: "Free standard shipping (3-5 days) on orders over $999. Express shipping (1-2 days) available for $29.99."
              },
              {
                question: "What's your return policy?",
                answer: "30-day hassle-free returns. Items must be in original condition with all accessories included."
              },
              {
                question: "Do you offer warranty?",
                answer: "All laptops include a 2-year manufacturer warranty. Extended warranty options available at checkout."
              },
              {
                question: "Can I try before buying?",
                answer: "Yes! Visit any of our showrooms for hands-on testing, or use our 14-day trial program."
              },
              {
                question: "Do you offer business discounts?",
                answer: "Yes, we offer volume discounts and special pricing for businesses, schools, and organizations."
              },
              {
                question: "Is technical support included?",
                answer: "Absolutely! Free lifetime technical support via phone, chat, or email for all customers."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;