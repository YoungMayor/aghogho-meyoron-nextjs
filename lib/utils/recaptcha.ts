export async function getRecaptchaToken(action: string): Promise<string> {
  const win = window as typeof window & {
    grecaptcha?: {
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  };

  if (!win.grecaptcha) {
    throw new Error('reCAPTCHA not loaded');
  }

  return await win.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '', {
    action,
  });
}

/**
 * Verify ReCAPTCHA token
 */
export async function verifyRecaptcha(token: string): Promise<{
  success: boolean;
  score: number;
}> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error('ReCAPTCHA secret key not configured');
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  });

  const data = await response.json();

  return {
    success: data.success && data.score > 0.5,
    score: data.score || 0,
  };
}
