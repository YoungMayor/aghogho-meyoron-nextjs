import { useMemo } from 'react';
import { ResumeConfig, ResumeData } from '@/lib/types';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import { profile } from '@/lib/data/profile';
import { careerItems } from '@/lib/data/career_history';
import { academicRecords } from '@/lib/data/academic_history';
import { technicalSkills } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
import { socialLinks } from '@/lib/data/social_links';
import { badges } from '@/lib/data/badges';
import { hobbies } from '@/lib/data/hobbies';
import { getVisibleItems, sortByPriority, sortByDate } from '@/lib/utils/data';

interface ResumePreviewProps {
  config: ResumeConfig;
}

export default function ResumePreview({ config }: ResumePreviewProps) {
  // Memoize the filtered data to prevent unnecessary re-renders
  const filteredData: ResumeData = useMemo(() => {
    // Helper to filter by ID/Name if it's in the selectedItems list
    // Note: The original implementation filters by INCLUSION in selectedItems.
    // If selectedItems is empty, it might mean show nothing or show defaults.
    // Logic from page.tsx: "selectedCareer = visibleCareer.filter(item => config.selectedItems.experience.includes(item.company_name))"

    const visibleCareer = sortByDate(getVisibleItems(careerItems), 'start_date');
    const visibleEducation = sortByPriority(getVisibleItems(academicRecords), 'desc');
    const visibleSkills = sortByPriority(getVisibleItems(technicalSkills), 'desc');
    const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');
    const visibleSocialLinks = sortByPriority(getVisibleItems(socialLinks), 'desc');
    const visibleHobbies = sortByPriority(getVisibleItems(hobbies), 'desc');

    return {
      profile: profile,
      careerHistory: config.showSections.experience
        ? visibleCareer.filter((item) =>
            config.selectedItems.experience.includes(item.company_name)
          )
        : [],
      education: config.showSections.education
        ? visibleEducation.filter((item) => config.selectedItems.education.includes(item.school))
        : [],
      skills: config.showSections.skills
        ? visibleSkills.filter((item) => config.selectedItems.skills.includes(item.name))
        : [],
      projects: config.showSections.projects
        ? visibleProjects.filter((item) => config.selectedItems.projects.includes(item.name))
        : [],
      socialLinks: visibleSocialLinks,
      badges: badges, // badges is string[]
      hobbies: visibleHobbies,
    };
  }, [config]);

  const renderTemplate = () => {
    switch (config.templateId) {
      case 'modern':
        return <ModernTemplate data={filteredData} config={config} />;
      case 'minimal':
        return <MinimalTemplate data={filteredData} config={config} />;
      case 'executive':
        return <ExecutiveTemplate data={filteredData} config={config} />;
      case 'classic':
      default:
        return <ClassicTemplate data={filteredData} config={config} />;
    }
  };

  return <>{renderTemplate()}</>;
}
