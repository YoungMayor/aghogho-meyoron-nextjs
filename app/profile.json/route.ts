import { NextResponse } from 'next/server';
import { profile } from '@/lib/data/profile';
import { projects } from '@/lib/data/projects';
import { technicalSkills } from '@/lib/data/skills';
import { careerItems } from '@/lib/data/career_history';
import { academicRecords } from '@/lib/data/academic_history';
import { mentorshipBenefits, mentorshipProcess } from '@/lib/data/mentorship';
import { socialLinks } from '@/lib/data/social_links';
import { getVisibleItems } from '@/lib/utils/data';

export async function GET() {
  const visibleProjects = getVisibleItems(projects);
  const visibleCareer = getVisibleItems(careerItems);
  const visibleEducation = getVisibleItems(academicRecords);

  const openApiSpec = {
    openapi: '3.1.0',
    info: {
      title: profile.name,
      version: '1.0.0',
      description: profile.biography.replace(/<[^>]*>?/gm, ''), // maintain plain text for description
      contact: {
        name: profile.name,
        email: profile.contact.email,
        url:
          socialLinks.find((l) => l.platform === 'LinkedIn')?.url ||
          socialLinks.find((l) => l.platform === 'GitHub')?.url ||
          'https://mayrlabs.com', // Fallback
      },
      'x-social-links': socialLinks.map((l) => ({ platform: l.platform, url: l.url })),
      'x-titles': profile.titles,
      'x-notes': profile.notes,
    },
    servers: [
      {
        url: process.env.NEXT_PUBLIC_APP_URL || 'https://mayrlabs.com',
        description: 'Portfolio Website',
      },
    ],
    tags: [
      { name: 'Projects', description: 'Portfolio projects and case studies' },
      { name: 'Skills', description: 'Technical skills and technologies' },
      { name: 'Experience', description: 'Professional career history' },
      { name: 'Education', description: 'Academic background' },
      { name: 'Mentorship', description: 'Mentorship program details' },
    ],
    paths: {
      '/projects': {
        get: {
          summary: 'Get all featured projects',
          tags: ['Projects'],
          responses: {
            '200': {
              description: 'List of projects',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Project' },
                  },
                  example: visibleProjects,
                },
              },
            },
          },
        },
      },
      '/skills': {
        get: {
          summary: 'Get technical skills',
          tags: ['Skills'],
          responses: {
            '200': {
              description: 'List of technical skills categorized',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Skill' },
                  },
                  example: technicalSkills,
                },
              },
            },
          },
        },
      },
      '/experience': {
        get: {
          summary: 'Get career history',
          tags: ['Experience'],
          responses: {
            '200': {
              description: 'Professional experience entries',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Experience' },
                  },
                  example: visibleCareer,
                },
              },
            },
          },
        },
      },
      '/education': {
        get: {
          summary: 'Get academic records',
          tags: ['Education'],
          responses: {
            '200': {
              description: 'Educational background',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Education' },
                  },
                  example: visibleEducation,
                },
              },
            },
          },
        },
      },
      '/mentorship': {
        get: {
          summary: 'Get mentorship program details',
          tags: ['Mentorship'],
          responses: {
            '200': {
              description: 'Benefits and process of the mentorship program',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      benefits: { type: 'array', items: { type: 'object' } },
                      process: { type: 'array', items: { type: 'object' } },
                    },
                  },
                  example: {
                    benefits: mentorshipBenefits,
                    process: mentorshipProcess,
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Project: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            type: { type: 'string' },
            owner: { type: 'string' },
            technologies: { type: 'array', items: { type: 'object' } },
            features: { type: 'array', items: { type: 'string' } },
            demo_link: { type: 'string' },
            repo_link: { type: 'string' },
          },
        },
        Skill: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            type: { type: 'string' },
            icons: { type: 'array', items: { type: 'object' } },
          },
        },
        Experience: {
          type: 'object',
          properties: {
            company_name: { type: 'string' },
            role: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
            description: { type: 'string' },
            technologies: { type: 'array', items: { type: 'string' } },
          },
        },
        Education: {
          type: 'object',
          properties: {
            school: { type: 'string' },
            degree: { type: 'string' },
            field_of_study: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' },
          },
        },
      },
    },
  };

  return NextResponse.json(openApiSpec);
}
