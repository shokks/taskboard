import { createServer } from 'net';

/**
 * Find an available port in the range 5000-5999
 * @param preferredPort The preferred port to start with
 * @returns Promise<number> The available port
 */
export async function findAvailablePort(preferredPort: number): Promise<number> {
  const MIN_PORT = 5000;
  const MAX_PORT = 5999;
  
  // Ensure preferred port is in valid range
  let port = preferredPort >= MIN_PORT && preferredPort <= MAX_PORT 
    ? preferredPort 
    : MIN_PORT;

  while (port <= MAX_PORT) {
    const isAvailable = await checkPort(port);
    if (isAvailable) {
      return port;
    }
    port++;
  }

  throw new Error(`No available port found in range ${MIN_PORT}-${MAX_PORT}`);
}

/**
 * Check if a port is available
 * @param port The port to check
 * @returns Promise<boolean> True if available, false otherwise
 */
function checkPort(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = createServer();
    
    server.once('error', () => {
      resolve(false);
    });
    
    server.once('listening', () => {
      server.close(() => {
        resolve(true);
      });
    });
    
    server.listen(port);
  });
}