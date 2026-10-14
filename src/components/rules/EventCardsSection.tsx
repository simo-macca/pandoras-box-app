import React from 'react';
import { Flame } from 'lucide-react';
import { EventItem } from '../../types/rules';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';

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
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
        <Flame className="h-4 w-4 text-rose-500 dark:text-rose-400" />
        <span>{t.rules.events}</span>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          ({events.length})
        </span>
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                {ev.name[language] || ev.name.en}
              </h4>
              <span className="shrink-0 rounded-full border border-rose-500/30 bg-rose-500/15 px-2 py-0.5 text-[10px] font-black tracking-wider text-rose-600 uppercase dark:text-rose-400">
                {ev.severity}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              {ev.description[language] || ev.description.en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
