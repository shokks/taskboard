interface ProgressBarProps {
  completed: number;
  total: number;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ 
  completed, 
  total, 
  size = 'sm', 
  showLabel = true,
  className = '' 
}: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const heightClass = size === 'sm' ? 'h-2' : 'h-3';
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';

  // Color based on progress
  const getProgressColor = () => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className={`flex justify-between items-center mb-1 ${textSize}`}>
          <span className="text-gray-600 dark:text-gray-400">
            Progress
          </span>
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {completed}/{total} ({percentage}%)
          </span>
        </div>
      )}
      <div className={`w-full ${heightClass} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
        <div 
          className={`${heightClass} ${getProgressColor()} transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}