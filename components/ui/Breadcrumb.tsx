import React from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string; // Optional className prop for custom styling
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-gray-400">/</span>}
          {item.href && !item.active ? (
            <Link
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={
                item.active ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'
              }
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
