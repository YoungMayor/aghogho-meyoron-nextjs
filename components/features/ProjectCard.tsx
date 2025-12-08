'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const mainImage = project.images[0] || '/images/project-placeholder.png';

  return (
    <Card variant="elevated" hoverable>
      <div className="flex flex-col h-full">
        {/* Project Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl overflow-hidden">
          {project.images.length > 0 ? (
            <Image src={mainImage} alt={project.name} fill className="object-cover" unoptimized />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-4xl font-bold text-muted-foreground">
                {project.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Owner Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full">
              {project.owner}
            </span>
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{project.name}</h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.icons.map((icon, index) => (
              <div key={index} className="group relative" title={icon.label}>
                <Icon.fromIcon icon={icon} size={24} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-popover text-popover-foreground rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-sm border border-border">
                  {icon.label}
                </span>
              </div>
            ))}
            {project.icons.length > 6 && (
              <span className="text-xs text-muted-foreground self-center">
                +{project.icons.length - 6} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {project.slug ? (
              <Link href={`/projects/${project.slug}`} className="flex-1">
                <Button variant="primary" size="sm" fullWidth>
                  View Details
                </Button>
              </Link>
            ) : (
              <Button variant="primary" size="sm" fullWidth disabled>
                View Details
              </Button>
            )}
            {project.demo_link && (
              <a
                href={project.demo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" size="sm" fullWidth>
                  Demo
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
