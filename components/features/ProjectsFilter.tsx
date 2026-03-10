'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import TechFilterDialog from './TechFilterDialog';
import { skills } from '@/lib/data/skills';
import { segments, stackRoles as importedStackRoles } from '@/lib/data/projects/constants';

const predefinedSegments = [
  { value: 'all', label: 'All Projects' },
  ...Object.values(segments).map((segment) => ({ value: segment, label: segment })),
];

const stackRoles = [
  { value: 'all', label: 'All Roles' },
  ...Object.values(importedStackRoles).map((role) => ({ value: role, label: role })),
];

export default function ProjectsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Read state from URL
  const currentSegment = searchParams.get('segment') || 'all';
  const currentStackRole = searchParams.get('stack_role') || 'all';
  const currentSearchUrl = searchParams.get('search') || '';
  const currentTechs = searchParams.get('tech') ? searchParams.get('tech')!.split(',') : [];
  const currentSkill = searchParams.get('skill') || 'all';

  const [currentSearch, setCurrentSearch] = useState(currentSearchUrl);

  // Update URL helper
  const updateFilters = useCallback(
    (key: string, value: string | string[] | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value || value === 'all' || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','));
      } else {
        params.set(key, value);
      }

      // Reset page if we assume pagination later, but for now just push
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  const activeFiltersCount = [
    currentSegment !== 'all',
    currentStackRole !== 'all',
    currentSearch !== '',
    currentTechs.length > 0,
    currentSkill !== 'all',
  ].filter(Boolean).length;

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
                updateFilters('search', currentSearch);
              }
            }}
            className="w-full"
            type="search"
          />
        </div>

        <div className="flex shrink-0">
          <Button
            variant={activeFiltersCount > (currentSearch ? 1 : 0) ? 'primary' : 'outline'}
            onClick={() => setIsFilterModalOpen(true)}
            className="flex-1 md:flex-none"
          >
            Filters{' '}
            {activeFiltersCount > (currentSearch ? 1 : 0) &&
              `(${activeFiltersCount - (currentSearch ? 1 : 0)})`}
          </Button>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-destructive hover:text-destructive/80 shrink-0"
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
        size="md"
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Segment</label>
            <Select
              className="w-full"
              value={currentSegment}
              onChange={(e) => updateFilters('segment', e.target.value)}
              options={predefinedSegments}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Role / Type</label>
            <Select
              className="w-full"
              value={currentStackRole}
              onChange={(e) => updateFilters('stack_role', e.target.value)}
              options={stackRoles}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skill Group</label>
            <Select
              className="w-full"
              value={currentSkill}
              onChange={(e) => updateFilters('skill', e.target.value)}
              options={[
                { value: 'all', label: 'All Skills' },
                ...skills
                  .filter((s) => s.type === 'tech')
                  .map((s) => ({ value: s.name, label: s.name })),
              ]}
            />
          </div>

          <div className="space-y-2 text-center pt-2">
            <label className="text-sm font-medium block text-left">Specific Technologies</label>
            <Button
              variant={currentTechs.length > 0 ? 'primary' : 'outline'}
              onClick={() => setIsTechModalOpen(true)}
              className="w-full"
            >
              Select Technologies {currentTechs.length > 0 && `(${currentTechs.length})`}
            </Button>
          </div>
        </div>
      </Modal>

      {isTechModalOpen && (
        <TechFilterDialog
          isOpen={isTechModalOpen}
          onClose={() => setIsTechModalOpen(false)}
          selectedTechs={currentTechs}
          onApply={(techs) => updateFilters('tech', techs)}
        />
      )}
    </div>
  );
}
