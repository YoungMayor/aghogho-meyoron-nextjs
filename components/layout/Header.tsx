'use client';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { profile } from '@/lib/data/profile';
import ThemeToggle from '@/components/ui/ThemeToggle';
import ProjectsIcon from '@/components/icons/ProjectsIcon';
import MentorshipIcon from '@/components/icons/MentorshipIcon';
import MailIcon from '@/components/icons/MailIcon';
import FileTextIcon from '@/components/icons/FileTextIcon';

export default function Header() {
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
    <header className="z-50 sticky top-0 w-full max-w-[1200px] mx-auto print:hidden">
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
            <ProjectsIcon />
            <span className="hidden md:inline">Projects</span>
          </Link>
          <Link
            href="/mentorship"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            aria-label="Mentorship"
          >
            <MentorshipIcon />
            <span className="hidden md:inline">Mentorship</span>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:scale-105"
            aria-label="Contact"
          >
            <MailIcon width={18} height={18} />
            <span className="hidden md:inline">Contact</span>
          </Link>
          <Link
            href="/resume"
            className="flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-3 md:px-4 py-2 text-sm font-medium transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:scale-105"
            aria-label="Resume"
          >
            <FileTextIcon />
            <span className="hidden md:inline">Resume</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
