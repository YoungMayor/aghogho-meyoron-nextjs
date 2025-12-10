export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: "What's the best way to reach you?",
    answer:
      'Feel free to use either the contact form above or send me a direct email. I typically respond within 24-48 hours.',
  },
  {
    question: 'Do you take on freelance projects?',
    answer:
      "Yes, I'm open to freelance opportunities. Please provide details about your project in the contact form, and I'll get back to you with my availability.",
  },
  {
    question: 'Are you available for consulting?',
    answer:
      'Absolutely! I offer consulting services for web development, architecture, and technical strategy. Reach out to discuss your needs.',
  },
  {
    question: 'How long does it take to hear back?',
    answer:
      'I strive to respond to all inquiries within 24-48 hours during business days. For urgent matters, please mention it in your message.',
  },
];
