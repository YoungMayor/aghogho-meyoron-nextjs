'use client';

import { useState, useEffect, useRef } from 'react';
import { ResumeConfig } from '@/lib/types';
import SubPageHeader from '@/components/layout/SubPageHeader';
import Button from '@/components/ui/Button';
import ResumeConfigPanel from './ResumeConfigPanel';
import ResumePreview from './ResumePreview';
import { careerItems } from '@/lib/data/career_history';
import { academicRecords } from '@/lib/data/academic_history';
import { technicalSkills } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
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
  hiddenItemIds: [],
  selectedItems: {
    experience: [],
    education: [],
    skills: [],
    projects: [],
  },
};

export default function ResumeBuilder() {
  const [config, setConfig] = useState<ResumeConfig>(() => {
    let initialConfig = defaultConfig;
    if (typeof window !== 'undefined') {
      const savedConfig = localStorage.getItem('resumeConfig');
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig);
          // robust merge to handle legacy data structure
          initialConfig = {
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
    }

    // Initialize selected items if empty (logic moved from useEffect to avoid setState in effect)
    const needsInitialization =
      initialConfig.selectedItems.experience.length === 0 &&
      initialConfig.selectedItems.education.length === 0 &&
      initialConfig.selectedItems.skills.length === 0 &&
      initialConfig.selectedItems.projects.length === 0;

    if (needsInitialization) {
      const visibleCareer = sortByDate(getVisibleItems(careerItems), 'start_date');
      const visibleEducation = sortByPriority(getVisibleItems(academicRecords), 'desc');
      const visibleSkills = sortByPriority(getVisibleItems(technicalSkills), 'desc');
      const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');

      return {
        ...initialConfig,
        selectedItems: {
          experience: visibleCareer.slice(0, 3).map((item) => item.company_name),
          education: visibleEducation.slice(0, 2).map((item) => item.school),
          skills: visibleSkills.slice(0, 6).map((item) => item.name),
          projects: visibleProjects.slice(0, 3).map((item) => item.name),
        },
      };
    }

    return initialConfig;
  });

  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(true);
  const isFirstRender = useRef(true);

  // Persistence
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('resumeConfig', JSON.stringify(config));
  }, [config]);

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
              <ResumeConfigPanel config={config} setConfig={setConfig} onReset={handleReset} />
            )}

            {/* Resume Preview */}
            <div
              className={`${isConfigPanelOpen ? 'lg:col-span-3' : 'lg:col-span-4'} print:col-span-full`}
            >
              <ResumePreview config={config} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
