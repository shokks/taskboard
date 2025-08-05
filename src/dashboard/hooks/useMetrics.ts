import { Task } from '../types/task.types';

export interface ProjectMetrics {
  // Core metrics
  totalTasks: number;
  completedTasks: number;
  completionRate: number;
  
  // Status breakdown
  pendingTasks: number;
  inProgressTasks: number;
  reviewTasks: number;
  deferredTasks: number;
  cancelledTasks: number;
  
  // Priority breakdown
  highPriorityTasks: number;
  mediumPriorityTasks: number;
  lowPriorityTasks: number;
  
  // Derived insights
  activeWorkload: number; // in-progress + review
  workQueue: number; // pending tasks ready to start
  attentionNeeded: number; // high priority items
  
  // Priority distribution (percentages)
  priorityDistribution: {
    high: number;
    medium: number;
    low: number;
  };
}

export function useMetrics(tasks: Task[]): ProjectMetrics {
  // Basic counts
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const reviewTasks = tasks.filter(task => task.status === 'review').length;
  const deferredTasks = tasks.filter(task => task.status === 'deferred').length;
  const cancelledTasks = tasks.filter(task => task.status === 'cancelled').length;
  
  // Priority counts
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;
  
  // Derived metrics
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const activeWorkload = inProgressTasks + reviewTasks;
  const workQueue = pendingTasks;
  const attentionNeeded = highPriorityTasks;
  
  // Priority distribution percentages
  const priorityDistribution = {
    high: totalTasks > 0 ? Math.round((highPriorityTasks / totalTasks) * 100) : 0,
    medium: totalTasks > 0 ? Math.round((mediumPriorityTasks / totalTasks) * 100) : 0,
    low: totalTasks > 0 ? Math.round((lowPriorityTasks / totalTasks) * 100) : 0,
  };
  
  return {
    totalTasks,
    completedTasks,
    completionRate,
    pendingTasks,
    inProgressTasks,
    reviewTasks,
    deferredTasks,
    cancelledTasks,
    highPriorityTasks,
    mediumPriorityTasks,
    lowPriorityTasks,
    activeWorkload,
    workQueue,
    attentionNeeded,
    priorityDistribution,
  };
}