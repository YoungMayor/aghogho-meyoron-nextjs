'use client';

import { useState, useEffect } from 'react';
import { profile } from '@/lib/data/profile';
import { careerItems } from '@/lib/data/career_history';
import { academicRecords } from '@/lib/data/academic_history';
import { technicalSkills } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
import { socialLinks } from '@/lib/data/social_links';
import { badges } from '@/lib/data/badges';
import { hobbies } from '@/lib/data/hobbies';
import { getVisibleItems, sortByPriority, sortByDate } from '@/lib/utils/data';
import SubPageHeader from '@/components/layout/SubPageHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type Template = 'classic' | 'modern' | 'minimal';

interface ResumeConfig {
  template: Template;
  sections: {
    contact: boolean;
    summary: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
    projects: boolean;
    badges: boolean;
    hobbies: boolean;
  };
  selectedItems: {
    experience: string[];
    education: string[];
    skills: string[];
    projects: string[];
  };
}

const defaultConfig: ResumeConfig = {
  template: 'modern',
  sections: {
    contact: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    badges: false,
    hobbies: false,
  },
  selectedItems: {
    experience: [],
    education: [],
    skills: [],
    projects: [],
  },
};

export default function ResumePage() {
  const [config, setConfig] = useState<ResumeConfig>(() => {
    // Try to load saved config on initial render
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('resumeConfig');
      if (savedConfig) {
        try {
          return JSON.parse(savedConfig);
        } catch (e) {
          console.error('Failed to load saved config:', e);
        }
      }
    }
    return defaultConfig;
  });
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeConfig', JSON.stringify(config));
  }, [config]);

  // Get filtered data
  const visibleCareer = sortByDate(getVisibleItems(careerItems), 'start_date');
  const visibleEducation = sortByPriority(getVisibleItems(academicRecords), 'desc');
  const visibleSkills = sortByPriority(getVisibleItems(technicalSkills), 'desc');
  const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');
  const visibleSocialLinks = sortByPriority(getVisibleItems(socialLinks), 'desc');
  const visibleBadges = badges; // badges is a simple string array
  const visibleHobbies = sortByPriority(getVisibleItems(hobbies), 'desc');

  // Initialize selected items if empty (only once)
  useEffect(() => {
    if (!initialized) {
      const needsInitialization =
        config.selectedItems.experience.length === 0 ||
        config.selectedItems.education.length === 0 ||
        config.selectedItems.skills.length === 0 ||
        config.selectedItems.projects.length === 0;

      if (needsInitialization) {
        setConfig((prev) => ({
          ...prev,
          selectedItems: {
            experience:
              prev.selectedItems.experience.length > 0
                ? prev.selectedItems.experience
                : visibleCareer.slice(0, 3).map((item) => item.company_name),
            education:
              prev.selectedItems.education.length > 0
                ? prev.selectedItems.education
                : visibleEducation.map((item) => item.school),
            skills:
              prev.selectedItems.skills.length > 0
                ? prev.selectedItems.skills
                : visibleSkills.map((item) => item.name),
            projects:
              prev.selectedItems.projects.length > 0
                ? prev.selectedItems.projects
                : visibleProjects.slice(0, 3).map((item) => item.name),
          },
        }));
      }
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const handlePrint = () => {
    window.print();
  };

  const handleTemplateChange = (template: Template) => {
    setConfig((prev) => ({ ...prev, template }));
  };

  const handleSectionToggle = (section: keyof ResumeConfig['sections']) => {
    setConfig((prev) => ({
      ...prev,
      sections: { ...prev.sections, [section]: !prev.sections[section] },
    }));
  };

  const handleItemToggle = (category: keyof ResumeConfig['selectedItems'], itemId: string) => {
    setConfig((prev) => {
      const currentItems = prev.selectedItems[category];
      const newItems = currentItems.includes(itemId)
        ? currentItems.filter((id) => id !== itemId)
        : [...currentItems, itemId];
      return {
        ...prev,
        selectedItems: { ...prev.selectedItems, [category]: newItems },
      };
    });
  };

  const handleReset = () => {
    setConfig(defaultConfig);
    localStorage.removeItem('resumeConfig');
  };

  // Get selected data
  const selectedCareer = visibleCareer.filter((item) =>
    config.selectedItems.experience.includes(item.company_name)
  );
  const selectedEducation = visibleEducation.filter((item) =>
    config.selectedItems.education.includes(item.school)
  );
  const selectedSkills = visibleSkills.filter((item) =>
    config.selectedItems.skills.includes(item.name)
  );
  const selectedProjects = visibleProjects.filter((item) =>
    config.selectedItems.projects.includes(item.name)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="print:hidden">
        <SubPageHeader />
      </div>

      <main className="flex-1 print:p-0">
        {/* Hero Section - Hidden on print */}
        <section className="py-16 px-4 bg-gradient-to-b from-secondary/50 to-background print:hidden">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume Builder</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Customize your resume by selecting sections and items to include
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handlePrint} variant="primary">
                Print / Save as PDF
              </Button>
              <Button onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)} variant="secondary">
                {isConfigPanelOpen ? 'Hide' : 'Show'} Configuration
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8 print:p-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Configuration Panel */}
            {isConfigPanelOpen && (
              <aside className="lg:col-span-1 print:hidden space-y-6">
                <Card>
                  <h2 className="text-xl font-bold mb-4">Template</h2>
                  <div className="space-y-2">
                    {(['classic', 'modern', 'minimal'] as Template[]).map((template) => (
                      <button
                        key={template}
                        onClick={() => handleTemplateChange(template)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          config.template === template
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-secondary/80'
                        }`}
                      >
                        {template.charAt(0).toUpperCase() + template.slice(1)}
                      </button>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h2 className="text-xl font-bold mb-4">Sections</h2>
                  <div className="space-y-2">
                    {Object.entries(config.sections).map(([section, isVisible]) => (
                      <label key={section} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={() =>
                            handleSectionToggle(section as keyof ResumeConfig['sections'])
                          }
                          className="w-4 h-4 rounded border-input"
                        />
                        <span className="capitalize">{section}</span>
                      </label>
                    ))}
                  </div>
                </Card>

                {config.sections.experience && (
                  <Card>
                    <h3 className="font-bold mb-3">Experience Items</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {visibleCareer.map((item) => (
                        <label
                          key={item.company_name}
                          className="flex items-start gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={config.selectedItems.experience.includes(item.company_name)}
                            onChange={() => handleItemToggle('experience', item.company_name)}
                            className="w-4 h-4 rounded border-input mt-0.5 flex-shrink-0"
                          />
                          <span className="line-clamp-2">{item.company_name}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                )}

                {config.sections.education && (
                  <Card>
                    <h3 className="font-bold mb-3">Education Items</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {visibleEducation.map((item) => (
                        <label
                          key={item.school}
                          className="flex items-start gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={config.selectedItems.education.includes(item.school)}
                            onChange={() => handleItemToggle('education', item.school)}
                            className="w-4 h-4 rounded border-input mt-0.5 flex-shrink-0"
                          />
                          <span className="line-clamp-2">{item.school}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                )}

                {config.sections.skills && (
                  <Card>
                    <h3 className="font-bold mb-3">Skill Categories</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {visibleSkills.map((item) => (
                        <label
                          key={item.name}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={config.selectedItems.skills.includes(item.name)}
                            onChange={() => handleItemToggle('skills', item.name)}
                            className="w-4 h-4 rounded border-input flex-shrink-0"
                          />
                          <span>{item.name}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                )}

                {config.sections.projects && (
                  <Card>
                    <h3 className="font-bold mb-3">Project Items</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {visibleProjects.map((item) => (
                        <label
                          key={item.name}
                          className="flex items-start gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={config.selectedItems.projects.includes(item.name)}
                            onChange={() => handleItemToggle('projects', item.name)}
                            className="w-4 h-4 rounded border-input mt-0.5 flex-shrink-0"
                          />
                          <span className="line-clamp-2">{item.name}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                )}

                <Button onClick={handleReset} variant="secondary" className="w-full">
                  Reset Configuration
                </Button>
              </aside>
            )}

            {/* Resume Preview */}
            <div
              className={`${isConfigPanelOpen ? 'lg:col-span-3' : 'lg:col-span-4'} print:col-span-full`}
            >
              <div
                className={`bg-white dark:bg-background text-foreground shadow-lg print:shadow-none ${
                  config.template === 'classic'
                    ? 'resume-classic'
                    : config.template === 'modern'
                      ? 'resume-modern'
                      : 'resume-minimal'
                }`}
              >
                {/* Header */}
                <div className="resume-header p-8 print:p-6">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile.name}</h1>
                  <div className="flex flex-wrap gap-2 text-sm md:text-base text-muted-foreground mb-4">
                    {profile.titles.map((title, index) => (
                      <span key={title}>
                        {title}
                        {index < profile.titles.length - 1 && ' • '}
                      </span>
                    ))}
                  </div>

                  {config.sections.contact && (
                    <div className="flex flex-wrap gap-4 text-sm">
                      <a href={`mailto:${profile.contact.email}`} className="hover:text-primary">
                        {profile.contact.email}
                      </a>
                      <span>{profile.contact.phone}</span>
                      {visibleSocialLinks.slice(0, 3).map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div className="resume-body p-8 print:p-6 space-y-6">
                  {config.sections.summary && (
                    <section className="resume-section">
                      <h2 className="resume-section-title">Professional Summary</h2>
                      <p className="text-sm">{profile.notes.about}</p>
                    </section>
                  )}

                  {config.sections.experience && selectedCareer.length > 0 && (
                    <section className="resume-section">
                      <h2 className="resume-section-title">Experience</h2>
                      <div className="space-y-4">
                        {selectedCareer.map((item) => (
                          <div key={item.company_name} className="resume-item">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-bold">{item.role}</h3>
                                <p className="text-sm text-muted-foreground">{item.company_name}</p>
                              </div>
                              <div className="text-sm text-muted-foreground text-right">
                                <p>
                                  {new Date(item.start_date).getFullYear()} -{' '}
                                  {item.end_date
                                    ? new Date(item.end_date).getFullYear()
                                    : 'Present'}
                                </p>
                                <p>{item.location}</p>
                              </div>
                            </div>
                            <p className="text-sm mb-2">{item.description}</p>
                            {item.duties.length > 0 && (
                              <ul className="text-sm space-y-1 list-disc list-inside">
                                {item.duties.slice(0, 3).map((duty, idx) => (
                                  <li key={idx}>{duty}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {config.sections.education && selectedEducation.length > 0 && (
                    <section className="resume-section">
                      <h2 className="resume-section-title">Education</h2>
                      <div className="space-y-3">
                        {selectedEducation.map((item) => (
                          <div key={item.school} className="resume-item">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold">{item.degree}</h3>
                                <p className="text-sm text-muted-foreground">{item.school}</p>
                              </div>
                              <div className="text-sm text-muted-foreground text-right">
                                <p>
                                  {item.start_year} - {item.end_year}
                                </p>
                                <p>{item.location}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {config.sections.skills && selectedSkills.length > 0 && (
                    <section className="resume-section">
                      <h2 className="resume-section-title">Skills</h2>
                      <div className="space-y-2">
                        {selectedSkills.map((skill) => (
                          <div key={skill.name}>
                            <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                            <div className="flex flex-wrap gap-2">
                              {skill.icons.slice(0, 12).map((icon) => (
                                <span
                                  key={icon.label}
                                  className="text-xs px-2 py-1 bg-secondary rounded"
                                >
                                  {icon.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {config.sections.projects && selectedProjects.length > 0 && (
                    <section className="resume-section">
                      <h2 className="resume-section-title">Notable Projects</h2>
                      <div className="space-y-3">
                        {selectedProjects.map((project) => (
                          <div key={project.name} className="resume-item">
                            <h3 className="font-bold">{project.name}</h3>
                            <p className="text-sm mb-1">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.icons.slice(0, 6).map((icon) => (
                                <span
                                  key={icon.label}
                                  className="text-xs px-2 py-0.5 bg-secondary rounded"
                                >
                                  {icon.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {config.sections.badges && visibleBadges.length > 0 && (
                    <section className="resume-section">
                      <h2 className="resume-section-title">Certifications & Badges</h2>
                      <div className="flex flex-wrap gap-2">
                        {visibleBadges.map((badge) => (
                          <span key={badge} className="text-xs px-3 py-1 bg-secondary rounded-full">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {config.sections.hobbies && visibleHobbies.length > 0 && (
                    <section className="resume-section">
                      <h2 className="resume-section-title">Interests</h2>
                      <div className="flex flex-wrap gap-2">
                        {visibleHobbies.map((hobby) => (
                          <span key={hobby.name} className="text-sm">
                            {hobby.name}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
