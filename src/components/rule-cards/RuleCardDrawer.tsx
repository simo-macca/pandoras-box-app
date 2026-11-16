import React, { useEffect, useRef, useState } from 'react';
import { Layers, Shuffle, Loader2 } from 'lucide-react';
import { Language } from '@/types/game';
import { TRANSLATIONS } from '@/data/translations';
import { RULE_CARDS_DATA } from '@/data/ruleCards';
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
    <div className="space-y-8">
      {/* Draw banner */}
      <section className="card relative overflow-hidden px-5 py-8 text-center sm:px-8 sm:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-32 mx-auto h-64 w-[36rem] max-w-full rounded-full bg-purple-500/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-xl space-y-3">
          <span className="chip border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300">
            <Layers className="h-3.5 w-3.5" />
            {t.rulecards.expansionTag}
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
            {t.rulecards.title}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {t.rulecards.subtitle}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {t.rulecards.multipleHint}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            <button
              type="button"
              onClick={handleDrawRandom}
              disabled={isShuffling || deck.length === 0}
              className="btn btn-magic btn-lg"
            >
              {isShuffling ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shuffle className="h-4 w-4" />
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
                className="btn btn-ghost btn-lg"
              >
                {t.rulecards.clearAll} ({activeRuleCardIds.length})
              </button>
            )}
          </div>
        </div>
      </section>

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
        <h3 className="section-title mb-4 flex items-center gap-2">
          {t.rulecards.allRuleCards}
          <span className="chip px-2 py-0.5 tabular-nums">
            {RULE_CARDS_DATA.length}
          </span>
        </h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
