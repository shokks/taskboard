import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  size?: 'large' | 'standard' | 'compact';
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  size = 'standard',
  color = 'gray',
  children,
  onClick,
  className = ''
}: MetricCardProps) {
  const sizeClasses = {
    large: 'p-6',
    standard: 'p-4', 
    compact: 'p-3'
  };

  const valueClasses = {
    large: 'text-3xl font-bold mb-1',
    standard: 'text-2xl font-bold mb-1',
    compact: 'text-xl font-bold mb-1'
  };

  const titleClasses = {
    large: 'text-sm font-medium text-muted-foreground',
    standard: 'text-xs text-muted-foreground',
    compact: 'text-xs text-muted-foreground'
  };

  const iconSizes = {
    large: 24,
    standard: 20,
    compact: 16
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    gray: 'text-muted-foreground'
  };

  const hoverClasses = onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : '';

  return (
    <Card className={`${hoverClasses} ${className}`} onClick={onClick}>
      <CardContent className={sizeClasses[size]}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className={`${valueClasses[size]} ${colorClasses[color]}`}>
              {value}
            </div>
            <p className={titleClasses[size]}>{title}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground/80 mt-1">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="mt-3">
                {children}
              </div>
            )}
          </div>
          <Icon 
            size={iconSizes[size]} 
            className={`${colorClasses[color]} flex-shrink-0 ml-3`} 
          />
        </div>
      </CardContent>
    </Card>
  );
}