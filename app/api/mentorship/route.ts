import { NextResponse } from 'next/server';
import { verifyApiAuth } from '@/lib/utils/api-auth';
import { validateMentorshipForm } from '@/lib/utils/validation';
import connectDB from '@/lib/db/mongodb';
import { MentorshipApplication } from '@/lib/db/models/mentorship_application';
import { sendTelegramNotification } from '@/lib/utils/telegram';
import { verifyRecaptcha } from '@/lib/utils/recaptcha';

/**
 * POST /api/mentorship
 * Submit mentorship application
 * Requires authentication
 */
export async function POST(request: Request) {
  const secret = process.env.INTERNAL_API_SECRET;

  if (!secret) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  // Verify authentication
  if (!verifyApiAuth(request, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, background, goals, commitment, recaptchaToken } = body;

    // Validate input
    const validation = validateMentorshipForm({
      name,
      email,
      phone,
      background,
      goals,
      commitment,
    });
    if (!validation.isValid) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    // Verify ReCAPTCHA
    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      return NextResponse.json({ error: 'ReCAPTCHA verification failed' }, { status: 400 });
    }

    // Get client information
    const ipAddress =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Connect to MongoDB
    await connectDB();

    // Save to MongoDB using Mongoose
    await MentorshipApplication.create({
      name,
      email,
      phone,
      background,
      goals,
      commitment,
      submitted_at: new Date(),
      ip_address: ipAddress,
      user_agent: userAgent,
      recaptcha_score: recaptchaResult.score,
      status: 'pending',
    });

    // Send Telegram notification
    const telegramMessage = `📚 *New Mentorship Application*

👤 *Name:* ${name}
📧 *Email:* ${email}
${phone ? `📱 *Phone:* ${phone}\n` : ''}
📖 *Background:*
${background}

🎯 *Goals:*
${goals}

⏳ *Commitment:* ${commitment}

⏰ *Submitted:* ${new Date().toLocaleString()}
🌐 *IP:* ${ipAddress}`;

    await sendTelegramNotification(telegramMessage);

    return NextResponse.json({
      success: true,
      message: 'Your mentorship application has been submitted successfully!',
    });
  } catch (error) {
    console.error('Mentorship application error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'Failed to submit mentorship application',
      },
      { status: 500 }
    );
  }
}
