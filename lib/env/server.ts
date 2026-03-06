import { createEnv } from '@t3-oss/env-nextjs';
import { netlify } from '@t3-oss/env-nextjs/presets-zod';
import { z } from 'zod';

export const serverEnv = createEnv({
  server: {
    MONGODB_URI: z.url(),
    MONGODB_DB_NAME: z.string(),

    ENABLE_TELEGRAM_NOTIFICATIONS: z.coerce.boolean().default(false),
    TELEGRAM_BOT_TOKEN: z.string().optional(),
    TELEGRAM_DEFAULT_CHAT_IDS: z.string().optional(),

    INTERNAL_API_SECRET: z.string(),
    RECAPTCHA_SECRET_KEY: z.string().optional(),
    GEMINI_API_KEY: z.string().optional(),
    GEMINI_MODEL: z
      .enum([
        'gemini-3-flash-preview',
        'gemini-2.5-flash',
        'gemini-2.5-pro',
        'gemini-1.5-flash',
        'gemini-1.5-pro',
      ])
      .default('gemini-3-flash-preview'),
  },
  extends: [netlify()],
  experimental__runtimeEnv: process.env,
});
