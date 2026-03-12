import { ApiResponse } from '@/lib/utils/api-response';
import { contactFormSchema, formatZodError } from '@/lib/utils/validation';
import connectDB from '@/lib/db/mongodb';
import { Contact } from '@/lib/db/models/contact';
import { apiAction } from '@/lib/utils/api-action';
import { contactFormTelegramService } from '@/lib/services/telegram/ContactFormTelegramService';
import { requestTools } from '@/lib/utils/request-tools';

/**
 * POST /api/contact
 * Submit contact form
 * Requires authentication
 */
export async function POST(request: Request) {
  return await apiAction({
    request,
    error: { client: 'Failed to submit contact form', log: 'Contact form error' },
    async callback() {
      const body = await request.json();
      const { name, email, subject, message } = body;

      const validation = contactFormSchema.safeParse({ name, email, subject, message });

      if (!validation.success) {
        return ApiResponse.validationError(formatZodError(validation.error).errors);
      }

      const { ipAddress, userAgent } = requestTools(request);

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

      return ApiResponse.success(null, 'Your message has been sent successfully!');
    },
  });
}
