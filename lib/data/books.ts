import { Book } from '@/lib/types';
import { cloudinaryImage } from '@/lib/utils/helpers';

export const books: Book[] = [
  {
    slug: 'from-tutorial-hell-to-real-projects',
    title: 'From Tutorial Hell to Real Projects',
    description_file: 'books/from-tutorial-hell-to-real-projects.md',
    short_description:
      'Escape the cycle of endless tutorials and learn how to build real-world software independently with this practical mindset and execution guide.',
    seo_keywords: [
      'tutorial hell',
      'coding mindset',
      'developer growth',
      'software building',
      'project planning for developers',
      'independent coding',
      'developer portfolio',
    ],
    tags: ['Mindset', 'Career', 'Learning', 'Software Development'],
    category: 'Tech',
    cover_image: cloudinaryImage.book('from-tutorial-hell-to-real-projects/cover.png'),
    screenshots: [
      {
        url: cloudinaryImage.book('from-tutorial-hell-to-real-projects/preface'),
        alt: 'Preface of From Tutorial Hell to Real Projects',
        title: 'Preface',
      },
      {
        url: cloudinaryImage.book('from-tutorial-hell-to-real-projects/introduction'),
        alt: 'Introduction of From Tutorial Hell to Real Projects',
        title: 'Introduction',
      },
    ],
    link: 'https://selar.com/13779555r7',
    link_title: 'Get the Book on Selar',
    published_date: '2026-05-01',
    price: 'NGN 9,999',
    sale_price: 'NGN 8,500',
    show: true,
    priority: 1,
    is_featured: true,
    reviews: [
      {
        name: 'Tovia Amadi',
        rating: 5,
        review: 'Wonderful Book Looking forward to more',
      },
      {
        name: 'Mayor Creatives',
        rating: 5,
        review: 'Very informative.',
      },
    ],
  },
];
