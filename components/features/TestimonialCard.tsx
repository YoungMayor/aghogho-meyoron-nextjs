'use client';

import Image from 'next/image';
import { Testimonial } from '@/lib/types';
import Card from '@/components/ui/Card';
import StarIcon from '@/components/icons/StarIcon';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { person, review, rating, type } = testimonial;
  const mainTitle = person.titles[0] || 'Professional';

  return (
    <Card variant="elevated" padding="lg">
      <div className="flex flex-col h-full">
        {/* Rating Stars */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon
              key={index}
              className={`w-5 h-5 ${
                index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-muted-foreground text-sm mb-6 flex-1 whitespace-pre-line">
          &quot;{review}&quot;
        </p>

        {/* Author Info */}
        <div className="flex items-center gap-4">
          {person.avatar_url ? (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={person.avatar_url}
                alt={person.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-lg font-bold text-secondary-foreground">
                {person.name.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            {person.profile_link ? (
              <a
                href={person.profile_link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                {person.name}
              </a>
            ) : (
              <p className="font-semibold">{person.name}</p>
            )}
            <p className="text-sm text-muted-foreground truncate">{mainTitle}</p>
            <p className="text-xs text-muted-foreground capitalize">{type}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
