export interface Icon {
  type: 'dev' | 'simple';
  value: string;
  label: string;
  slug?: string;
}

export interface HasVisibility {
  show: boolean;
  priority: number;
}

export interface Person {
  name: string;
  titles: readonly string[];
  avatar_url: string | null;
  biography: string;
  profile_link: string | null;
}
