import React from 'react';

interface GuideSectionProps {
  icon: React.ReactNode;
  /** Tailwind text colour class for the icon, e.g. `text-amber-500`. */
  accentClass: string;
  title: string;
  children: React.ReactNode;
}

/** Card-style section used by every block of the rules summary. */
export const GuideSection: React.FC<GuideSectionProps> = ({
  icon,
  accentClass,
  title,
  children,
}) => (
  <section className="card space-y-4 p-5 sm:p-6">
    <div className="flex items-center gap-3">
      <span
        className={`icon-tile h-9 w-9 bg-neutral-100 dark:bg-white/[0.06] ${accentClass}`}
      >
        {icon}
      </span>
      <h3 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
        {title}
      </h3>
    </div>
    {children}
  </section>
);
