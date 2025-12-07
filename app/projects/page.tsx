'use client';

import { useState } from 'react';
import { projects } from '@/lib/data/projects';
import { getVisibleItems, sortByPriority } from '@/lib/utils/data';
import ProjectCard from '@/components/features/ProjectCard';
import SubPageHeader from '@/components/layout/SubPageHeader';
import Button from '@/components/ui/Button';

type FilterType = 'all' | 'personal' | 'client' | 'open-source';

export default function ProjectsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const visibleProjects = sortByPriority(getVisibleItems(projects), 'desc');

  // Filter projects
  const filteredProjects = visibleProjects.filter((project) => {
    // Apply owner filter
    if (filter !== 'all' && project.owner !== filter) {
      return false;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.features.some((f) => f.toLowerCase().includes(query)) ||
        project.icons.some((icon) => icon.label.toLowerCase().includes(query))
      );
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <SubPageHeader />

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
        <section className="py-8 px-4 border-b border-border">
          <div className="max-w-7xl mx-auto">
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search projects by name, description, features, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Projects' },
                { value: 'personal', label: 'Personal' },
                { value: 'client', label: 'Client' },
                { value: 'open-source', label: 'Open Source' },
              ].map((tab) => (
                <Button
                  key={tab.value}
                  variant={filter === tab.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(tab.value as FilterType)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {visibleProjects.length} projects
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
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
