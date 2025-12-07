'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Icon components
import SunIcon from '@/components/icons/SunIcon';
import MoonIcon from '@/components/icons/MoonIcon';

// Shared button styles
const BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] p-2.5 transition-all duration-200';
const BUTTON_INTERACTIVE_CLASSES =
  'text-gray-900 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 dark:text-white';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  // This pattern is necessary to prevent hydration mismatches with next-themes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className={BUTTON_BASE_CLASSES} aria-label="Toggle theme" disabled>
        <SunIcon />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={`${BUTTON_BASE_CLASSES} ${BUTTON_INTERACTIVE_CLASSES}`}
      aria-label="Toggle theme"
      type="button"
    >
      {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
