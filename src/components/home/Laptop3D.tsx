import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Laptop3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !laptopRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateY = 5 + ((e.clientX - centerX) / rect.width) * 30; // Base 5 degrees + variation
      const rotateX = -15 + ((e.clientY - centerY) / rect.height) * 15; // Base -15 degrees + variation
      
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: -15, y: 5 });
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
      {/* Ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-full blur-3xl scale-150 animate-pulse-slow" />
      
      {/* Main laptop container */}
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
          perspective: '1200px'
        }}
      >
        {/* Laptop Screen */}
        <div 
          className="relative w-[450px] h-[280px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-t-2xl border-2 border-gray-700 overflow-hidden shadow-2xl"
          style={{ 
            transform: 'rotateX(-8deg) translateZ(25px)',
            boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Screen bezel */}
          <div className="absolute inset-0 border-2 border-gray-600 rounded-xl">
            {/* Screen content */}
            <div className="absolute inset-3 bg-black rounded-lg overflow-hidden">
              {/* Colorful abstract wallpaper */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-blue-600/80 to-cyan-500/80">
                {/* Floating geometric shapes */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                    x: [0, 20, 0],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-90"
                />
                <motion.div
                  animate={{ 
                    scale: [1.1, 1, 1.1],
                    rotate: [360, 180, 0],
                    x: [0, -15, 0],
                    y: [0, 15, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-12 right-12 w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl opacity-80"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, -180],
                    x: [0, 10, 0],
                    y: [0, 20, 0]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-12 left-16 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg opacity-85"
                />
                
                {/* Central logo/text area */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-white mb-2 tracking-wider">
                      TechWave
                    </div>
                    <div className="text-sm text-white/80 tracking-widest">
                      PREMIUM SERIES
                    </div>
                  </motion.div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Webcam */}
          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full border border-gray-600">
            <motion.div 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-1 bg-blue-400 rounded-full m-0.5"
            />
          </div>
          
          {/* Screen reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl pointer-events-none" />
        </div>
        
        {/* Laptop Base - Modern Gaming Style */}
        <div 
          className="relative w-[450px] h-[320px] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-b-2xl border-2 border-gray-700 shadow-2xl"
          style={{ 
            transform: 'translateZ(0px)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Keyboard area with RGB lighting */}
          <div className="p-6">
            {/* Function keys row */}
            <div className="grid grid-cols-12 gap-1 mb-2">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2.5 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border border-gray-600 shadow-sm"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 8px #3B82F6`
                  }}
                  animate={{
                    boxShadow: isHovered ? `0 0 4px #3B82F680` : 'none'
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
            
            {/* Main keyboard rows with blue RGB effect */}
            {[...Array(4)].map((_, row) => (
              <div key={row} className="grid grid-cols-15 gap-1 mb-2">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border border-gray-600 shadow-sm relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 12px #3B82F6`
                    }}
                    animate={{
                      boxShadow: isHovered ? `0 0 6px #3B82F640` : 'none'
                    }}
                    transition={{ duration: 0.2, delay: (i + row) * 0.005 }}
                  >
                    {/* RGB underglow effect */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 opacity-60"
                      animate={{
                        opacity: isHovered ? [0.4, 0.8, 0.4] : 0.3
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: (i + row) * 0.02
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            ))}
            
            {/* Spacebar with enhanced RGB */}
            <div className="flex justify-center mt-3">
              <motion.div
                className="w-48 h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border border-gray-600 shadow-sm relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 15px #3B82F6'
                }}
                animate={{
                  boxShadow: isHovered ? '0 0 8px #3B82F640' : 'none'
                }}
                transition={{ duration: 0.1 }}
              >
                {/* Enhanced spacebar underglow */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full opacity-70"
                  animate={{
                    opacity: isHovered ? [0.5, 1, 0.5] : 0.4
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Modern trackpad */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-28 h-18 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border border-gray-600 shadow-inner">
            <div className="absolute inset-1 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg overflow-hidden">
              {/* Glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg" />
              {/* Subtle blue glow */}
              <motion.div
                className="absolute inset-0 bg-blue-500/10 rounded-lg"
                animate={{
                  opacity: isHovered ? [0.1, 0.3, 0.1] : 0.05
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
          
          {/* Brand logo - DREAM MACHINES style */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <motion.div
              animate={{ 
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-xs font-bold text-gray-400 tracking-wider"
            >
              DREAM MACHINES
            </motion.div>
          </div>
          
          {/* Power button with LED indicator */}
          <div className="absolute top-4 right-6 w-3 h-3 bg-gray-700 rounded-full border border-gray-600 overflow-hidden">
            <motion.div
              animate={{ 
                opacity: [0.6, 1, 0.6],
                backgroundColor: ['#3B82F6', '#10B981', '#3B82F6']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full m-0.75"
            />
          </div>
          
          {/* Side ports - more realistic */}
          <div className="absolute left-0 top-1/3 space-y-1">
            <div className="w-1.5 h-2 bg-gray-900 rounded-r-sm border border-gray-700" />
            <div className="w-1.5 h-3 bg-gray-900 rounded-r-sm border border-gray-700" />
            <div className="w-1.5 h-1.5 bg-gray-900 rounded-r-sm border border-gray-700" />
          </div>
          
          <div className="absolute right-0 top-1/3 space-y-1">
            <div className="w-1.5 h-2 bg-gray-900 rounded-l-sm border border-gray-700" />
            <div className="w-1.5 h-3 bg-gray-900 rounded-l-sm border border-gray-700" />
            <div className="w-1.5 h-2 bg-gray-900 rounded-l-sm border border-gray-700" />
          </div>
          
          {/* Ventilation grilles */}
          <div className="absolute bottom-4 left-8 right-8 flex justify-between">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-0.5 h-6 bg-gray-900 rounded-full opacity-80 shadow-inner" />
            ))}
          </div>
          
          {/* RGB light strip along the front edge */}
          <motion.div
            className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 rounded-full"
            animate={{
              opacity: isHovered ? [0.6, 1, 0.6] : 0.4,
              boxShadow: isHovered ? [
                '0 0 10px #3B82F6',
                '0 0 20px #06B6D4', 
                '0 0 10px #8B5CF6'
              ] : 'none'
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        
        {/* Enhanced reflection */}
        <div 
          className="absolute top-full left-0 w-[450px] h-40 bg-gradient-to-b from-white/15 via-white/5 to-transparent rounded-b-2xl blur-sm opacity-60"
          style={{ 
            transform: 'rotateX(180deg) translateY(15px) scaleY(0.6)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)'
          }}
        />
      </motion.div>
      
      {/* Floating tech elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/40 rounded-lg backdrop-blur-sm"
            style={{
              width: `${12 + Math.random() * 20}px`,
              height: `${12 + Math.random() * 20}px`,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3],
              borderColor: [
                'rgba(59, 130, 246, 0.4)',
                'rgba(6, 182, 212, 0.4)',
                'rgba(139, 92, 246, 0.4)',
                'rgba(59, 130, 246, 0.4)'
              ]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Interactive hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm font-medium"
      >
        Move your mouse to rotate
      </motion.div>
    </div>
  );
};

export default Laptop3D;