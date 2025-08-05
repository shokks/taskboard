import { Task } from '../types/task.types';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const priorityColors = {
    high: 'border-red-400 bg-red-50 dark:bg-red-900/20',
    medium: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
    low: 'border-green-400 bg-green-50 dark:bg-green-900/20',
  };

  const priorityLabels = {
    high: '🔴 High',
    medium: '🟡 Medium',
    low: '🟢 Low',
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 ${
      task.priority ? priorityColors[task.priority] : 'border-gray-300'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          {task.title}
        </h3>
        {task.priority && (
          <span className="text-xs">
            {priorityLabels[task.priority]}
          </span>
        )}
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-gray-500 dark:text-gray-400">
          #{task.id}
        </span>
        
        {task.subtasks && task.subtasks.length > 0 && (
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
            {task.subtasks.filter(st => st.status === 'done').length}/{task.subtasks.length} subtasks
          </span>
        )}
        
        {task.dependencies && task.dependencies.length > 0 && (
          <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
            {task.dependencies.length} deps
          </span>
        )}
      </div>
    </div>
  );
}