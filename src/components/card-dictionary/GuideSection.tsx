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
  <section className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
    <div className={`flex items-center gap-2.5 ${accentClass}`}>
      {icon}
      <h3 className="text-base font-black tracking-wider text-neutral-900 uppercase sm:text-lg dark:text-white">
        {title}
      </h3>
    </div>
    {children}
  </section>
);
