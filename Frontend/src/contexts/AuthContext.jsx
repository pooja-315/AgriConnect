import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('agriconnect_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      // Mock authentication - replace with actual API call
      if (username && password) {
        const userData = {
          id: 1,
          username,
          email: `${username}@agriconnect.com`,
          role: 'farmer'
        };
        setUser(userData);
        localStorage.setItem('agriconnect_user', JSON.stringify(userData));
        setIsLoading(false);
        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agriconnect_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
