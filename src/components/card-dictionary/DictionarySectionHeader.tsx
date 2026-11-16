import React from 'react';

interface DictionarySectionHeaderProps {
  icon: React.ReactNode;
  /** Tailwind classes for the icon tile (background + text colour). */
  iconClassName: string;
  title: string;
  count: number;
}

/** Heading shared by the card dictionary sections. */
export const DictionarySectionHeader: React.FC<
  DictionarySectionHeaderProps
> = ({ icon, iconClassName, title, count }) => (
  <h3 className="flex items-center gap-3">
    <span className={`icon-tile h-8 w-8 rounded-lg ${iconClassName}`}>
      {icon}
    </span>
    <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
      {title}
    </span>
    <span className="chip px-2 py-0.5 tabular-nums">{count}</span>
  </h3>
);
