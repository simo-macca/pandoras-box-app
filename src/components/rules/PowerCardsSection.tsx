import React from 'react';
import { Zap } from 'lucide-react';
import { PowerCardItem } from '../../types/rules';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';

interface PowerCardsSectionProps {
  powerCards: PowerCardItem[];
  language: Language;
}

export const PowerCardsSection: React.FC<PowerCardsSectionProps> = ({
  powerCards,
  language,
}) => {
  const t = TRANSLATIONS[language];
  if (powerCards.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
        <Zap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
        <span>{t.rules.powerCards}</span>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          ({powerCards.length})
        </span>
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {powerCards.map((pc) => (
          <div
            key={pc.id}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                {pc.name[language] || pc.name.en}
              </h4>
              <span className="shrink-0 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-2 py-0.5 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                0 {t.rules.pts}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              {pc.description[language] || pc.description.en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
