import { MetadataRoute } from 'next';

/**
 * Generate robots.txt for search engine crawlers
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/_next/*', '/private/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
