import { Subtask } from '../types/task.types';
import { SubtaskCard } from './SubtaskCard';
import { ProgressBar } from './ProgressBar';

interface SubtaskListProps {
  subtasks: Subtask[];
  parentId: string;
}

export function SubtaskList({ subtasks, parentId }: SubtaskListProps) {
  if (!subtasks || subtasks.length === 0) {
    return null;
  }

  const completedSubtasks = subtasks.filter(st => st.status === 'done').length;
  const totalSubtasks = subtasks.length;

  // Group subtasks by status for better organization
  const groupedSubtasks = subtasks.reduce((acc, subtask) => {
    if (!acc[subtask.status]) {
      acc[subtask.status] = [];
    }
    acc[subtask.status].push(subtask);
    return acc;
  }, {} as Record<string, Subtask[]>);

  const statusOrder = ['in-progress', 'review', 'pending', 'done', 'deferred', 'cancelled'];
  
  return (
    <div className="mt-4 space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          Subtasks ({completedSubtasks}/{totalSubtasks})
        </h4>
        <ProgressBar 
          completed={completedSubtasks} 
          total={totalSubtasks} 
          size="sm"
          showLabel={false}
        />
      </div>

      <div className="space-y-3">
        {statusOrder.map(status => {
          const statusSubtasks = groupedSubtasks[status];
          if (!statusSubtasks || statusSubtasks.length === 0) return null;

          return (
            <div key={status}>
              {Object.keys(groupedSubtasks).length > 1 && (
                <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                  {status.replace('-', ' ')} ({statusSubtasks.length})
                </h5>
              )}
              <div className="space-y-2">
                {statusSubtasks.map((subtask) => (
                  <SubtaskCard 
                    key={subtask.id} 
                    subtask={subtask} 
                    parentId={parentId}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}