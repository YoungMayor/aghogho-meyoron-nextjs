'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  author: string;
  speed?: number;
}

export default function Typewriter({ text, author, speed = 50 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  const isComplete = currentIndex >= text.length;

  return (
    <div className="flex flex-col justify-center h-full">
      <blockquote className="relative">
        <div className="absolute -top-4 -left-4 text-6xl text-gray-300 dark:text-gray-700 opacity-50">
          &ldquo;
        </div>
        <p className="text-xl italic text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-0.5 h-6 bg-gray-900 dark:bg-white ml-1 animate-pulse"></span>
          )}
        </p>
        {isComplete && (
          <footer className="mt-6 text-right">
            <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
              — {author}
            </cite>
          </footer>
        )}
      </blockquote>
    </div>
  );
}
