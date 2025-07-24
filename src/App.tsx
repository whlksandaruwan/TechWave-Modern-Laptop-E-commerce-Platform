import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { useAuthStore } from './store/authStore';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleBasedRoute from './components/auth/RoleBasedRoute';
import { UserRole } from './types/api';

// Lazy loaded components
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/admin/Products'));
const AdminOrders = lazy(() => import('./pages/admin/Orders'));
const AdminCustomers = lazy(() => import('./pages/admin/Customers'));
const AdminAddProduct = lazy(() => import('./pages/admin/AddProduct'));
const AdminEditProduct = lazy(() => import('./pages/admin/EditProduct'));
const AdminAnalytics = lazy(() => import('./pages/admin/Analytics'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

function App() {
  const { initialized } = useAuthStore();

  if (!initialized) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            
            {/* About Page */}
            <Route path="about" element={<AboutPage />} />
            
            {/* Contact Page */}
            <Route path="contact" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="admin" element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleBasedRoute>
            } />
            <Route path="admin/analytics" element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <AdminAnalytics />
              </RoleBasedRoute>
            } />
            <Route path="admin/products" element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <AdminProducts />
              </RoleBasedRoute>
            } />
            <Route path="admin/products/new" element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <AdminAddProduct />
              </RoleBasedRoute>
            } />
            <Route path="admin/products/:id/edit" element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <AdminEditProduct />
              </RoleBasedRoute>
            } />
            <Route path="admin/orders" element={
              <RoleBasedRoute allowedRoles={['admin', 'manager']}>
                <AdminOrders />
              </RoleBasedRoute>
            } />
            <Route path="admin/customers" element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <AdminCustomers />
              </RoleBasedRoute>
            } />
            
            {/* Not Found */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;