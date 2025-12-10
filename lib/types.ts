// Utility Types
export interface Icon {
  type: 'devicon' | 'simpleicon';
  value: string;
  label: string;
}

export interface HasVisibility {
  show: boolean;
  priority: number;
}

export interface Person {
  name: string;
  titles: readonly string[]; // First title would be regarded as the main one
  avatar_url: string | null;
  biography: string; // HTML content
  profile_link: string | null;
}

// Profile
export interface Profile {
  name: string;
  titles: readonly string[]; // First title would be regarded as the main one
  avatar_url?: string; // URL to profile image
  biography: string; // HTML content
  profile_link: string | null;
  notes: {
    tagline: string;
    persona: string;
    about: string;
  };
  contact: {
    email: string;
    phone: string;
    message: string;
  };
  copyright: {
    year: string;
    creator_name: string;
    creator_link: string;
  };
}

// Academic History
export interface AcademicRecord extends HasVisibility {
  school: string;
  degree: string;
  start_year: number;
  end_year: number;
  achievements: string[];
  location: string;
}

// Career History
export interface CareerItem extends HasVisibility {
  company_name: string;
  role: string;
  start_date: string; // ISO date or "YYYY-MM-DD"
  end_date: string | null; // null for current position
  description: string;
  location: string;
  duties: string[];
}

// Projects
export interface Project extends HasVisibility {
  slug: string | null; // For routing to individual project pages
  name: string;
  description: string;
  features: string[];
  icons: Icon[];
  type:
    | 'api'
    | 'cli'
    | 'desktop-app'
    | 'mobile-app'
    | 'package'
    | 'portfolio'
    | 'web-app'
    | 'other';
  owner: 'personal' | 'client' | 'open-source' | 'package' | 'other';
  demo_link: string | null;
  repo_link: string | null;
  images: string[]; // First image would be used as the main image
  is_featured?: boolean;
}

// Skills
export interface Skill extends HasVisibility {
  name: string; // Eg. Frontend Development
  description: string | null;
  type: 'tech' | 'soft' | 'other';
  icons: Icon[];
}

// Social Links
export interface SocialLink extends HasVisibility {
  platform: string;
  url: string;
  label: string;
  icon: Icon;
}

// Testimonials
export interface Testimonial extends HasVisibility {
  person: Person;
  review: string;
  rating: number; // 1-5
  type: 'personal' | 'colleague' | 'client' | 'mentee' | 'other';
}

// Articles
export interface Article extends HasVisibility {
  title: string;
  summary: string;
  link: string;
  cover_url: string;
  platform: string; // e.g., "medium"
}

// Hobbies
export interface Hobby extends HasVisibility {
  name: string;
  color: string;
  percentage: number; // 0-100
}

// Form Submission Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken: string;
}

export interface MentorshipFormData {
  name: string;
  email: string;
  phone?: string;
  background: string;
  goals: string;
  commitment: string;
  recaptchaToken: string;
}

// API Response Types
export interface ApiSuccessResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: unknown;
  statusCode: number;
}

// Resume Builder Types
export type TemplateId = 'classic' | 'modern' | 'minimal' | 'executive';

export interface ResumeSectionConfig {
  experience: boolean;
  education: boolean;
  skills: boolean;
  projects: boolean;
  badges: boolean;
  hobbies: boolean;
  contact: boolean;
  summary: boolean;
}

export interface ResumeConfig {
  templateId: TemplateId;
  showSections: ResumeSectionConfig;
  showAvatar: boolean;
  showSkillIcons: boolean;
  themeColor: string;
  hiddenItemIds: string[]; // Using IDs or unique keys (like company_name)
  customSummary?: string;
  selectedItems: {
    // Legacy support or specific selection logic
    experience: string[];
    education: string[];
    skills: string[];
    projects: string[];
  };
}

export interface ResumeData {
  profile: Profile;
  careerHistory: CareerItem[];
  education: AcademicRecord[];
  skills: Skill[];
  projects: Project[];
  socialLinks: SocialLink[];
  badges: string[];
  hobbies: Hobby[];
}
