import { Person, HasVisibility } from './common';

export interface Testimonial extends HasVisibility {
  person: Person;
  review: string;
  rating: number;
  type: 'personal' | 'colleague' | 'client' | 'mentee' | 'other';
}
