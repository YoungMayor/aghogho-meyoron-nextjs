'use client';

import Link from 'next/link';
import { featuredProjects } from '@/lib/data/projects';
import { getVisibleItems, sortByPriority } from '@/lib/utils/data';
import ProjectCard from '@/components/features/ProjectCard';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';

export default function Projects() {
  // Get top 3 featured priority projects
  const visibleProjects = sortByPriority(getVisibleItems(featuredProjects), 'desc').slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Featured Projects"
          subtitle="A showcase of my recent work and contributions"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug || project.name} project={project} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link href="/projects">
            <Button variant="outline" size="lg">
              View All Projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
