import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const Laptop3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: -10, y: 15 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !laptopRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      const rotateY = 15 + ((e.clientX - centerX) / rect.width) * 25; // Base 15 degrees + variation
      const rotateX = -10 + ((e.clientY - centerY) / rect.height) * 10; // Base -10 degrees + variation
      
      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: -10, y: 15 });
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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl scale-150 animate-pulse-slow" />
      
      {/* Main laptop container */}
      <motion.div
        ref={laptopRef}
        initial={{ scale: 0.7, opacity: 0 }}
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
        {/* Laptop Screen - Angled and positioned like the reference */}
        <div 
          className="relative w-[500px] h-[320px] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-t-xl border-4 border-gray-700 overflow-hidden shadow-2xl"
          style={{ 
            transform: 'rotateX(-15deg) translateZ(30px)',
            boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Screen bezel with realistic thickness */}
          <div className="absolute inset-0 border-4 border-gray-600 rounded-lg">
            {/* Screen content - black when off, like the reference */}
            <div className="absolute inset-4 bg-black rounded-md overflow-hidden">
              {/* Subtle reflection on black screen */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-md" />
              
              {/* Optional: Add a subtle logo or power indicator */}
              <div className="absolute bottom-4 right-4 opacity-30">
                <div className="text-xs text-gray-600 font-bold tracking-wider">
                  DREAM MACHINES
                </div>
              </div>
            </div>
          </div>
          
          {/* Webcam */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-700 rounded-full border border-gray-600">
            <div className="w-1 h-1 bg-gray-800 rounded-full m-0.5" />
          </div>
          
          {/* Screen hinge area */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-gray-700 to-gray-800 border-t border-gray-600" />
        </div>
        
        {/* Laptop Base - Gaming laptop style with proper depth */}
        <div 
          className="relative w-[500px] h-[350px] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-b-xl border-4 border-gray-700 shadow-2xl"
          style={{ 
            transform: 'translateZ(0px)',
            boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Keyboard area with blue RGB backlighting like the reference */}
          <div className="p-8 pt-6">
            {/* Function keys row */}
            <div className="grid grid-cols-12 gap-1 mb-2">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border border-gray-600 shadow-sm relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 0 12px #3B82F6`
                  }}
                  transition={{ duration: 0.1 }}
                >
                  {/* Blue RGB underglow */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 opacity-70"
                    animate={{
                      opacity: isHovered ? [0.5, 0.9, 0.5] : 0.6
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: i * 0.05
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Main keyboard rows with intense blue RGB like the reference */}
            {[...Array(4)].map((_, row) => (
              <div key={row} className="grid grid-cols-15 gap-1 mb-2">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border border-gray-600 shadow-sm relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 15px #3B82F6`
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {/* Intense blue RGB underglow matching the reference */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 opacity-80"
                      animate={{
                        opacity: isHovered ? [0.6, 1, 0.6] : 0.7,
                        boxShadow: isHovered ? [
                          '0 0 8px #3B82F6',
                          '0 0 16px #06B6D4',
                          '0 0 8px #3B82F6'
                        ] : '0 0 4px #3B82F6'
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
                className="w-56 h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-sm border border-gray-600 shadow-sm relative overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 20px #3B82F6'
                }}
                transition={{ duration: 0.1 }}
              >
                {/* Enhanced spacebar underglow */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 rounded-full opacity-80"
                  animate={{
                    opacity: isHovered ? [0.6, 1, 0.6] : 0.7,
                    boxShadow: isHovered ? '0 0 20px #3B82F6' : '0 0 8px #3B82F6'
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>
          
          {/* Gaming trackpad - larger and more prominent */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl border-2 border-gray-600 shadow-inner">
            <div className="absolute inset-2 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg overflow-hidden">
              {/* Glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg" />
              {/* Blue accent glow */}
              <motion.div
                className="absolute inset-0 bg-blue-500/20 rounded-lg"
                animate={{
                  opacity: isHovered ? [0.1, 0.4, 0.1] : 0.15
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </div>
          
          {/* DREAM MACHINES branding - positioned like the reference */}
          <div className="absolute top-4 right-8">
            <motion.div
              animate={{ 
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-sm font-bold text-gray-400 tracking-wider"
            >
              DREAM MACHINES
            </motion.div>
          </div>
          
          {/* Power button with LED indicator */}
          <div className="absolute top-6 left-8 w-4 h-4 bg-gray-700 rounded-full border border-gray-600 overflow-hidden">
            <motion.div
              animate={{ 
                opacity: [0.6, 1, 0.6],
                backgroundColor: ['#3B82F6', '#10B981', '#3B82F6']
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full m-1"
            />
          </div>
          
          {/* Side ports - more detailed and realistic */}
          <div className="absolute left-0 top-1/3 space-y-2">
            <div className="w-2 h-3 bg-gray-900 rounded-r-md border border-gray-700 shadow-inner" />
            <div className="w-2 h-4 bg-gray-900 rounded-r-md border border-gray-700 shadow-inner" />
            <div className="w-2 h-2 bg-gray-900 rounded-r-md border border-gray-700 shadow-inner" />
          </div>
          
          <div className="absolute right-0 top-1/3 space-y-2">
            <div className="w-2 h-3 bg-gray-900 rounded-l-md border border-gray-700 shadow-inner" />
            <div className="w-2 h-4 bg-gray-900 rounded-l-md border border-gray-700 shadow-inner" />
            <div className="w-2 h-3 bg-gray-900 rounded-l-md border border-gray-700 shadow-inner" />
          </div>
          
          {/* Ventilation grilles - gaming laptop style */}
          <div className="absolute bottom-6 left-12 right-12 flex justify-between">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-0.5 h-8 bg-gray-900 rounded-full opacity-90 shadow-inner" />
            ))}
          </div>
          
          {/* RGB light strip along the front edge - intense blue like reference */}
          <motion.div
            className="absolute bottom-0 left-12 right-12 h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 rounded-full"
            animate={{
              opacity: isHovered ? [0.7, 1, 0.7] : 0.6,
              boxShadow: isHovered ? [
                '0 0 15px #3B82F6',
                '0 0 25px #06B6D4', 
                '0 0 15px #3B82F6'
              ] : '0 0 8px #3B82F6'
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          
          {/* Gaming laptop angular design elements */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-blue-500/30 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-blue-500/30 rounded-tr-xl" />
          
          {/* Heat vents on the back */}
          <div className="absolute top-0 left-1/4 right-1/4 h-2 bg-gray-900 border border-gray-700 rounded-b-md">
            <div className="flex justify-center space-x-1 pt-0.5">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-0.5 h-1 bg-gray-800 rounded-full" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced reflection with proper perspective */}
        <div 
          className="absolute top-full left-0 w-[500px] h-48 bg-gradient-to-b from-white/12 via-white/4 to-transparent rounded-b-xl blur-sm opacity-50"
          style={{ 
            transform: 'rotateX(180deg) translateY(20px) scaleY(0.7) scaleX(0.95)',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 80%)'
          }}
        />
        
        {/* Shadow beneath the laptop */}
        <div 
          className="absolute top-full left-1/2 transform -translate-x-1/2 w-[400px] h-24 bg-black/20 rounded-full blur-2xl"
          style={{ 
            transform: 'translateY(40px) scaleY(0.3)'
          }}
        />
      </motion.div>
      
      {/* Floating tech elements with gaming aesthetic */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/40 rounded-lg backdrop-blur-sm"
            style={{
              width: `${16 + Math.random() * 24}px`,
              height: `${16 + Math.random() * 24}px`,
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.8, 0.3],
              borderColor: [
                'rgba(59, 130, 246, 0.4)',
                'rgba(6, 182, 212, 0.4)',
                'rgba(139, 92, 246, 0.4)',
                'rgba(59, 130, 246, 0.4)'
              ]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
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