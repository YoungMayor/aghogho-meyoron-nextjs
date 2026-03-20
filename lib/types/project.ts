import { Icon, HasVisibility } from './common';
import { ProjectSegment, ProjectRole } from '../data/projects/constants';

export interface Project extends HasVisibility {
  slug: string;
  name: string;
  description: string;
  features: string[];
  icons: Icon[];
  segment: ProjectSegment[];
  stack_role: ProjectRole[];
  demo_link: string | null;
  repo_link: string | null;
  images: string[];
  is_featured?: boolean;
}
