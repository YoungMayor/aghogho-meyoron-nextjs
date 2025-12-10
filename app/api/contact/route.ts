import { verifyApiAuth } from '@/lib/utils/api-auth';
import { ApiResponse } from '@/lib/utils/api-response';
import { validateContactForm } from '@/lib/utils/validation';
import connectDB from '@/lib/db/mongodb';
import { Contact } from '@/lib/db/models/contact';
import { sendTelegramNotification } from '@/lib/utils/telegram';
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/utils/rate-limit';

/**
 * POST /api/contact
 * Submit contact form
 * Requires authentication
 */
export async function POST(request: Request) {
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    return ApiResponse.serverError('Server configuration error');
  }

  // Verify authentication
  if (!verifyApiAuth(request, secret)) {
    return ApiResponse.unauthorized();
  }

  // Check rate limit
  const clientIp = getClientIp(request);
  const rateLimitResult = checkRateLimit(clientIp, RATE_LIMITS.FORM_SUBMISSION);

  if (!rateLimitResult.allowed) {
    return ApiResponse.error(
      `Too many requests. Please try again in ${rateLimitResult.resetInSeconds} seconds.`,
      429
    );
  }

  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate input
    const validation = validateContactForm({ name, email, subject, message });
    if (!validation.isValid) {
      return ApiResponse.validationError(validation.errors);
    }

    // Get client information
    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Connect to MongoDB
    await connectDB();

    // Save to MongoDB using Mongoose
    await Contact.create({
      name,
      email,
      subject,
      message,
      submitted_at: new Date(),
      ip_address: ipAddress,
      user_agent: userAgent,
      recaptcha_score: 0, // Not using reCAPTCHA anymore
      status: 'new',
    });

    // Send Telegram notification
    const telegramMessage = `🔔 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📋 *Subject:* ${subject}

💬 *Message:*
${message}

⏰ *Submitted:* ${new Date().toLocaleString()}
🌐 *IP:* ${ipAddress}`;

    await sendTelegramNotification(telegramMessage);

    return ApiResponse.success(null, 'Your message has been sent successfully!');
  } catch (error) {
    console.error('Contact form error:', error);
    return ApiResponse.serverError('Failed to submit contact form');
  }
}
