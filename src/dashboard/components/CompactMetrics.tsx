import { Target, Activity, AlertTriangle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { ProjectMetrics } from '../hooks/useMetrics';

interface CompactMetricsProps {
  metrics: ProjectMetrics;
}

export function CompactMetrics({ metrics }: CompactMetricsProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Progress Badge */}
      <div className="flex items-center gap-1.5">
        <Target size={12} className="text-green-600" />
        <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium">
          {metrics.completionRate}% complete
        </Badge>
      </div>

      {/* Active Work Badge */}
      {metrics.activeWorkload > 0 && (
        <div className="flex items-center gap-1.5">
          <Activity size={12} className="text-blue-600" />
          <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-medium">
            {metrics.activeWorkload} active
          </Badge>
        </div>
      )}

      {/* High Priority Alert Badge */}
      {metrics.attentionNeeded > 0 && (
        <div className="flex items-center gap-1.5">
          <AlertTriangle size={12} className="text-red-600" />
          <Badge variant="secondary" className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium">
            {metrics.attentionNeeded} high priority
          </Badge>
        </div>
      )}

      {/* Work Queue (only show if significant) */}
      {metrics.workQueue > 5 && (
        <Badge variant="outline" className="text-xs">
          {metrics.workQueue} ready
        </Badge>
      )}
    </div>
  );
}