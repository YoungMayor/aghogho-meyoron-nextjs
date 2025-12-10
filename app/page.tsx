import { Metadata } from 'next';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import MainPageHeader from '@/components/layout/MainPageHeader';
import { profile } from '@/lib/data/profile';
import {
  generatePersonSchema,
  generateWebsiteSchema,
  generateProfilePageSchema,
} from '@/lib/utils/structured-data';

// Dynamic imports for below-the-fold components to improve initial page load
const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <div className="min-h-screen" />,
});
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <div className="min-h-screen" />,
});
const Career = dynamic(() => import('@/components/sections/Career'), {
  loading: () => <div className="min-h-screen" />,
});
const Articles = dynamic(() => import('@/components/sections/Articles'), {
  loading: () => <div className="min-h-[400px]" />,
});
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="min-h-[400px]" />,
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.titles[0]}`,
  description: profile.notes.tagline,
  keywords: [
    'Software Engineer',
    'Full-Stack Developer',
    'Laravel',
    'Next.js',
    'React',
    'TypeScript',
    'Web Development',
    'Mobile Development',
    'Meyoron Aghogho',
    'Aghogho Meyoron',
    'Young Mayor',
    'MayR Labs',
    'YoungMayor',
    'PHP Developer',
    'JavaScript Developer',
  ],
  openGraph: {
    title: `${profile.name} | ${profile.titles[0]}`,
    description: profile.notes.tagline,
    type: 'profile',
    url: '/',
    images: profile.avatar_url
      ? [
          {
            url: profile.avatar_url,
            width: 1200,
            height: 630,
            alt: profile.name,
          },
        ]
      : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | ${profile.titles[0]}`,
    description: profile.notes.tagline,
    images: profile.avatar_url ? [profile.avatar_url] : undefined,
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebsiteSchema();
  const profilePageSchema = generateProfilePageSchema();

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="profile-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />

      <div>
        <MainPageHeader />
        <Hero />
        <About />
        <Projects />
        <Career />
        <Articles />
        <Testimonials />
      </div>
    </>
  );
}
