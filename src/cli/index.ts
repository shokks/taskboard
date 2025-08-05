#!/usr/bin/env node

import { Command } from 'commander';
import { serve } from './commands/serve.js';

const program = new Command();

program
  .name('taskboard')
  .description('A Kanban dashboard for TaskMaster projects with real-time updates')
  .version('1.0.0');

program
  .command('serve')
  .description('Start the Taskboard dashboard server')
  .option('-p, --port <number>', 'port to run the server on', '5000')
  .option('-o, --open', 'open browser on start', true)
  .option('-w, --watch <path>', 'path to watch for tasks.json', process.cwd())
  .action(serve);

program.parse();