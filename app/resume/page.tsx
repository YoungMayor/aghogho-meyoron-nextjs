import { Metadata } from 'next';
import ResumeBuilder from '@/components/features/resume/ResumeBuilder';
import { profile } from '@/lib/data/profile';

export const metadata: Metadata = {
  title: 'Resume',
  description: `View and download the resume of ${profile.name}, a ${profile.titles[0]} with expertise in full-stack development, Laravel, Next.js, React, and more.`,
  keywords: [
    'resume',
    'CV',
    'curriculum vitae',
    'portfolio',
    'work experience',
    'software engineer resume',
    'full-stack developer resume',
    profile.name,
  ],
  openGraph: {
    title: `${profile.name} - Resume`,
    description: `View and download the resume of ${profile.name}, a ${profile.titles[0]}.`,
    type: 'profile',
    url: '/resume',
  },
  twitter: {
    card: 'summary',
    title: `${profile.name} - Resume`,
    description: `View and download the resume of ${profile.name}, a ${profile.titles[0]}.`,
  },
  alternates: {
    canonical: '/resume',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResumePage() {
  return <ResumeBuilder />;
}
