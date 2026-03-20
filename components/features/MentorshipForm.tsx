'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { mentorshipFormSchema } from '@/lib/utils/validation';
import { submitMentorshipForm } from '@/app/actions/mentorship';

interface FormData {
  name: string;
  email: string;
  phone: string;
  background: string;
  goals: string;
  commitment: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  background?: string;
  goals?: string;
  commitment?: string;
}

export default function MentorshipForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    background: '',
    goals: '',
    commitment: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const result = mentorshipFormSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormErrors;
        if (!newErrors[field]) {
          newErrors[field] = issue.message;
        }
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const result = await submitMentorshipForm(formData);

      if (!result.success) throw new Error(result.error);

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', background: '', goals: '', commitment: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
          disabled={isSubmitting}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          disabled={isSubmitting}
        />
      </div>

      <Input
        label="Phone (Optional)"
        name="phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        disabled={isSubmitting}
      />

      <Textarea
        label="Your Background"
        name="background"
        value={formData.background}
        onChange={handleChange}
        error={errors.background}
        rows={4}
        required
        disabled={isSubmitting}
        helperText="Tell me about your current experience, skills, and what you're currently working on (minimum 50 characters)"
      />

      <Textarea
        label="Your Goals & Expectations"
        name="goals"
        value={formData.goals}
        onChange={handleChange}
        error={errors.goals}
        rows={4}
        required
        disabled={isSubmitting}
        helperText="What do you hope to achieve through this mentorship? What specific areas do you want to focus on? (minimum 50 characters)"
      />

      <Select
        label="Commitment Level"
        name="commitment"
        value={formData.commitment}
        onChange={handleChange}
        error={errors.commitment}
        required
        disabled={isSubmitting}
        options={[
          { value: '', label: 'Select commitment level' },
          { value: '2-4 hours/week', label: '2-4 hours per week' },
          { value: '5-7 hours/week', label: '5-7 hours per week' },
          { value: '8-10 hours/week', label: '8-10 hours per week' },
          { value: '10+ hours/week', label: '10+ hours per week' },
        ]}
      />

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-xl">
          Thank you for your application! I&apos;ll review it and get back to you soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-xl">
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
