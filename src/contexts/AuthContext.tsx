import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, School } from '../types';
import { users } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
  login: (phone: string, otp: string, schools: School[]) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const login = (phone: string, otp: string, schools: School[]): boolean => {
    // Mock OTP validation (accept any 6-digit OTP)
    if (otp.length === 6) {
      const foundUser = users.find(u => u.phone === phone);
      if (foundUser) {
        setUser(foundUser);
        // Set the user's school
        if (foundUser.schoolId !== 'all') {
          const userSchool = schools.find(s => s.id === foundUser.schoolId);
          if (userSchool) {
            setSelectedSchool(userSchool);
          }
        }
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedSchool(null);
  };

  return (
    <AuthContext.Provider value={{ user, selectedSchool, setSelectedSchool, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
