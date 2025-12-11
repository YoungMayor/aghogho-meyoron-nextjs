import { NextResponse } from 'next/server';
import { getCompleteProfileData } from '@/lib/utils/profile-data';

export async function GET() {
  const data = getCompleteProfileData();
  const {
    profile,
    projects,
    skills,
    experience,
    education,
    mentorship,
    hobbies,
    testimonials,
    faq,
  } = data;

  const openApiSpec = {
    openapi: '3.1.0',
    info: {
      title: profile.name,
      version: '1.0.0',
      description: profile.biography.replace(/<[^>]*>?/gm, ''),
      contact: {
        name: profile.name,
        email: profile.contact.email,
        url:
          profile.social_links.find((l) => l.platform === 'LinkedIn')?.url ||
          'https://mayrlabs.com',
      },
      'x-social-links': profile.social_links,
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
      { name: 'Hobbies', description: 'Personal interests and hobbies' },
      { name: 'Testimonials', description: 'Feedback from colleagues and mentees' },
      { name: 'FAQ', description: 'Frequently Asked Questions' },
    ],
    paths: {
      '/projects': {
        get: {
          summary: 'Get featured projects',
          tags: ['Projects'],
          responses: {
            '200': {
              description: 'List of projects',
              content: { 'application/json': { example: projects } },
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
              description: 'List of skills',
              content: { 'application/json': { example: skills } },
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
              description: 'Career history',
              content: { 'application/json': { example: experience } },
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
              description: 'Education',
              content: { 'application/json': { example: education } },
            },
          },
        },
      },
      '/mentorship': {
        get: {
          summary: 'Get mentorship details',
          tags: ['Mentorship'],
          responses: {
            '200': {
              description: 'Mentorship program',
              content: { 'application/json': { example: mentorship } },
            },
          },
        },
      },
      '/hobbies': {
        get: {
          summary: 'Get hobbies',
          tags: ['Hobbies'],
          responses: {
            '200': {
              description: 'Hobbies',
              content: { 'application/json': { example: hobbies } },
            },
          },
        },
      },
      '/testimonials': {
        get: {
          summary: 'Get testimonials',
          tags: ['Testimonials'],
          responses: {
            '200': {
              description: 'Testimonials',
              content: { 'application/json': { example: testimonials } },
            },
          },
        },
      },
      '/faq': {
        get: {
          summary: 'Get FAQs',
          tags: ['FAQ'],
          responses: {
            '200': {
              description: 'FAQs',
              content: { 'application/json': { example: faq } },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(openApiSpec);
}
