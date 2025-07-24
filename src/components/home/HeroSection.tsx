@@ .. @@
 import { motion } from 'framer-motion';
 import { Link } from 'react-router-dom';
 import useStore from '../../store/useStore';
+import Laptop3D from './Laptop3D';
 
 const HeroSection = () => {
   const { isAuthenticated } = useStore();
 
   return (
-    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
+    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden flex items-center">
       {/* Background animated shapes */}
       <div className="absolute inset-0 overflow-hidden">
         <div className="absolute -top-1/2 -left-1/2 w-full h-full">
@@ .. @@
       </div>
 
       {/* Content */}
-      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center justify-center min-h-screen">
-        <motion.div
-          initial={{ opacity: 0, y: 20 }}
-          animate={{ opacity: 1, y: 0 }}
-          transition={{ duration: 0.8 }}
-          className="text-center"
-        >
-          <motion.h1
-            initial={{ opacity: 0, y: 20 }}
-            animate={{ opacity: 1, y: 0 }}
-            transition={{ duration: 0.8, delay: 0.2 }}
-            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
+      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
+        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
+          {/* Left Content */}
+          <motion.div
+            initial={{ opacity: 0, x: -50 }}
+            animate={{ opacity: 1, x: 0 }}
+            transition={{ duration: 0.8 }}
+            className="text-left"
           >
-            Premium Laptops for
-            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
-              {" "}Professionals
-            </span>
-          </motion.h1>
-          
-          <motion.p
-            initial={{ opacity: 0, y: 20 }}
-            animate={{ opacity: 1, y: 0 }}
-            transition={{ duration: 0.8, delay: 0.4 }}
-            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
-          >
-            Discover our curated collection of high-performance laptops designed for professionals who demand excellence. Powerful hardware meets elegant design.
-          </motion.p>
+            <motion.h1
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              transition={{ duration: 0.8, delay: 0.2 }}
+              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
+            >
+              Premium Laptops for
+              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
+                {" "}Professionals
+              </span>
+            </motion.h1>
+            
+            <motion.p
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              transition={{ duration: 0.8, delay: 0.4 }}
+              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl"
+            >
+              Discover our curated collection of high-performance laptops designed for professionals who demand excellence. Powerful hardware meets elegant design.
+            </motion.p>
 
-          <motion.div
-            initial={{ opacity: 0, y: 20 }}
-            animate={{ opacity: 1, y: 0 }}
-            transition={{ duration: 0.8, delay: 0.6 }}
-            className="flex flex-col sm:flex-row gap-4 justify-center"
-          >
-            <Link
-              to={isAuthenticated ? "/products" : "/login"}
-              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105"
+            <motion.div
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              transition={{ duration: 0.8, delay: 0.6 }}
+              className="flex flex-col sm:flex-row gap-4"
             >
-              {isAuthenticated ? "Shop Now" : "Get Started"}
-            </Link>
-            <Link
-              to="/products"
-              className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
+              <Link
+                to={isAuthenticated ? "/products" : "/login"}
+                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 text-center"
+              >
+                {isAuthenticated ? "Shop Now" : "Get Started"}
+              </Link>
+              <Link
+                to="/products"
+                className="px-8 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm text-center"
+              >
+                View Collection
+              </Link>
+            </motion.div>
+          </motion.div>
+
+          {/* Right Content - 3D Laptop */}
+          <motion.div
+            initial={{ opacity: 0, x: 50 }}
+            animate={{ opacity: 1, x: 0 }}
+            transition={{ duration: 0.8, delay: 0.3 }}
+            className="relative flex items-center justify-center"
+          >
+            <Laptop3D />
+          </motion.div>
+        </div>
+      </div>
+
+      {/* Floating elements - repositioned */}
+      <div className="absolute inset-0 pointer-events-none">
+        <motion.div
+          animate={{
+            y: [0, -20, 0],
+          }}
+          transition={{
+            duration: 4,
+            repeat: Infinity,
+            ease: "easeInOut"
+          }}
+          className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
+        />
+        <motion.div
+          animate={{
+            y: [0, 20, 0],
+          }}
+          transition={{
+            duration: 3,
+            repeat: Infinity,
+            ease: "easeInOut"
+          }}
+          className="absolute bottom-1/4 right-1/6 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
+        />
+        <motion.div
+          animate={{
+            x: [0, 30, 0],
+            y: [0, -15, 0],
+          }}
+          transition={{
+            duration: 5,
+            repeat: Infinity,
+            ease: "easeInOut"
+          }}
+          className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent-500/10 rounded-full blur-xl"
+        />
+      </div>
+    </div>
+  );
+};
+
+export default HeroSection;