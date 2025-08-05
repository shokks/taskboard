import { 
  Target,
  Activity,
  Clock, 
  AlertTriangle,
  TrendingUp,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { TaskData } from '../types/task.types';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { MetricCard } from './MetricCard';
import { ProgressIndicator } from './ProgressIndicator';
import { CompactMetrics } from './CompactMetrics';
import { useMetrics } from '../hooks/useMetrics';
import { useHeaderCollapse } from '../hooks/useHeaderCollapse';
import { Logo } from './Logo';
import { version } from '../utils/version';

interface DashboardHeaderProps {
  taskData: TaskData;
  currentView: 'kanban' | 'list' | 'grid';
  onViewChange: (view: 'kanban' | 'list' | 'grid') => void;
}

export function DashboardHeader({ taskData, currentView, onViewChange }: DashboardHeaderProps) {
  const tasks = taskData.tasks || [];
  const metrics = useMetrics(tasks);
  const { isCollapsed, toggle } = useHeaderCollapse();

  return (
    <div className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ease-in-out ${
      isCollapsed ? 'py-3' : 'py-4'
    }`}>
      <div className="container mx-auto px-4">
        
        {isCollapsed ? (
          /* Collapsed Mode - Single Horizontal Bar */
          <div className="flex items-center justify-between gap-4">
            {/* Left: Title + Project + Compact Metrics */}
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-shrink-0">
                <Logo size={20} className="text-foreground align-baseline" />
                <h1 className="text-lg font-bold leading-none">Taskboard</h1>
                <span className="text-xs text-muted-foreground font-medium leading-none align-baseline">v{version}</span>
              </div>
              
              <div className="hidden sm:block">
                <CompactMetrics metrics={metrics} />
              </div>
            </div>

            {/* Right: View Toggle + Expand Button */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Tabs value={currentView} onValueChange={(value) => onViewChange(value as 'kanban' | 'list' | 'grid')}>
                <TabsList className="h-8">
                  <TabsTrigger value="kanban" className="text-xs px-2">Kanban</TabsTrigger>
                  <TabsTrigger value="list" className="text-xs px-2">List</TabsTrigger>
                  <TabsTrigger value="grid" className="text-xs px-2">Grid</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <button
                onClick={toggle}
                className="p-1.5 border border-border bg-background/50 hover:bg-muted/80 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                title="Expand header (Ctrl+H)"
              >
                <ChevronDown size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ) : (
          /* Expanded Mode - Full Dashboard */
          <>
            {/* Title and Project Info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <Logo size={28} className="text-foreground align-baseline" />
                  <h1 className="text-3xl font-bold tracking-tight leading-none">Taskboard</h1>
                  <span className="text-sm text-muted-foreground font-medium leading-none align-baseline">v{version}</span>
                </div>
              </div>
              
              {/* View Toggle + Collapse Button */}
              <div className="flex items-center gap-3">
                <Tabs value={currentView} onValueChange={(value) => onViewChange(value as 'kanban' | 'list' | 'grid')}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="kanban">Kanban</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <button
                  onClick={toggle}
                  className="p-1.5 border border-border bg-background/50 hover:bg-muted/80 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  title="Collapse header (Ctrl+H)"
                >
                  <ChevronUp size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Full Metrics Dashboard */}
            <div className="space-y-6 mb-6">
              
              {/* Tier 1: Project Health (Large Cards) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Project Progress */}
                <MetricCard
                  title="Project Progress"
                  value={`${metrics.completionRate}%`}
                  subtitle={`${metrics.completedTasks} of ${metrics.totalTasks} tasks completed`}
                  icon={Target}
                  size="large"
                  color="green"
                >
                  <ProgressIndicator 
                    percentage={metrics.completionRate} 
                    color="green"
                    showLabel={false}
                  />
                </MetricCard>

                {/* Active Workload */}
                <MetricCard
                  title="Active Workload"
                  value={`${metrics.activeWorkload} Tasks`}
                  subtitle={`${metrics.inProgressTasks} in progress • ${metrics.reviewTasks} in review`}
                  icon={Activity}
                  size="large"
                  color="blue"
                />
              </div>

              {/* Tier 2: Actionable Info (Standard Cards) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Work Queue */}
                <MetricCard
                  title="Ready to Start"
                  value={metrics.workQueue}
                  subtitle="Tasks in work queue"
                  icon={Clock}
                  color="gray"
                />

                {/* Needs Attention */}
                <MetricCard
                  title="Needs Attention"
                  value={metrics.attentionNeeded}
                  subtitle="High priority tasks"
                  icon={AlertTriangle}
                  color="red"
                />
              </div>

              {/* Tier 3: Context Info (Compact Layout) */}
              {metrics.totalTasks > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Priority Distribution */}
                  <div className="bg-card rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-card-foreground">Priority Distribution</h3>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          High
                        </span>
                        <span>{metrics.highPriorityTasks} ({metrics.priorityDistribution.high}%)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          Medium
                        </span>
                        <span>{metrics.mediumPriorityTasks} ({metrics.priorityDistribution.medium}%)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          Low
                        </span>
                        <span>{metrics.lowPriorityTasks} ({metrics.priorityDistribution.low}%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Status Summary */}
                  <div className="bg-card rounded-lg border p-4">
                    <h3 className="text-sm font-medium text-card-foreground mb-3">Project Status</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="text-muted-foreground">Completed</div>
                        <div className="font-medium text-green-600">{metrics.completedTasks}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Remaining</div>
                        <div className="font-medium">{metrics.totalTasks - metrics.completedTasks}</div>
                      </div>
                      {metrics.deferredTasks > 0 && (
                        <div>
                          <div className="text-muted-foreground">Deferred</div>
                          <div className="font-medium text-yellow-600">{metrics.deferredTasks}</div>
                        </div>
                      )}
                      {metrics.cancelledTasks > 0 && (
                        <div>
                          <div className="text-muted-foreground">Cancelled</div>
                          <div className="font-medium text-red-600">{metrics.cancelledTasks}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}