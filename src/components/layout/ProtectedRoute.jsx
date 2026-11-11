import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';

export default function ProtectedRoute({ children, requiredRole = 'admin' }) {
  const { role, isAdmin } = useUser();
  const { showError } = useToast();

  const isAuthorized = requiredRole === 'admin' ? isAdmin : true;

  useEffect(() => {
    if (!isAuthorized) {
      showError(
        'Admin privileges are required to access this page. Please use the Role Switcher in the navbar to switch to Admin mode.',
        'Access Restricted'
      );
    }
  }, [isAuthorized, showError]);

  if (!isAuthorized) {
    return <Navigate to="/events" replace />;
  }

  return children;
}
