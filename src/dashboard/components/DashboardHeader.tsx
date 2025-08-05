import { TaskData } from '../types/task.types';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';

interface DashboardHeaderProps {
  taskData: TaskData;
  currentView: 'kanban' | 'list' | 'grid';
  onViewChange: (view: 'kanban' | 'list' | 'grid') => void;
}

export function DashboardHeader({ taskData, currentView, onViewChange }: DashboardHeaderProps) {
  const tasks = taskData.tasks || [];
  
  // Calculate metrics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const reviewTasks = tasks.filter(task => task.status === 'review').length;
  
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Priority breakdown
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'low').length;

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        {/* Title and Project Info */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Taskboard</h1>
            {taskData.metadata?.tag && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">Project:</span>
                <Badge variant="secondary">{taskData.metadata.tag}</Badge>
              </div>
            )}
          </div>
          
          {/* View Toggle */}
          <Tabs value={currentView} onValueChange={(value) => onViewChange(value as 'kanban' | 'list' | 'grid')}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {/* Total Tasks */}
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{totalTasks}</div>
              <p className="text-xs text-muted-foreground">Total Tasks</p>
            </CardContent>
          </Card>

          {/* Completion Rate */}
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          {/* In Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{inProgressTasks}</div>
              <p className="text-xs text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{pendingTasks}</div>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>

          {/* Review */}
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{reviewTasks}</div>
              <p className="text-xs text-muted-foreground">In Review</p>
            </CardContent>
          </Card>

          {/* High Priority */}
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{highPriorityTasks}</div>
              <p className="text-xs text-muted-foreground">High Priority</p>
            </CardContent>
          </Card>
        </div>

        {/* Priority Breakdown */}
        {totalTasks > 0 && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">Priority breakdown:</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>{highPriorityTasks} High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>{mediumPriorityTasks} Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>{lowPriorityTasks} Low</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}