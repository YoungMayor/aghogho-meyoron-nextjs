'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize with a function to read from localStorage if available
  const [theme, setTheme] = useState<Theme>(() => {
    // This runs only on initial render
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme | null;
      return stored || 'dark';
    }
    return 'dark';
  });

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    const classList = document.documentElement.classList;
    if (theme === 'dark') {
      classList.add('dark');
    } else {
      classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
