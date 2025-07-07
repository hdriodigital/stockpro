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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('stockpro_user');
    const storedAdmin = localStorage.getItem('stockpro_admin');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedAdmin) {
      setIsAdmin(true);
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('stockpro_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('stockpro_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const adminLogin = (email, password) => {
    if (email === 'webxrio@gmail.com' && password === '5207417778@#$Deus') {
      setIsAdmin(true);
      localStorage.setItem('stockpro_admin', 'true');
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('stockpro_users') || '[]');
    
    if (users.find(u => u.email === userData.email)) {
      return false;
    }
    
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      plan: 'free',
      isPremium: false,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('stockpro_users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('stockpro_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('stockpro_user');
    localStorage.removeItem('stockpro_admin');
  };

  const updateUserPlan = (userId, isPremium) => {
    const users = JSON.parse(localStorage.getItem('stockpro_users') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex].isPremium = isPremium;
      users[userIndex].plan = isPremium ? 'premium' : 'free';
      localStorage.setItem('stockpro_users', JSON.stringify(users));
      
      if (user && user.id === userId) {
        const updatedUser = users[userIndex];
        setUser(updatedUser);
        localStorage.setItem('stockpro_user', JSON.stringify(updatedUser));
      }
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    adminLogin,
    register,
    logout,
    updateUserPlan
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};