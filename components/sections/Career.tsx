'use client';

import { careerItems } from '@/lib/data/career_history';
import { getVisibleItems, sortByDate } from '@/lib/utils/data';
import CareerTimelineItem from '@/components/features/CareerTimelineItem';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Career() {
  // Sort career items by date (most recent first)
  const visibleCareerItems = sortByDate(getVisibleItems(careerItems), 'start_date');

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-950">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Career Journey"
          subtitle="My professional experience and contributions over the years"
        />

        {/* Timeline */}
        <div className="mt-12">
          {visibleCareerItems.map((item, index) => (
            <CareerTimelineItem
              key={`${item.company_name}-${item.start_date}`}
              item={item}
              isLast={index === visibleCareerItems.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
