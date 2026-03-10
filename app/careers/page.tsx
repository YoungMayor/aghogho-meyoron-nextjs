import { Metadata } from 'next';
import { careerItems } from '@/lib/data/career_history';
import CareerTimelineItem from '@/components/features/CareerTimelineItem';
import SectionHeader from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Career History | Aghogho Meyoron',
  description:
    'A timeline of my professional journey, roles, and technical achievements over the years.',
};

export default function CareersPage() {
  const visibleCareers = careerItems.filter((item) => item.show);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16">
      <main className="max-w-[1200px] mx-auto px-6">
        <SectionHeader
          title="Career Journey"
          subtitle="A detailed look at my professional roles, engineering challenges, and technical leadership across different companies."
        />

        <div className="mt-12 max-w-4xl mx-auto">
          {visibleCareers.map((item, index) => (
            <CareerTimelineItem
              key={`${item.company_name}-${index}`}
              item={item}
              isLast={index === visibleCareers.length - 1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
