import React from 'react';
import { Flame } from 'lucide-react';
import { EventItem } from '@/types/rules';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { DictionarySectionHeader } from './DictionarySectionHeader';

interface EventCardsSectionProps {
  events: EventItem[];
  language: Language;
}

export const EventCardsSection: React.FC<EventCardsSectionProps> = ({
  events,
  language,
}) => {
  const t = TRANSLATIONS[language];
  if (events.length === 0) return null;

  return (
    <section className="space-y-4">
      <DictionarySectionHeader
        icon={<Flame className="h-4 w-4" />}
        iconClassName="bg-rose-500/15 text-rose-600 dark:text-rose-400"
        title={t.rules.events}
        count={events.length}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="card card-interactive flex flex-col p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                {ev.name[language] || ev.name.en}
              </h4>
              <div className="flex shrink-0 items-center gap-1.5">
                {ev.scope && (
                  <span
                    className={`badge ${
                      ev.scope === 'global'
                        ? 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {ev.scope === 'global'
                      ? t.rules.scopeGlobal
                      : t.rules.scopeTargeted}
                  </span>
                )}
                <span className="badge shrink-0 bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  {ev.severity}
                </span>
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {ev.description[language] || ev.description.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
