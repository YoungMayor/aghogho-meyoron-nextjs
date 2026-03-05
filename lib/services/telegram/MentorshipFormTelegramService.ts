import { TelegramService } from '@mayrlabs/telegram-service';

export interface MentorshipFormTelegramServiceData {
  name: string;
  email: string;
  phone: string;
  background: string;
  goals: string;
  commitment: string;
  ipAddress: string;
}

export class MentorshipFormTelegramService extends TelegramService<MentorshipFormTelegramServiceData> {
  protected formatMessage(data: MentorshipFormTelegramServiceData): string {
    return `📚 *New Mentorship Application*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
${data.phone ? `📱 *Phone:* ${data.phone}\n` : ''}
📖 *Background:*
${data.background}

🎯 *Goals:*
${data.goals}

⏳ *Commitment:* ${data.commitment}

⏰ *Submitted:* ${new Date().toLocaleString()}
🌐 *IP:* ${data.ipAddress}`;
  }
}

export const mentorshipFormTelegramService = new MentorshipFormTelegramService();
