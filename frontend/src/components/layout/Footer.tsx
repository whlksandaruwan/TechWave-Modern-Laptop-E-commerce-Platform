import { Link } from 'react-router-dom';
import { Laptop, Facebook, Twitter, Instagram, Youtube, Mail, PhoneCall, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Laptop className="w-8 h-8 text-primary-400" />
              <span className="text-xl font-bold tracking-tight">TechWave</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Cutting-edge laptops for professionals, gamers, and everyone in between. 
              We deliver premium technology with exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/products?category=gaming" className="text-gray-400 hover:text-white transition-colors">
                  Gaming Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=business" className="text-gray-400 hover:text-white transition-colors">
                  Business Laptops
                </Link>
              </li>
              <li>
                <Link to="/products?category=ultrabook" className="text-gray-400 hover:text-white transition-colors">
                  Ultrabooks
                </Link>
              </li>
              <li>
                <Link to="/products?category=creator" className="text-gray-400 hover:text-white transition-colors">
                  Creator Laptops
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/account" className="text-gray-400 hover:text-white transition-colors">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors">
                  Technical Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  TechWave Headquarters<br />
                  1234 Innovation Way<br />
                  San Francisco, CA 94107
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneCall className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">support@techwave.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-medium text-sm mb-3">Subscribe to our newsletter</h4>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-grow px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} TechWave. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-300 text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-300 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;