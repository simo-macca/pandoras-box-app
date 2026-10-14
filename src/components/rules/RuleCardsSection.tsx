import React from 'react';
import { Layers } from 'lucide-react';
import { RuleCardItem } from '../../types/rules';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';

interface RuleCardsSectionProps {
  ruleCards: RuleCardItem[];
  language: Language;
}

export const RuleCardsSection: React.FC<RuleCardsSectionProps> = ({
  ruleCards,
  language,
}) => {
  const t = TRANSLATIONS[language];
  if (ruleCards.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
        <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
        <span>{t.rules.ruleCards}</span>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          ({ruleCards.length})
        </span>
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {ruleCards.map((rc) => (
          <div
            key={rc.id}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-purple-300 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-purple-500/30"
          >
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">
              {rc.name[language] || rc.name.en}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              {rc.description[language] || rc.description.en}
            </p>
            {rc.flavor && (
              <div className="mt-auto pt-3">
                <p className="border-l-2 border-purple-500/40 pl-2 text-[11px] text-purple-600/80 italic dark:text-purple-300/80">
                  &ldquo;{rc.flavor[language] || rc.flavor.en}&rdquo;
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
