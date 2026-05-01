import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Image from 'next/image';
import { books } from '@/lib/data/books';
import { getVisibleItems } from '@/lib/utils/data';
import { getMarkdownBySlug } from '@/lib/utils/markdown';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import BookGallery from '@/components/books/BookGallery';
import Breadcrumb from '@/components/ui/Breadcrumb';
import StarRating from '@/components/ui/StarRating';
import { profile } from '@/lib/data/profile';
import { generateBookSchema, generateBreadcrumbSchema } from '@/lib/utils/structured-data';

interface BookDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const visibleBooks = getVisibleItems(books);

  return visibleBooks.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: BookDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) return { title: 'Book Not Found' };

  return {
    title: `${book.title} | ${profile.name}`,
    description: book.short_description,
    keywords: [...book.seo_keywords, ...book.tags, book.category, profile.name],
    openGraph: {
      title: `${book.title} | ${profile.name}`,
      description: book.short_description,
      type: 'article',
      url: `/books/${slug}`,
      images: [
        //
        { url: book.cover_image, width: 1200, height: 630, alt: book.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} | ${profile.name}`,
      description: book.short_description,
      images: [book.cover_image],
    },
    alternates: { canonical: `/books/${slug}` },
  };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { slug } = await params;

  const book = books.find((b) => b.slug === slug);

  if (!book || !book.show) notFound();

  const markdown = getMarkdownBySlug('lib/data/content', book.description_file.replace('.md', ''));

  const bookSchema = generateBookSchema(book);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Books', url: '/books' },
    { name: book.title, url: `/books/${slug}` },
  ]);

  return (
    <>
      <Script
        id="book-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1">
        <section className="py-6 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Books', href: '/books' },
                { label: book.title, active: true },
              ]}
            />
          </div>
        </section>

        <section className="py-12 md:py-20 px-4 bg-linear-to-b from-secondary/50 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Book Cover */}
              <div className="lg:col-span-4 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[320px] aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src={book.cover_image}
                    alt={book.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>

              {/* Book Info */}
              <div className="lg:col-span-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 text-sm font-bold bg-primary/10 text-primary rounded-full">
                    {book.category}
                  </span>
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{book.title}</h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {book.short_description}
                </p>

                <div className="flex flex-wrap items-center gap-6 mb-10">
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                      Price
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {book.sale_price || book.price}
                      </span>
                      {book.sale_price && (
                        <span className="text-xl text-muted-foreground line-through">
                          {book.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
                      Published
                    </span>
                    <span className="text-xl font-medium">
                      {new Date(book.published_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full md:w-auto px-12 h-14 text-lg shadow-xl shadow-primary/20"
                    >
                      {book.link_title}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {book.screenshots && book.screenshots.length > 0 && (
          <section className="py-16 px-4 bg-background border-y border-border">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <span className="w-8 h-1 bg-primary rounded-full"></span>
                Inside the Book
              </h2>
              <BookGallery screenshots={book.screenshots} title={book.title} />
            </div>
          </section>
        )}

        {/* Description Section */}
        {markdown && (
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">About this Book</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MarkdownRenderer content={markdown.content} />
              </div>
            </div>
          </section>
        )}

        {/* Reviews Section */}
        {book.reviews && book.reviews.length > 0 && (
          <section className="py-20 px-4 bg-secondary/20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">What Readers are Saying</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {book.reviews.map((review, index) => (
                  <Card key={index} padding="lg" variant="bordered" className="relative">
                    <div className="absolute -top-4 -left-4 text-6xl text-primary/10 font-serif">
                      &quot;
                    </div>
                    <div className="flex flex-col h-full relative z-10">
                      <div className="mb-4">
                        <StarRating rating={review.rating} />
                      </div>

                      <p className="text-lg italic mb-6 flex-1">&quot;{review.review}&quot;</p>

                      <div className="flex items-center gap-3 mt-auto">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {review.name.charAt(0)}
                        </div>

                        <span className="font-bold">{review.name}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-24 px-4 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to escape tutorial hell?</h2>
            <p className="text-xl mb-10 text-primary-foreground/80">
              Join other developers who are already building real projects and growing their
              careers.
            </p>
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="px-12 h-16 text-xl">
                Get Your Copy Now
              </Button>
            </a>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <Link href="/books">
              <Button variant="ghost" size="lg">
                ← Back to All Books
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
