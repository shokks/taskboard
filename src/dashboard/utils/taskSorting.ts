import { Task } from '../types/task.types';

/**
 * Find the next task that can be worked on based on TaskMaster dependency rules
 * Returns the first pending task whose dependencies are all completed
 */
export function findNextAvailableTask(tasks: Task[]): Task | null {
  const completedIds = new Set(
    tasks.filter(t => t.status === 'done').map(t => String(t.id))
  );
  
  return tasks
    .filter(task => task.status === 'pending')
    .find(task => 
      !task.dependencies || 
      task.dependencies.length === 0 ||
      task.dependencies.every(depId => completedIds.has(String(depId)))
    ) || null;
}

/**
 * Check if a task is ready to be worked on (all dependencies completed)
 */
export function isTaskReady(task: Task, completedTaskIds: Set<string>): boolean {
  if (!task.dependencies || task.dependencies.length === 0) {
    return true;
  }
  
  return task.dependencies.every(depId => completedTaskIds.has(String(depId)));
}

/**
 * Sort tasks by dependency order, prioritizing ready tasks first
 */
export function sortTasksByDependencies(tasks: Task[]): Task[] {
  const completedIds = new Set(
    tasks.filter(t => t.status === 'done').map(t => String(t.id))
  );
  
  return tasks.slice().sort((a, b) => {
    const aReady = isTaskReady(a, completedIds);
    const bReady = isTaskReady(b, completedIds);
    
    // Ready tasks come first
    if (aReady && !bReady) return -1;
    if (!aReady && bReady) return 1;
    
    // If both ready or both not ready, sort by priority then ID
    if (a.priority && b.priority) {
      const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
      const aPriority = priorityOrder[a.priority] ?? 3;
      const bPriority = priorityOrder[b.priority] ?? 3;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
    }
    
    // Finally sort by ID to maintain consistent ordering
    return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
  });
}

/**
 * Get dependency status information for a task
 */
export function getTaskDependencyStatus(task: Task, allTasks: Task[]): {
  isReady: boolean;
  blockedBy: Task[];
  totalDependencies: number;
  completedDependencies: number;
} {
  if (!task.dependencies || task.dependencies.length === 0) {
    return {
      isReady: true,
      blockedBy: [],
      totalDependencies: 0,
      completedDependencies: 0
    };
  }
  
  const taskMap = new Map(allTasks.map(t => [String(t.id), t]));
  const dependencyTasks = task.dependencies
    .map(depId => taskMap.get(String(depId)))
    .filter(Boolean) as Task[];
  
  const completedDependencies = dependencyTasks.filter(t => t.status === 'done');
  const blockedBy = dependencyTasks.filter(t => t.status !== 'done');
  
  return {
    isReady: blockedBy.length === 0,
    blockedBy,
    totalDependencies: dependencyTasks.length,
    completedDependencies: completedDependencies.length
  };
}

/**
 * Sort pending tasks specifically for the pending column
 * Puts ready tasks first, then blocked tasks
 */
export function sortPendingTasks(pendingTasks: Task[], allTasks: Task[]): Task[] {
  const completedIds = new Set(
    allTasks.filter(t => t.status === 'done').map(t => String(t.id))
  );
  
  return pendingTasks.slice().sort((a, b) => {
    const aReady = isTaskReady(a, completedIds);
    const bReady = isTaskReady(b, completedIds);
    
    // Ready tasks come first
    if (aReady && !bReady) return -1;
    if (!aReady && bReady) return 1;
    
    // If both ready or both not ready, sort by priority then ID
    if (a.priority && b.priority) {
      const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
      const aPriority = priorityOrder[a.priority] ?? 3;
      const bPriority = priorityOrder[b.priority] ?? 3;
      
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
    }
    
    // Finally sort by ID to maintain consistent ordering
    return String(a.id).localeCompare(String(b.id), undefined, { numeric: true });
  });
}