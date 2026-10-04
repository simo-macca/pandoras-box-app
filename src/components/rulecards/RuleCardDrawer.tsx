import React, { useState } from 'react';
import { Sparkles, Shuffle, Check, CheckCircle2, X } from 'lucide-react';
import { Language } from '../../types/game';
import { TRANSLATIONS } from '../../data/translations';
import { RULE_CARDS_DATA } from '../../data/ruleCardsData';
import { soundEffects } from '../../utils/sound';

interface RuleCardDrawerProps {
  activeRuleCardIds: string[];
  onSelectActiveRuleCard: (id: string | null) => void;
  language: Language;
}

export const RuleCardDrawer: React.FC<RuleCardDrawerProps> = ({
  activeRuleCardIds,
  onSelectActiveRuleCard,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    activeRuleCardIds[0] || null
  );
  const [isRolling, setIsRolling] = useState(false);

  const activeCard =
    RULE_CARDS_DATA.find((c) => c.id === selectedCardId) || null;

  const handleDrawRandom = () => {
    if (isRolling) return;
    setIsRolling(true);
    soundEffects.playDiceRoll();

    let rollCount = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * RULE_CARDS_DATA.length);
      setSelectedCardId(RULE_CARDS_DATA[randomIndex].id);
      rollCount++;

      if (rollCount >= 10) {
        clearInterval(interval);
        setIsRolling(false);
        soundEffects.playDiceFinish(false);
      }
    }, 80);
  };

  const handleToggleActive = (cardId: string) => {
    soundEffects.playClick();
    if (activeRuleCardIds.includes(cardId)) {
      onSelectActiveRuleCard(null);
    } else {
      onSelectActiveRuleCard(cardId);
      setSelectedCardId(cardId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Drawer Action Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-purple-900/20 p-6 text-center shadow-xl">
        <div className="relative z-10 mx-auto max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/20 px-3 py-1 text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.rulecards.expansionTag}</span>
          </div>

          <h2 className="text-2xl font-black text-neutral-900 dark:text-white sm:text-3xl">
            {t.rulecards.title}
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 sm:text-sm">
            {t.rulecards.subtitle}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleDrawRandom}
              disabled={isRolling}
              className={`inline-flex transform items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:from-purple-500 hover:to-indigo-500 active:scale-95 ${
                isRolling ? 'animate-pulse opacity-80' : ''
              }`}
            >
              <Shuffle
                className={`h-4 w-4 ${isRolling ? 'animate-spin' : ''}`}
              />
              <span>{t.rulecards.drawRandom}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured / Active Card Card */}
      {activeCard && (
        <div className="animate-fade-in rounded-3xl border-2 border-purple-500/60 bg-white p-5 shadow-lg transition-all dark:bg-neutral-900">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {t.rulecards.drawnCard}
                </span>
                {activeRuleCardIds.includes(activeCard.id) && (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3 w-3 stroke-[3]" />
                    <span>{t.rulecards.activeForRound}</span>
                  </span>
                )}
              </div>
              <h3 className="mt-1 text-xl font-black text-neutral-900 dark:text-white">
                {activeCard.name[language]}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => handleToggleActive(activeCard.id)}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold transition-all ${
                activeRuleCardIds.includes(activeCard.id)
                  ? 'bg-neutral-200 text-neutral-800 hover:bg-red-500/10 hover:text-red-500 dark:bg-neutral-800 dark:text-neutral-200'
                  : 'bg-emerald-600 text-white shadow-md hover:bg-emerald-500'
              }`}
            >
              {activeRuleCardIds.includes(activeCard.id) ? (
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

          <p className="mt-3 text-sm font-medium leading-relaxed text-neutral-700 dark:text-neutral-300">
            {activeCard.description[language]}
          </p>

          {activeCard.flavor && activeCard.flavor[language] && (
            <div className="mt-3 border-l-2 border-purple-500/40 pl-3 text-xs italic text-neutral-500 dark:text-neutral-400">
              "{activeCard.flavor[language]}"
            </div>
          )}
        </div>
      )}

      {/* Grid of all 15 Rule Cards */}
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {t.rulecards.allRuleCards} (15)
        </h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {RULE_CARDS_DATA.map((card) => {
            const isActive = activeRuleCardIds.includes(card.id);
            const isSelected = selectedCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCardId(card.id);
                }}
                className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
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
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {card.description[language]}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-neutral-200/60 pt-2 dark:border-neutral-700/60">
                  <span className="text-[10px] text-neutral-400">
                    {isSelected ? 'Selected' : 'Click to inspect'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleActive(card.id);
                    }}
                    className={`rounded-lg px-2 py-0.5 text-[11px] font-bold transition-colors ${
                      isActive
                        ? 'text-red-500 hover:bg-red-500/10'
                        : 'text-purple-600 hover:bg-purple-500/10 dark:text-purple-400'
                    }`}
                  >
                    {isActive
                      ? t.rulecards.deactivateCard
                      : t.rulecards.activateCard}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
