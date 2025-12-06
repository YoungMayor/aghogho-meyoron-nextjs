'use client';

import { profile } from '@/lib/data/profile';
import { technicalSkills } from '@/lib/data/skills';
import { getRandomQuote } from '@/lib/data/quotes';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import Typewriter from '@/components/ui/Typewriter';
import { getVisibleAndSorted } from '@/lib/utils/data';
import { useState } from 'react';

export default function About() {
  const sortedTechnicalSkills = getVisibleAndSorted(technicalSkills, 'asc');
  // Get a random quote once using lazy initialization
  const [quote] = useState(() => getRandomQuote());

  return (
    <section className="w-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader title="Get to Know Me" />

        {/* Biography and Quote */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Biography */}
          <Card variant="bordered" padding="lg">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: profile.biography }}
            />
          </Card>

          {/* Quote with Typewriter */}
          <Card variant="elevated" padding="lg">
            {quote.text && <Typewriter text={quote.text} author={quote.author} />}
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
      </div>
    </section>
  );
}
