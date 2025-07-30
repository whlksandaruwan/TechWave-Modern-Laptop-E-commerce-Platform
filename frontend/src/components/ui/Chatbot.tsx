import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2,
  ShoppingBag,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Chatbot.css';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  productLinks?: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
}

interface ChatbotProps {
  className?: string;
}

const Chatbot = ({ className = '' }: ChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample product data for recommendations
  const sampleProducts = [
    {
      id: '1',
      name: 'MacBook Pro 16" M3 Pro',
      price: 2499.99,
      image: 'https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      price: 1199.99,
      image: 'https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '3',
      name: 'MacBook Pro 14" M3 Max',
      price: 3499.99,
      image: 'https://images.pexels.com/photos/3394346/pexels-photo-3394346.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '4',
      name: 'Dell XPS 15',
      price: 1999.99,
      image: 'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    },
    {
      id: '5',
      name: 'ASUS ROG Strix G15',
      price: 1599.99,
      image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const generateBotResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    const messageId = Date.now().toString();

    // Product-related queries
    if (message.includes('gaming') || message.includes('game')) {
      return {
        id: messageId,
        text: "Great choice! For gaming, I'd recommend our high-performance gaming laptops with dedicated graphics cards. Here are some popular options:",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Show me gaming laptops', 'What specs for gaming?', 'Gaming laptop budget?'],
        productLinks: sampleProducts.filter(p => p.name.includes('ROG') || p.name.includes('Gaming'))
      };
    }

    if (message.includes('business') || message.includes('work') || message.includes('office')) {
      return {
        id: messageId,
        text: "For business and professional work, I recommend laptops with excellent build quality, long battery life, and reliable performance. MacBooks are particularly popular for business use due to their reliability and seamless integration. Here are some great options:",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Business laptop features', 'Best for productivity', 'MacBooks for business', 'Lightweight options'],
        productLinks: sampleProducts.filter(p => p.name.includes('MacBook') || p.name.includes('Dell'))
      };
    }

    if (message.includes('budget') || message.includes('cheap') || message.includes('affordable')) {
      return {
        id: messageId,
        text: "I understand you're looking for budget-friendly options! We have several excellent laptops under $1500 that offer great value for money. What's your specific budget range?",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Under $1000', 'Under $1500', 'Best value laptops']
      };
    }

    if (message.includes('macbook') || message.includes('apple')) {
      return {
        id: messageId,
        text: "MacBooks are excellent for creative work and general productivity! We carry the latest MacBook Air and MacBook Pro models with Apple Silicon. They offer incredible performance, up to 22 hours of battery life, and seamless integration with the Apple ecosystem.",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['MacBook Air vs Pro', 'MacBook specs', 'MacBook pricing', 'Apple Silicon benefits'],
        productLinks: sampleProducts.filter(p => p.name.includes('MacBook'))
      };
    }

    if (message.includes('spec') || message.includes('specification') || message.includes('ram') || message.includes('storage')) {
      return {
        id: messageId,
        text: "I'd be happy to help you understand laptop specifications! What specific specs are you curious about? RAM, storage, processor, graphics card, or display?",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['RAM requirements', 'Storage options', 'Processor comparison', 'Graphics cards']
      };
    }

    if (message.includes('warranty') || message.includes('support')) {
      return {
        id: messageId,
        text: "All our laptops come with a minimum 2-year manufacturer warranty! We also offer extended warranty options and 24/7 technical support. Our support team is always ready to help you.",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Extended warranty', 'Technical support', 'Repair services']
      };
    }

    if (message.includes('shipping') || message.includes('delivery')) {
      return {
        id: messageId,
        text: "We offer free shipping on orders over $999! Standard delivery takes 3-5 business days, and we also have express shipping options available. All orders include tracking information.",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Express shipping', 'International shipping', 'Order tracking']
      };
    }

    if (message.includes('return') || message.includes('refund')) {
      return {
        id: messageId,
        text: "We have a 30-day money-back guarantee! If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund. Items must be in original condition.",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Return process', 'Refund timeline', 'Return conditions']
      };
    }

    if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
      return {
        id: messageId,
        text: "You can reach our support team in several ways:\n\n📞 Phone: (555) 123-4567\n📧 Email: support@techwave.com\n💬 Live chat (right here!)\n\nOur team is available 24/7 to help you!",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Schedule a call', 'Email support', 'Visit contact page']
      };
    }

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        id: messageId,
        text: "Hello! 👋 Welcome to TechWave! I'm here to help you find the perfect laptop. What are you looking for today?",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Gaming laptops', 'Business laptops', 'Budget options', 'MacBooks']
      };
    }

    if (message.includes('thank') || message.includes('thanks')) {
      return {
        id: messageId,
        text: "You're very welcome! 😊 Is there anything else I can help you with today? I'm here to make your laptop shopping experience as smooth as possible!",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Browse products', 'Contact support', 'Check warranty']
      };
    }

    // Default response
    return {
      id: messageId,
      text: "I'd be happy to help you with that! I can assist you with:\n\n• Product recommendations\n• Specifications and comparisons\n• Pricing and availability\n• Shipping and warranty info\n• Technical support\n\nWhat would you like to know more about?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Show me laptops', 'Compare products', 'Shipping info', 'Contact support']
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const initializeChat = () => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: "HI any question? 🤖 I'm TechWave, your personal shopping assistant, ready to help you find the perfect laptop. Whether you're looking for gaming, business, or MacBooks, I'm here to guide you through your options. What can I help you with today?",
        isBot: true,
        timestamp: new Date(),
        suggestions: ['Gaming laptops', 'Business laptops', 'MacBooks', 'Budget options', 'Compare products']
      };
      setMessages([welcomeMessage]);
    }
  };

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    initializeChat();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={openChat}
            className={`fixed bottom-6 right-6 z-50 bg-transparent hover:bg-transparent p-4 rounded-full shadow-2xl transition-all duration-300 robot-button ${className}`}
            aria-label="Open chat"
          >
                                      {/* Live Robot from Photo */}
            <div className="relative">
              {/* Dark Blue Circular Background with Live Glow */}
              <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center relative animate-pulse shadow-lg shadow-blue-800">
                {/* Robot Head - White Rounded Rectangle */}
                <div className="w-10 h-8 bg-white rounded-2xl relative shadow-md">
                  {/* Dark Blue Eyes - Horizontal Ovals with Live Glow */}
                  <div className="absolute top-2 left-1.5 w-2 h-1 bg-blue-800 rounded-full animate-pulse shadow-sm shadow-blue-800"></div>
                  <div className="absolute top-2 right-1.5 w-2 h-1 bg-blue-800 rounded-full animate-pulse shadow-sm shadow-blue-800" style={{ animationDelay: '0.2s' }}></div>
                  
                  {/* White Antenna with Live Movement */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-white rounded-full animate-bounce">
                    <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  </div>
                  
                  {/* Light Gray Neck */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300 rounded-b-2xl"></div>
                </div>
                
                {/* Light Blue Speech Bubble with Live Animation */}
                <div className="absolute -top-2 -right-2 w-8 h-6 bg-cyan-400 rounded-lg flex items-center justify-center animate-pulse shadow-md">
                  {/* Speech Bubble Tail */}
                  <div className="absolute bottom-1 left-0 w-0 h-0 border-l-2 border-b-2 border-cyan-400 border-transparent transform -translate-x-1"></div>
                  <div className="text-xs font-bold text-blue-800 animate-pulse">Hi!</div>
                </div>
              </div>
            </div>
            
            {/* Notification Dot */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 500 
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* Live White Robot Avatar */}
                  <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center relative animate-pulse shadow-sm shadow-blue-800">
                    {/* Robot Head - White Rounded Rectangle */}
                    <div className="w-5 h-4 bg-white rounded-xl relative shadow-sm">
                      {/* Dark Blue Eyes - Horizontal Ovals with Live Glow */}
                      <div className="absolute top-1 left-0.75 w-1 h-0.5 bg-blue-800 rounded-full animate-pulse shadow-sm shadow-blue-800"></div>
                      <div className="absolute top-1 right-0.75 w-1 h-0.5 bg-blue-800 rounded-full animate-pulse shadow-sm shadow-blue-800" style={{ animationDelay: '0.2s' }}></div>
                      
                      {/* White Antenna with Live Movement */}
                      <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.25 h-1 bg-white rounded-full animate-bounce">
                        <div className="absolute -top-0.25 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Light Gray Neck */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 rounded-b-xl"></div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">TechWave</h3>
                  <p className="text-xs text-white/80">Live • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isBot 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'bg-primary-600 text-white'
                      }`}>
                        <div className="flex items-start space-x-2">
                          {message.isBot && (
                            <Bot className="w-4 h-4 mt-1 text-primary-600 flex-shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                            
                            {/* Product Links */}
                            {message.productLinks && message.productLinks.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {message.productLinks.map((product) => (
                                  <Link
                                    key={product.id}
                                    to={`/products/${product.id}`}
                                    className="flex items-center space-x-3 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <img 
                                      src={product.image} 
                                      alt={product.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {product.name}
                                      </p>
                                      <p className="text-sm text-primary-600 font-semibold">
                                        {formatPrice(product.price)}
                                      </p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                  </Link>
                                ))}
                              </div>
                            )}
                            
                            {/* Suggestions */}
                            {message.suggestions && message.suggestions.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full hover:bg-primary-200 transition-colors"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          {!message.isBot && (
                            <User className="w-4 h-4 mt-1 text-white flex-shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-primary-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      disabled={isTyping}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSuggestionClick('Show me gaming laptops')}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Gaming</span>
                    </button>
                    <button
                      onClick={() => handleSuggestionClick('Business laptops')}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Business</span>
                    </button>
                    <Link
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Contact</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;