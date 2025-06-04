import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Software Engineer',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'The ProBook Elite X1 has completely transformed my workflow. The performance is outstanding, and the battery life lets me work all day without worrying about finding a power outlet. Best purchase I\'ve made this year!',
    rating: 5,
    product: 'ProBook Elite X1'
  },
  {
    id: 2,
    name: 'Samantha Lee',
    role: 'Professional Gamer',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'As a competitive gamer, I need reliable equipment that can keep up with intense gaming sessions. The GameMaster RTX Pro exceeds all my expectations with its incredible performance and stunning display. Zero lag, zero compromises.',
    rating: 5,
    product: 'GameMaster RTX Pro'
  },
  {
    id: 3,
    name: 'David Chen',
    role: 'College Student',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'The UltraBook Air S is perfect for my college needs. It\'s lightweight enough to carry around campus all day, yet powerful enough to handle all my assignments and research projects. The battery life is phenomenal!',
    rating: 4,
    product: 'UltraBook Air S'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    role: 'Video Editor',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    content: 'I edit 4K videos daily for my job, and the StudioPro Creator Edition handles everything I throw at it with ease. The color-accurate display is a game-changer for my workflow. Highly recommended for any creative professional.',
    rating: 5,
    product: 'StudioPro Creator Edition'
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  
  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">
            Don't just take our word for it. Here's what customers think about our products.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 hidden md:block">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 hidden md:block">
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid md:grid-cols-5"
              >
                <div className="md:col-span-2 aspect-square md:aspect-auto">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 md:p-12 md:col-span-3 flex flex-col justify-center">
                  <div className="flex mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[currentIndex].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-8 italic">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  
                  <div>
                    <div className="font-bold text-lg mb-1">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-600 mb-2">
                      {testimonials[currentIndex].role}
                    </div>
                    <div className="text-primary-600 font-medium">
                      {testimonials[currentIndex].product} Owner
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Mobile navigation dots */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? "bg-primary-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;