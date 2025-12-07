export interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  symptom: string;
  status: 'booked-paid' | 'completed' | 'cancelled' | 'doctor-no-show';
  date: string;
  time: string;
  fee: number;
  type: 'video' | 'audio';
  appointmentType: string;
  bookingStatus: string;
  routineStatus: string;
  symptoms?: {
    symptom: string;
    description: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: string;
    sleepPattern?: string;
  };
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'system';
}

export interface Prescription {
  id: string;
  appointmentId: string;
  medicines: Medicine[];
  notes: string;
  createdAt: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}