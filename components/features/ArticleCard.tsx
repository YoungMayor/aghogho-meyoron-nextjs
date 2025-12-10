'use client';

import Image from 'next/image';
import { Article } from '@/lib/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card variant="elevated" hoverable>
      <div className="flex flex-col h-full">
        {/* Article Cover */}
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl overflow-hidden">
          <Image
            src={article.cover_url}
            alt={article.title}
            fill
            className="object-cover"
            unoptimized
          />

          {/* Platform Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full capitalize">
              {article.platform}
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{article.title}</h3>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
            {article.summary}
          </p>

          {/* Action */}
          <a href={article.link} target="_blank" rel="noopener noreferrer" className="block">
            <Button variant="outline" size="sm" fullWidth>
              Read Article
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}
