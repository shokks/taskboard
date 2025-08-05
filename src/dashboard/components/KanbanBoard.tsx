import { Task } from '../types/task.types';
import { TaskColumn } from './TaskColumn';

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  // Group tasks by status
  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const reviewTasks = tasks.filter(task => task.status === 'review');
  const completedTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <TaskColumn
        title="Pending"
        tasks={pendingTasks}
        className="bg-task-pending"
      />
      <TaskColumn
        title="In Progress"
        tasks={inProgressTasks}
        className="bg-task-progress"
      />
      <TaskColumn
        title="Review"
        tasks={reviewTasks}
        className="bg-yellow-50 dark:bg-yellow-900/20"
      />
      <TaskColumn
        title="Completed"
        tasks={completedTasks}
        className="bg-task-completed"
      />
    </div>
  );
}