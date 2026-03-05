import { ApiResponse } from '@/lib/utils/api-response';
import { mentorshipFormSchema, formatZodError } from '@/lib/utils/validation';
import connectDB from '@/lib/db/mongodb';
import { MentorshipApplication } from '@/lib/db/models/mentorship_application';
import { RATE_LIMITS } from '@/lib/utils/rate-limit';
import { apiAction } from '@/lib/utils/api-action';
import { mentorshipFormTelegramService } from '@/lib/services/telegram/MentorshipFormTelegramService';
import { requestTools } from '@/lib/utils/request-tools';

/**
 * POST /api/mentorship
 * Submit mentorship application
 * Requires authentication
 */
export async function POST(request: Request) {
  return await apiAction(
    {
      request,
      rate_limit: RATE_LIMITS.FORM_SUBMISSION,
      error: {
        client: 'Failed to submit mentorship application',
        log: 'Mentorship application error',
      },
    },
    async (request) => {
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
        recaptcha_score: 0, // Not using reCAPTCHA anymore
        status: 'pending',
      });

      await mentorshipFormTelegramService.sendNotification({
        name,
        email,
        phone,
        background,
        goals,
        commitment,
        ipAddress,
      });

      return ApiResponse.success(
        null,
        'Your mentorship application has been submitted successfully!'
      );
    }
  );
}
