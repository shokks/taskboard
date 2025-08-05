import { useEffect, useState } from 'react';
import { KanbanBoard } from './components/KanbanBoard';
import { DashboardHeader } from './components/DashboardHeader';
import { TaskData } from './types/task.types';
import { useTaskUpdates } from './hooks/useTaskUpdates';

type ViewType = 'kanban' | 'list' | 'grid';

export default function App() {
  const [taskData, setTaskData] = useState<TaskData>({ tasks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('kanban');

  // Connect to WebSocket for real-time updates
  useTaskUpdates((data) => {
    // Handle TaskMaster's tag-based structure for real-time updates
    const tagKeys = Object.keys(data);
    if (tagKeys.length === 0) {
      setTaskData({ tasks: [] });
    } else {
      // Use the first tag (or 'master' if it exists)
      const activeTag = tagKeys.includes('master') ? 'master' : tagKeys[0];
      const tagData = data[activeTag];
      
      setTaskData({
        tasks: tagData.tasks || [],
        metadata: { ...tagData.metadata, tag: activeTag }
      });
    }
    setError(null);
  });

  // Load initial tasks
  useEffect(() => {
    console.log('Fetching tasks from /api/tasks');
    fetch('/api/tasks')
      .then((res) => {
        console.log('Response status:', res.status);
        if (!res.ok) throw new Error(`Failed to load tasks: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('Received tasks:', data);
        
        // Handle TaskMaster's tag-based structure
        const tagKeys = Object.keys(data);
        if (tagKeys.length === 0) {
          setTaskData({ tasks: [] });
        } else {
          // Use the first tag (or 'master' if it exists)
          const activeTag = tagKeys.includes('master') ? 'master' : tagKeys[0];
          const tagData = data[activeTag];
          
          setTaskData({
            tasks: tagData.tasks || [],
            metadata: { ...tagData.metadata, tag: activeTag }
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading tasks:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-destructive mb-2">{error}</div>
          <div className="text-sm text-muted-foreground">
            Make sure TaskMaster is initialized in your project
          </div>
        </div>
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'kanban':
        return <KanbanBoard tasks={taskData.tasks} />;
      case 'list':
        // TODO: Implement ListView component
        return (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
            <div className="text-center">
              <div className="text-2xl mb-2">📋</div>
              <p className="text-muted-foreground">List view coming soon</p>
            </div>
          </div>
        );
      case 'grid':
        // TODO: Implement GridView component
        return (
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-muted rounded-lg">
            <div className="text-center">
              <div className="text-2xl mb-2">⊞</div>
              <p className="text-muted-foreground">Grid view coming soon</p>
            </div>
          </div>
        );
      default:
        return <KanbanBoard tasks={taskData.tasks} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        taskData={taskData}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      <main className="container mx-auto px-4 py-6">
        {renderCurrentView()}
      </main>
    </div>
  );
}