import { Task } from '../types/task.types';
import { TaskColumn } from './TaskColumn';
import { sortPendingTasks } from '../utils/taskSorting';

interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  // Group tasks by status - including all possible statuses
  const rawPendingTasks = tasks.filter(task => task.status === 'pending');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const reviewTasks = tasks.filter(task => task.status === 'review');
  const completedTasks = tasks.filter(task => task.status === 'done');
  const deferredTasks = tasks.filter(task => task.status === 'deferred');
  const cancelledTasks = tasks.filter(task => task.status === 'cancelled');

  // Sort pending tasks using dependency logic (ready tasks first)
  const pendingTasks = sortPendingTasks(rawPendingTasks, tasks);

  // Only show columns that have tasks or are in the main workflow
  const columns = [
    {
      title: "Pending",
      tasks: pendingTasks,
      status: "pending" as const,
      className: "bg-gray-50 dark:bg-gray-800/50",
      show: true
    },
    {
      title: "In Progress", 
      tasks: inProgressTasks,
      status: "in-progress" as const,
      className: "bg-blue-50 dark:bg-blue-900/20",
      show: true
    },
    {
      title: "Review",
      tasks: reviewTasks, 
      status: "review" as const,
      className: "bg-purple-50 dark:bg-purple-900/20",
      show: reviewTasks.length > 0
    },
    {
      title: "Completed",
      tasks: completedTasks,
      status: "done" as const, 
      className: "bg-green-50 dark:bg-green-900/20",
      show: true
    },
    {
      title: "Deferred",
      tasks: deferredTasks,
      status: "deferred" as const,
      className: "bg-yellow-50 dark:bg-yellow-900/20", 
      show: deferredTasks.length > 0
    },
    {
      title: "Cancelled",
      tasks: cancelledTasks,
      status: "cancelled" as const,
      className: "bg-red-50 dark:bg-red-900/20",
      show: cancelledTasks.length > 0
    }
  ];

  const visibleColumns = columns.filter(col => col.show);
  const columnCount = visibleColumns.length;

  // Dynamic grid classes based on column count
  const getGridClasses = () => {
    if (columnCount <= 2) return "grid-cols-1 md:grid-cols-2";
    if (columnCount <= 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (columnCount <= 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    if (columnCount <= 6) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6";
  };

  return (
    <div className="w-full">
      <div className={`grid ${getGridClasses()} gap-6`}>
        {visibleColumns.map((column) => (
          <TaskColumn
            key={column.status}
            title={column.title}
            tasks={column.tasks}
            allTasks={tasks}
            className={column.className}
            status={column.status}
          />
        ))}
      </div>
    </div>
  );
}