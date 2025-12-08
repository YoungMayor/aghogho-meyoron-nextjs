'use client';

import { useState, useEffect, useRef } from 'react';
import { ResumeConfig, ResumeData } from '@/lib/types';
import SubPageHeader from '@/components/layout/SubPageHeader';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SettingsIcon from '@/components/icons/SettingsIcon';
import ResumeConfigPanel from '@/components/features/resume/ResumeConfigPanel';
import ResumePreview from './ResumePreview';
import { careerItems } from '@/lib/data/career_history';
import { academicRecords } from '@/lib/data/academic_history';
import { technicalSkills } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
import { profile as profileData } from '@/lib/data/profile';
import { socialLinks } from '@/lib/data/social_links';
import { badges } from '@/lib/data/badges';
import { hobbies } from '@/lib/data/hobbies';
import { getVisibleItems, sortByPriority, sortByDate } from '@/lib/utils/data';

const defaultConfig: ResumeConfig = {
  templateId: 'modern',
  showSections: {
    contact: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    badges: false,
    hobbies: false,
  },
  showAvatar: true,
  showSkillIcons: true,
  themeColor: '#2563eb', // Default Blue
  hiddenItemIds: [],
  selectedItems: {
    experience: [],
    education: [],
    skills: [],
    projects: [],
  },
};

export default function ResumeBuilder() {
  const [config, setConfig] = useState<ResumeConfig>(defaultConfig);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isFirstRender = useRef(true);

  // Load saved config on mount
  useEffect(() => {
    setIsMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
    const savedConfig = localStorage.getItem('resumeConfig');
    let loadedConfig = defaultConfig;

    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // robust merge to handle legacy data structure
        loadedConfig = {
          ...defaultConfig,
          ...parsed,
          templateId: parsed.templateId || parsed.template || defaultConfig.templateId,
          showSections: {
            ...defaultConfig.showSections,
            ...(parsed.showSections || parsed.sections),
          },
          selectedItems: {
            ...defaultConfig.selectedItems,
            ...parsed.selectedItems,
          },
        };
      } catch (e) {
        console.error('Failed to load saved config:', e);
      }
    }

    // Initialize selected items if empty
    const needsInitialization =
      loadedConfig.selectedItems.experience.length === 0 &&
      loadedConfig.selectedItems.education.length === 0 &&
      loadedConfig.selectedItems.skills.length === 0 &&
      loadedConfig.selectedItems.projects.length === 0;

    if (needsInitialization) {
      const visibleCareer = sortByDate(getVisibleItems(careerItems), 'start_date');
      const visibleEducation = sortByPriority(getVisibleItems(academicRecords), 'desc');
      const visibleSkills = sortByPriority(getVisibleItems(technicalSkills), 'desc');
      const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');

      loadedConfig = {
        ...loadedConfig,
        selectedItems: {
          experience: visibleCareer.slice(0, 3).map((item) => item.company_name),
          education: visibleEducation.slice(0, 2).map((item) => item.school),
          skills: visibleSkills.slice(0, 6).map((item) => item.name),
          projects: visibleProjects.slice(0, 3).map((item) => item.name),
        },
      };
    }

    setConfig(loadedConfig);
  }, []);

  // Persistence
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('resumeConfig', JSON.stringify(config));
  }, [config]);

  if (!isMounted) {
    return null; // Prevent hydration mismatch by rendering nothing on server/first client render
  }

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    // Default selections
    const visibleCareer = sortByDate(getVisibleItems(careerItems), 'start_date');
    const visibleEducation = sortByPriority(getVisibleItems(academicRecords), 'desc');
    const visibleSkills = sortByPriority(getVisibleItems(technicalSkills), 'desc');
    const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');

    setConfig({
      ...defaultConfig,
      selectedItems: {
        experience: visibleCareer.slice(0, 3).map((item) => item.company_name),
        education: visibleEducation.slice(0, 2).map((item) => item.school),
        skills: visibleSkills.slice(0, 6).map((item) => item.name),
        projects: visibleProjects.slice(0, 3).map((item) => item.name),
      },
    });
    localStorage.removeItem('resumeConfig');
  };

  const resumeData: ResumeData = {
    profile: profileData,
    careerHistory: careerItems,
    education: academicRecords,
    skills: technicalSkills,
    projects: projects,
    socialLinks: socialLinks,
    badges: badges,
    hobbies: hobbies,
  };

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
            <div className="flex gap-4 justify-center items-center">
              <Button onClick={handlePrint} variant="primary">
                Print / Save as PDF
              </Button>
              <Button
                onClick={() => setIsConfigModalOpen(true)}
                variant="secondary"
                className="p-3 rounded-full md:rounded-md md:px-4 aspect-square md:aspect-auto flex items-center justify-center gap-2"
                aria-label="Customize Resume"
              >
                <SettingsIcon className="w-5 h-5" />
                <span className="hidden md:inline">Customize</span>
              </Button>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-8 print:p-0">
          <div className="flex justify-center">
            {/* Resume Preview */}
            <div className="w-full max-w-[210mm] print:max-w-none print:w-full">
              <ResumePreview config={config} />
            </div>
          </div>
        </div>
      </main>

      {/* Configuration Modal */}
      <Modal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        title="Resume Configuration"
        size="lg"
      >
        <div className="h-[70vh] -m-4">
          {/* Passing resumeData to ConfigPanel for granular filtering logic inside the panel */}
          <ResumeConfigPanel
            config={config}
            setConfig={setConfig}
            onReset={handleReset}
            data={resumeData}
          />
        </div>
      </Modal>
    </div>
  );
}
