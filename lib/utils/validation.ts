/**
 * Form validation utilities
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format (international format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate string length
 */
export function isValidLength(
  value: string,
  min: number,
  max: number
): boolean {
  const length = value.trim().length;
  return length >= min && length <= max;
}

/**
 * Validate contact form data
 */
export function validateContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || !isValidLength(data.name, 2, 100)) {
    errors.push({
      field: 'name',
      message: 'Name must be between 2 and 100 characters',
    });
  }

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please provide a valid email address',
    });
  }

  // Validate subject
  if (!data.subject || !isValidLength(data.subject, 5, 200)) {
    errors.push({
      field: 'subject',
      message: 'Subject must be between 5 and 200 characters',
    });
  }

  // Validate message
  if (!data.message || !isValidLength(data.message, 20, 2000)) {
    errors.push({
      field: 'message',
      message: 'Message must be between 20 and 2000 characters',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate mentorship form data
 */
export function validateMentorshipForm(data: {
  name: string;
  email: string;
  phone?: string;
  background: string;
  goals: string;
  commitment: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.name || !isValidLength(data.name, 2, 100)) {
    errors.push({
      field: 'name',
      message: 'Name must be between 2 and 100 characters',
    });
  }

  // Validate email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push({
      field: 'email',
      message: 'Please provide a valid email address',
    });
  }

  // Validate phone (optional)
  if (data.phone && !isValidPhone(data.phone)) {
    errors.push({
      field: 'phone',
      message: 'Please provide a valid phone number',
    });
  }

  // Validate background
  if (!data.background || !isValidLength(data.background, 50, 1000)) {
    errors.push({
      field: 'background',
      message: 'Background must be between 50 and 1000 characters',
    });
  }

  // Validate goals
  if (!data.goals || !isValidLength(data.goals, 50, 1000)) {
    errors.push({
      field: 'goals',
      message: 'Goals must be between 50 and 1000 characters',
    });
  }

  // Validate commitment
  if (!data.commitment || !isValidLength(data.commitment, 2, 50)) {
    errors.push({
      field: 'commitment',
      message: 'Please select a commitment level',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
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
