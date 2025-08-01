import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user?.isAdmin) {
    // Redirect non-admins to home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;