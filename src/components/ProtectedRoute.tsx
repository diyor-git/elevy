import { Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store';
import { checkAuth } from '@/store/authSlice';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Check authentication status
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const sid = localStorage.getItem('DEVV_CODE_SID');
  
  if (!sid && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
