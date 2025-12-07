'use client';

import { articles } from '@/lib/data/articles';
import { getVisibleItems, sortByPriority } from '@/lib/utils/data';
import ArticleCard from '@/components/features/ArticleCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function Articles() {
  // Get top 3 priority articles
  const visibleArticles = sortByPriority(getVisibleItems(articles)).slice(0, 3);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Latest Articles"
          subtitle="Thoughts, insights, and learnings from my journey in tech"
        />

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article, index) => (
            <ArticleCard key={`${article.title}-${index}`} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
