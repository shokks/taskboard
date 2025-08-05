export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done' | 'cancelled' | 'deferred' | 'review';
  priority?: 'low' | 'medium' | 'high';
  created: string;
  updated: string;
  dependencies?: string[];
  subtasks?: Subtask[];
  details?: string;
  testStrategy?: string;
  parentId?: string;
}

export interface Subtask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done' | 'cancelled' | 'deferred' | 'review';
  priority?: 'low' | 'medium' | 'high';
  created?: string;
  updated?: string;
  dependencies?: string[];
  details?: string;
}

export interface TaskData {
  tasks: Task[];
  metadata?: {
    createdAt?: string;
    updatedAt?: string;
    version?: string;
    tag?: string;
    [key: string]: string | number | boolean | null | undefined;
  };
}

export interface TaskMasterData {
  [tagName: string]: {
    tasks: Task[];
    metadata?: {
      created?: string;
      updated?: string;
      description?: string;
      [key: string]: string | number | boolean | null | undefined;
    };
  };
}

export interface TaskUpdate {
  type: 'tasks-update';
  data: TaskMasterData;
}