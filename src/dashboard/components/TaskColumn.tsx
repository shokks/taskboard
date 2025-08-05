import { Task } from '../types/task.types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  className?: string;
}

export function TaskColumn({ title, tasks, className = '' }: TaskColumnProps) {
  return (
    <div className={`rounded-lg p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {title} ({tasks.length})
      </h2>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No tasks
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}