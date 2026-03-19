import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { createMcpHandler } from 'mcp-handler';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

// Import data
import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { careerItems } from '@/lib/data/career_history';
import { submitContactForm } from '@/app/actions/contact';

// Define the server
const server = new Server(
  {
    name: 'aghogho-portfolio-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Implement list_tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_profile',
        description: "Get Aghogho Meyoron's professional profile summary and contact info.",
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'list_projects',
        description: 'List all projects in the portfolio with their tech stack and links.',
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'list_experience',
        description: "Get Aghogho's career history and work experience.",
        inputSchema: { type: 'object', properties: {} },
      },
      {
        name: 'send_message',
        description: "Send a contact message to Aghogho via the portfolio's contact system.",
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Name of the sender' },
            email: { type: 'string', description: 'Email address of the sender' },
            subject: { type: 'string', description: 'Subject of the message' },
            message: { type: 'string', description: 'The message content' },
          },
          required: ['name', 'email', 'subject', 'message'],
        },
      },
    ],
  };
});

// Implement call_tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case 'get_profile':
      return {
        content: [{ type: 'text', text: JSON.stringify(profile, null, 2) }],
      };
    case 'list_projects':
      return {
        content: [{ type: 'text', text: JSON.stringify(projects, null, 2) }],
      };
    case 'list_experience':
      return {
        content: [{ type: 'text', text: JSON.stringify(careerItems, null, 2) }],
      };
    case 'send_message': {
      if (!args) {
        throw new McpError(ErrorCode.InvalidParams, 'Arguments are required for send_message');
      }
      if (!args || typeof args !== 'object') {
        throw new McpError(ErrorCode.InvalidParams, 'Arguments must be an object');
      }
      const { name, email, subject, message } = args as Record<string, string>;
      const result = await submitContactForm({ name, email, subject, message });
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    }
    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
  }
});

// Create the handler
const handler = createMcpHandler(server);

export const GET = handler;
export const POST = handler;
