import Link from 'next/link';
import Image from 'next/image';
import { profile } from '@/lib/data/profile';
import { socialLinks as allSocialLinks } from '@/lib/data/social_links';
import { getVisibleAndSorted } from '@/lib/utils/data';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

export default function Hero() {
  const socialLinks = getVisibleAndSorted(allSocialLinks).slice(0, 5);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)]">
      {/* Ambient Background Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        {/* Avatar with soft shadow instead of border */}
        <div className="mb-8 overflow-hidden rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
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
        <h1 className="mb-4 text-center text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
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
              <Icon.fromIcon icon={social.icon} size={36} className="flex-shrink-0" />
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
