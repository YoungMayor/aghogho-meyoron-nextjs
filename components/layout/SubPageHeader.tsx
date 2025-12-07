'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { profile } from '@/lib/data/profile';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function SubPageHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Switch to floating mode after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="z-50 sticky top-0 max-w-[1200px]">
      <nav
        className={`flex items-center justify-between px-6 py-3 transition-all duration-500 ease-in-out mx-auto ${
          isScrolled
            ? 'rounded-2xl bg-background/70 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl w-[90%] mt-2'
            : 'bg-transparent w-full mt-0'
        }`}
      >
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
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            aria-label="Projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <span className="hidden md:inline">Projects</span>
          </Link>
          <Link
            href="/mentorship"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            aria-label="Mentorship"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span className="hidden md:inline">Mentorship</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            aria-label="Contact"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span className="hidden md:inline">Contact</span>
          </Link>
          <Link
            href="/resume"
            className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-3 md:px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-105"
            aria-label="Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="hidden md:inline">Resume</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
