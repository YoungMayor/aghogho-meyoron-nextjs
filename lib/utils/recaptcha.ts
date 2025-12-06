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
