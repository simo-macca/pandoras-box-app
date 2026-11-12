import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shuffle, Loader2 } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { RULE_CARDS_DATA } from '@/data/ruleCardsData';
import { soundEffects } from '@/utils/sound';
import { RuleCardSpotlight } from './RuleCardSpotlight';
import { RuleCardTile } from './RuleCardTile';

interface RuleCardDrawerProps {
  activeRuleCardIds: string[];
  /** Receives the complete list of rule cards active for the round. */
  onChangeActiveRuleCards: (ids: string[]) => void;
  language: Language;
}

const SHUFFLE_STEPS = 10;
const SHUFFLE_INTERVAL_MS = 80;

/**
 * Pandora's Box rule cards (rulebook p. 21): before each round, one or more
 * rule cards are drawn and modify the rules for that round.
 */
export const RuleCardDrawer: React.FC<RuleCardDrawerProps> = ({
  activeRuleCardIds,
  onChangeActiveRuleCards,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    activeRuleCardIds[0] ?? null
  );
  const [isShuffling, setIsShuffling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Never leave the shuffle timer running after the tab is closed.
  useEffect(
    () => () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    },
    []
  );

  // Draw only from the cards that are still in the deck.
  const deck = RULE_CARDS_DATA.filter((c) => !activeRuleCardIds.includes(c.id));
  const selectedCard =
    RULE_CARDS_DATA.find((c) => c.id === selectedCardId) ?? null;

  const handleDrawRandom = () => {
    if (isShuffling || deck.length === 0) return;
    setIsShuffling(true);
    soundEffects.playShuffle();

    let steps = 0;
    intervalRef.current = setInterval(() => {
      const card = deck[Math.floor(Math.random() * deck.length)];
      setSelectedCardId(card.id);
      steps += 1;
      if (steps >= SHUFFLE_STEPS && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsShuffling(false);
        soundEffects.playChime(false);
      }
    }, SHUFFLE_INTERVAL_MS);
  };

  const handleToggleActive = (cardId: string) => {
    soundEffects.playClick();
    if (activeRuleCardIds.includes(cardId)) {
      onChangeActiveRuleCards(activeRuleCardIds.filter((id) => id !== cardId));
    } else {
      onChangeActiveRuleCards([...activeRuleCardIds, cardId]);
      setSelectedCardId(cardId);
    }
  };

  const handleInspect = (cardId: string) => {
    soundEffects.playClick();
    setSelectedCardId(cardId);
  };

  return (
    <div className="space-y-6">
      {/* Draw banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-purple-500/30 bg-linear-to-br from-purple-100/80 via-indigo-50/60 to-purple-50 p-6 text-center shadow-sm dark:border-purple-500/40 dark:from-purple-900/40 dark:via-indigo-900/30 dark:to-purple-900/20 dark:shadow-xl">
        <div className="relative z-10 mx-auto max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/20 px-3 py-1 text-xs font-black tracking-wider text-purple-600 uppercase dark:text-purple-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.rulecards.expansionTag}</span>
          </div>

          <h2 className="text-2xl font-black text-neutral-900 sm:text-3xl dark:text-white">
            {t.rulecards.title}
          </h2>
          <p className="text-xs text-neutral-600 sm:text-sm dark:text-neutral-300">
            {t.rulecards.subtitle}
          </p>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {t.rulecards.multipleHint}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleDrawRandom}
              disabled={isShuffling || deck.length === 0}
              className="inline-flex transform items-center gap-2 rounded-2xl bg-linear-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all hover:from-purple-500 hover:to-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isShuffling ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
              ) : (
                <Shuffle className="h-4 w-4 shrink-0" />
              )}
              <span>{t.rulecards.drawRandom}</span>
            </button>

            {activeRuleCardIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  onChangeActiveRuleCards([]);
                }}
                className="rounded-2xl px-4 py-3 text-xs font-bold text-neutral-600 transition-colors hover:bg-red-500/10 hover:text-red-500 dark:text-neutral-300"
              >
                {t.rulecards.clearAll} ({activeRuleCardIds.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedCard && (
        <RuleCardSpotlight
          card={selectedCard}
          isActive={activeRuleCardIds.includes(selectedCard.id)}
          onToggleActive={() => handleToggleActive(selectedCard.id)}
          language={language}
        />
      )}

      {/* All rule cards */}
      <div>
        <h3 className="mb-3 text-sm font-bold tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          {t.rulecards.allRuleCards} ({RULE_CARDS_DATA.length})
        </h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {RULE_CARDS_DATA.map((card) => (
            <RuleCardTile
              key={card.id}
              card={card}
              isActive={activeRuleCardIds.includes(card.id)}
              isSelected={selectedCardId === card.id}
              onInspect={() => handleInspect(card.id)}
              onToggleActive={() => handleToggleActive(card.id)}
              language={language}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
