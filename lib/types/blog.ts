import { HasVisibility } from './common';

export interface Article extends HasVisibility {
  title: string;
  summary: string;
  link: string;
  cover_url: string;
  platform: string;
}
