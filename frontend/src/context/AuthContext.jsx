import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/check');
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const register = async (username, password) => {
    try {
      await api.post('/auth/register', { username, password });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  };

  const login = async (username, password) => {
    try {
      await api.post('/auth/login', { username, password });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};