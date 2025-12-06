'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { profile } from '@/lib/data/profile';

export default function FloatingHeader() {
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
      <nav className="flex items-center justify-between rounded-2xl bg-white/80 dark:bg-gray-900/80 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {/* Avatar */}
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
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-2.5 text-gray-900 transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 dark:from-gray-800 dark:to-gray-900 dark:text-white"
            aria-label="Contact me"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}
