import { Profile } from '@/lib/types';

/**
 * Profile data for Aghogho Meyoron
 * Source: docs/aghogho-meyoron.json (cleaned and restructured)
 */
export const profile: Profile = {
  name: 'Aghogho Meyoron',
  titles: ['Software Engineer'],
  avatar_url:
    'https://res.cloudinary.com/meyoron-aghogho/image/upload/v1730326249/closeups/dawn-ai-best_ozyciu.jpg',
  biography: `<div>
    Hi, I'm <b class='text-primary'>Aghogho Meyoron</b>, a seasoned full-stack
    software engineer specializing in crafting and overseeing web applications.
    With a proven history of bringing projects to life, I handle everything
    from inception to planning, wireframing, user experience (UX) design,
    coding, SEO, optimizations, and ongoing maintenance. My work embodies
    modernity and adheres to industry standards, featuring rigorous unit and
    feature testing and efficient coding to guarantee a flawless user experience.
    My ultimate aim is to deliver a seamless and efficient user journey for my clients.
  </div>`,
  profile_link: null,
  notes: {
    tagline: 'Building the future, one line at a time...',
    persona: 'Problem Solver, Gamer and Swimmer. And best of all good fucker',
    about: 'MayR Loves solving real-world problems with scalable systems.',
  },
  contact: {
    email: 'youngmayor.dev@gmail.com',
    phone: '+2348075178485',
    message: 'Lets work together!',
  },
  copyright: {
    year: '2025',
    creator_name: 'MayR Labs',
    creator_link: 'https://mayrlabs.com',
  },
};
