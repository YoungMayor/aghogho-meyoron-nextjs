import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { createMcpHandler } from 'mcp-handler';
import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { careerItems } from '@/lib/data/career_history';
import { submitContactForm } from '@/app/actions/contact';
import { serverEnv } from '@/lib/env/server';
import { getVisibleAndSorted } from '@/lib/utils/data';
import { badges } from '@/lib/data/badges';
import { hobbies } from '@/lib/data/hobbies';
import { skills } from '@/lib/data/skills';
import { socialLinks } from '@/lib/data/social_links';
import { contactFormSchema } from '@/lib/utils/validation';

const handler = createMcpHandler(
  (server: McpServer) => {
    server.registerTool(
      'get_profile',
      {
        title: 'Get Profile',
        description: "Get Aghogho Meyoron's professional profile summary and contact info.",
      },
      async () => {
        const completeProfile = {
          ...profile,
          socials: getVisibleAndSorted(socialLinks).map((social) => ({
            platform: social.platform,
            url: social.url,
            label: social.label,
          })),
          badges,
          hobbies: getVisibleAndSorted(hobbies).map((hobby) => hobby.name),
          skills: getVisibleAndSorted(skills).map((skill) => ({
            name: skill.name,
            description: skill.description,
            type: skill.type,
            tools: skill.icons.map((icon) => icon.label),
          })),
        };

        return {
          content: [{ type: 'text', text: JSON.stringify(completeProfile, null, 2) }],
        };
      }
    );

    server.registerTool(
      'list_projects',
      {
        title: 'List Projects',
        description: 'List all projects in the portfolio with their tech stack and links.',
      },
      async () => {
        const visibleProjects = getVisibleAndSorted(projects);

        return {
          content: [{ type: 'text', text: JSON.stringify(visibleProjects, null, 2) }],
        };
      }
    );

    server.registerTool(
      'list_experience',
      {
        title: 'List Experience',
        description: "Get Aghogho's career history and work experience.",
      },
      async () => {
        const visibleExperience = getVisibleAndSorted(careerItems);

        return {
          content: [{ type: 'text', text: JSON.stringify(visibleExperience, null, 2) }],
        };
      }
    );

    server.registerTool(
      'send_message',
      {
        title: 'Send Message',
        description: "Send a contact message to Aghogho via the portfolio's contact system.",
        inputSchema: contactFormSchema,
      },
      async (args) => {
        // @todo: This should be removed
        const { name, email, subject, message } = args;
        const result = await submitContactForm({ name, email, subject, message });

        return {
          isError: !result.success,
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
    verboseLogs: false,
    redisUrl: serverEnv.REDIS_URL,
    disableSse: false,
  }
);

export { handler as GET, handler as POST };
