declare module 'mcp-handler' {
  import { Server } from '@modelcontextprotocol/sdk/server/index.js';

  export function createMcpHandler(server: Server): (request: Request) => Promise<Response>;
}
