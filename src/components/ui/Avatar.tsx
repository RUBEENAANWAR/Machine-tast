import { User } from 'lucide-react';

interface AvatarProps {
  label: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  index?: number;
  className?: string;
}

const AVATAR_COLORS = [
  'avatar-gradient-1',
  'avatar-gradient-2',
  'avatar-gradient-3',
  'avatar-gradient-4',
  'avatar-gradient-5',
];

export default function Avatar({ label, size = 'md', index = 0, className = '' }: AvatarProps) {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const sizeClass = `avatar-${size}`;

  return (
    <div className={`avatar ${sizeClass} ${colorClass} ${className}`}>
      {label || <User size={size === 'sm' ? 14 : size === 'md' ? 18 : 24} />}
    </div>
  );
}
