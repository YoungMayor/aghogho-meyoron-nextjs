'use client';

import { useState, type ReactNode } from 'react';

interface AccordionProps {
  items: {
    id: string;
    title: string;
    badge?: number;
    content: ReactNode;
    defaultOpen?: boolean;
  }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    items.forEach((item) => {
      if (item.defaultOpen) initial.add(item.id);
    });
    return initial;
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div
            key={item.id}
            className="border border-border rounded-xl bg-card overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold">{item.title}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full min-w-6">
                    {item.badge}
                  </span>
                )}
              </div>
              <div
                className={`text-muted-foreground transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 pt-0 text-card-foreground">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
