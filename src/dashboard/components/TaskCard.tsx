import { useState } from 'react';
import { ChevronDown, Circle } from 'lucide-react';
import { Task } from '../types/task.types';
import { StatusBadge } from './StatusBadge';
import { SubtaskList } from './SubtaskList';
import { ProgressBar } from './ProgressBar';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityBorders = {
    high: 'border-red-400',
    medium: 'border-yellow-400', 
    low: 'border-green-400',
  };

  const priorityLabels = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };

  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600',
    low: 'text-green-600',
  };

  const borderColor = task.priority ? priorityBorders[task.priority] : 'border-gray-300 dark:border-gray-600';

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const formatRelativeTime = (dateString?: string) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
      return formatDate(dateString);
    } catch {
      return dateString;
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const completedSubtasks = task.subtasks?.filter(st => st.status === 'done').length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggleExpand();
    } else if (e.key === 'Escape' && isExpanded) {
      setIsExpanded(false);
    }
  };

  return (
    <div 
      className={`bg-card text-card-foreground rounded-lg shadow-sm border-l-4 ${borderColor} transition-all duration-200 hover:shadow-md`}
    >
      {/* Card Header */}
      <div 
        className="p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-t-lg"
        onClick={handleToggleExpand}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} task details for ${task.title}`}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="font-semibold text-card-foreground text-sm leading-tight">
              {task.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">
                #{task.id}
              </span>
              {task.priority && (
                <div className="flex items-center gap-1 text-xs">
                  <Circle 
                    size={8} 
                    className={`fill-current ${priorityColors[task.priority]}`} 
                  />
                  <span className={priorityColors[task.priority]}>
                    {priorityLabels[task.priority]}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <StatusBadge status={task.status} size="sm" />
            <ChevronDown 
              size={16}
              className={`text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
            />
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground mb-3">
            {isExpanded ? task.description : truncateText(task.description, 120)}
          </p>
        )}

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-2 text-xs">
          {totalSubtasks > 0 && (
            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
              {completedSubtasks}/{totalSubtasks} subtasks
            </span>
          )}
          
          {task.dependencies && task.dependencies.length > 0 && (
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
              {task.dependencies.length} deps
            </span>
          )}
          
          {task.updated && (
            <span className="text-muted-foreground">
              Updated {formatRelativeTime(task.updated)}
            </span>
          )}
        </div>

        {/* Progress Bar for Subtasks */}
        {totalSubtasks > 0 && !isExpanded && (
          <div className="mt-3">
            <ProgressBar 
              completed={completedSubtasks} 
              total={totalSubtasks} 
              size="sm"
              showLabel={false}
            />
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700">
          <div className="pt-4 space-y-4">
            
            {/* Implementation Details */}
            {task.details && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Implementation Details
                </h4>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {task.details}
                </div>
              </div>
            )}

            {/* Test Strategy */}
            {task.testStrategy && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Test Strategy
                </h4>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {task.testStrategy}
                </div>
              </div>
            )}

            {/* Dependencies */}
            {task.dependencies && task.dependencies.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Dependencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {task.dependencies.map((dep, index) => (
                    <span 
                      key={index}
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded text-xs"
                    >
                      Task #{dep}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
              {task.created && (
                <span>Created: {formatDate(task.created)}</span>
              )}
              {task.updated && (
                <span>Updated: {formatDate(task.updated)}</span>
              )}
            </div>

            {/* Subtasks */}
            <SubtaskList subtasks={task.subtasks || []} parentId={task.id} />
          </div>
        </div>
      )}
    </div>
  );
}