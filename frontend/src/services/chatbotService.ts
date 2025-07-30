import { ChatMessage } from '../hooks/useChatbot';

export interface ProductRecommendation {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  specs?: {
    processor?: string;
    ram?: string;
    storage?: string;
  };
}

export class ChatbotService {
  private static instance: ChatbotService;
  private products: ProductRecommendation[] = [];

  private constructor() {
    this.initializeProducts();
  }

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  private async initializeProducts() {
    try {
      const response = await fetch('http://localhost:3000/api/laptops');
      if (response.ok) {
        const laptops = await response.json();
        this.products = laptops.map((laptop: any) => ({
          id: laptop.id,
          name: laptop.name,
          price: laptop.price,
          image: laptop.images[0] || '',
          category: laptop.categoryId,
          specs: laptop.specs,
        }));
      }
    } catch (error) {
      console.error('Failed to load products for chatbot:', error);
    }
  }

  public async generateResponse(userMessage: string): Promise<ChatMessage> {
    const message = userMessage.toLowerCase();
    const messageId = Date.now().toString();

    // Intent detection and response generation
    if (this.isGreeting(message)) {
      return this.createGreetingResponse(messageId);
    }

    if (this.isProductQuery(message)) {
      return this.createProductResponse(messageId, message);
    }

    if (this.isPricingQuery(message)) {
      return this.createPricingResponse(messageId, message);
    }

    if (this.isSpecificationQuery(message)) {
      return this.createSpecificationResponse(messageId, message);
    }

    if (this.isShippingQuery(message)) {
      return this.createShippingResponse(messageId);
    }

    if (this.isWarrantyQuery(message)) {
      return this.createWarrantyResponse(messageId);
    }

    if (this.isContactQuery(message)) {
      return this.createContactResponse(messageId);
    }

    if (this.isComparisonQuery(message)) {
      return this.createComparisonResponse(messageId);
    }

    return this.createDefaultResponse(messageId);
  }

  private isGreeting(message: string): boolean {
    const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
    return greetings.some(greeting => message.includes(greeting));
  }

  private isProductQuery(message: string): boolean {
    const productKeywords = ['laptop', 'gaming', 'business', 'macbook', 'dell', 'asus', 'lenovo', 'hp'];
    return productKeywords.some(keyword => message.includes(keyword));
  }

  private isPricingQuery(message: string): boolean {
    const pricingKeywords = ['price', 'cost', 'budget', 'cheap', 'expensive', 'affordable', 'deal'];
    return pricingKeywords.some(keyword => message.includes(keyword));
  }

  private isSpecificationQuery(message: string): boolean {
    const specKeywords = ['spec', 'ram', 'storage', 'processor', 'graphics', 'display', 'battery'];
    return specKeywords.some(keyword => message.includes(keyword));
  }

  private isShippingQuery(message: string): boolean {
    const shippingKeywords = ['shipping', 'delivery', 'ship', 'deliver', 'fast'];
    return shippingKeywords.some(keyword => message.includes(keyword));
  }

  private isWarrantyQuery(message: string): boolean {
    const warrantyKeywords = ['warranty', 'guarantee', 'support', 'repair', 'service'];
    return warrantyKeywords.some(keyword => message.includes(keyword));
  }

  private isContactQuery(message: string): boolean {
    const contactKeywords = ['contact', 'phone', 'email', 'support', 'help', 'talk', 'speak'];
    return contactKeywords.some(keyword => message.includes(keyword));
  }

  private isComparisonQuery(message: string): boolean {
    const comparisonKeywords = ['compare', 'vs', 'versus', 'difference', 'better', 'best'];
    return comparisonKeywords.some(keyword => message.includes(keyword));
  }

  private createGreetingResponse(messageId: string): ChatMessage {
    return {
      id: messageId,
      text: "Hello! 👋 Welcome to TechWave! I'm your personal laptop shopping assistant. I can help you find the perfect laptop, answer questions about specifications, pricing, shipping, and more. What can I help you with today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Show me gaming laptops', 'Business laptops', 'Budget options', 'Compare laptops', 'Shipping info']
    };
  }

