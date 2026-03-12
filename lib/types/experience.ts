import { HasVisibility } from './common';
import { Icon } from './common';

export interface AcademicRecord extends HasVisibility {
  school: string;
  degree: string;
  start_year: number;
  end_year: number;
  achievements: string[];
  location: string;
}

export interface CareerItem extends HasVisibility {
  slug: string;
  company_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  location: string;
  duties: string[];
  roles?: {
    role: string;
    technologies: Icon[];
  }[];
}
