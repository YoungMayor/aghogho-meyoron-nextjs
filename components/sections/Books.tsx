'use client';

import { books } from '@/lib/data/books';
import { getVisibleItems, sortByPriority } from '@/lib/utils/data';
import BookCard from '@/components/features/BookCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function Books() {
  const visibleBooks = sortByPriority(getVisibleItems(books)).slice(0, 3);

  if (visibleBooks.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            title="My Books"
            subtitle="Deep dives into technology, productivity, and the mindset of a developer"
            alignment="left"
          />
          <Link href="/books">
            <Button variant="outline">View All Books</Button>
          </Link>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleBooks.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
