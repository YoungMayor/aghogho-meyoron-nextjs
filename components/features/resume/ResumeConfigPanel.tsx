import { ResumeConfig, ResumeData, TemplateId } from '@/lib/types';
import Switch from '@/components/ui/Switch';
import Checkbox from '@/components/ui/Checkbox';
import { useState } from 'react';
import ChevronDownIcon from '@/components/icons/ChevronDownIcon';
import Button from '@/components/ui/Button';

interface ResumeConfigPanelProps {
  config: ResumeConfig;
  setConfig: React.Dispatch<React.SetStateAction<ResumeConfig>>;
  onReset: () => void;
  data: ResumeData;
}

const TEMPLATES = [
  { id: 'modern', name: 'Modern', description: 'Clean side-column layout' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, typography-focused' },
  { id: 'executive', name: 'Executive', description: 'Compact, high-density layout' },
];

const THEME_COLORS = [
  { name: 'Blue', value: '#2563eb' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Black', value: '#000000' },
];

export default function ResumeConfigPanel({
  config,
  setConfig,
  onReset,
  data,
}: ResumeConfigPanelProps) {
  const [activeTab, setActiveTab] = useState<'design' | 'content'>('design');
  const [expandedSection, setExpandedSection] = useState<string | null>('experience');

  const toggleSection = (section: keyof typeof config.showSections) => {
    setConfig((prev) => ({
      ...prev,
      showSections: {
        ...prev.showSections,
        [section]: !prev.showSections[section],
      },
    }));
  };

  const toggleItem = (
    section: 'experience' | 'education' | 'skills' | 'projects',
    value: string
  ) => {
    setConfig((prev) => {
      const currentList = prev.selectedItems[section];
      const newList = currentList.includes(value)
        ? currentList.filter((item) => item !== value)
        : [...currentList, value];

      return {
        ...prev,
        selectedItems: {
          ...prev.selectedItems,
          [section]: newList,
        },
      };
    });
  };

  return (
    <div className="bg-card border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Customize Resume</h2>
          <Button variant="outline" size="sm" onClick={onReset} className="text-xs">
            Reset
          </Button>
        </div>

        <div className="flex gap-2 p-1 bg-secondary/20 rounded-lg">
          <button
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'design'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:bg-background/50'
            }`}
          >
            Design
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === 'content'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:bg-background/50'
            }`}
          >
            Content
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'design' && (
          <div className="space-y-6">
            {/* Template Selection */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                Template
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setConfig({ ...config, templateId: template.id as TemplateId })}
                    className={`text-left p-3 rounded-lg border-2 transition-all ${
                      config.templateId === template.id
                        ? 'border-primary bg-primary/5'
                        : 'border-transparent bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    <div className="font-medium text-sm">{template.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Color */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                Accent Color
              </h3>
              <div className="flex flex-wrap gap-3">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setConfig({ ...config, themeColor: color.value })}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      config.themeColor === color.value
                        ? 'border-primary scale-110'
                        : 'border-transparent'
                    }`}
                    title={color.name}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Display Options */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                Display Options
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium">Show Profile Picture</span>
                  <Switch
                    checked={config.showAvatar}
                    onChange={(e) => setConfig({ ...config, showAvatar: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <span className="text-sm font-medium">Show Skill Icons</span>
                  <Switch
                    checked={config.showSkillIcons}
                    onChange={(e) => setConfig({ ...config, showSkillIcons: e.target.checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Sections Visibility */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                Sections
              </h3>
              <div className="space-y-2">
                {Object.entries(config.showSections).map(([section, isVisible]) => (
                  <label
                    key={section}
                    className="flex items-center justify-between p-2 rounded hover:bg-secondary/50 cursor-pointer"
                  >
                    <span className="capitalize">{section}</span>
                    <Switch
                      checked={isVisible}
                      onChange={() => toggleSection(section as keyof typeof config.showSections)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="h-px bg-border my-4" />

            {/* Content Filtering */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Detailed Content
              </h3>

              {/* Experience */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-3 bg-secondary/30 text-sm font-medium"
                  onClick={() =>
                    setExpandedSection(expandedSection === 'experience' ? null : 'experience')
                  }
                >
                  <span>Experience ({config.selectedItems.experience.length})</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${expandedSection === 'experience' ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedSection === 'experience' && (
                  <div className="p-3 bg-secondary/10 space-y-2 max-h-60 overflow-y-auto">
                    {data.careerHistory.map((item) => (
                      <label
                        key={item.company_name}
                        className="flex items-start gap-3 cursor-pointer p-1 hover:bg-secondary/20 rounded"
                      >
                        <Checkbox
                          checked={config.selectedItems.experience.includes(item.company_name)}
                          onChange={() => toggleItem('experience', item.company_name)}
                          className="mt-1"
                        />
                        <div className="text-sm">
                          <div className="font-medium">{item.company_name}</div>
                          <div className="text-xs text-muted-foreground">{item.role}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-3 bg-secondary/30 text-sm font-medium"
                  onClick={() =>
                    setExpandedSection(expandedSection === 'projects' ? null : 'projects')
                  }
                >
                  <span>Projects ({config.selectedItems.projects.length})</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${expandedSection === 'projects' ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedSection === 'projects' && (
                  <div className="p-3 bg-secondary/10 space-y-2 max-h-60 overflow-y-auto">
                    {data.projects.map((item) => (
                      <label
                        key={item.name}
                        className="flex items-start gap-3 cursor-pointer p-1 hover:bg-secondary/20 rounded"
                      >
                        <Checkbox
                          checked={config.selectedItems.projects.includes(item.name)}
                          onChange={() => toggleItem('projects', item.name)}
                          className="mt-1"
                        />
                        <div className="text-sm font-medium">{item.name}</div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-3 bg-secondary/30 text-sm font-medium"
                  onClick={() => setExpandedSection(expandedSection === 'skills' ? null : 'skills')}
                >
                  <span>Skills ({config.selectedItems.skills.length})</span>
                  <ChevronDownIcon
                    className={`w-4 h-4 transition-transform ${expandedSection === 'skills' ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedSection === 'skills' && (
                  <div className="p-3 bg-secondary/10 space-y-2 max-h-60 overflow-y-auto">
                    {data.skills.map((item) => (
                      <label
                        key={item.name}
                        className="flex items-start gap-3 cursor-pointer p-1 hover:bg-secondary/20 rounded"
                      >
                        <Checkbox
                          checked={config.selectedItems.skills.includes(item.name)}
                          onChange={() => toggleItem('skills', item.name)}
                          className="mt-1"
                        />
                        <div className="text-sm font-medium">{item.name}</div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Custom Summary */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                Summary Override
              </h3>
              <textarea
                className="w-full min-h-[100px] p-3 rounded-md border text-sm bg-background"
                placeholder="Enter a custom summary for this specific resume..."
                value={config.customSummary || ''}
                onChange={(e) => setConfig({ ...config, customSummary: e.target.value })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
