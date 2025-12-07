'use client';

import { CareerItem } from '@/lib/types';

interface CareerTimelineItemProps {
  item: CareerItem;
  isLast?: boolean;
}

export default function CareerTimelineItem({ item, isLast = false }: CareerTimelineItemProps) {
  const startYear = new Date(item.start_date).getFullYear();
  const endYear = item.end_date ? new Date(item.end_date).getFullYear() : 'Present';
  const isCurrent = item.end_date === null;

  return (
    <div className="relative flex gap-8 group">
      {/* Timeline Line & Dot */}
      <div className="relative flex flex-col items-center">
        {/* Dot */}
        <div
          className={`w-4 h-4 rounded-full border-4 transition-all duration-300 ${
            isCurrent
              ? 'bg-black dark:bg-white border-black dark:border-white shadow-lg'
              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 group-hover:border-black dark:group-hover:border-white'
          }`}
        />

        {/* Vertical Line */}
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-[100px] bg-gradient-to-b from-gray-300 to-gray-200 dark:from-gray-700 dark:to-gray-800" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-12">
        {/* Year Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full mb-3">
          <span className="text-sm font-semibold">
            {startYear} - {endYear}
          </span>
          {isCurrent && <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
        </div>

        {/* Card */}
        <div className="p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-[1.01]">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-xl font-bold mb-1">{item.role}</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold">{item.company_name}</span>
              <span>•</span>
              <span>{item.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>

          {/* Duties */}
          {item.duties.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Key Responsibilities:
              </h4>
              <ul className="space-y-2">
                {item.duties.map((duty, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                    <span className="text-black dark:text-white mt-1">•</span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
