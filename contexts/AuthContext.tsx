import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { storage, StorageKeys } from '../utils/storage';

interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: number;
  rating: number;
}

interface AuthContextType {
  doctor: Doctor | null;
  isAuthenticated: boolean;
  login: (doctorData: Doctor) => void;
  logout: () => void;
  updateDoctor: (doctorData: Partial<Doctor>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctorData();
  }, []);

  const loadDoctorData = async () => {
    try {
      const doctorData = await storage.getItem<Doctor>(StorageKeys.DOCTOR_DATA);
      if (doctorData) {
        setDoctor(doctorData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Failed to load doctor data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (doctorData: Doctor) => {
    setDoctor(doctorData);
    setIsAuthenticated(true);
    await storage.setItem(StorageKeys.DOCTOR_DATA, doctorData);
  };

  const logout = async () => {
    setDoctor(null);
    setIsAuthenticated(false);
    await storage.removeItem(StorageKeys.DOCTOR_DATA);
  };

  const updateDoctor = async (doctorData: Partial<Doctor>) => {
    const updatedDoctor = { ...doctor, ...doctorData } as Doctor;
    setDoctor(updatedDoctor);
    await storage.setItem(StorageKeys.DOCTOR_DATA, updatedDoctor);
  };

  return (
    <AuthContext.Provider value={{ doctor, isAuthenticated, login, logout, updateDoctor, isLoading }}>
      {children}
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