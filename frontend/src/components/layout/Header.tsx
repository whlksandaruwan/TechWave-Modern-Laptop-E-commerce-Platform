import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, ShoppingCart, User, Heart, Menu, X, Search } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { cn } from '../../lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getCartItemsCount } = useCartStore();
  const cartItemsCount = getCartItemsCount();
  const wishlistItemsCount = useWishlistStore((state) => state.getWishlistItemsCount());
  
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Check if current page has dark theme
  const isDarkPage = ['/', '/about', '/contact', '/products'].includes(location.pathname) || 
                     location.pathname.startsWith('/products/');

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // Then redirect to search results
    setIsSearchOpen(false);
  };

  const renderAdminNavLinks = () => {
    if (!user) return null;

    if (user.role === 'admin') {
      return (
        <div className="flex items-center space-x-1">
          <NavLink 
            to="/admin" 
            className={({ isActive }) => cn(
              'font-medium transition-colors px-4 py-2 rounded-lg',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
            end
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => cn(
              'font-medium transition-colors admin-nav-link px-4 py-2 rounded-lg',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Manage Products
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => cn(
              'font-medium transition-colors px-4 py-2 rounded-lg',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Orders
          </NavLink>
          <NavLink 
            to="/admin/customers" 
            className={({ isActive }) => cn(
              'font-medium transition-colors px-4 py-2 rounded-lg',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Customers
          </NavLink>
        </div>
      );
    }

    if (user.role === 'manager') {
      return (
        <div className="flex items-center space-x-1">
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => cn(
              'font-medium transition-colors admin-nav-link px-4 py-2 rounded-lg',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Manage Products
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => cn(
              'font-medium transition-colors px-4 py-2 rounded-lg',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Orders
          </NavLink>
        </div>
      );
    }

    return null;
  };

  const renderUserMenu = () => {
    if (!user) return null;

    const menuItems = [
      {
        label: 'Profile',
        href: '/profile',
        show: true
      },
      {
        label: 'Admin Dashboard',
        href: '/admin',
        show: user.role === 'admin'
      },
      {
        label: 'Manage Products',
        href: '/admin/products',
        show: user.role === 'admin' || user.role === 'manager'
      }
    ];

    return (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 z-50">
        <div className="px-4 py-2 border-b">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
          <p className="text-xs text-primary-600 capitalize">{user.role}</p>
        </div>
        {menuItems
          .filter(item => item.show)
          .map(item => (
            <Link 
              key={item.href}
              to={item.href} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))
        }
        <button
          onClick={logout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign out
        </button>
      </div>
    );
  };

  // Determine header background and text colors based on page and scroll state
  const getHeaderClasses = () => {
    if (isAdminPage) {
      return {
        header: 'bg-primary-900 text-white',
        navLink: 'text-white hover:text-primary-200',
        activeNavLink: 'text-primary-300',
        icon: 'text-white',
        hoverBg: 'hover:bg-primary-800'
      };
    }

    // Get current page path for specific styling
    const currentPath = location.pathname;
    
    if (isScrolled) {
      if (isDarkPage) {
        // Different header styles based on specific pages
        if (currentPath === '/') {
          return {
            header: 'bg-gradient-to-r from-gray-900/98 via-gray-800/98 to-gray-900/98 backdrop-blur-sm shadow-lg border-b border-white/10',
            navLink: 'text-white hover:text-blue-400 transition-colors duration-200',
            activeNavLink: 'text-blue-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else if (currentPath === '/about') {
          return {
            header: 'bg-gradient-to-r from-gray-900/98 via-slate-800/98 to-gray-900/98 backdrop-blur-sm shadow-lg border-b border-white/10',
            navLink: 'text-white hover:text-purple-400 transition-colors duration-200',
            activeNavLink: 'text-purple-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else if (currentPath === '/contact') {
          return {
            header: 'bg-gradient-to-r from-gray-900/98 via-blue-800/98 to-gray-900/98 backdrop-blur-sm shadow-lg border-b border-white/10',
            navLink: 'text-white hover:text-cyan-400 transition-colors duration-200',
            activeNavLink: 'text-cyan-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else if (currentPath.startsWith('/products')) {
          return {
            header: 'bg-gradient-to-r from-gray-900/98 via-indigo-800/98 to-gray-900/98 backdrop-blur-sm shadow-lg border-b border-white/10',
            navLink: 'text-white hover:text-indigo-400 transition-colors duration-200',
            activeNavLink: 'text-indigo-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else {
          // Default dark page style
          return {
            header: 'bg-gradient-to-r from-gray-900/98 via-gray-800/98 to-gray-900/98 backdrop-blur-sm shadow-lg border-b border-white/10',
            navLink: 'text-white hover:text-blue-400 transition-colors duration-200',
            activeNavLink: 'text-blue-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        }
      } else {
        return {
          header: 'bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-200',
          navLink: 'text-gray-700 hover:text-blue-600 transition-colors duration-200',
          activeNavLink: 'text-blue-600 font-semibold',
          icon: 'text-gray-600',
          hoverBg: 'hover:bg-blue-50 rounded-lg transition-all duration-200'
        };
      }
    } else {
      // Not scrolled
      if (isDarkPage) {
        // Different header styles based on specific pages
        if (currentPath === '/') {
          return {
            header: 'bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm border-b border-white/10',
            navLink: 'text-white hover:text-blue-400 transition-colors duration-200',
            activeNavLink: 'text-blue-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else if (currentPath === '/about') {
          return {
            header: 'bg-gradient-to-r from-gray-900/95 via-slate-800/95 to-gray-900/95 backdrop-blur-sm border-b border-white/10',
            navLink: 'text-white hover:text-purple-400 transition-colors duration-200',
            activeNavLink: 'text-purple-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else if (currentPath === '/contact') {
          return {
            header: 'bg-gradient-to-r from-gray-900/95 via-blue-800/95 to-gray-900/95 backdrop-blur-sm border-b border-white/10',
            navLink: 'text-white hover:text-cyan-400 transition-colors duration-200',
            activeNavLink: 'text-cyan-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else if (currentPath.startsWith('/products')) {
          return {
            header: 'bg-gradient-to-r from-gray-900/95 via-indigo-800/95 to-gray-900/95 backdrop-blur-sm border-b border-white/10',
            navLink: 'text-white hover:text-indigo-400 transition-colors duration-200',
            activeNavLink: 'text-indigo-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        } else {
          // Default dark page style
          return {
            header: 'bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm border-b border-white/10',
            navLink: 'text-white hover:text-blue-400 transition-colors duration-200',
            activeNavLink: 'text-blue-400 font-semibold',
            icon: 'text-white',
            hoverBg: 'hover:bg-white/10 rounded-lg transition-all duration-200'
          };
        }
      } else {
        return {
          header: 'bg-gradient-to-r from-white/80 via-blue-50/50 to-purple-50/50 backdrop-blur-sm border-b border-gray-200/50',
          navLink: 'text-gray-700 hover:text-blue-600 transition-colors duration-200',
          activeNavLink: 'text-blue-600 font-semibold',
          icon: 'text-gray-600',
          hoverBg: 'hover:bg-blue-50 rounded-lg transition-all duration-200'
        };
      }
    }
  };

  const headerClasses = getHeaderClasses();

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        headerClasses.header,
        'w-full'
      )}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Enhanced Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className={cn(
                "absolute inset-0 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300",
                isAdminPage ? "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" :
                location.pathname === '/' ? "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" :
                location.pathname === '/about' ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600" :
                location.pathname === '/contact' ? "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600" :
                location.pathname.startsWith('/products') ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" :
                "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
              )}></div>
              <Laptop className={cn(
                "relative w-8 h-8 z-10",
                isAdminPage ? "text-white" : 
                isDarkPage ? "text-white" : "text-white"
              )} />
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight bg-clip-text text-transparent",
              isAdminPage ? "bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300" :
              location.pathname === '/' ? "bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300" :
              location.pathname === '/about' ? "bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400" :
              location.pathname === '/contact' ? "bg-gradient-to-r from-cyan-300 via-blue-300 to-cyan-400" :
              location.pathname.startsWith('/products') ? "bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400" :
              isDarkPage ? "bg-gradient-to-r from-blue-300 via-purple-300 to-cyan-300" : "bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600"
            )}>
              {isAdminPage ? 'TechWave Admin' : 'TechWave'}
            </span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                'px-4 py-2 rounded-lg font-medium transition-all duration-200 relative overflow-hidden',
                isActive 
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg' 
                  : headerClasses.navLink
              )}
              end
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                  )}
                  <span className="relative z-10">Home</span>
                </>
              )}
            </NavLink>
            {!isAdminPage && (
              <NavLink 
                to="/products" 
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200 relative overflow-hidden',
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg' 
                    : headerClasses.navLink
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                    )}
                    <span className="relative z-10">Products</span>
                  </>
                )}
              </NavLink>
            )}
            {!isAdminPage && (
              <NavLink 
                to="/about" 
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200 relative overflow-hidden',
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg' 
                    : headerClasses.navLink
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                    )}
                    <span className="relative z-10">About</span>
                  </>
                )}
              </NavLink>
            )}
            {!isAdminPage && (
              <NavLink 
                to="/contact" 
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200 relative overflow-hidden',
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 shadow-lg' 
                    : headerClasses.navLink
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg" />
                    )}
                    <span className="relative z-10">Contact</span>
                  </>
                )}
              </NavLink>
            )}
            {isAuthenticated && isAdminPage && renderAdminNavLinks()}
          </nav>

          {/* Enhanced Right Side Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                'p-2 rounded-lg transition-all duration-200 hover:scale-105',
                headerClasses.hoverBg,
                headerClasses.icon
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {!isAdminPage && (
              <Link 
                to="/wishlist" 
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 hover:scale-105 relative",
                  headerClasses.hoverBg,
                  headerClasses.icon
                )}
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {wishlistItemsCount > 9 ? '9+' : wishlistItemsCount}
                  </span>
                )}
              </Link>
            )}

            {!isAdminPage && (
              <Link 
                to="/cart" 
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 hover:scale-105 relative",
                  headerClasses.hoverBg,
                  headerClasses.icon
                )}
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className={cn(
                    'flex items-center space-x-2 p-2 rounded-full transition-colors',
                    headerClasses.hoverBg,
                    headerClasses.icon
                  )}
                >
                  <User className="w-5 h-5" />
                </button>
                {renderUserMenu()}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className={cn(
                    'px-4 py-2 text-sm font-medium transition-colors',
                    isDarkPage 
                      ? 'text-white hover:text-blue-400' 
                      : 'text-gray-700 hover:text-blue-600'
                  )}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className={cn(
                    'px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200',
                    isDarkPage && 'shadow-lg'
                  )}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'md:hidden p-2 rounded-full transition-colors',
                headerClasses.hoverBg,
                headerClasses.icon
              )}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-medium">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-4 space-y-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => cn(
                    'block py-2 font-medium transition-colors',
                    isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                  end
                >
                  Home
                </NavLink>
                {!isAdminPage && (
                  <NavLink 
                    to="/products" 
                    className={({ isActive }) => cn(
                      'block py-2 font-medium transition-colors',
                      isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </NavLink>
                )}
                {!isAdminPage && (
                  <NavLink 
                    to="/about" 
                    className={({ isActive }) => cn(
                      'block py-2 font-medium transition-colors',
                      isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </NavLink>
                )}
                {!isAdminPage && (
                  <NavLink 
                    to="/contact" 
                    className={({ isActive }) => cn(
                      'block py-2 font-medium transition-colors',
                      isActive ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </NavLink>
                )}
                {isAuthenticated && isAdminPage && (
                  <div className="pt-4 border-t">
                    {renderAdminNavLinks()}
                  </div>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Search</h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-all duration-200"
                >
                  Search
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;