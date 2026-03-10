'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
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

  // Read state from URL
  const currentSegment = searchParams.get('segment') || 'all';
  const currentStackRole = searchParams.get('stack_role') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentTechs = searchParams.get('tech') ? searchParams.get('tech')!.split(',') : [];
  const currentSkill = searchParams.get('skill') || 'all';

  // Update URL helper
  const updateFilters = (key: string, value: string | string[] | null) => {
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
  };

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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <Input
            placeholder="Search by name, description, etc..."
            value={currentSearch}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateFilters('search', e.target.value)
            }
            className="w-full"
          />
        </div>

        {/* Mobile: Simple Filters or Toggle? keeping it expanded for now */}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Filter Groups */}
        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
          <div className="">
            <Select
              className="text-xs"
              value={currentSegment}
              onChange={(e) => updateFilters('segment', e.target.value)}
              options={predefinedSegments}
            />
          </div>

          {/* Type Select */}
          <div className="">
            <Select
              className="text-xs"
              value={currentStackRole}
              onChange={(e) => updateFilters('stack_role', e.target.value)}
              options={stackRoles}
            />
          </div>
        </div>

        {/* Secondary Filters */}
        <div className={`flex w-full lg:w-auto ${activeFiltersCount > 0 ? 'gap-4' : 'gap-3'}`}>
          {/* Skills Select */}
          <div className="">
            <Select
              className="text-xs"
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

          {/* Tech Filter Trigger */}
          <Button
            variant={currentTechs.length > 0 ? 'primary' : 'outline'}
            onClick={() => setIsTechModalOpen(true)}
            className=""
            size="sm"
          >
            Technologies {currentTechs.length > 0 && `(${currentTechs.length})`}
          </Button>

          {/* Clear All */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-destructive hover:text-destructive/80 "
              size="md"
            >
              {/* @ai: For mobile displays, use a brush icon instead */}
              Clear
            </Button>
          )}
        </div>
      </div>

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
