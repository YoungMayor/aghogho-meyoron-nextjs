'use server';

import { mentorshipFormSchema } from '@/lib/utils/validation';
import connectDB from '@/lib/db/mongodb';
import { MentorshipApplication } from '@/lib/db/models/mentorship_application';
import { mentorshipFormTelegramService } from '@/lib/services/telegram/MentorshipFormTelegramService';
import { headers } from 'next/headers';
import { z } from 'zod';

export async function submitMentorshipForm(formData: unknown) {
  const validation = mentorshipFormSchema.safeParse(formData);

  if (!validation.success) {
    return {
      success: false,
      error: 'Validation failed',
      details: z.treeifyError(validation.error),
    };
  }

  const { name, email, phone, background, goals, commitment } = validation.data;

  try {
    const headerList = await headers();
    const userAgent = headerList.get('user-agent') || 'unknown';
    const forwardedFor = headerList.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';

    await connectDB();

    await Promise.all([
      MentorshipApplication.create({
        name,
        email,
        phone,
        background,
        goals,
        commitment,
        submitted_at: new Date(),
        ip_address: ipAddress,
        user_agent: userAgent,
        status: 'pending',
      }),
      mentorshipFormTelegramService.sendNotification({
        name,
        email,
        phone: phone || '',
        background,
        goals,
        commitment,
        ipAddress,
      }),
    ]);

    return {
      success: true,
      message: 'Your mentorship application has been submitted successfully!',
    };
  } catch (error) {
    console.error('Mentorship form action error:', error);

    return {
      success: false,
      error: 'Failed to submit application. Please try again later.',
    };
  }
}
