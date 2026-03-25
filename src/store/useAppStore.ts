import { create } from 'zustand';
import type { User, Patient, Notification, ViewMode } from '../types';
import { MOCK_PATIENTS } from '../data/mockData';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;
  logout: () => void;

  // Patients
  patients: Patient[];
  selectedPatient: Patient | null;
  viewMode: ViewMode;
  searchQuery: string;
  statusFilter: string;
  setPatients: (patients: Patient[]) => void;
  setSelectedPatient: (patient: Patient | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (filter: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  clearNotifications: () => void;

  // UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  authLoading: true,
  setUser: (user) => set({ user, isAuthenticated: !!user, authLoading: false }),
  setAuthLoading: (authLoading) => set({ authLoading }),
  logout: () => set({ user: null, isAuthenticated: false }),

  // Patients
  patients: MOCK_PATIENTS,
  selectedPatient: null,
  viewMode: 'grid',
  searchQuery: '',
  statusFilter: 'All',
  setPatients: (patients) => set({ patients }),
  setSelectedPatient: (selectedPatient) => set({ selectedPatient }),
  setViewMode: (viewMode) => set({ viewMode }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),

  // Notifications
  notifications: [
    {
      id: '1',
      title: 'Critical Patient Alert',
      message: 'Patient Robert Garcia (P008) requires immediate attention. O₂ saturation at 91%.',
      type: 'error',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'Appointment Reminder',
      message: 'James Wilson has an appointment scheduled for tomorrow at 10:00 AM.',
      type: 'warning',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: '3',
      title: 'Lab Results Ready',
      message: 'Blood work results for Sarah Johnson are now available.',
      type: 'info',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: '4',
      title: 'Patient Recovered',
      message: 'Michael Brown has been marked as recovered and discharged.',
      type: 'success',
      timestamp: new Date(Date.now() - 86400000),
      read: true,
    },
  ],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false,
        },
        ...state.notifications,
      ],
    })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // UI
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
}));
