import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Appointment } from '../types';
import { dummyAppointments } from '../constants/data';
import { storage, StorageKeys } from '../utils/storage';

interface AppointmentContextType {
  appointments: Appointment[];
  getAppointment: (id: string) => Appointment | undefined;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    const stored = await storage.getItem<Appointment[]>(StorageKeys.APPOINTMENTS);
    if (stored) {
      setAppointments(stored);
    } else {
      setAppointments(dummyAppointments);
      await storage.setItem(StorageKeys.APPOINTMENTS, dummyAppointments);
    }
  };

  const getAppointment = (id: string) => {
    return appointments.find(appointment => appointment.id === id);
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    const updated = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, ...updates } : appointment
    );
    setAppointments(updated);
    await storage.setItem(StorageKeys.APPOINTMENTS, updated);
  };

  const cancelAppointment = (id: string) => {
    updateAppointment(id, { status: 'cancelled' });
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        getAppointment,
        updateAppointment,
        cancelAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};