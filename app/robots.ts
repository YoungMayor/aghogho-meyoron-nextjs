import { MetadataRoute } from 'next';
import { clientEnv } from '@/lib/env/client';

/**
 * Generate robots.txt for search engine crawlers
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = clientEnv.NEXT_PUBLIC_APP_URL;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/*', '/_next/*', '/private/*'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
