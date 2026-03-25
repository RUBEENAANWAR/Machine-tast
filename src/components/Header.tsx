import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu, User } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import './Header.css';

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back — here\'s your overview' },
  '/patients': { title: 'Patient Management', subtitle: 'Manage and monitor all patients' },
  '/analytics': { title: 'Analytics', subtitle: 'Insights and performance metrics' },
  '/notifications': { title: 'Notifications', subtitle: 'Alerts and system messages' },
  '/settings': { title: 'Settings', subtitle: 'Configure your preferences' },
};

export default function Header() {
  const location = useLocation();
  const { user, notifications, toggleSidebar } = useAppStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const matched = Object.entries(PAGE_TITLES).find(([path]) => location.pathname.startsWith(path));
  const pageInfo = matched ? matched[1] : { title: 'HealthSync', subtitle: '' };

  return (
    <header className="header">
      <div className="header__left">
        <button className="btn btn-ghost btn-icon header__menu" onClick={toggleSidebar} aria-label="Menu">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="header__title">{pageInfo.title}</h1>
          <p className="header__subtitle">{pageInfo.subtitle}</p>
        </div>
      </div>

      <div className="header__right">
        <div className="header__search input-with-icon">
          <Search size={15} className="input-icon" />
          <input
            type="text"
            className="input-field header__search-input"
            placeholder="Search patients, records..."
          />
        </div>

        <div className="header__actions">
          <button className="btn btn-ghost btn-icon header__bell" aria-label="Notifications">
            <Bell size={18} />
            {unreadCount > 0 && <span className="header__bell-badge">{unreadCount}</span>}
          </button>

          <div className="header__user">
            <div className="avatar avatar-sm avatar-gradient-1">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <User size={14} />}
            </div>
            <div className="header__user-info">
              <span className="header__user-name">{user?.displayName ?? 'Admin User'}</span>
              <span className="header__user-role">Administrator</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
