import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts';
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter } from 'lucide-react';
import { ANALYTICS_DATA } from '../data/mockData';
import './AnalyticsPage.css';

const PIE_DATA = [
  { name: 'Cardiology', value: 342, color: '#6366f1' },
  { name: 'Endocrinology', value: 156, color: '#06b6d4' },
  { name: 'Neurology', value: 98, color: '#f59e0b' },
  { name: 'Pulmonology', value: 124, color: '#10b981' },
  { name: 'Orthopedics', value: 187, color: '#8b5cf6' },
];

const COLORS = ['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#8b5cf6'];

export default function AnalyticsPage() {
  return (
    <div className="analytics animate-fade-in">
      <div className="section-header">
        <div>
          <h2 className="section-title">Performance Analytics</h2>
          <p className="section-subtitle">Deep dive into hospital operational metrics</p>
        </div>
        <div className="analytics__actions">
          <button className="btn btn-secondary btn-sm"><Filter size={14} /> Filters</button>
          <button className="btn btn-primary btn-sm"><Download size={14} /> Export Report</button>
        </div>
      </div>

      <div className="grid-3 analytics__overview">
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(99,102,241,.12)' }}><Users size={20} color="#6366f1" /></div>
          <div className="stat-value">2,842</div>
          <div className="stat-label">Total Admissions</div>
          <div className="stat-change positive">↑ 14.2% vs last year</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(6,182,212,.12)' }}><Calendar size={20} color="#06b6d4" /></div>
          <div className="stat-value">18.4%</div>
          <div className="stat-label">Appointment Growth</div>
          <div className="stat-change positive">↑ 5.1% this month</div>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16,185,129,.12)' }}><TrendingUp size={20} color="#10b981" /></div>
          <div className="stat-value">$462K</div>
          <div className="stat-label">Annual Revenue</div>
          <div className="stat-change positive">↑ 22.8% projected</div>
        </div>
      </div>

      <div className="analytics__grid">
        {/* Patient Volume Trend */}
        <div className="glass-card analytics__chart">
          <h3 className="analytics__chart-title">Patient Volume & Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ANALYTICS_DATA}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,.1)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{backgroundColor: '#13132b', border: '1px solid rgba(99,102,241,.2)', borderRadius: '8px', color: '#f1f5f9'}}
                itemStyle={{color: '#818cf8'}}
              />
              <Area type="monotone" dataKey="patients" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Distribution */}
        <div className="glass-card analytics__chart">
          <h3 className="analytics__chart-title">Revenue by Month</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ANALYTICS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,.1)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{backgroundColor: '#13132b', border: '1px solid rgba(99,102,241,.2)', borderRadius: '8px'}}
                cursor={{fill: 'rgba(99,102,241,.05)'}}
              />
              <Bar dataKey="revenue" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="glass-card analytics__chart">
          <h3 className="analytics__chart-title">Patient Mix by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {PIE_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{backgroundColor: '#13132b', border: '1px solid rgba(99,102,241,.2)', borderRadius: '8px'}}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recovery Rate */}
        <div className="glass-card analytics__chart">
          <h3 className="analytics__chart-title">Recovery Efficiency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ANALYTICS_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,.1)" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
              <Tooltip 
                contentStyle={{backgroundColor: '#13132b', border: '1px solid rgba(99,102,241,.2)', borderRadius: '8px', color: '#f1f5f9'}}
              />
              <Line type="stepAfter" dataKey="recovered" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#13132b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
