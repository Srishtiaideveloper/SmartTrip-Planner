/**
 * Authentication context for SmartTrip Planner.
 * Provides user state, login, register, and logout functionality
 * to the entire application via React Context.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiPost, apiGet } from '../services/api';

const AuthContext = createContext(null);

/**
 * AuthProvider wraps the app and provides authentication state & methods.
 *
 * @component
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('smarttrip_token'));
  const [loading, setLoading] = useState(true);

  /**
   * On mount, if a token exists in localStorage, verify it by
   * calling GET /api/auth/me to get the current user.
   */
  useEffect(() => {
    async function verifyToken() {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const userData = await apiGet('/auth/me');
        setUser(userData);
      } catch (err) {
        // Token is invalid or expired — clear it
        console.warn('Token verification failed:', err.message);
        localStorage.removeItem('smarttrip_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    verifyToken();
  }, [token]);

  /**
   * Login with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} The user data.
   */
  const login = useCallback(async (email, password) => {
    const data = await apiPost('/auth/login', { email, password }, false);
    localStorage.setItem('smarttrip_token', data.access_token);
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  }, []);

  /**
   * Register a new account.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} The user data.
   */
  const register = useCallback(async (name, email, password) => {
    const data = await apiPost('/auth/register', { name, email, password }, false);
    localStorage.setItem('smarttrip_token', data.access_token);
    setToken(data.access_token);
    setUser(data.user);
    return data.user;
  }, []);

  /**
   * Logout — clear token and user state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem('smarttrip_token');
    setToken(null);
    setUser(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access the auth context.
 * @returns {{ user: object|null, token: string|null, loading: boolean, isAuthenticated: boolean, login: Function, register: Function, logout: Function }}
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth() must be used within an <AuthProvider>');
  }
  return ctx;
}
