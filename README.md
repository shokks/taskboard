# Taskboard

A Kanban dashboard for TaskMaster projects with real-time updates. This tool provides a read-only view of your TaskMaster project tasks, automatically updating as tasks change.

## Features

- 📋 **Real-time Kanban Board**: Visualize tasks in Pending, In Progress, Review, and Completed columns
- 🔄 **Live Updates**: Automatically refreshes when tasks.json changes
- 🎯 **Task Details**: View task titles, descriptions, priorities, subtasks, and dependencies
- 🚀 **Zero Configuration**: Works immediately after installation
- 🔌 **Non-intrusive**: Runs independently without affecting your development workflow
- 🌐 **Multi-project Support**: Each project gets its own dashboard instance on different ports

## Installation

```bash
npm install -g taskboard
```

Or with yarn:

```bash
yarn global add taskboard
```

## Usage

Navigate to any TaskMaster-enabled project and run:

```bash
cd /path/to/your/project
taskboard serve
```

The dashboard will automatically:
1. Find an available port (default: 5000)
2. Start watching your `.taskmaster/tasks/tasks.json` file
3. Open your browser to the dashboard

### Command Options

```bash
taskboard serve [options]

Options:
  -p, --port <number>    Port to run the server on (default: 5000)
  -o, --no-open         Don't open browser on start
  -w, --watch <path>    Path to watch for tasks.json (default: current directory)
  -h, --help           Display help for command
```

### Examples

Run on a specific port:
```bash
taskboard serve --port 5050
```

Watch a different directory:
```bash
taskboard serve --watch /path/to/project
```

Start without opening browser:
```bash
taskboard serve --no-open
```

## Prerequisites

- Node.js 16 or higher
- A project with TaskMaster initialized (`.taskmaster/tasks/tasks.json` file)

## How It Works

1. The dashboard watches your project's `.taskmaster/tasks/tasks.json` file
2. When tasks are updated through TaskMaster, the file changes
3. The dashboard detects these changes and updates the UI in real-time
4. Tasks are displayed in a Kanban board format based on their status

## Task Visualization

Tasks are displayed with:
- **Title and Description**: Main task information
- **Priority Indicators**: 🔴 High, 🟡 Medium, 🟢 Low
- **Task ID**: Unique identifier for each task
- **Subtask Progress**: Shows completed/total subtasks
- **Dependencies**: Number of task dependencies

## Troubleshooting

### Dashboard shows "Tasks file not found"
- Ensure TaskMaster is initialized in your project
- Check that `.taskmaster/tasks/tasks.json` exists
- Verify you're running the command from the project root

### Port already in use
- The dashboard will automatically find the next available port
- Or specify a different port with `--port`

### Changes not reflecting
- Ensure the tasks.json file is being updated
- Check the console for any error messages
- Try refreshing the browser

## Development

To run the dashboard in development mode:

```bash
git clone <repository>
cd taskmaster-dashboard
npm install
npm run dev
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.