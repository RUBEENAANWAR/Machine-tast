import { User, Bell, Shield, Palette, Globe, HelpCircle, Save, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import './SettingsPage.css';

export default function SettingsPage() {
  const { logout } = useAuth();
  
  return (
    <div className="settings animate-fade-in">
      <div className="section-header">
        <div>
          <h2 className="section-title">Settings</h2>
          <p className="section-subtitle">Manage your account and platform preferences</p>
        </div>
      </div>

      <div className="settings__container">
        {/* Sidebar */}
        <div className="glass-card settings__sidebar">
          <nav className="settings__nav">
            <button className="settings__nav-item settings__nav-item--active"><User size={16} /> Profile</button>
            <button className="settings__nav-item"><Bell size={16} /> Notifications</button>
            <button className="settings__nav-item"><Shield size={16} /> Security</button>
            <button className="settings__nav-item"><Palette size={16} /> Appearance</button>
            <button className="settings__nav-item"><Globe size={16} /> Region</button>
            <button className="settings__nav-item"><HelpCircle size={16} /> Support</button>
          </nav>
        </div>

        {/* Content */}
        <div className="glass-card settings__content">
          <div className="settings__section">
            <h3 className="settings__section-title">Public Profile</h3>
            <p className="settings__section-desc">Manage your public information shown across the platform.</p>
            
            <div className="settings__profile-pic">
              <div className="avatar avatar-xl avatar-gradient-1">JD</div>
              <div className="settings__profile-actions">
                <button className="btn btn-primary btn-sm">Upload New Photo</button>
                <button className="btn btn-ghost btn-sm">Remove</button>
              </div>
            </div>

            <div className="settings__form">
              <div className="grid-2">
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input type="text" className="input-field" defaultValue="John Doe" />
                </div>
                <div className="input-group">
                  <label className="input-label">Specialty</label>
                  <input type="text" className="input-field" defaultValue="Administrator" />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input type="email" className="input-field" defaultValue="admin@healthsync.com" />
                </div>
                <div className="input-group">
                  <label className="input-label">Phone Number</label>
                  <input type="tel" className="input-field" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Short Biography</label>
                <textarea className="input-field" rows={4} placeholder="Tell us more about yourself..." defaultValue="Chief Medical Officer at St. Jude Hospital. Managing patient care and hospital workflows since 2018."></textarea>
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="settings__section">
            <h3 className="settings__section-title">Emergency Contact</h3>
            <p className="settings__section-desc">Required in case of critical system alerts.</p>
            <div className="grid-2" style={{ marginTop: 16 }}>
              <div className="input-group"><label className="input-label">Contact Name</label><input type="text" className="input-field" placeholder="Full name" /></div>
              <div className="input-group"><label className="input-label">Relationship</label><input type="text" className="input-field" placeholder="e.g. Supervisor" /></div>
            </div>
          </div>

          <div className="settings__footer">
            <button className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary"><Save size={16} /> Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
