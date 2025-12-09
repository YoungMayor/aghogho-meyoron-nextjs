import { profile } from '@/lib/data/profile';
import { socialLinks } from '@/lib/data/social_links';
import { getVisibleItems } from './data';
import type { Project } from '@/lib/types';

/**
 * Generate Person schema for structured data
 */
export function generatePersonSchema() {
  const visibleSocialLinks = getVisibleItems(socialLinks);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.titles[0],
    description: profile.notes.about,
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    image: profile.avatar_url,
    email: profile.contact.email,
    telephone: profile.contact.phone,
    sameAs: visibleSocialLinks.map((link) => link.url),
    knowsAbout: [
      'Software Engineering',
      'Web Development',
      'Laravel',
      'Next.js',
      'React',
      'TypeScript',
      'PHP',
      'JavaScript',
      'Full-Stack Development',
    ],
  };
}

/**
 * Generate WebSite schema for structured data
 */
export function generateWebsiteSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${profile.name} Portfolio`,
    url: baseUrl,
    description: profile.notes.tagline,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Generate SoftwareApplication schema for a project
 */
export function generateProjectSchema(project: Project) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    applicationCategory: 'DeveloperApplication',
    author: {
      '@type': 'Person',
      name: profile.name,
    },
    url: project.slug ? `${baseUrl}/projects/${project.slug}` : undefined,
  };

  // Add demo URL if available
  if (project.demo_link) {
    schema.applicationUrl = project.demo_link;
  }

  // Add repository if available
  if (project.repo_link) {
    schema.codeRepository = project.repo_link;
  }

  // Add screenshot if available
  if (project.images.length > 0) {
    schema.screenshot = project.images[0];
  }

  // Add programming languages
  if (project.icons.length > 0) {
    schema.programmingLanguage = project.icons.map((icon) => icon.label);
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Generate ProfilePage schema
 */
export function generateProfilePageSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: generatePersonSchema(),
    url: baseUrl,
    name: `${profile.name} - ${profile.titles[0]}`,
    description: profile.notes.tagline,
  };
}
