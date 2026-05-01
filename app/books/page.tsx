import { Metadata } from 'next';
import { books } from '@/lib/data/books';
import { getVisibleItems, sortByPriority } from '@/lib/utils/data';
import { profile } from '@/lib/data/profile';
import BookList from './_components/BookList';

export const metadata: Metadata = {
  title: `Books | ${profile.name}`,
  description:
    'Explore my collection of books on technology, mindset, and software development. Practical guides to help you grow your career and build better software.',
  keywords: [
    'Tech Books',
    'Developer Growth',
    'Software Engineering',
    'Career Development',
    profile.name,
  ],
  openGraph: {
    title: `Books | ${profile.name}`,
    description: 'Explore my collection of books on technology, mindset, and software development.',
    type: 'website',
    url: '/books',
  },
  alternates: { canonical: '/books' },
};

export default function BooksPage() {
  const visibleBooks = sortByPriority(getVisibleItems(books));

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-linear-to-b from-secondary/50 to-background border-b border-border">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Books</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Deep dives into technology, productivity, and the mindset of a developer. Practical
            guides to help you grow your career and build better software.
          </p>
        </div>
      </section>

      {/* Books Listing */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <BookList books={visibleBooks} />
        </div>
      </section>
    </main>
  );
}
