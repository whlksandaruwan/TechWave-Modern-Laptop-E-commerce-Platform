import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Laptop3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -10, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !laptopRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateY = ((e.clientX - centerX) / rect.width) * 60; // Max 60 degrees
      const rotateX = -10 + ((e.clientY - centerY) / rect.height) * 20; // Base -10 degrees + variation
      
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: -10, y: 0 });
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseenter', handleMouseEnter);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer"
    >
      {/* Enhanced ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-150 animate-pulse-slow" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-blue-600/15 rounded-full blur-2xl scale-125" />
      
      {/* Main laptop container with smooth transitions */}
      <motion.div
        ref={laptopRef}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotateX: rotation.x,
          rotateY: rotation.y
        }}
        transition={{ 
          scale: { duration: 1, ease: "easeOut" },
          opacity: { duration: 1, ease: "easeOut" },
          rotateX: { duration: 0.3, ease: "easeOut" },
          rotateY: { duration: 0.3, ease: "easeOut" }
        }}
        className="relative"
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1500px'
        }}
      >
        {/* Laptop Screen */}
        <div 
          className="relative w-[420px] h-[280px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-t-3xl border-4 border-gray-700 overflow-hidden shadow-2xl"
          style={{ 
            transform: 'rotateX(-15deg) translateZ(30px)',
            boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Screen bezel with realistic thickness */}
          <div className="absolute inset-0 border-4 border-gray-600 rounded-2xl">
            {/* Inner screen area with AERO 17 inspired design */}
            <div className="absolute inset-4 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 rounded-xl overflow-hidden">
              {/* Colorful wallpaper inspired by the image */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-blue-500/30">
                {/* Floating colorful shapes */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-8 left-8 w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full opacity-80"
                />
                <motion.div
                  animate={{ 
                    scale: [1.1, 1, 1.1],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute top-12 right-12 w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-70"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-12 left-16 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-75"
                />
                <motion.div
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [180, 0, -180]
                  }}
                  transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-8 right-8 w-18 h-18 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-80"
                />
              </div>
              
              {/* AERO 17 branding */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-white mb-2 tracking-wider">
                    AERO 17
                  </div>
                  <div className="text-sm text-white/80 tracking-widest">
                    AERO
                  </div>
                </motion.div>
              </div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.5, 0.5],
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      delay: Math.random() * 4,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Webcam */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full border border-gray-600">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-blue-400 rounded-full m-0.75"
            />
          </div>
          
          {/* Screen reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
        </div>
        
        {/* Laptop Base/Keyboard with RGB lighting */}
        <div 
          className="relative w-[420px] h-[300px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-b-3xl border-4 border-gray-600 shadow-2xl"
          style={{ 
            transform: 'translateZ(0px)',
            boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.7), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* RGB Keyboard with realistic layout */}
          <div className="p-8">
            {/* Function keys row */}
            <div className="grid grid-cols-12 gap-1 mb-3">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border border-gray-500 shadow-sm"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 12px ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'][i % 6]}`
                  }}
                  animate={{
                    backgroundColor: isHovered ? [
                      '#4B5563', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'
                    ][i % 6] : '#4B5563'
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
            
            {/* Main keyboard rows with RGB effect */}
            {[...Array(4)].map((_, row) => (
              <div key={row} className="grid grid-cols-14 gap-1 mb-3">
                {[...Array(14)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border border-gray-500 shadow-sm"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 15px ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8000'][i % 7]}`
                    }}
                    animate={{
                      backgroundColor: isHovered ? [
                        '#4B5563', '#EF4444', '#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'
                      ][(i + row) % 7] : '#4B5563',
                      boxShadow: isHovered ? `0 0 8px ${['#ff000040', '#00ff0040', '#0000ff40', '#ffff0040', '#ff00ff40', '#00ffff40', '#ff800040'][(i + row) % 7]}` : 'none'
                    }}
                    transition={{ duration: 0.2, delay: (i + row) * 0.01 }}
                  />
                ))}
              </div>
            ))}
            
            {/* Spacebar with RGB underglow */}
            <div className="flex justify-center mt-4">
              <motion.div
                className="w-48 h-4 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border border-gray-500 shadow-sm relative"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px #00ffff'
                }}
                animate={{
                  boxShadow: isHovered ? '0 0 15px #00ffff40' : 'none'
                }}
                transition={{ duration: 0.1 }}
              >
                {/* Underglow effect */}
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-sm opacity-60" />
              </motion.div>
            </div>
          </div>
          
          {/* Enhanced trackpad with glass effect */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl border border-gray-600 shadow-inner">
            <div className="absolute inset-1 bg-gradient-to-b from-gray-600 to-gray-700 rounded-lg overflow-hidden">
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg" />
              {/* Click areas */}
              <div className="absolute bottom-0 left-0 right-0 h-4 border-t border-gray-500">
                <div className="w-1/2 h-full border-r border-gray-500"></div>
              </div>
            </div>
          </div>
          
          {/* AERO branding with glow */}
          <div className="absolute top-4 right-8">
            <motion.div
              animate={{ 
                opacity: [0.7, 1, 0.7],
                textShadow: ['0 0 5px #3B82F6', '0 0 15px #3B82F6', '0 0 5px #3B82F6']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            >
              AERO
            </motion.div>
          </div>
          
          {/* Power button with LED */}
          <div className="absolute top-4 right-4 w-4 h-4 bg-gray-600 rounded-full border border-gray-500 overflow-hidden">
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                backgroundColor: ['#3B82F6', '#10B981', '#3B82F6']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full m-1"
            />
          </div>
          
          {/* Ventilation grilles with realistic detail */}
          <div className="absolute bottom-3 left-8 right-8 flex justify-between">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1 h-8 bg-gray-900 rounded-full opacity-70 shadow-inner" />
            ))}
          </div>
          
          {/* Side ports */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 space-y-2">
            <div className="w-2 h-3 bg-gray-900 rounded-r-sm border border-gray-700" />
            <div className="w-2 h-4 bg-gray-900 rounded-r-sm border border-gray-700" />
            <div className="w-2 h-2 bg-gray-900 rounded-r-sm border border-gray-700" />
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 space-y-2">
            <div className="w-2 h-3 bg-gray-900 rounded-l-sm border border-gray-700" />
            <div className="w-2 h-4 bg-gray-900 rounded-l-sm border border-gray-700" />
          </div>
        </div>
        
        {/* Enhanced reflection with perspective */}
        <div 
          className="absolute top-full left-0 w-[420px] h-48 bg-gradient-to-b from-white/20 via-white/10 to-transparent rounded-b-3xl blur-sm opacity-50"
          style={{ 
            transform: 'rotateX(180deg) translateY(20px) scaleY(0.7)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)'
          }}
        />
      </motion.div>
      
      {/* Enhanced floating tech elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/50 rounded-lg backdrop-blur-sm"
            style={{
              width: `${15 + Math.random() * 25}px`,
              height: `${15 + Math.random() * 25}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.9, 0.3],
              borderColor: [
                'rgba(59, 130, 246, 0.5)',
                'rgba(147, 51, 234, 0.5)',
                'rgba(236, 72, 153, 0.5)',
                'rgba(59, 130, 246, 0.5)'
              ]
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>
      
      {/* Multi-layered ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-3/4 left-1/3 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl"
        />
      </div>
      
      {/* Interactive hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium"
      >
        Move your mouse to rotate
      </motion.div>
    </div>
  );
};

export default Laptop3D;