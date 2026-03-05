import { z } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Zod schema for Contact Form validation
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Please provide a valid email address'),
  subject: z
    .string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must be at most 200 characters'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message must be at most 2000 characters'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Zod schema for Mentorship Form validation
 */
export const mentorshipFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z.string().email('Please provide a valid email address'),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      'Please provide a valid phone number'
    )
    .optional()
    .or(z.literal('')),
  background: z
    .string()
    .min(50, 'Background must be at least 50 characters')
    .max(1000, 'Background must be at most 1000 characters'),
  goals: z
    .string()
    .min(50, 'Goals must be at least 50 characters')
    .max(1000, 'Goals must be at most 1000 characters'),
  commitment: z
    .string()
    .min(2, 'Please select a commitment level')
    .max(50, 'Commitment level must be at most 50 characters'),
});

export type MentorshipFormData = z.infer<typeof mentorshipFormSchema>;

/**
 * Helper to convert ZodError to the legacy ValidationResult format
 */
export function formatZodError(error: z.ZodError): ValidationResult {
  return {
    isValid: false,
    errors: error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  };
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}
