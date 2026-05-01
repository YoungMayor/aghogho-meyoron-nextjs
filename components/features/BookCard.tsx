'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Book } from '@/lib/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card variant="elevated" hoverable padding="none" className="group">
      <div className="flex flex-col h-full">
        {/* Book Cover */}
        <div className="relative w-full aspect-3/4 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl overflow-hidden">
          <Image
            src={book.cover_image}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />

          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-sm">
              {book.category}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 text-sm font-bold bg-primary text-primary-foreground rounded-full shadow-lg">
              {book.sale_price || book.price}
            </span>
          </div>
        </div>

        {/* Book Content */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {book.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
            {book.short_description}
          </p>

          {/* Actions */}
          <div className="space-y-2 mt-auto">
            <Link href={`/books/${book.slug}`} className="block">
              <Button variant="primary" size="sm" fullWidth>
                View Details
              </Button>
            </Link>
            <a href={book.link} target="_blank" rel="noopener noreferrer" className="block">
              <Button variant="outline" size="sm" fullWidth>
                {book.link_title}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
