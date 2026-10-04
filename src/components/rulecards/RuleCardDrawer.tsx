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

  const activeCard = RULE_CARDS_DATA.find(c => c.id === selectedCardId) || null;

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
      <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-purple-900/20 border-2 border-purple-500/40 shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-600 dark:text-purple-300 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.rulecards.expansionTag}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
            {t.rulecards.title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
            {t.rulecards.subtitle}
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleDrawRandom}
              disabled={isRolling}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all transform active:scale-95 ${
                isRolling ? 'animate-pulse opacity-80' : ''
              }`}
            >
              <Shuffle className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
              <span>{t.rulecards.drawRandom}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured / Active Card Card */}
      {activeCard && (
        <div className="p-5 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-purple-500/60 shadow-lg transition-all animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  {t.rulecards.drawnCard}
                </span>
                {activeRuleCardIds.includes(activeCard.id) && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>{t.rulecards.activeForRound}</span>
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-neutral-900 dark:text-white mt-1">
                {activeCard.name[language]}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => handleToggleActive(activeCard.id)}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                activeRuleCardIds.includes(activeCard.id)
                  ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-red-500/10 hover:text-red-500'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
              }`}
            >
              {activeRuleCardIds.includes(activeCard.id) ? (
                <>
                  <X className="w-4 h-4" />
                  <span>{t.rulecards.deactivateCard}</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.rulecards.activateCard}</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
            {activeCard.description[language]}
          </p>

          {activeCard.flavor && activeCard.flavor[language] && (
            <div className="mt-3 text-xs italic text-neutral-500 dark:text-neutral-400 border-l-2 border-purple-500/40 pl-3">
              "{activeCard.flavor[language]}"
            </div>
          )}
        </div>
      )}

      {/* Grid of all 15 Rule Cards */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
          {t.rulecards.allRuleCards} (15)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {RULE_CARDS_DATA.map(card => {
            const isActive = activeRuleCardIds.includes(card.id);
            const isSelected = selectedCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCardId(card.id);
                }}
                className={`cursor-pointer p-4 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                  isActive
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-md ring-1 ring-emerald-500/50'
                    : isSelected
                    ? 'border-purple-500 bg-purple-500/10 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-extrabold text-neutral-900 dark:text-white">
                      {card.name[language]}
                    </h4>
                    {isActive && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
                    {card.description[language]}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">
                    {isSelected ? 'Selected' : 'Click to inspect'}
                  </span>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handleToggleActive(card.id);
                    }}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-lg transition-colors ${
                      isActive
                        ? 'text-red-500 hover:bg-red-500/10'
                        : 'text-purple-600 dark:text-purple-400 hover:bg-purple-500/10'
                    }`}
                  >
                    {isActive ? t.rulecards.deactivateCard : t.rulecards.activateCard}
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
