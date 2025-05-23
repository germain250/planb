import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-brand-pink">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;