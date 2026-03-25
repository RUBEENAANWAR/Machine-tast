import { useEffect } from 'react';
import {
  Users, Activity, Calendar as CalendarIcon, TrendingUp, AlertTriangle,
  CheckCircle, Clock, Heart, Stethoscope
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { useServiceWorker } from '../hooks/useServiceWorker';
import { ANALYTICS_DATA, DOCTORS } from '../data/mockData';
import StatCard from '../components/ui/StatCard';
import Avatar from '../components/ui/Avatar';
import './DashboardPage.css';

const STAT_CARDS = [
  { icon: Users, label: 'Total Patients', value: '1,284', change: '+12.5%', positive: true, color: '#6366f1', bg: 'rgba(99,102,241,.12)' },
  { icon: Activity, label: 'Active Cases', value: '342', change: '+8.2%', positive: true, color: '#06b6d4', bg: 'rgba(6,182,212,.12)' },
  { icon: CalendarIcon, label: 'Appointments Today', value: '58', change: '-3.1%', positive: false, color: '#f59e0b', bg: 'rgba(245,158,11,.12)' },
  { icon: TrendingUp, label: 'Monthly Revenue', value: '$66K', change: '+18.4%', positive: true, color: '#10b981', bg: 'rgba(16,185,129,.12)' },
];

const RECENT_ACTIVITY = [
  { icon: AlertTriangle, text: 'Robert Garcia O₂ sat dropped to 91%', time: '2 min ago', color: 'var(--danger)' },
  { icon: CheckCircle, text: 'Michael Brown marked as recovered', time: '1 hr ago', color: 'var(--success)' },
  { icon: Clock, text: 'James Wilson appointment scheduled', time: '3 hr ago', color: 'var(--warning)' },
  { icon: Heart, text: 'Sarah Johnson vitals updated', time: '5 hr ago', color: 'var(--primary-light)' },
  { icon: Stethoscope, text: 'New patient Amanda Clark admitted', time: '1 day ago', color: 'var(--secondary)' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.name === 'revenue' ? `$${(p.value/1000).toFixed(0)}K` : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

export default function DashboardPage() {
  const { patients } = useAppStore();
  const { sendLocalNotification } = useServiceWorker();

  const criticalCount = patients.filter((p) => p.status === 'Critical').length;

  return (
    <div className="dashboard animate-fade-in">
      {/* Stat Cards */}
      <div className="grid-4 dashboard__stats">
        {STAT_CARDS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="dashboard__charts">
        <div className="glass-card dashboard__chart-main">
          <div className="section-header">
            <div>
              <h2 className="section-title">Patient Admissions & Revenue</h2>
              <p className="section-subtitle">Last 7 months performance overview</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={ANALYTICS_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="patientGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,.1)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="patients" stroke="#6366f1" strokeWidth={2} fill="url(#patientGrad)" name="patients" />
              <Area type="monotone" dataKey="appointments" stroke="#06b6d4" strokeWidth={2} fill="url(#revenueGrad)" name="appointments" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card dashboard__chart-side">
          <div className="section-header">
            <div>
              <h2 className="section-title">Patient Status</h2>
              <p className="section-subtitle">Current breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ANALYTICS_DATA.slice(-4)} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,.1)" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="recovered" fill="#10b981" radius={[4, 4, 0, 0]} name="recovered" />
              <Bar dataKey="patients" fill="#6366f1" radius={[4, 4, 0, 0]} name="patients" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="dashboard__bottom">
        <div className="glass-card dashboard__activity">
          <div className="section-header">
            <div>
              <h2 className="section-title">Recent Activity</h2>
              <p className="section-subtitle">Latest system events</p>
            </div>
          </div>
          <div className="activity-list">
            {RECENT_ACTIVITY.map(({ icon: Icon, text, time, color }) => (
              <div key={text} className="activity-item">
                <div className="activity-item__icon" style={{ color, background: `${color}18` }}>
                  <Icon size={14} />
                </div>
                <div className="activity-item__content">
                  <p className="activity-item__text">{text}</p>
                  <span className="activity-item__time">{time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card dashboard__doctors">
          <div className="section-header">
            <div>
              <h2 className="section-title">Top Doctors</h2>
              <p className="section-subtitle">By patient count</p>
            </div>
          </div>
          <div className="doctors-list">
            {DOCTORS.map((doc, i) => (
              <div key={doc.name} className="doctor-item">
                <Avatar label={doc.name.split(' ').map((n) => n[0]).join('').slice(1, 3)} size="sm" index={i} />
                <div className="doctor-item__info">
                  <span className="doctor-item__name">{doc.name}</span>
                  <span className="doctor-item__specialty">{doc.specialty}</span>
                </div>
                <div className="doctor-item__stats">
                  <span className="doctor-item__patients">{doc.patients} pts</span>
                  <span className="doctor-item__rating">⭐ {doc.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
