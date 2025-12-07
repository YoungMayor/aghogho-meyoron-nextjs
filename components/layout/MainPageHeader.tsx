'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { profile } from '@/lib/data/profile';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MailIcon from '@/components/icons/MailIcon';

export default function MainPageHeader() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show header when user scrolls past the hero section (viewport height)
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-1000 ${
        isVisible ? 'translate-y-0' : '-translate-y-40 pointer-events-none'
      }`}
      style={{ width: '90%', maxWidth: '1200px' }}
    >
      <nav className="flex items-center justify-between rounded-2xl bg-background/80 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* Avatar and Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="overflow-hidden rounded-full h-10 w-10 shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:scale-110">
            <Image
              src={profile.avatar_url || '/placeholder-avatar.png'}
              alt={profile.name}
              width={56}
              height={56}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="hidden md:inline-block font-semibold text-foreground">
            {profile.name}
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* View Resume Button */}
          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-gray-900 to-black text-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-105 dark:from-white dark:to-gray-100 dark:text-black"
          >
            View Resume
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Contact Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] p-2.5 text-gray-900 transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 dark:text-white"
            aria-label="Contact me"
          >
            <MailIcon />
          </Link>
        </div>
      </nav>
    </header>
  );
}
