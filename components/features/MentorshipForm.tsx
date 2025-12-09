'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { generateAuthToken } from '@/lib/utils/api-auth';

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
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.background.trim()) {
      newErrors.background = 'Background information is required';
    } else if (formData.background.trim().length < 50) {
      newErrors.background = 'Please provide at least 50 characters';
    }

    if (!formData.goals.trim()) {
      newErrors.goals = 'Goals information is required';
    } else if (formData.goals.trim().length < 50) {
      newErrors.goals = 'Please provide at least 50 characters';
    }

    if (!formData.commitment) {
      newErrors.commitment = 'Please select your commitment level';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const authToken = generateAuthToken(process.env.NEXT_PUBLIC_INTERNAL_API_SECRET || '');

      const response = await fetch('/api/mentorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': authToken },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

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

      <p className="text-sm text-muted-foreground text-center">
        This site is protected by reCAPTCHA and the Google{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </form>
  );
}
