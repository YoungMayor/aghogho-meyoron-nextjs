'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { BookScreenshot } from '@/lib/types';

interface BookGalleryProps {
  screenshots: BookScreenshot[];
  title: string;
}

const BookGallery: React.FC<BookGalleryProps> = ({ screenshots }) => {
  const [selectedImage, setSelectedImage] = useState<BookScreenshot | null>(null);

  if (!screenshots || screenshots.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto gap-6 pb-6 snap-x scrollbar-hide">
        {screenshots.map((screenshot, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(screenshot)}
            className="relative shrink-0 aspect-3/4 h-64 md:h-80 rounded-xl overflow-hidden cursor-zoom-in hover:opacity-95 transition-all snap-center shadow-md hover:shadow-xl border border-border"
          >
            <Image
              src={screenshot.url}
              alt={screenshot.alt}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute bottom-0 inset-x-0 p-3 bg-linear-to-t from-black/60 to-transparent">
              <p className="text-white text-xs font-medium truncate text-left">
                {screenshot.title}
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedImage &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="relative w-full max-w-4xl max-h-[80vh] aspect-3/4">
              <Image
                src={selectedImage.url}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="mt-6 text-center">
              <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
              <p className="text-white/60 text-sm mt-1">{selectedImage.alt}</p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default BookGallery;
