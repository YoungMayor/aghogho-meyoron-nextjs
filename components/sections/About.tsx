import { profile } from '@/lib/data/profile';
import { skills as allSkills } from '@/lib/data/skills';
import { getVisibleAndSorted } from '@/lib/utils/data';
import Card from '@/components/ui/Card';

export default function About() {
  const technicalSkills = getVisibleAndSorted(allSkills.filter((s) => s.type === 'tech'));

  return (
    <section className="w-full bg-white py-20 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Get to Know Me</h2>
          <div className="mx-auto h-1 w-24 rounded bg-black dark:bg-white"></div>
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
            {technicalSkills.map((skill) => (
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
                      className="group flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                      title={tech.name}
                    >
                      {/* Icon placeholder - will be replaced with DevIcons */}
                      <div className="h-5 w-5 rounded bg-gray-300 dark:bg-gray-600" />
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
