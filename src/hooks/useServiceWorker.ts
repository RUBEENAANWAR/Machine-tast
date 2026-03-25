import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useServiceWorker() {
  const addNotification = useAppStore((s) => s.addNotification);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope);
      })
      .catch((err) => console.warn('SW registration failed:', err));

    // Ask for notification permission on mount
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          addNotification({
            title: 'Notifications Enabled',
            message: 'You will now receive real-time health alerts and updates.',
            type: 'success',
            read: false,
          });
        }
      });
    }
  }, [addNotification]);

  const sendLocalNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const n = new Notification(title, {
        body,
        icon: '/vite.svg',
      });
      setTimeout(() => n.close(), 5000);
    }
    addNotification({
      title,
      message: body,
      type: 'info',
      read: false,
    });
  };

  return { sendLocalNotification };
}
