import { HasVisibility } from './common';

export interface BookReview {
  name: string;
  rating: number;
  review: string;
}

export interface BookScreenshot {
  url: string;
  alt: string;
  title: string;
}

export interface Book extends HasVisibility {
  slug: string;
  title: string;
  description_file: string; // path to markdown file
  short_description?: string;
  seo_keywords: string[];
  tags: string[];
  category: string;
  cover_image: string;
  screenshots?: BookScreenshot[];
  link: string;
  link_title: string;
  published_date: string;
  price: string;
  sale_price?: string;
  reviews?: BookReview[];
  is_featured: boolean;
}
