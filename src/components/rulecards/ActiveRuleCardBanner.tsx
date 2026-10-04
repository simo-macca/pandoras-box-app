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
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-amber-500/10 to-rose-500/10 border border-purple-500/20 dark:border-purple-500/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Sparkles className="w-4 h-4" />
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>{t.scoreboard.drawRuleCard}</span>
        </button>
      </div>
    );
  }

  const activeCard = RULE_CARDS_DATA.find(c => c.id === activeRuleCardIds[0]);
  if (!activeCard) return null;

  return (
    <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-purple-900/30 border-2 border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.2)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                {t.rulecards.activeForRound}
              </span>
            </div>
            <h3 className="text-base font-black text-neutral-900 dark:text-white mt-0.5">
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
            className="px-2.5 py-1 rounded-xl bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white text-xs font-bold transition-colors"
          >
            {t.rulecards.drawnCard}
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playWarning();
              onClearActive();
            }}
            className="p-1 rounded-lg text-neutral-400 hover:text-red-500 transition-colors"
            title={t.rulecards.deactivateCard}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
        {activeCard.description[language]}
      </p>

      {activeCard.flavor && activeCard.flavor[language] && (
        <div className="mt-2 text-[11px] italic text-purple-600/80 dark:text-purple-300/80 border-l-2 border-purple-500/40 pl-2">
          "{activeCard.flavor[language]}"
        </div>
      )}
    </div>
  );
};
