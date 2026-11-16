import React from 'react';
import { Layers, X, Shuffle } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { RULE_CARDS_DATA } from '@/data/ruleCards';
import { soundEffects } from '@/utils/sound';

interface ActiveRuleCardBannerProps {
  activeRuleCardIds: string[];
  onClearActive: () => void;
  onOpenDrawer: () => void;
  language: Language;
}

export const ActiveRuleCardBanner: React.FC<ActiveRuleCardBannerProps> = ({
  activeRuleCardIds,
  onClearActive,
  onOpenDrawer,
  language,
}) => {
  const t = TRANSLATIONS[language];

  const openDrawer = () => {
    soundEffects.playClick();
    onOpenDrawer();
  };

  if (!activeRuleCardIds || activeRuleCardIds.length === 0) {
    return (
      <div className="card flex items-center justify-between gap-3 p-3 pl-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="icon-tile h-9 w-9 bg-purple-500/15 text-purple-600 dark:text-purple-300">
            <Layers className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-neutral-900 dark:text-white">
              {t.scoreboard.activeRuleCard}
            </div>
            <div className="truncate text-xs text-neutral-500 dark:text-neutral-400">
              {t.scoreboard.noActiveRuleCard}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openDrawer}
          className="btn btn-magic-soft btn-sm"
        >
          <Shuffle className="h-3.5 w-3.5" />
          <span>{t.scoreboard.drawRuleCard}</span>
        </button>
      </div>
    );
  }

  // Several rule cards can be active in the same round (rulebook p. 21).
  const activeCards = RULE_CARDS_DATA.filter((c) =>
    activeRuleCardIds.includes(c.id)
  );
  if (activeCards.length === 0) return null;

  return (
    <div className="card relative overflow-hidden border-purple-500/40 p-4 sm:p-5 dark:border-purple-400/30">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-500/[0.08] via-transparent to-transparent"
      />
      <div className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="icon-tile h-9 w-9 bg-purple-600 text-white">
            <Layers className="h-4 w-4" />
          </div>
          <span className="eyebrow text-purple-700 dark:text-purple-300">
            {t.rulecards.activeForRound} · {activeCards.length}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={openDrawer}
            className="btn btn-ghost btn-sm"
          >
            {t.scoreboard.drawRuleCard}
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playWarning();
              onClearActive();
            }}
            className="btn-icon btn-icon-sm"
            title={t.rulecards.clearAll}
            aria-label={t.rulecards.clearAll}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul className="relative mt-3 grid gap-3 sm:grid-cols-2">
        {activeCards.map((card) => (
          <li key={card.id} className="card-tile p-3">
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
              {card.name[language]}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {card.description[language]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
