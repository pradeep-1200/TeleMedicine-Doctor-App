import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Appointment } from '../types';

interface AppointmentContextType {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    // Initial dummy data
    {
      id: '1',
      patientName: 'Jay Patil',
      patientId: 'APPLE112349087',
      symptom: 'Hairfall',
      status: 'booked-paid',
      date: '13/09/2023',
      time: '10:30 AM',
      fee: 800,
      type: 'video',
      appointmentType: 'Paid Video',
      bookingStatus: 'Confirmed',
      routineStatus: 'Not Assigned',
    },
  ]);

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev =>
      prev.map(app =>
        app.id === id ? { ...app, ...updates } : app
      )
    );
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        selectedAppointment,
        setSelectedAppointment,
        updateAppointment,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within AppointmentProvider');
  }
  return context;
};