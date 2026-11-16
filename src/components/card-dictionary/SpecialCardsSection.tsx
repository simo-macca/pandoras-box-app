import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { CardItem } from '@/types/rules';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { DictionarySectionHeader } from './DictionarySectionHeader';

interface SpecialCardsSectionProps {
  cards: CardItem[];
  language: Language;
}

export const SpecialCardsSection: React.FC<SpecialCardsSectionProps> = ({
  cards,
  language,
}) => {
  const t = TRANSLATIONS[language];
  if (cards.length === 0) return null;

  return (
    <section className="space-y-4">
      <DictionarySectionHeader
        icon={<Sparkles className="h-4 w-4" />}
        iconClassName="bg-amber-500/15 text-amber-600 dark:text-amber-400"
        title={t.rules.specials}
        count={cards.length}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card card-interactive flex flex-col p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                {card.name[language] || card.name.en}
              </h4>
              <span className="badge shrink-0 bg-amber-500/15 text-xs text-amber-700 normal-case tabular-nums dark:text-amber-300">
                {card.points} {t.rules.pts}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {card.description[language] || card.description.en}
            </p>
            {card.tip && (
              <div className="mt-auto pt-3">
                <div className="callout callout-warning flex items-start gap-2 px-3 py-2 text-xs">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{card.tip[language] || card.tip.en}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
