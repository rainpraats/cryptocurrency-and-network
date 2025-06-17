import { Navigate, Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import ClientService from '../services/clientService';

const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setIsValid(false);
        return;
      }
      try {
        const valid = await new ClientService().validateToken();
        setIsValid(valid);
      } catch {
        setIsValid(false);
      }
    };
    checkToken();
  }, []);

  if (isValid === null) return null;

  return isValid ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
