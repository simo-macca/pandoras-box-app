import React from 'react';
import { Check, CheckCircle2, X } from 'lucide-react';
import { Language } from '@/types/game';
import { RuleCardItem } from '@/types/rules';
import { TRANSLATIONS } from '@/data/translations';

interface RuleCardSpotlightProps {
  card: RuleCardItem;
  isActive: boolean;
  onToggleActive: () => void;
  language: Language;
}

/** Large view of the drawn or inspected rule card. */
export const RuleCardSpotlight: React.FC<RuleCardSpotlightProps> = ({
  card,
  isActive,
  onToggleActive,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="animate-fade-in rounded-3xl border-2 border-purple-500/60 bg-white p-5 shadow-lg transition-all dark:bg-neutral-900">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
              {t.rulecards.drawnCard}
            </span>
            {isActive && (
              <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                <Check className="h-3 w-3 stroke-3" />
                <span>{t.rulecards.activeForRound}</span>
              </span>
            )}
          </div>
          <h3 className="mt-1 text-xl font-black text-neutral-900 dark:text-white">
            {card.name[language]}
          </h3>
        </div>

        <button
          type="button"
          onClick={onToggleActive}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
            isActive
              ? 'bg-neutral-200 text-neutral-800 hover:bg-red-500/10 hover:text-red-500 dark:bg-neutral-800 dark:text-neutral-200'
              : 'bg-emerald-600 text-white shadow-md hover:bg-emerald-500'
          }`}
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

      <p className="mt-3 text-sm leading-relaxed font-medium text-neutral-700 dark:text-neutral-300">
        {card.description[language]}
      </p>

      {card.flavor?.[language] && (
        <div className="mt-3 border-l-2 border-purple-500/40 pl-3 text-xs text-neutral-500 italic dark:text-neutral-400">
          "{card.flavor[language]}"
        </div>
      )}
    </div>
  );
};
