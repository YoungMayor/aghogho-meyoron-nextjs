import { Icon, HasVisibility } from './common';

export interface Skill extends HasVisibility {
  name: string;
  description: string | null;
  type: 'tech' | 'soft' | 'other';
  icons: Icon[];
}
