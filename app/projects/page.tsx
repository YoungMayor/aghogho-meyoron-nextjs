'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { projects } from '@/lib/data/projects';
import { skills } from '@/lib/data/skills';
import { getVisibleItems, sortByPriority } from '@/lib/utils/data';
import ProjectCard from '@/components/features/ProjectCard';
import SubPageHeader from '@/components/layout/SubPageHeader';
import ProjectsFilter from '@/components/features/ProjectsFilter';
import Button from '@/components/ui/Button';
import { useRouter, usePathname } from 'next/navigation';

function ProjectsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get raw filters
  const filterOwner = searchParams.get('owner') || 'all';
  const filterType = searchParams.get('type') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const filterTechs = searchParams.get('tech') ? searchParams.get('tech')!.split(',') : [];
  const filterSkill = searchParams.get('skill') || 'all';

  const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');

  // Logic for Skill Filter: map skill name to icon labels
  const skillIconLabels =
    filterSkill !== 'all'
      ? skills.find((s) => s.name === filterSkill)?.icons.map((i) => i.label) || []
      : [];

  // Filter projects
  const filteredProjects = visibleProjects.filter((project) => {
    // 1. Owner
    if (filterOwner !== 'all' && project.owner !== filterOwner) {
      return false;
    }

    // 2. Type
    if (filterType !== 'all' && project.type !== filterType) {
      return false;
    }

    // 3. Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.features.some((f) => f.toLowerCase().includes(query)) ||
        project.icons.some((icon) => icon.label.toLowerCase().includes(query));

      if (!matchesSearch) return false;
    }

    // 4. Technologies (OR logic - if any selected tech is present)
    if (filterTechs.length > 0) {
      const hasTech = project.icons.some((icon) => filterTechs.includes(icon.label));
      if (!hasTech) return false;
    }

    // 5. Skills (OR logic - if any icon from the skill group is present)
    if (filterSkill !== 'all') {
      // If skill has no icons (e.g. empty capability), maybe show none?
      // Or if checking logic: project must have AT LEAST ONE icon from the skill set.
      const hasSkillIcon = project.icons.some((icon) => skillIconLabels.includes(icon.label));
      if (!hasSkillIcon) return false;
    }

    return true;
  });

  const clearFilters = () => {
    router.replace(pathname);
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-secondary/50 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive showcase of my work, from personal experiments to client projects and
            open-source contributions
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 px-4 border-b border-border sticky top-[60px] z-10 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <ProjectsFilter />

          {/* Results Count */}
          <div className="mt-4 text-sm text-muted-foreground flex justify-between items-center">
            <span>
              Showing {filteredProjects.length} of {visibleProjects.length} projects
            </span>
            {/* Optional: Add sort here later */}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug || project.name} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No projects found matching your criteria
              </p>
              <Button variant="outline" size="md" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SubPageHeader />
      <Suspense fallback={<div>Loading projects...</div>}>
        <ProjectsContent />
      </Suspense>
    </div>
  );
}
