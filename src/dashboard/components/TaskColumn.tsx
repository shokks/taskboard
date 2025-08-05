import { Task } from '../types/task.types';
import { TaskCard } from './TaskCard';
import { Badge } from '../../components/ui/badge';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  className?: string;
  status?: string;
}

export function TaskColumn({ title, tasks, className = '', status }: TaskColumnProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 dark:bg-gray-800';
      case 'in-progress': return 'bg-blue-100 dark:bg-blue-900';
      case 'review': return 'bg-purple-100 dark:bg-purple-900';
      case 'done': return 'bg-green-100 dark:bg-green-900';
      case 'deferred': return 'bg-yellow-100 dark:bg-yellow-900';
      case 'cancelled': return 'bg-red-100 dark:bg-red-900';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className={`rounded-lg border bg-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-card-foreground">
          {title}
        </h2>
        <Badge variant="secondary" className={getStatusColor(status)}>
          {tasks.length}
        </Badge>
      </div>
      
      <div className="space-y-3 min-h-[200px]">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-sm">No tasks</p>
            </div>
          </div>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}