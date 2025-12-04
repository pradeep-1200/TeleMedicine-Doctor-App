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
    sleepPattern: string;
  };
  coupon?: {
    code: string;
    description: string;
    discount: number;
  };
  bookingDetails?: {
    bookedBy: string;
    bookingDate: string;
    bookingTime: string;
    paymentDate: string;
    paymentTime: string;
  };
  medicalReports?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'message' | 'system';
}

export interface User {
  id: string;
  name: string;
  role: 'doctor' | 'patient';
  specialization?: string;
  walletBalance: number;
}

export interface CallData {
  appointmentId: string;
  patientName: string;
  patientId: string;
  callType: 'video' | 'audio';
  duration?: number;
  endReason?: 'completed' | 'low-balance' | 'patient-unavailable' | 'patient-ended';
}