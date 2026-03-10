import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { careerItems } from '@/lib/data/career_history';
import { getMarkdownBySlug } from '@/lib/utils/markdown';
import MarkdownRenderer from '@/components/ui/MarkdownRenderer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { profile } from '@/lib/data/profile';

interface CareerDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return careerItems
    .filter((item) => item.slug)
    .map((item) => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({ params }: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = careerItems.find((c) => c.slug === slug);

  if (!career) {
    return {
      title: 'Career Not Found',
    };
  }

  return {
    title: `${career.role} at ${career.company_name}`,
    description: career.description,
    keywords: [career.company_name, career.role, 'Career History', profile.name],
  };
}

export default async function CareerDetailPage({ params }: CareerDetailPageProps) {
  const { slug } = await params;
  const careerIndex = careerItems.findIndex((c) => c.slug === slug);

  if (careerIndex === -1) {
    notFound();
  }

  const career = careerItems[careerIndex];

  // Get prev and next based on array index (chronological or reverse order depending on array structure)
  const prevCareer = careerIndex < careerItems.length - 1 ? careerItems[careerIndex + 1] : null;
  const nextCareer = careerIndex > 0 ? careerItems[careerIndex - 1] : null;

  const startYear = new Date(career.start_date).getFullYear();
  const endYear = career.end_date ? new Date(career.end_date).getFullYear() : 'Present';

  // Fetch markdown content
  const markdown = getMarkdownBySlug('lib/data/content/career', slug);

  return (
    <main className="flex-1 min-h-screen pb-16">
      {/* Breadcrumb */}
      <section className="pt-24 pb-6 px-4 border-b border-border bg-background">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Careers', href: '/careers' },
              { label: career.company_name, active: true },
            ]}
          />
        </div>
      </section>

      {/* Hero Header */}
      <section className="py-12 px-4 bg-linear-to-b from-secondary/50 to-background border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-4">
            <span className="text-sm font-semibold tracking-wide">
              {startYear} — {endYear}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{career.role}</h1>
          <div className="flex flex-wrap items-center gap-2 text-lg text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">{career.company_name}</span>
            <span>•</span>
            <span>{career.location}</span>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {career.description}
          </p>
        </div>
      </section>

      {/* Content Body */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {markdown && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <MarkdownRenderer content={markdown.content} />
            </div>
          )}

          {/* Key Responsibilities */}
          {career.duties && career.duties.length > 0 && (
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6">Key Responsibilities & Impact</h2>
              <ul className="space-y-4">
                {career.duties.map((duty, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <div className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary" />
                    <p className="text-muted-foreground text-lg leading-relaxed">{duty}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Roles & Technologies */}
          {career.roles && career.roles.length > 0 && (
            <div className="mt-12 bg-card p-8 rounded-2xl shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6">Roles & Technologies</h2>
              <div className="space-y-8">
                {career.roles.map((roleObj, i) => (
                  <div key={i}>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">{roleObj.role}</h3>
                    <div className="flex flex-wrap gap-3">
                      {roleObj.technologies.map((tech, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg border border-border"
                        >
                          <Icon.fromIcon icon={tech} className="w-5 h-5 shrink-0" />
                          <span className="text-sm font-medium">{tech.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Footer */}
      <section className="py-12 px-4 border-t border-border bg-secondary/20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="w-full md:w-1/3 flex justify-start">
            {prevCareer && prevCareer.show && (
              <Link href={`/careers/${prevCareer.slug}`} className="w-full md:w-auto">
                <Button variant="outline" className="w-full justify-start h-auto py-3 px-4">
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      Previous Role
                    </span>
                    <span className="text-sm font-bold truncate max-w-[200px]">
                      {prevCareer.role}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium truncate max-w-[200px]">
                      {prevCareer.company_name} ({prevCareer.location})
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {new Date(prevCareer.start_date).getFullYear()} -{' '}
                      {prevCareer.end_date
                        ? new Date(prevCareer.end_date).getFullYear()
                        : 'Present'}
                    </span>
                  </div>
                </Button>
              </Link>
            )}
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <Link href="/careers">
              <Button variant="ghost" className="font-medium">
                All Careers
              </Button>
            </Link>
          </div>

          <div className="w-full md:w-1/3 flex justify-end">
            {nextCareer && nextCareer.show && (
              <Link href={`/careers/${nextCareer.slug}`} className="w-full md:w-auto">
                <Button
                  variant="outline"
                  className="w-full justify-end text-right h-auto py-3 px-4"
                >
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                      Next Role
                    </span>
                    <span className="text-sm font-bold truncate max-w-[200px]">
                      {nextCareer.role}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium truncate max-w-[200px]">
                      {nextCareer.company_name} ({nextCareer.location})
                    </span>
                    <span className="text-xs text-muted-foreground mt-0.5">
                      {new Date(nextCareer.start_date).getFullYear()} -{' '}
                      {nextCareer.end_date
                        ? new Date(nextCareer.end_date).getFullYear()
                        : 'Present'}
                    </span>
                  </div>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
