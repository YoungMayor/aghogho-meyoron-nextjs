'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      {/* Scroll Container */}
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className="relative flex-shrink-0 aspect-video h-48 md:h-64 rounded-xl overflow-hidden cursor-zoom-in hover:opacity-90 transition-opacity snap-center border-2 border-transparent hover:border-black dark:hover:border-white"
          >
            <Image
              src={img}
              alt={`${title} screenshot ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
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
            <div className="relative h-full w-full max-w-6xl max-h-[90vh] aspect-video">
              <Image
                src={selectedImage}
                alt={`${title} full screen`}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ProjectGallery;
