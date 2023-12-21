import { useState, useEffect, useCallback } from 'react';
import {
  verifyUser,
  loginUser,
  removeToken,
  setToken,
} from '../services/authService';

export default function useUser() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const handleVerify = async () => {
      const response = await verifyUser();

      if (!response?.token) {
        setIsAuthenticated(false);
        removeToken();
        setIsAuthLoaded(true);
        return;
      }

      setIsAuthenticated(true);
      setUser(response.user);
      setToken(response.token);
      setIsAuthLoaded(true);
    };

    handleVerify();
  }, []);

  const handleLogout = useCallback(() => {
    removeToken();
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const handleLogin = useCallback(async (formData, onComplete = () => {}) => {
    try {
      const { email, password } = formData;

      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.data.token);
      onComplete();
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isAuthLoaded,
    token: localStorage.getItem('token'),
    handleLogout,
    handleLogin,
  };
}
