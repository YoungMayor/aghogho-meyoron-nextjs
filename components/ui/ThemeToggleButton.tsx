'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts/theme-context';
import Button from './Button';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <Button variant="ghost" size="sm" disabled aria-label="Loading theme toggle">
        <div className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      )}
    </Button>
  );
}
