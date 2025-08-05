import { useEffect, useState } from 'react';
import { KanbanBoard } from './components/KanbanBoard';
import { TaskData } from './types/task.types';
import { useTaskUpdates } from './hooks/useTaskUpdates';

export default function App() {
  const [taskData, setTaskData] = useState<TaskData>({ tasks: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 dark:text-red-400 mb-2">{error}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Make sure TaskMaster is initialized in your project
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Taskboard
          </h1>
          {taskData.metadata?.tag && (
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Tag: {taskData.metadata.tag}
            </div>
          )}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <KanbanBoard tasks={taskData.tasks} />
      </main>
    </div>
  );
}