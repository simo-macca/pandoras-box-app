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
      className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-4 text-left transition-all focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:outline-none ${
        isActive
          ? 'border-emerald-500 bg-emerald-500/10 shadow-md ring-1 ring-emerald-500/50'
          : isSelected
            ? 'border-purple-500 bg-purple-500/10 shadow-sm'
            : 'border-neutral-200 bg-neutral-50 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800/40 dark:hover:border-neutral-700'
      }`}
    >
      <div>
        <div className="mb-1 flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">
            {card.name[language]}
          </h4>
          {isActive && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-3 w-3 stroke-3" />
            </span>
          )}
        </div>
        <p className="line-clamp-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
          {card.description[language]}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-neutral-200/60 pt-2 dark:border-neutral-700/60">
        <span className="text-[10px] text-neutral-400">
          {isSelected ? t.rulecards.selected : t.rulecards.clickToInspect}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleActive();
          }}
          className={`rounded-lg px-2 py-0.5 text-[11px] font-bold transition-colors ${
            isActive
              ? 'text-red-500 hover:bg-red-500/10'
              : 'text-purple-600 hover:bg-purple-500/10 dark:text-purple-400'
          }`}
        >
          {isActive ? t.rulecards.deactivateCard : t.rulecards.activateCard}
        </button>
      </div>
    </div>
  );
};
