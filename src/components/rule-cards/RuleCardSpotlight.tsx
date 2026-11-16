import React from 'react';
import { Check, CheckCircle2, X } from 'lucide-react';
import { Language } from '@/types/game';
import { RuleCardItem } from '@/types/rules';
import { TRANSLATIONS } from '@/data/translations';

interface RuleCardSpotlightProps {
  card: RuleCardItem;
  isActive: boolean;
  /** While the deck is shuffling the card is not final and cannot be activated. */
  isShuffling?: boolean;
  onToggleActive: () => void;
  language: Language;
}

/** Large view of the drawn or inspected rule card. */
export const RuleCardSpotlight: React.FC<RuleCardSpotlightProps> = ({
  card,
  isActive,
  isShuffling = false,
  onToggleActive,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div
      className={`card animate-fade-in ${isShuffling ? 'opacity-70' : ''} border-purple-500/50 p-5 ring-1 ring-purple-500/20 sm:p-6 dark:border-purple-400/40`}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="eyebrow text-purple-700 dark:text-purple-300">
              {t.rulecards.drawnCard}
            </span>
            {isActive && (
              <span className="badge bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                <Check className="h-3 w-3 stroke-3" />
                <span>{t.rulecards.activeForRound}</span>
              </span>
            )}
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl dark:text-white">
            {card.name[language]}
          </h3>
        </div>

        <button
          type="button"
          onClick={onToggleActive}
          disabled={isShuffling}
          aria-busy={isShuffling}
          className={`btn ${isActive ? 'btn-secondary' : 'btn-magic'}`}
        >
          {isActive ? (
            <>
              <X className="h-4 w-4" />
              <span>{t.rulecards.deactivateCard}</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              <span>{t.rulecards.activateCard}</span>
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300">
        {card.description[language]}
      </p>

      {card.flavor?.[language] && (
        <div className="mt-4 border-l-2 border-purple-500/40 pl-3 text-sm text-neutral-500 italic dark:text-neutral-400">
          "{card.flavor[language]}"
        </div>
      )}
    </div>
  );
};
