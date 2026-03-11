'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import Accordion from '@/components/ui/Accordion';
import { skills } from '@/lib/data/skills';
import { languagesIcons, frameworksIcons, databasesIcons } from '@/lib/data/icons';
import { segments, stackRoles as importedStackRoles } from '@/lib/data/projects/constants';
import { useDebounce } from '@/lib/hooks/debounce';
import CustomIcon from '@/components/ui/Icon';

const predefinedSegments = [
  ...Object.values(segments).map((segment) => ({ value: segment, label: segment })),
];

const stackRoles = [
  ...Object.values(importedStackRoles).map((role) => ({ value: role, label: role })),
];

export default function ProjectsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Read state from URL
  const currentSegments = searchParams.get('segment')
    ? searchParams.get('segment')!.split(',')
    : [];
  const currentRoles = searchParams.get('stack_role')
    ? searchParams.get('stack_role')!.split(',')
    : [];
  const currentSkills = searchParams.get('skill') ? searchParams.get('skill')!.split(',') : [];
  const currentTechs = searchParams.get('tech') ? searchParams.get('tech')!.split(',') : [];
  const currentSearchUrl = searchParams.get('search') || '';

  const [currentSearch, setCurrentSearch] = useState(currentSearchUrl);
  const debouncedSearch = useDebounce(currentSearch, 500);

  // Local state for the modal
  const [localSegments, setLocalSegments] = useState<string[]>([]);
  const [localRoles, setLocalRoles] = useState<string[]>([]);
  const [localSkills, setLocalSkills] = useState<string[]>([]);
  const [localTechs, setLocalTechs] = useState<string[]>([]);
  const [techSearch, setTechSearch] = useState('');

  // Update URL helper
  const updateFilters = useCallback(
    (updates: { key: string; value: string | string[] | null }[]) => {
      const params = new URLSearchParams(searchParamsString);

      updates.forEach(({ key, value }) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, value);
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParamsString]
  );

  useEffect(() => {
    updateFilters([{ key: 'search', value: debouncedSearch }]);
  }, [debouncedSearch, updateFilters]);

  const clearFilters = () => {
    setCurrentSearch('');
    router.replace(pathname, { scroll: false });
  };

  const activeFiltersCount =
    currentSegments.length + currentRoles.length + currentSkills.length + currentTechs.length;

  const handleApplyFilters = () => {
    updateFilters([
      { key: 'segment', value: localSegments },
      { key: 'stack_role', value: localRoles },
      { key: 'skill', value: localSkills },
      { key: 'tech', value: localTechs },
    ]);
    setIsFilterModalOpen(false);
  };

  const toggleArrayItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    setter((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]));
  };

  const filterableTechIcons = [
    ...Object.values(languagesIcons),
    ...Object.values(frameworksIcons),
    ...Object.values(databasesIcons),
  ];

  const allFilteredTechIcons = filterableTechIcons.filter((icon) =>
    icon.label.toLowerCase().includes(techSearch.toLowerCase())
  );

  const renderChips = (
    options: { label: string; value: string }[],
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => toggleArrayItem(setter, opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isSelected
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-secondary/50 border-border text-muted-foreground'
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );

  const accordionItems = [
    {
      id: 'segments',
      title: 'Segment',
      badge: localSegments.length,
      defaultOpen: true,
      content: renderChips(predefinedSegments, localSegments, setLocalSegments),
    },
    {
      id: 'roles',
      title: 'Role',
      badge: localRoles.length,
      defaultOpen: false,
      content: renderChips(stackRoles, localRoles, setLocalRoles),
    },
    {
      id: 'skills',
      title: 'Skill Group',
      badge: localSkills.length,
      defaultOpen: false,
      content: renderChips(
        skills.filter((s) => s.type === 'tech').map((s) => ({ label: s.name, value: s.name })),
        localSkills,
        setLocalSkills
      ),
    },
    {
      id: 'tech',
      title: 'Technologies',
      badge: localTechs.length,
      defaultOpen: false,
      content: (
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Search technologies..."
            value={techSearch}
            onChange={(e) => setTechSearch(e.target.value)}
            className="w-full text-sm h-9"
          />
          <div className="max-h-64 overflow-y-auto no-scrollbar grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 pb-2">
            {allFilteredTechIcons.map((icon, index) => {
              const isSelected = localTechs.includes(icon.label);
              return (
                <button
                  key={`${index}-${icon.value}`}
                  onClick={() => toggleArrayItem(setLocalTechs, icon.label)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all text-center ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-sm scale-95'
                      : 'bg-background border-border hover:border-primary/50 hover:bg-secondary/20'
                  }`}
                >
                  <CustomIcon.fromIcon
                    icon={icon}
                    className={`w-6 h-6 mb-1 ${isSelected ? 'opacity-100' : 'opacity-70 grayscale'}`}
                  />
                  <span className="text-[10px] font-medium truncate w-full">{icon.label}</span>
                </button>
              );
            })}
            {allFilteredTechIcons.length === 0 && (
              <div className="col-span-full text-center py-4 text-xs text-muted-foreground">
                No technologies found.
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-center">
        {/* Search */}
        <div className="flex w-full">
          <Input
            placeholder="Search by name, description, etc..."
            value={currentSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentSearch(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                updateFilters([{ key: 'search', value: currentSearch }]);
              }
            }}
            className="w-full"
            type="search"
          />
        </div>

        <div className="flex shrink-0">
          <Button
            variant={activeFiltersCount > 0 ? 'primary' : 'outline'}
            onClick={() => {
              setLocalSegments(currentSegments);
              setLocalRoles(currentRoles);
              setLocalSkills(currentSkills);
              setLocalTechs(currentTechs);
              setTechSearch('');
              setIsFilterModalOpen(true);
            }}
            className="flex-1 md:flex-none"
          >
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-destructive hover:text-destructive/80 shrink-0 ml-2"
              title="Clear all filters"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title="Filter Projects"
        size="lg"
      >
        <div className="flex flex-col gap-6 max-h-[80vh]">
          <div className="overflow-y-auto pr-2 no-scrollbar">
            <Accordion items={accordionItems} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border mt-auto">
            <Button variant="ghost" onClick={() => setIsFilterModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