  private createProductResponse(messageId: string, message: string): ChatMessage {
    let category = '';
    let filteredProducts: ProductRecommendation[] = [];

    if (message.includes('gaming')) {
      category = 'gaming';
      filteredProducts = this.products.filter(p => 
        p.category.toLowerCase().includes('gaming') || 
        p.name.toLowerCase().includes('gaming') ||
        p.name.toLowerCase().includes('rog')
      );
    } else if (message.includes('business') || message.includes('work')) {
      category = 'business';
      filteredProducts = this.products.filter(p => 
        p.category.toLowerCase().includes('business') ||
        p.name.toLowerCase().includes('thinkpad') ||
        p.name.toLowerCase().includes('latitude')
      );
    } else if (message.includes('macbook') || message.includes('apple')) {
      category = 'apple';
      filteredProducts = this.products.filter(p => 
        p.name.toLowerCase().includes('macbook')
      );
    } else {
      filteredProducts = this.products.slice(0, 3);
    }

    const responseText = category 
      ? `Great choice! Here are our top ${category} laptops that I'd recommend:`
      : "Here are some of our most popular laptops that might interest you:";

    return {
      id: messageId,
      text: responseText,
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Tell me more', 'Compare these', 'Show specifications', 'Check availability'],
      productLinks: filteredProducts.slice(0, 3).map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image
      }))
    };
  }

  private createPricingResponse(messageId: string, message: string): ChatMessage {
    let priceRange = '';
    let responseText = '';

    if (message.includes('budget') || message.includes('cheap') || message.includes('affordable')) {
      priceRange = 'budget';
      responseText = "I understand you're looking for budget-friendly options! We have excellent laptops starting from $899. Here are some great value options:";
    } else if (message.includes('expensive') || message.includes('premium') || message.includes('high-end')) {
      priceRange = 'premium';
      responseText = "For premium laptops with top-tier performance, here are our high-end recommendations:";
    } else {
      responseText = "Our laptops range from $899 to $2,999, offering great value at every price point. What's your budget range?";
    }

    const budgetProducts = priceRange === 'budget' 
      ? this.products.filter(p => p.price < 1500).slice(0, 3)
      : priceRange === 'premium'
      ? this.products.filter(p => p.price > 2000).slice(0, 3)
      : this.products.slice(0, 3);

    return {
      id: messageId,
      text: responseText,
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Under $1000', 'Under $1500', '$1500-$2000', 'Over $2000', 'Best value'],
      productLinks: budgetProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image
      }))
    };
  }

  private createSpecificationResponse(messageId: string, message: string): ChatMessage {
    let specType = '';
    let responseText = '';

    if (message.includes('ram') || message.includes('memory')) {
      specType = 'RAM';
      responseText = "For RAM, I recommend:\n• 8GB for basic tasks\n• 16GB for professional work\n• 32GB for heavy multitasking and creative work\n\nWhat type of work will you be doing?";
    } else if (message.includes('storage') || message.includes('ssd')) {
      specType = 'Storage';
      responseText = "For storage, consider:\n• 256GB SSD for basic use\n• 512GB SSD for most users\n• 1TB+ SSD for heavy files and media\n\nAll our laptops come with fast SSD storage!";
    } else if (message.includes('processor') || message.includes('cpu')) {
      specType = 'Processor';
      responseText = "We offer laptops with:\n• Intel Core i5/i7 for excellent performance\n• AMD Ryzen 5/7 for great value\n• Apple M3 for MacBooks\n\nWhat's your primary use case?";
    } else {
      responseText = "I'd be happy to explain laptop specifications! What would you like to know about?\n\n• Processor (CPU)\n• Memory (RAM)\n• Storage (SSD)\n• Graphics (GPU)\n• Display\n• Battery life";
    }

    return {
      id: messageId,
      text: responseText,
      isBot: true,
      timestamp: new Date(),
      suggestions: ['RAM requirements', 'Storage options', 'Processor comparison', 'Graphics cards', 'Display types']
    };
  }

  private createShippingResponse(messageId: string): ChatMessage {
    return {
      id: messageId,
      text: "🚚 Shipping Information:\n\n• FREE shipping on orders over $999\n• Standard delivery: 3-5 business days\n• Express shipping: 1-2 business days\n• All orders include tracking\n• International shipping available\n\nWe also offer contactless delivery and signature confirmation options!",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Express shipping cost', 'International shipping', 'Order tracking', 'Delivery options']
    };
  }

  private createWarrantyResponse(messageId: string): ChatMessage {
    return {
      id: messageId,
      text: "🛡️ Warranty & Support:\n\n• 2-year manufacturer warranty included\n• Extended warranty options available\n• 24/7 technical support\n• Free setup assistance\n• On-site repair services\n• 30-day money-back guarantee\n\nOur support team is always here to help!",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Extended warranty', 'Technical support', 'Setup help', 'Repair services']
    };
  }

  private createContactResponse(messageId: string): ChatMessage {
    return {
      id: messageId,
      text: "📞 Contact Our Team:\n\n• Phone: (555) 123-4567\n• Email: support@techwave.com\n• Live Chat: Right here!\n• Hours: 24/7 support available\n\nYou can also visit our contact page for more options. How would you prefer to get in touch?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Call now', 'Send email', 'Schedule callback', 'Visit contact page']
    };
  }

  private createComparisonResponse(messageId: string): ChatMessage {
    const topProducts = this.products.slice(0, 3);
    
    return {
      id: messageId,
      text: "I'd be happy to help you compare laptops! Here are some of our most popular models. Which ones would you like me to compare in detail?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Gaming vs Business', 'MacBook vs PC', 'Budget comparison', 'Spec comparison'],
      productLinks: topProducts.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image
      }))
    };
  }

  private createDefaultResponse(messageId: string): ChatMessage {
    return {
      id: messageId,
      text: "I'm here to help you find the perfect laptop! I can assist you with:\n\n🔍 Product recommendations\n💰 Pricing and deals\n⚙️ Specifications\n🚚 Shipping information\n🛡️ Warranty details\n📞 Contact support\n\nWhat would you like to know more about?",
      isBot: true,
      timestamp: new Date(),
      suggestions: ['Browse laptops', 'Compare products', 'Check prices', 'Shipping info', 'Contact support']
    };
  }

  public getProducts(): ProductRecommendation[] {
    return this.products;
  }

  public searchProducts(query: string): ProductRecommendation[] {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }
}

export const chatbotService = ChatbotService.getInstance();