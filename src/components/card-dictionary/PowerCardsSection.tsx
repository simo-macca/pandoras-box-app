import React from 'react';
import { Zap } from 'lucide-react';
import { PowerCardItem } from '@/types/rules';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { DictionarySectionHeader } from './DictionarySectionHeader';
import { ExpandableText } from '@/components/common/ExpandableText';

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
    <section className="space-y-4">
      <DictionarySectionHeader
        icon={<Zap className="h-4 w-4" />}
        iconClassName="bg-cyan-500/15 text-cyan-700 dark:text-cyan-400"
        title={t.rules.powerCards}
        count={powerCards.length}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {powerCards.map((pc) => (
          <div
            key={pc.id}
            className="card card-interactive flex flex-col p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                {pc.name[language] || pc.name.en}
              </h4>
              <span className="badge shrink-0 bg-cyan-500/15 text-xs text-cyan-700 normal-case tabular-nums dark:text-cyan-300">
                0 {t.rules.pts}
              </span>
            </div>
            <ExpandableText
              className="mt-2"
              text={pc.description[language] || pc.description.en}
              language={language}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
