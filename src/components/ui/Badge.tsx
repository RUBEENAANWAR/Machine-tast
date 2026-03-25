interface BadgeProps {
  status: 'Active' | 'Critical' | 'Inactive' | 'Recovered' | string;
  className?: string;
}

const statusBadge: Record<string, string> = {
  Active: 'badge-active',
  Critical: 'badge-critical',
  Inactive: 'badge-inactive',
  Recovered: 'badge-recovered',
};

export default function Badge({ status, className = '' }: BadgeProps) {
  const badgeClass = statusBadge[status] || 'badge-inactive';
  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {status}
    </span>
  );
}
