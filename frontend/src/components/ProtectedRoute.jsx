import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const token = localStorage.getItem('jwt');
  // verify token
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
