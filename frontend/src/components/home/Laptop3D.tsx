import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Laptop3D = () => {
  const laptopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!laptopRef.current) return;
      
      const rect = laptopRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 10;
      const rotateY = (centerX - e.clientX) / 10;
      
      laptopRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!laptopRef.current) return;
      laptopRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    const element = laptopRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-150 animate-pulse-slow" />
      
      {/* 3D Laptop Container */}
      <motion.div
        ref={laptopRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative transition-transform duration-300 ease-out cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Laptop Base */}
        <div className="relative">
          {/* Laptop Screen */}
          <div 
            className="w-80 h-52 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg border-4 border-gray-700 relative overflow-hidden shadow-2xl"
            style={{ transform: 'rotateX(-10deg) translateZ(20px)' }}
          >
            {/* Screen Content */}
            <div className="absolute inset-2 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-md overflow-hidden">
              {/* Animated Code Lines */}
              <div className="p-4 space-y-2">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  />
                ))}
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Screen Bezel */}
            <div className="absolute inset-0 border-2 border-gray-600 rounded-md pointer-events-none" />
            
            {/* Camera */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full" />
          </div>
          
          {/* Laptop Keyboard Base */}
          <div 
            className="w-80 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-b-lg border-4 border-gray-600 relative shadow-2xl"
            style={{ transform: 'translateZ(0px)' }}
          >
            {/* Keyboard */}
            <div className="p-4">
              <div className="grid grid-cols-12 gap-1 mb-2">
                {[...Array(48)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-3 bg-gray-600 rounded-sm"
                    whileHover={{ scale: 1.1, backgroundColor: '#4F46E5' }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>
              
              {/* Spacebar */}
              <div className="flex justify-center mt-2">
                <motion.div
                  className="w-32 h-3 bg-gray-600 rounded-sm"
                  whileHover={{ scale: 1.05, backgroundColor: '#4F46E5' }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
            
            {/* Trackpad */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gray-600 rounded-md border border-gray-500" />
            
            {/* Brand Logo */}
            <div className="absolute top-2 right-4 text-xs font-bold text-gray-400">
              TechWave
            </div>
          </div>
        </div>
        
        {/* Reflection */}
        <div 
          className="absolute top-full left-0 w-80 h-32 bg-gradient-to-b from-white/10 to-transparent rounded-b-lg blur-sm opacity-30"
          style={{ transform: 'rotateX(180deg) translateY(10px)' }}
        />
      </motion.div>
      
      {/* Floating Tech Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border border-blue-400/30 rounded-lg"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Laptop3D;