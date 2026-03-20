import { createEnv } from '@t3-oss/env-nextjs';
import { netlify } from '@t3-oss/env-nextjs/presets-zod';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    ENABLE_TELEGRAM_NOTIFICATIONS: z.coerce.boolean().default(false),

    MONGODB_URI: z.url(),
    MONGODB_DB_NAME: z.string(),

    RECAPTCHA_SECRET_KEY: z.string().optional(),

    REDIS_URL: z.url(),

    TELEGRAM_BOT_TOKEN: z.string().optional(),
    TELEGRAM_DEFAULT_CHAT_IDS: z.string().optional(),
  },
  extends: [netlify()],
  experimental__runtimeEnv: process.env,
});
