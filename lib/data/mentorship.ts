export interface MentorshipBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface MentorshipStep {
  title: string;
  description: string;
}

export const mentorshipBenefits: MentorshipBenefit[] = [
  {
    title: 'Code Reviews',
    description:
      'Get detailed feedback on your code, learn best practices, and improve your coding skills.',
    icon: '/icons/mentorship/code-reviews.svg',
  },
  {
    title: 'Technical Guidance',
    description:
      'Navigate complex technical challenges with expert advice and practical solutions.',
    icon: '/icons/mentorship/technical-guidance.svg',
  },
  {
    title: 'Career Development',
    description: 'Get advice on career paths, job searching, interviews, and professional growth.',
    icon: '/icons/mentorship/career-development.svg',
  },
  {
    title: 'Learning Resources',
    description:
      'Access curated learning materials, tutorials, and resources tailored to your goals.',
    icon: '/icons/mentorship/learning-resources.svg',
  },
  {
    title: 'Networking',
    description: 'Connect with other professionals and expand your network in the tech community.',
    icon: '/icons/mentorship/networking.svg',
  },
  {
    title: 'Regular Check-ins',
    description:
      'Stay accountable with regular sessions to discuss progress, challenges, and next steps.',
    icon: '/icons/mentorship/regular-check-ins.svg',
  },
];

export const mentorshipProcess: MentorshipStep[] = [
  {
    title: 'Application Review',
    description: "After submitting your application, I'll review it within 3-5 business days.",
  },
  {
    title: 'Initial Call',
    description:
      "If your application is a good fit, we'll schedule an initial call to discuss your goals and expectations.",
  },
  {
    title: 'Create a Plan',
    description:
      "Together, we'll create a personalized learning plan based on your current skills and goals.",
  },
  {
    title: 'Regular Sessions',
    description:
      "We'll meet regularly (frequency based on your commitment level) to work through challenges and track progress.",
  },
];
