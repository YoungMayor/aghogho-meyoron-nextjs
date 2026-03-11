import { TelegramService } from '@mayrlabs/telegram-service';

export interface ContactFormTelegramServiceData {
  name: string;
  email: string;
  subject: string;
  message: string;
  ipAddress: string;
  userAgent: string;
}

export class ContactFormTelegramService extends TelegramService<ContactFormTelegramServiceData> {
  protected formatMessage(data: ContactFormTelegramServiceData): string {
    return `🔔 *New Contact Form Submission*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📋 *Subject:* ${data.subject}

💬 *Message:*
> ${data.message}

⏰ *Submitted:* ${new Date().toLocaleString()}
🌐 *IP:* ${data.ipAddress}
💻 *User Agent:* ${data.userAgent}`;
  }
}

export const contactFormTelegramService = new ContactFormTelegramService();
