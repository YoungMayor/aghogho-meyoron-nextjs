import { ResumeConfig, TemplateId } from '@/lib/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { careerItems } from '@/lib/data/career_history';
import { academicRecords } from '@/lib/data/academic_history';
import { technicalSkills } from '@/lib/data/skills';
import { projects } from '@/lib/data/projects';
import { getVisibleItems, sortByPriority, sortByDate } from '@/lib/utils/data';

interface ResumeConfigPanelProps {
  config: ResumeConfig;
  setConfig: React.Dispatch<React.SetStateAction<ResumeConfig>>;
  onReset: () => void;
}

export default function ResumeConfigPanel({ config, setConfig, onReset }: ResumeConfigPanelProps) {
  // Get all available items for selection lists
  const visibleCareer = sortByDate(getVisibleItems(careerItems), 'start_date');
  const visibleEducation = sortByPriority(getVisibleItems(academicRecords), 'desc');
  const visibleSkills = sortByPriority(getVisibleItems(technicalSkills), 'desc');
  const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');

  const handleTemplateChange = (templateId: TemplateId) => {
    setConfig((prev) => ({ ...prev, templateId }));
  };

  const handleSectionToggle = (section: keyof ResumeConfig['showSections']) => {
    setConfig((prev) => ({
      ...prev,
      showSections: { ...prev.showSections, [section]: !prev.showSections[section] },
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

  const templates: TemplateId[] = ['classic', 'modern', 'minimal', 'executive'];

  return (
    <aside className="lg:col-span-1 print:hidden space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">Template</h2>
        <div className="space-y-2">
          {templates.map((template) => (
            <button
              key={template}
              onClick={() => handleTemplateChange(template)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors capitalize ${
                config.templateId === template
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {template}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">Sections</h2>
        <div className="space-y-2">
          {Object.entries(config.showSections).map(([section, isVisible]) => (
            <label key={section} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => handleSectionToggle(section as keyof ResumeConfig['showSections'])}
                className="w-4 h-4 rounded border-input"
              />
              <span className="capitalize">{section}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* Dynamic Item Selection based on enabled sections */}

      {config.showSections.experience && (
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

      {config.showSections.education && (
        <Card>
          <h3 className="font-bold mb-3">Education Items</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {visibleEducation.map((item) => (
              <label key={item.school} className="flex items-start gap-2 cursor-pointer text-sm">
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

      {config.showSections.skills && (
        <Card>
          <h3 className="font-bold mb-3">Skill Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {visibleSkills.map((item) => (
              <label key={item.name} className="flex items-center gap-2 cursor-pointer text-sm">
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

      {config.showSections.projects && (
        <Card>
          <h3 className="font-bold mb-3">Project Items</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {visibleProjects.map((item) => (
              <label key={item.name} className="flex items-start gap-2 cursor-pointer text-sm">
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

      <Button onClick={onReset} variant="secondary" className="w-full">
        Reset Configuration
      </Button>
    </aside>
  );
}
