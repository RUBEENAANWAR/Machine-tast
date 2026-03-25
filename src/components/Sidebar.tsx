import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, BarChart3, Bell, Settings, LogOut,
  ChevronLeft, Heart, Shield, AlertCircle
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { useAuth } from '../hooks/useAuth';
import './Sidebar.css';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patients', icon: Users, label: 'Patients' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/notifications', icon: Bell, label: 'Notifications' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar, notifications } = useAppStore();
  const { logout } = useAuth();
  const location = useLocation();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : 'sidebar--collapsed'}`}>
      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <Heart size={20} strokeWidth={2.5} />
        </div>
        {sidebarOpen && (
          <div className="sidebar__logo-text">
            <span className="sidebar__logo-name">HealthSync</span>
            <span className="sidebar__logo-tag">B2B Platform</span>
          </div>
        )}
        <button className="sidebar__toggle btn btn-ghost btn-icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <ChevronLeft size={16} className={sidebarOpen ? '' : 'rotated'} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {sidebarOpen && <span className="sidebar__nav-label">Main Menu</span>}
        {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname.startsWith(path);
          return (
            <NavLink
              key={path}
              to={path}
              className={`sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
              title={!sidebarOpen ? label : undefined}
            >
              <div className="sidebar__nav-icon">
                <Icon size={18} />
                {label === 'Notifications' && unreadCount > 0 && (
                  <span className="sidebar__badge">{unreadCount}</span>
                )}
              </div>
              {sidebarOpen && <span className="sidebar__nav-text">{label}</span>}
              {isActive && <div className="sidebar__active-indicator" />}
            </NavLink>
          );
        })}

        {/* Critical Alerts Section */}
        {sidebarOpen && notifications.some(n => n.type === 'error' && !n.read) && (
          <div className="sidebar__alerts">
            <span className="sidebar__nav-label" style={{ color: 'var(--danger)', marginTop: '20px' }}>
              Critical Alerts
            </span>
            {notifications
              .filter(n => n.type === 'error' && !n.read)
              .map(n => (
                <div key={n.id} className="sidebar__alert-item animate-pulse-slow">
                  <div className="sidebar__alert-icon">
                    <AlertCircle size={14} />
                  </div>
                  <div className="sidebar__alert-content">
                    <p className="sidebar__alert-title">{n.title}</p>
                    <p className="sidebar__alert-msg">{n.message}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        {sidebarOpen && (
          <div className="sidebar__plan">
            <Shield size={14} />
            <span>Enterprise Plan</span>
          </div>
        )}
        <button
          className="sidebar__nav-item sidebar__logout"
          onClick={logout}
          title={!sidebarOpen ? 'Logout' : undefined}
        >
          <div className="sidebar__nav-icon">
            <LogOut size={18} />
          </div>
          {sidebarOpen && <span className="sidebar__nav-text">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
