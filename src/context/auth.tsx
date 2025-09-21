'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER = {
  id: '1',
  name: 'John Doe',
  email: 'user@example.com',
};
const DEMO_PASSWORD = 'password';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
        setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email.toLowerCase() === DEMO_USER.email && password === DEMO_PASSWORD) {
          setUser(DEMO_USER);
          localStorage.setItem('user', JSON.stringify(DEMO_USER));
          resolve();
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 1000);
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
  }, [toast]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
