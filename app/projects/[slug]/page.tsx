import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/lib/data/projects';
import { getVisibleItems } from '@/lib/utils/data';
import { getMarkdownBySlug } from '@/lib/utils/markdown';
import Header from '@/components/layout/Header';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import ProjectGallery from '@/components/projects/ProjectGallery';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;

  // Find the project
  const visibleProjects = getVisibleItems(projects);
  const project = visibleProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const mainImage = project.images[0];

  // Get related projects (same owner or type)
  const relatedProjects = visibleProjects
    .filter(
      (p) => p.slug !== project.slug && (p.owner === project.owner || p.type === project.type)
    )
    .slice(0, 3);

  // Fetch markdown content
  const markdown = getMarkdownBySlug('lib/data/content', slug);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        {/* This should be a component */}
        <section className="py-6 px-4 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                href="/projects"
                className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              >
                Projects
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-black dark:text-white">{project.name}</span>
            </nav>
          </div>
        </section>

        {/* Project Hero */}
        <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Project Image */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl overflow-hidden shadow-lg">
                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={project.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl font-bold text-gray-300 dark:text-gray-700">
                      {project.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-800 rounded-full capitalize">
                    {project.owner}
                  </span>
                  <span className="px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-800 rounded-full capitalize">
                    {project.type.replace('-', ' ')}
                  </span>
                  {markdown && (
                    <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
                      Documentation Available
                    </span>
                  )}
                </div>

                <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {project.demo_link && (
                    <a href={project.demo_link} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary" size="lg">
                        View Demo
                      </Button>
                    </a>
                  )}
                  {project.repo_link && (
                    <a href={project.repo_link} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="lg">
                        View Repository
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        {project.images.length > 1 && (
          <section className="py-8 px-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-xl font-bold mb-4">Gallery</h2>
              <ProjectGallery images={project.images} title={project.name} />
            </div>
          </section>
        )}

        {/* Project Content (Markdown) */}
        {markdown && (
          <section className="py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <MarkdownRenderer content={markdown.content} />
            </div>
          </section>
        )}

        {/* Technologies */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-4">
              {project.icons.map((icon, index) => (
                <Card key={index} padding="sm">
                  <div className="flex items-center gap-3">
                    <Icon.fromIcon icon={icon} size={32} />
                    <span className="font-medium">{icon.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        {project.features.length > 0 && (
          <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <Card key={index} padding="md">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black text-sm font-bold">
                        ✓
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject) => (
                  <Link key={relatedProject.slug} href={`/projects/${relatedProject.slug}`}>
                    <Card variant="elevated" hoverable>
                      <div className="p-4">
                        <h3 className="font-bold mb-2">{relatedProject.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Projects */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <Link href="/projects">
              <Button variant="outline" size="lg">
                ← Back to All Projects
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const visibleProjects = getVisibleItems(projects);

  return visibleProjects
    .filter((project) => project.slug)
    .map((project) => ({
      slug: project.slug as string,
    }));
}
