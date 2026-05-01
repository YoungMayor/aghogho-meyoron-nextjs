import { Profile, SocialLink, Hobby } from './profile';
import { CareerItem, AcademicRecord } from './experience';
import { Skill } from './skills';
import { Project } from './project';

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
  showDateMonths: boolean;
  themeColor: string;
  hiddenItemIds: string[];
  customSummary?: string;
  selectedItems: {
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
