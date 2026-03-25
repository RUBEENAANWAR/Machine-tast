import { useEffect, useState } from 'react';
import { Bell, X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const ICON_MAP = {
  info: { icon: Info, color: 'var(--info)' },
  warning: { icon: AlertTriangle, color: 'var(--warning)' },
  success: { icon: CheckCircle, color: 'var(--success)' },
  error: { icon: XCircle, color: 'var(--danger)' },
};

export default function NotificationToast() {
  const { notifications } = useAppStore();
  const [active, setActive] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show toast for the latest unread notification
    const latest = notifications[0];
    if (latest && !latest.read) {
      setActive(latest);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (!active || !visible) return null;

  const { icon: Icon, color } = ICON_MAP[active.type];

  return (
    <div 
      className="notification-toast glass-card animate-slide-down"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        width: '320px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        borderLeft: `4px solid ${color}`
      }}
    >
      <div style={{ color, marginTop: '2px' }}>
        <Icon size={20} />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{active.title}</h4>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{active.message}</p>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="btn btn-ghost btn-icon btn-sm"
        style={{ alignSelf: 'flex-start', padding: '4px' }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
