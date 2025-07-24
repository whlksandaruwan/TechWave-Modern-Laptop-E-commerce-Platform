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
        <>
          <NavLink 
            to="/admin" 
            className={({ isActive }) => cn(
              'font-medium transition-colors',
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
              'font-medium transition-colors',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Manage Products
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => cn(
              'font-medium transition-colors',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Orders
          </NavLink>
          <NavLink 
            to="/admin/customers" 
            className={({ isActive }) => cn(
              'font-medium transition-colors',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Customers
          </NavLink>
        </>
      );
    }

    if (user.role === 'manager') {
      return (
        <>
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => cn(
              'font-medium transition-colors',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Manage Products
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => cn(
              'font-medium transition-colors',
              isActive ? 'text-primary-300' : 'text-white',
              'hover:text-primary-200'
            )}
          >
            Orders
          </NavLink>
        </>
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

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent',
        isAdminPage ? 'bg-primary-900 text-white' : '',
        'w-full'
      )}
    >
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <Laptop className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-bold tracking-tight">
              {isAdminPage ? 'TechWave Admin' : 'TechWave'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                'font-medium transition-colors hover:text-primary-600',
                isActive ? 'text-primary-600' : 'text-gray-700',
                isAdminPage && 'text-white hover:text-primary-200'
              )}
              end
            >
              Home
            </NavLink>
            {!isAdminPage && (
              <NavLink 
                to="/products" 
                className={({ isActive }) => cn(
                  'font-medium transition-colors hover:text-primary-600',
                  isActive ? 'text-primary-600' : 'text-gray-700'
                )}
              >
                Products
              </NavLink>
            )}
            {isAuthenticated && isAdminPage && renderAdminNavLinks()}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                'p-2 rounded-full transition-colors',
                isAdminPage ? 'hover:bg-primary-800' : 'hover:bg-gray-100'
              )}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {!isAdminPage && (
              <Link 
                to="/wishlist" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItemsCount > 9 ? '9+' : wishlistItemsCount}
                  </span>
                )}
              </Link>
            )}

            {!isAdminPage && (
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative group">
                <button 
                  className={cn(
                    'flex items-center space-x-1 p-1.5 rounded-full hover:bg-gray-100 transition-colors',
                    isAdminPage && 'hover:bg-primary-800'
                  )}
                  aria-label="User menu"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                </button>
                {renderUserMenu()}
              </div>
            ) : (
              <Link 
                to="/login" 
                className={cn(
                  'flex items-center space-x-1 p-1.5 rounded-full hover:bg-gray-100 transition-colors',
                  isAdminPage && 'hover:bg-primary-800'
                )}
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full transition-colors hover:bg-gray-100"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t"
          >
            <nav className="flex flex-col space-y-4 px-4 py-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-md font-medium',
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                end
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                className={({ isActive }) => cn(
                  'px-4 py-2 rounded-md font-medium',
                  isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </NavLink>
              {isAuthenticated && user?.isAdmin && (
                <>
                  <NavLink 
                    to="/admin" 
                    className={({ isActive }) => cn(
                      'px-4 py-2 rounded-md font-medium',
                      isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    end
                  >
                    Admin Dashboard
                  </NavLink>
                  <NavLink 
                    to="/admin/products" 
                    className={({ isActive }) => cn(
                      'px-4 py-2 rounded-md font-medium',
                      isActive ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Manage Products
                  </NavLink>
                </>
              )}
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link 
                    to="/login" 
                    className="w-full px-4 py-2 bg-primary-600 text-white rounded-md text-center font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-center font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link 
                    to="/profile" 
                    className="px-4 py-2 rounded-md font-medium text-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-md font-medium text-red-600 text-left"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearchSubmit} className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for laptops, brands, or categories..."
                    className="w-full pl-10 pr-4 py-3 border-0 rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </form>
              <div className="px-4 pb-4">
                <h3 className="font-medium text-sm text-gray-500 mb-2">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Gaming Laptop', 'MacBook Pro', 'Budget Laptop', 'Ultrabook', 'RTX Graphics'].map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        setSearchQuery(term);
                        // You could also immediately submit the search here
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;