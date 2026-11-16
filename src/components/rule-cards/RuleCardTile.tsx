import React from 'react';
import { Check } from 'lucide-react';
import { Language } from '@/types/game';
import { RuleCardItem } from '@/types/rules';
import { TRANSLATIONS } from '@/data/translations';

interface RuleCardTileProps {
  card: RuleCardItem;
  isActive: boolean;
  isSelected: boolean;
  onInspect: () => void;
  onToggleActive: () => void;
  language: Language;
}

/** One rule card in the grid of all rule cards. */
export const RuleCardTile: React.FC<RuleCardTileProps> = ({
  card,
  isActive,
  isSelected,
  onInspect,
  onToggleActive,
  language,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}
      onClick={onInspect}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onInspect();
        }
      }}
      className={`card card-interactive flex cursor-pointer flex-col justify-between p-4 text-left ${
        isActive
          ? 'border-emerald-500/60 ring-1 ring-emerald-500/30 dark:border-emerald-400/50'
          : isSelected
            ? 'border-purple-500/60 ring-1 ring-purple-500/30 dark:border-purple-400/50'
            : ''
      }`}
    >
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
            {card.name[language]}
          </h4>
          {isActive && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-3 w-3 stroke-3" />
            </span>
          )}
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
          {card.description[language]}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-neutral-200/70 pt-3 dark:border-white/[0.06]">
        <span className="text-xs text-neutral-400">
          {isSelected ? t.rulecards.selected : t.rulecards.clickToInspect}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleActive();
          }}
          className={`btn btn-sm ${isActive ? 'btn-ghost' : 'btn-magic-soft'}`}
        >
          {isActive ? t.rulecards.deactivateCard : t.rulecards.activateCard}
        </button>
      </div>
    </div>
  );
};
