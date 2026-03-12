import { ApiResponse } from '@/lib/utils/api-response';
import { mentorshipFormSchema, formatZodError } from '@/lib/utils/validation';
import connectDB from '@/lib/db/mongodb';
import { MentorshipApplication } from '@/lib/db/models/mentorship_application';
import { apiAction } from '@/lib/utils/api-action';
import { mentorshipFormTelegramService } from '@/lib/services/telegram/MentorshipFormTelegramService';
import { requestTools } from '@/lib/utils/request-tools';

/**
 * POST /api/mentorship
 * Submit mentorship application
 * Requires authentication
 */
export async function POST(request: Request) {
  return await apiAction({
    request,
    error: {
      client: 'Failed to submit mentorship application',
      log: 'Mentorship application error',
    },
    async callback() {
      const body = await request.json();

      const { name, email, phone, background, goals, commitment } = body;

      const validation = mentorshipFormSchema.safeParse({
        name,
        email,
        phone,
        background,
        goals,
        commitment,
      });

      if (!validation.success) {
        return ApiResponse.validationError(formatZodError(validation.error).errors);
      }

      const { ipAddress, userAgent } = requestTools(request);

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
          phone,
          background,
          goals,
          commitment,
          ipAddress,
        }),
      ]);

      return ApiResponse.success(
        null,
        'Your mentorship application has been submitted successfully!'
      );
    },
  });
}
