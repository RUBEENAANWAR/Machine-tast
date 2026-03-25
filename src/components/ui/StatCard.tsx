import { LucideIcon, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  positive?: boolean;
  color: string;
  bg: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  change,
  positive = true,
  color,
  bg,
}: StatCardProps) {
  return (
    <div className="glass-card stat-card">
      <div className="stat-icon" style={{ background: bg }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
      <div className={`stat-change ${positive ? 'positive' : 'negative'}`}>
        <ArrowUpRight size={12} style={{ transform: positive ? '' : 'rotate(90deg)' }} />
        {change} from last month
      </div>
    </div>
  );
}
