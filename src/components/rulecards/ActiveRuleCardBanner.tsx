import React from 'react';
import { Sparkles, X, Shuffle } from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { RULE_CARDS_DATA } from '../../data/ruleCardsData';
import { soundEffects } from '../../utils/sound';

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
      <div className="flex items-center justify-between rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/10 via-amber-500/10 to-rose-500/10 p-3.5 dark:border-purple-500/30">
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

  const activeCard = RULE_CARDS_DATA.find((c) => c.id === activeRuleCardIds[0]);
  if (!activeCard) return null;

  return (
    <div className="rounded-3xl border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-900/30 p-4 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-purple-500/30 bg-purple-500/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-300">
                {t.rulecards.activeForRound}
              </span>
            </div>
            <h3 className="mt-0.5 text-base font-black text-neutral-900 dark:text-white">
              {activeCard.name[language]}
            </h3>
          </div>
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
            {t.rulecards.drawnCard}
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playWarning();
              onClearActive();
            }}
            className="rounded-lg p-1 text-neutral-400 transition-colors hover:text-red-500"
            title={t.rulecards.deactivateCard}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs font-medium leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-sm">
        {activeCard.description[language]}
      </p>

      {activeCard.flavor && activeCard.flavor[language] && (
        <div className="mt-2 border-l-2 border-purple-500/40 pl-2 text-[11px] italic text-purple-600/80 dark:text-purple-300/80">
          "{activeCard.flavor[language]}"
        </div>
      )}
    </div>
  );
};
