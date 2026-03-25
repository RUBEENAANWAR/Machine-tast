import { Bell, Check, Trash2, Clock, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './NotificationsPage.css';

const ICON_MAP = {
  info: { icon: Info, color: 'var(--info)' },
  warning: { icon: AlertTriangle, color: 'var(--warning)' },
  success: { icon: CheckCircle, color: 'var(--success)' },
  error: { icon: XCircle, color: 'var(--danger)' },
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead, clearNotifications } = useAppStore();

  const sorted = [...notifications].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="notifications-page animate-fade-in">
      <div className="section-header">
        <div>
          <h2 className="section-title">Notifications</h2>
          <p className="section-subtitle">Manage your alerts and system messages</p>
        </div>
        <div className="notifications__actions">
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}>
            <Check size={14} /> Mark all read
          </button>
          <button className="btn btn-ghost btn-sm" onClick={clearNotifications} style={{ color: 'var(--danger)' }}>
            <Trash2 size={14} /> Clear all
          </button>
        </div>
      </div>

      <div className="glass-card notifications-list">
        {sorted.length > 0 ? (
          sorted.map((n) => {
            const { icon: Icon, color } = ICON_MAP[n.type];
            return (
              <div 
                key={n.id} 
                className={`notification-item ${n.read ? 'notification-item--read' : 'notification-item--unread'}`}
                onClick={() => !n.read && markNotificationRead(n.id)}
              >
                {!n.read && <div className="notification-item__unread-dot" />}
                <div className="notification-item__icon" style={{ background: `${color}15`, color }}>
                  <Icon size={18} />
                </div>
                <div className="notification-item__content">
                  <div className="notification-item__header">
                    <h3 className="notification-item__title">{n.title}</h3>
                    <span className="notification-item__time">
                      <Clock size={11} />
                      {new Intl.DateTimeFormat('en-US', { 
                        month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' 
                      }).format(n.timestamp)}
                    </span>
                  </div>
                  <p className="notification-item__message">{n.message}</p>
                </div>
                {!n.read && (
                  <button 
                    className="notification-item__mark btn btn-ghost btn-icon btn-sm"
                    onClick={(e) => { e.stopPropagation(); markNotificationRead(n.id); }}
                    title="Mark as read"
                  >
                    <Check size={14} />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="notifications-empty">
            <Bell size={48} color="var(--text-muted)" />
            <h3>No notifications</h3>
            <p>You're all caught up! New alerts will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
