import { createEnv } from '@t3-oss/env-nextjs';
import { netlify } from '@t3-oss/env-nextjs/presets-zod';
import { z } from 'zod';

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_INTERNAL_API_SECRET: z.string().optional(),
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),
  },
  extends: [netlify()],
  experimental__runtimeEnv: {
    NEXT_PUBLIC_INTERNAL_API_SECRET: process.env.NEXT_PUBLIC_INTERNAL_API_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  },
});
