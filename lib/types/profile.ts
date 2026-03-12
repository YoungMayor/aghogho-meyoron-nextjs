import { Icon, HasVisibility, Person } from './common';

export interface Profile {
  name: string;
  titles: readonly string[];
  avatar_url?: string;
  biography: string;
  profile_link: string | null;
  notes: {
    tagline: string;
    persona: string;
    about: string;
  };
  contact: {
    email: string;
    phone?: string;
    message: string;
  };
  copyright: {
    year: string;
    creator_name: string;
    creator_link: string;
  };
}

export interface SocialLink extends HasVisibility {
  platform: string;
  url: string;
  label: string;
  icon: Icon;
}

export interface Hobby extends HasVisibility {
  name: string;
  color: string;
  percentage: number;
}
