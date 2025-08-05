import { 
  Clock, 
  RotateCw, 
  CheckCircle, 
  XCircle, 
  Pause, 
  Eye 
} from 'lucide-react';

interface StatusBadgeProps {
  status: 'pending' | 'in-progress' | 'done' | 'cancelled' | 'deferred' | 'review';
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
      icon: Clock
    },
    'in-progress': {
      label: 'In Progress',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      icon: RotateCw
    },
    done: {
      label: 'Done',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      icon: CheckCircle
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
      icon: XCircle
    },
    deferred: {
      label: 'Deferred',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
      icon: Pause
    },
    review: {
      label: 'Review',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
      icon: Eye
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 12 : 14;
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span className={`inline-flex items-center gap-1 ${sizeClasses} rounded-full font-medium ${config.color}`}>
      <Icon size={iconSize} />
      {config.label}
    </span>
  );
}