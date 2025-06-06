
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // More strict check - if not authenticated, redirect to login
  if (!isAuthenticated) {
    // Redirect to login page, but save the current location so we can
    // return after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
