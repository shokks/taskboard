import { Subtask } from '../types/task.types';
import { StatusBadge } from './StatusBadge';

interface SubtaskCardProps {
  subtask: Subtask;
  parentId: string;
}

export function SubtaskCard({ subtask, parentId }: SubtaskCardProps) {
  const priorityColors = {
    high: 'border-l-red-400',
    medium: 'border-l-yellow-400',
    low: 'border-l-green-400',
  };

  const priorityLabels = {
    high: '🔴 High',
    medium: '🟡 Medium',
    low: '🟢 Low',
  };

  const borderColor = subtask.priority 
    ? priorityColors[subtask.priority] 
    : 'border-l-gray-300 dark:border-l-gray-600';

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 border-l-2 ${borderColor}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
            {subtask.title}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              #{parentId}.{subtask.id}
            </span>
            {subtask.priority && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {priorityLabels[subtask.priority]}
              </span>
            )}
          </div>
        </div>
        <StatusBadge status={subtask.status} size="sm" />
      </div>

      {subtask.description && (
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
          {subtask.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 text-xs">
        {subtask.dependencies && subtask.dependencies.length > 0 && (
          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded">
            {subtask.dependencies.length} deps
          </span>
        )}
        
        {(subtask.created || subtask.updated) && (
          <span className="text-gray-500 dark:text-gray-400">
            {subtask.updated ? `Updated ${formatDate(subtask.updated)}` : `Created ${formatDate(subtask.created)}`}
          </span>
        )}
      </div>

      {subtask.details && (
        <details className="mt-2">
          <summary className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-700 dark:hover:text-blue-300">
            View Details
          </summary>
          <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded border text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {subtask.details}
          </div>
        </details>
      )}
    </div>
  );
}