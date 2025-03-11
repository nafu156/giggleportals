
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../models/types';
import { getCurrentUser, setCurrentUser, logoutUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isStudent: boolean;
  isInstitution: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on initial load
    const loggedInUser = getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const login = (user: User) => {
    setCurrentUser(user);
    setUser(user);
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${user.name}!`,
    });
    
    // Redirect based on role
    if (user.role === 'student') {
      navigate('/student/dashboard');
    } else {
      navigate('/institution/dashboard');
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isStudent: user?.role === 'student',
    isInstitution: user?.role === 'institution',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
