import express, { Request, Response } from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { startFileWatcher } from '../../server/file-watcher.js';
import { findAvailablePort } from '../../server/port-manager.js';
import open from 'open';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ServeOptions {
  port: string;
  open: boolean;
  watch: string;
}

export async function serve(options: ServeOptions) {
  const preferredPort = parseInt(options.port, 10);
  const port = await findAvailablePort(preferredPort);
  
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });

  // API endpoint to get initial tasks (must come BEFORE catch-all route)
  app.get('/api/tasks', (_req: Request, res: Response) => {
    const tasksPath = join(options.watch, '.taskmaster/tasks/tasks.json');
    console.log('Looking for tasks at:', tasksPath);
    console.log('File exists:', existsSync(tasksPath));
    
    try {
      if (existsSync(tasksPath)) {
        const content = readFileSync(tasksPath, 'utf-8');
        console.log('File content length:', content.length);
        const tasks = JSON.parse(content);
        console.log('Parsed tasks:', tasks.tasks?.length || 0, 'tasks found');
        res.json(tasks);
      } else {
        console.log('Tasks file not found at:', tasksPath);
        res.status(404).json({ error: 'Tasks file not found', path: tasksPath });
      }
    } catch (error) {
      console.error('Error reading tasks file:', error);
      res.status(500).json({ error: 'Failed to read tasks file', details: error });
    }
  });

  // Serve static files from the built dashboard
  const dashboardPath = join(__dirname, '../../dashboard');
  app.use(express.static(dashboardPath));

  // Handle SPA routing - serve index.html for all non-API routes
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(join(dashboardPath, 'index.html'));
  });

  // WebSocket connection for real-time updates
  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // Start file watcher
  const tasksPath = join(options.watch, '.taskmaster/tasks/tasks.json');
  startFileWatcher(tasksPath, (tasks) => {
    // Broadcast updates to all connected clients
    wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'tasks-update', data: tasks }));
      }
    });
  });

  // Start server
  server.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`\n🚀 Taskboard is running at ${url}`);
    console.log(`📁 Watching for tasks at: ${tasksPath}`);
    console.log('\nPress Ctrl+C to stop the server\n');

    if (options.open) {
      open(url);
    }
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down Taskboard...');
    server.close(() => {
      process.exit(0);
    });
  });
}