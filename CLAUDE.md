# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Taskboard - A Kanban dashboard for TaskMaster projects with real-time updates. This is a web application that runs independently of the user's development environment.

**Key Technology Stack:**
- Vite (build tool and dev server)
- React with TypeScript
- TailwindCSS for styling
- File system watcher for real-time updates

## Architecture & Structure

### Package Architecture
- **Package Name**: `taskboard`
- **Type**: Global npm CLI tool with embedded web dashboard
- **Entry Point**: CLI binary that starts a Vite dev server

### Core Components
1. **CLI Tool**: Command-line interface for starting/managing the dashboard
2. **Web Dashboard**: React SPA with Kanban board visualization
3. **File Watcher**: Monitors `.taskmaster/tasks/tasks.json` for live updates
4. **Port Manager**: Handles port allocation (5000-5999 range)

### Expected Project Structure
```
taskboard/
├── src/
│   ├── cli/           # CLI entry point and commands
│   ├── dashboard/     # React dashboard application
│   ├── server/        # Express server and file monitoring
├── dist/              # Built CLI and dashboard
├── package.json       # Package config with "taskboard" binary
├── LICENSE            # MIT license
└── README.md          # Installation and usage instructions
```

## Development Commands

```bash
# Install dependencies
npm install

# Development mode (dashboard only)
npm run dev

# Build for production (builds both dashboard and CLI)
npm run build

# Build CLI only
npm run build:cli

# Run tests
npm test

# Lint code (TypeScript and React)
npm run lint

# Type checking
npm run type-check

# Preview built dashboard
npm run preview
```

## Key Technical Considerations

### Real-time Updates
The dashboard must watch `.taskmaster/tasks/tasks.json` in the user's project directory and update the UI within 1 second of file changes.

### Port Management
- Default port: 5000
- Fallback range: 5000-5999
- Must detect and avoid conflicts with user's development servers

### Multi-Project Support
Each project instance should run on its own port, allowing developers to have multiple dashboards open simultaneously.

### Task Data Structure
Expect tasks.json to contain:
- Task ID, title, description
- Status: pending, in-progress, completed
- Created/updated timestamps
- Priority and other metadata

## Implementation Guidelines

1. **Zero Configuration**: Dashboard should work immediately after installation without setup
2. **Non-Intrusive**: Must not interfere with user's existing development workflow
3. **Performance**: Dashboard should load in <2 seconds and update within 1 second
4. **Error Handling**: Gracefully handle missing tasks.json or malformed data

## Important Notes

- This is a standalone tool, NOT integrated into the user's codebase
- Must work across different operating systems (Windows, macOS, Linux)
- Should respect the user's system theme preferences
- Keep the UI simple and focused on task visualization