import React from 'react';
import { Sparkles, X, Shuffle } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { RULE_CARDS_DATA } from '@/data/ruleCardsData';
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

  if (!activeRuleCardIds || activeRuleCardIds.length === 0) {
    return (
      <div className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-linear-to-r from-purple-500/10 via-amber-500/10 to-rose-500/10 p-3.5 dark:border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              {t.scoreboard.activeRuleCard}
            </div>
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
              {t.scoreboard.noActiveRuleCard}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            soundEffects.playClick();
            onOpenDrawer();
          }}
          className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-purple-500 active:scale-95"
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
    <div className="rounded-3xl border-2 border-purple-500/40 bg-linear-to-r from-purple-100/70 via-indigo-50/70 to-purple-100/70 p-4 shadow-sm dark:border-purple-500/50 dark:from-purple-900/30 dark:via-indigo-900/20 dark:to-purple-900/30 dark:shadow-[0_0_25px_rgba(168,85,247,0.2)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 text-[10px] font-extrabold tracking-wider text-purple-600 uppercase dark:text-purple-300">
            {t.rulecards.activeForRound} ({activeCards.length})
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              soundEffects.playClick();
              onOpenDrawer();
            }}
            className="rounded-xl bg-neutral-200/80 px-2.5 py-1 text-xs font-bold text-neutral-700 transition-colors hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:text-white"
          >
            {t.scoreboard.drawRuleCard}
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playWarning();
              onClearActive();
            }}
            className="rounded-lg p-1 text-neutral-400 transition-colors hover:text-red-500"
            title={t.rulecards.clearAll}
            aria-label={t.rulecards.clearAll}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {activeCards.map((card) => (
          <li key={card.id}>
            <h3 className="text-base font-black text-neutral-900 dark:text-white">
              {card.name[language]}
            </h3>
            <p className="text-xs leading-relaxed font-medium text-neutral-700 sm:text-sm dark:text-neutral-300">
              {card.description[language]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
