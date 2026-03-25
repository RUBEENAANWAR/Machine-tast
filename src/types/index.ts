export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  phone: string;
  email: string;
  address: string;
  condition: string;
  status: 'Active' | 'Inactive' | 'Critical' | 'Recovered';
  lastVisit: string;
  nextAppointment: string;
  doctor: string;
  department: string;
  avatar: string;
  insurance: string;
  admissionDate: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSat: number;
    weight: number;
    height: number;
  };
  medicalHistory: string[];
  medications: string[];
}

export interface AnalyticsData {
  month: string;
  patients: number;
  revenue: number;
  appointments: number;
  recovered: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export type ViewMode = 'grid' | 'list';
