import Link from 'next/link';
import Image from 'next/image';
import { profile } from '@/lib/data/profile';
import { socialLinks as allSocialLinks } from '@/lib/data/social_links';
import { getVisibleAndSorted } from '@/lib/utils/data';
import Button from '@/components/ui/Button';

export default function Hero() {
  const socialLinks = getVisibleAndSorted(allSocialLinks).slice(0, 5);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: 'linear-gradient(#00000008 1px, transparent 1px), linear-gradient(to right, #00000008 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        {/* Avatar */}
        <div className="mb-8 overflow-hidden rounded-full border-4 border-black dark:border-white">
          <Image
            src={profile.avatar_url || '/placeholder-avatar.png'}
            alt={profile.name}
            width={200}
            height={200}
            className="h-48 w-48 object-cover"
            priority
          />
        </div>

        {/* Name */}
        <h1 className="mb-4 text-center text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>

        {/* Title */}
        <p className="mb-6 text-center text-xl font-medium text-gray-700 dark:text-gray-300 sm:text-2xl">
          {profile.titles[0]}
        </p>

        {/* Tagline */}
        <p className="mb-12 max-w-2xl text-center text-lg text-gray-600 dark:text-gray-400">
          {profile.notes.tagline}
        </p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row">
          <Link href="/resume">
            <Button variant="primary" size="lg">
              View Resume
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="transform text-gray-600 transition-all duration-200 hover:scale-110 hover:text-black dark:text-gray-400 dark:hover:text-white"
              aria-label={social.label}
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {/* Generic icon - will be replaced with actual social icons */}
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="h-6 w-6 text-gray-600 dark:text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
