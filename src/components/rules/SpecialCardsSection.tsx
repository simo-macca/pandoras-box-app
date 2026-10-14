import React from 'react';
import { Sparkles, Lightbulb } from 'lucide-react';
import { CardItem } from '../../types/rules';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';

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
    <div className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
        <Sparkles className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        <span>{t.rules.specials}</span>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600">
          ({cards.length})
        </span>
      </h3>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:border-neutral-700"
          >
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-neutral-900 dark:text-white">
                {card.name[language] || card.name.en}
              </h4>
              <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 text-xs font-black text-amber-600 dark:text-amber-400">
                {card.points} {t.rules.pts}
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              {card.description[language] || card.description.en}
            </p>
            {card.tip && (
              <div className="mt-auto pt-3">
                <div className="flex items-start gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-2 text-[11px] text-amber-600 dark:text-amber-400/90">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>{card.tip[language] || card.tip.en}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
