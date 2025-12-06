import { profile } from '@/lib/data/profile';
import { technicalSkills } from '@/lib/data/skills';
import Card from '@/components/ui/Card';
import { getVisibleAndSorted } from '@/lib/utils/data';

export default function About() {
  const sortedTechnicalSkills = getVisibleAndSorted(technicalSkills, 'asc');

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Get to Know Me</h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 dark:from-gray-600 dark:via-gray-400 dark:to-gray-600"></div>
        </div>

        {/* Biography */}
        <div className="mb-20">
          <Card variant="bordered" padding="lg">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: profile.biography }}
            />
          </Card>
        </div>

        {/* Expertise & Skills */}
        <div>
          <h3 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Technical Expertise
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedTechnicalSkills.map((skill) => (
              <Card key={skill.name} variant="bordered" padding="lg" hoverable>
                {/* Skill Category Name */}
                <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  {skill.name}
                </h4>

                {/* Technologies Grid */}
                <div className="flex flex-wrap gap-3">
                  {skill.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center gap-2 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 px-3 py-2 transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 dark:from-gray-800 dark:to-gray-900 dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                      title={tech.name}
                    >
                      {/* Icon placeholder - will be replaced with DevIcons */}
                      <div className="h-5 w-5 rounded bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Persona Note */}
        {profile.notes.persona && (
          <div className="mt-20">
            <Card variant="elevated" padding="lg">
              <blockquote className="text-center">
                <p className="text-xl italic text-gray-700 dark:text-gray-300">
                  &ldquo;{profile.notes.persona}&rdquo;
                </p>
              </blockquote>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
