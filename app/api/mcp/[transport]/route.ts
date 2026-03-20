import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { careerItems } from '@/lib/data/career_history';
import { submitContactForm } from '@/app/actions/contact';
import { serverEnv } from '@/lib/env/server';
import { getVisibleAndSorted } from '@/lib/utils/data';

const handler = createMcpHandler(
  (server: McpServer) => {
    server.tool(
      'get_profile',
      "Get Aghogho Meyoron's professional profile summary and contact info.",
      {},
      async () => ({
        content: [{ type: 'text', text: JSON.stringify(profile, null, 2) }],
      })
    );

    server.tool(
      'list_projects',
      'List all projects in the portfolio with their tech stack and links.',
      {},
      async () => {
        const visibleProjects = getVisibleAndSorted(projects);

        return {
          content: [{ type: 'text', text: JSON.stringify(visibleProjects, null, 2) }],
        };
      }
    );

    server.tool(
      'list_experience',
      "Get Aghogho's career history and work experience.",
      {},
      async () => {
        const visibleExperience = getVisibleAndSorted(careerItems);

        return {
          content: [{ type: 'text', text: JSON.stringify(visibleExperience, null, 2) }],
        };
      }
    );

    server.tool(
      'send_message',
      "Send a contact message to Aghogho via the portfolio's contact system.",
      {
        name: z.string().describe('Name of the sender'),
        email: z.string().email().describe('Email address of the sender'),
        subject: z.string().describe('Subject of the message'),
        message: z.string().describe('The message content'),
      },
      async (args) => {
        // @todo: This should be removed
        const { name, email, subject, message } = args;
        const result = await submitContactForm({ name, email, subject, message });
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
      }
    );
  },
  {
    serverInfo: { name: 'aghogho-portfolio-server', version: '1.0.0' },
  },
  {
    basePath: '/api/mcp',
    verboseLogs: true,
    redisUrl: serverEnv.REDIS_URL,
    disableSse: false,
  }
);

export { handler as GET, handler as POST };
