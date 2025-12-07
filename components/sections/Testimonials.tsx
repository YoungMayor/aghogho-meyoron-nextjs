'use client';

import { useState, useEffect } from 'react';
import { testimonials } from '@/lib/data/testimonials';
import { getVisibleItems, sortByPriority } from '@/lib/utils/data';
import TestimonialCard from '@/components/features/TestimonialCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const visibleTestimonials = sortByPriority(getVisibleItems(testimonials));
  const totalSlides = Math.ceil(visibleTestimonials.length / 3);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  // Get current slide testimonials
  const currentTestimonials = visibleTestimonials.slice(currentIndex * 3, (currentIndex + 1) * 3);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-secondary/50 to-transparent">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="What People Say"
          subtitle="Testimonials from colleagues, clients, and collaborators"
        />

        {/* Carousel */}
        <div className="relative">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
            {currentTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.person.name}-${currentIndex}-${index}`}
                className="animate-fadeIn"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 flex items-center justify-center bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonials"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 flex items-center justify-center bg-card rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Next testimonials"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-foreground'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
