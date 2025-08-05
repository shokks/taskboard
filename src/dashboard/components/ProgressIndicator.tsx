interface ProgressIndicatorProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  className?: string;
}

export function ProgressIndicator({ 
  percentage, 
  size = 'md', 
  showLabel = true,
  color = 'green',
  className = ''
}: ProgressIndicatorProps) {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  };

  const backgroundColorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/20',
    green: 'bg-green-100 dark:bg-green-900/20',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/20',
    red: 'bg-red-100 dark:bg-red-900/20'
  };

  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{clampedPercentage}%</span>
        </div>
      )}
      <div className={`w-full ${backgroundColorClasses[color]} rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div 
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}