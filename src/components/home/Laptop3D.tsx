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
      
      const rotateX = (e.clientY - centerY) / 15;
      const rotateY = (centerX - e.clientX) / 15;
      
      laptopRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!laptopRef.current) return;
      laptopRef.current.style.transform = 'perspective(1200px) rotateX(-5deg) rotateY(0deg)';
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
      {/* Enhanced glow effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl scale-150 animate-pulse-slow" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl scale-125" />
      
      {/* Main 360° rotating container */}
      <motion.div
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative"
      >
        {/* 3D Laptop Container with mouse interaction */}
        <motion.div
          ref={laptopRef}
          initial={{ scale: 0.8, opacity: 0, rotateX: -5 }}
          animate={{ scale: 1, opacity: 1, rotateX: -5 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative transition-transform duration-500 ease-out cursor-pointer"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'perspective(1200px) rotateX(-5deg) rotateY(0deg)'
          }}
        >
          {/* Laptop Screen */}
          <div 
            className="relative w-96 h-64 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-t-2xl border-4 border-gray-700 overflow-hidden shadow-2xl"
            style={{ 
              transform: 'rotateX(-15deg) translateZ(25px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Screen bezel with realistic details */}
            <div className="absolute inset-0 border-2 border-gray-600 rounded-xl">
              {/* Inner screen area */}
              <div className="absolute inset-3 bg-gradient-to-br from-blue-950 via-purple-950 to-indigo-950 rounded-lg overflow-hidden">
                {/* Realistic screen content */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50">
                  {/* Desktop wallpaper effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-purple-600/20 to-pink-600/20" />
                  
                  {/* Floating UI elements */}
                  <div className="p-6 space-y-3">
                    {/* Top bar */}
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-xs text-white/60">TechWave OS</div>
                    </div>
                    
                    {/* Code editor simulation */}
                    <div className="bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: '100%', opacity: 1 }}
                          transition={{ delay: i * 0.3, duration: 1 }}
                          className="h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mb-2"
                          style={{ width: `${Math.random() * 40 + 60}%` }}
                        />
                      ))}
                    </div>
                    
                    {/* Floating windows */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20"
                    >
                      <div className="text-xs text-white/80">TechWave Dashboard</div>
                      <div className="mt-2 space-y-1">
                        <div className="h-1 bg-blue-400 rounded w-3/4"></div>
                        <div className="h-1 bg-purple-400 rounded w-1/2"></div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Animated particles */}
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
                          scale: [0.5, 1, 0.5],
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
              <div className="w-1 h-1 bg-blue-400 rounded-full m-0.5 animate-pulse"></div>
            </div>
            
            {/* Screen reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl pointer-events-none" />
          </div>
          
          {/* Laptop Base/Keyboard */}
          <div 
            className="relative w-96 h-56 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-b-2xl border-4 border-gray-600 shadow-2xl"
            style={{ 
              transform: 'translateZ(0px)',
              boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Realistic keyboard */}
            <div className="p-6">
              {/* Function keys row */}
              <div className="grid grid-cols-12 gap-1 mb-2">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-2.5 bg-gray-600 rounded-sm border border-gray-500 shadow-sm"
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: '#4F46E5',
                      boxShadow: '0 0 8px rgba(79, 70, 229, 0.6)'
                    }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>
              
              {/* Main keyboard rows */}
              {[...Array(4)].map((_, row) => (
                <div key={row} className="grid grid-cols-12 gap-1 mb-2">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-3 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border border-gray-500 shadow-sm"
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: '#4F46E5',
                        boxShadow: '0 0 8px rgba(79, 70, 229, 0.6)'
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </div>
              ))}
              
              {/* Spacebar */}
              <div className="flex justify-center mt-3">
                <motion.div
                  className="w-40 h-3 bg-gradient-to-b from-gray-600 to-gray-700 rounded-sm border border-gray-500 shadow-sm"
                  whileHover={{ 
                    scale: 1.02, 
                    backgroundColor: '#4F46E5',
                    boxShadow: '0 0 8px rgba(79, 70, 229, 0.6)'
                  }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
            
            {/* Trackpad with realistic details */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-20 h-14 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg border border-gray-600 shadow-inner">
              <div className="absolute inset-1 bg-gradient-to-b from-gray-600 to-gray-700 rounded-md">
                {/* Trackpad click areas */}
                <div className="absolute bottom-0 left-0 right-0 h-3 border-t border-gray-500">
                  <div className="w-1/2 h-full border-r border-gray-500"></div>
                </div>
              </div>
            </div>
            
            {/* Brand logo with glow */}
            <div className="absolute top-3 right-6">
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
              >
                TechWave
              </motion.div>
            </div>
            
            {/* Power button */}
            <div className="absolute top-3 right-3 w-3 h-3 bg-gray-600 rounded-full border border-gray-500">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-blue-400 rounded-full m-0.75"
              />
            </div>
            
            {/* Ventilation grilles */}
            <div className="absolute bottom-2 left-6 right-6 flex justify-between">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 h-6 bg-gray-900 rounded-full opacity-60" />
              ))}
            </div>
          </div>
          
          {/* Enhanced reflection */}
          <div 
            className="absolute top-full left-0 w-96 h-40 bg-gradient-to-b from-white/15 via-white/5 to-transparent rounded-b-2xl blur-sm opacity-40"
            style={{ 
              transform: 'rotateX(180deg) translateY(15px) scaleY(0.6)',
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Enhanced floating tech elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/40 rounded-lg backdrop-blur-sm"
            style={{
              width: `${20 + Math.random() * 20}px`,
              height: `${20 + Math.random() * 20}px`,
              left: `${15 + Math.random() * 70}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.8, 0.2],
              borderColor: [
                'rgba(59, 130, 246, 0.4)',
                'rgba(147, 51, 234, 0.4)',
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
      
      {/* Ambient lighting effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
};

export default Laptop3D;