'use server';

import { contactFormSchema } from '@/lib/utils/validation';
import connectDB from '@/lib/db/mongodb';
import { Contact } from '@/lib/db/models/contact';
import { contactFormTelegramService } from '@/lib/services/telegram/ContactFormTelegramService';
import { headers } from 'next/headers';
import { z } from 'zod';

export async function submitContactForm(formData: unknown) {
  const validation = contactFormSchema.safeParse(formData);

  if (!validation.success) {
    return {
      success: false,
      error: 'Validation failed',
      details: z.treeifyError(validation.error),
    };
  }

  const { name, email, subject, message } = validation.data;

  try {
    const headerList = await headers();

    const userAgent = headerList.get('user-agent') || 'unknown';
    const forwardedFor = headerList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    await connectDB();

    await Promise.all([
      Contact.create({
        name,
        email,
        subject,
        message,
        submitted_at: new Date(),
        ip_address: ipAddress,
        user_agent: userAgent,
        status: 'new',
      }),

      contactFormTelegramService.sendNotification({
        name,
        email,
        subject,
        message,
        ipAddress,
        userAgent,
      }),
    ]);

    return {
      success: true,
      message: 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Contact form action error:', error);

    return {
      success: false,
      error: 'Failed to submit contact form. Please try again later.',
    };
  }
}
