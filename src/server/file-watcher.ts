import { watch } from 'chokidar';
import { readFileSync } from 'fs';
import { TaskData } from '../dashboard/types/task.types.js';

let watcher: ReturnType<typeof watch> | null = null;

/**
 * Start watching the tasks.json file for changes
 * @param filePath Path to the tasks.json file
 * @param onChange Callback function when file changes
 */
export function startFileWatcher(
  filePath: string,
  onChange: (tasks: TaskData) => void
) {
  // Clean up existing watcher if any
  if (watcher) {
    watcher.close();
  }

  console.log(`Starting file watcher for: ${filePath}`);

  watcher = watch(filePath, {
    persistent: true,
    ignoreInitial: false,
  });

  watcher.on('add', () => handleFileChange(filePath, onChange));
  watcher.on('change', () => handleFileChange(filePath, onChange));
  
  watcher.on('error', (error) => {
    console.error('File watcher error:', error);
  });

  watcher.on('unlink', () => {
    console.warn('Tasks file was deleted');
    onChange({ tasks: [], metadata: {} });
  });
}

/**
 * Handle file change events
 */
function handleFileChange(filePath: string, onChange: (tasks: TaskData) => void) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const tasks = JSON.parse(content) as TaskData;
    onChange(tasks);
  } catch (error) {
    console.error('Error reading tasks file:', error);
    // Send empty tasks on error
    onChange({ tasks: [], metadata: {} });
  }
}

/**
 * Stop the file watcher
 */
export function stopFileWatcher() {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
}