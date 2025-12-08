'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import TechFilterDialog from './TechFilterDialog';
import { skills } from '@/lib/data/skills';

const predefinedOwners = [
  { value: 'all', label: 'All Projects' },
  { value: 'personal', label: 'Personal' },
  { value: 'client', label: 'Client' },
  { value: 'open-source', label: 'Open Source' },
  { value: 'package', label: 'Packages' },
] as const;

const projectTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'web-app', label: 'Web App' },
  { value: 'mobile-app', label: 'Mobile App' },
  { value: 'api', label: 'API' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'package', label: 'Package (Dart/JS)' },
  { value: 'cli', label: 'CLI Tool' },
];

export default function ProjectsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  // Read state from URL
  const currentOwner = searchParams.get('owner') || 'all';
  const currentType = searchParams.get('type') || 'all';
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
    currentOwner !== 'all',
    currentType !== 'all',
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
            onChange={(e) => updateFilters('search', e.target.value)}
            className="w-full"
          />
        </div>

        {/* Mobile: Simple Filters or Toggle? keeping it expanded for now */}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Filter Groups */}
        <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto">
          {/* Owner Tabs (Desktop) / Select (Mobile optimized if needed, but tabs exist in design) */}
          <div className="flex bg-secondary/30 p-1 rounded-xl overflow-x-auto max-w-full no-scrollbar">
            {predefinedOwners.map((owner) => (
              <button
                key={owner.value}
                onClick={() => updateFilters('owner', owner.value)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                  ${
                    currentOwner === owner.value
                      ? 'bg-background shadow-sm text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }
                `}
              >
                {owner.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {/* Type Select */}
          <div className="w-full sm:w-40">
            <Select
              value={currentType}
              onChange={(e) => updateFilters('type', e.target.value)}
              options={projectTypes}
            />
          </div>

          {/* Skills Select */}
          <div className="w-full sm:w-40">
            <Select
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
            className="w-full sm:w-auto"
            size="md"
          >
            Technologies {currentTechs.length > 0 && `(${currentTechs.length})`}
          </Button>

          {/* Clear All */}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-destructive hover:text-destructive/80 w-full sm:w-auto"
              size="md"
            >
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
