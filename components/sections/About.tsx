'use client';

import { profile } from '@/lib/data/profile';
import { technicalSkills } from '@/lib/data/skills';
import { getRandomQuote } from '@/lib/data/quotes';
import Card from '@/components/ui/Card';
import SectionHeader from '@/components/ui/SectionHeader';
import Typewriter from '@/components/ui/Typewriter';
import Icon from '@/components/ui/Icon';
import { getVisibleAndSorted } from '@/lib/utils/data';
import { useState } from 'react';

export default function About() {
  const sortedTechnicalSkills = getVisibleAndSorted(technicalSkills, 'asc');
  // Get a random quote once using lazy initialization
  const [quote] = useState(() => getRandomQuote());

  return (
    <section className="w-full bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader title="Get to Know Me" />

        {/* Biography and Quote */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Biography */}
          <Card variant="default" padding="lg">
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: profile.biography }}
            />
          </Card>

          {/* Quote with Typewriter */}
          <Card variant="default" padding="lg">
            {quote.text && <Typewriter text={quote.text} author={quote.author} />}
          </Card>
        </div>

        {/* Expertise & Skills */}
        <div>
          <h3 className="mb-8 text-center text-3xl font-bold text-foreground">
            Technical Expertise
          </h3>

          <div className="grid grid-cols-1 gap-8">
            {sortedTechnicalSkills.map((skill) => (
              <Card key={skill.name} variant="default" padding="lg">
                {/* Skill Category Name */}
                <h4 className="mb-4 text-xl font-bold text-foreground text-center">{skill.name}</h4>

                {/* Technologies Grid */}
                <div className="flex flex-wrap justify-center gap-3">
                  {skill.icons.map((icon) => (
                    <div
                      key={`tech-skill-${skill.name}-icon-${icon.label}`}
                      className="group flex items-center gap-2 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] px-3 py-2 transition-all duration-200 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:scale-105 dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                      title={icon.label}
                    >
                      <Icon.fromIcon icon={icon} size={24} className="flex-shrink-0" />

                      <span className="text-sm font-medium text-muted-foreground">
                        {icon.label}
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
