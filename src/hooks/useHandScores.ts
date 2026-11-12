import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  HandScore,
  Player,
  TableTimeBombMode,
  TimeBombModifier,
} from '@/types/game';
import {
  calculateHandPoints,
  DEFAULT_HAND_SCORE,
  DOUBLE_SPECIAL_RULE_CARD_ID,
} from '@/utils/scoring';
import { soundEffects } from '@/utils/sound';

type HandInput = Omit<HandScore, 'totalPoints'>;
type ScoreMap = Record<string, HandScore>;

const withTotal = (hand: HandInput): HandScore => ({
  ...hand,
  totalPoints: calculateHandPoints(hand),
});

const emptyHand = (): HandScore => ({ ...DEFAULT_HAND_SCORE, totalPoints: 0 });

const EMPTY_HAND_CARDS: Partial<HandInput> = {
  numberCards: {},
  specialCardsCount: 0,
  curseCount: 0,
  theEndCount: 0,
  fuckYouCount: 0,
  mimicryCount: 0,
};

/** Keeps the Time Bomb modifier consistent with the winner flag. */
function timeBombForWinnerFlag(
  modifier: TimeBombModifier | undefined,
  isWinner: boolean
): TimeBombModifier | undefined {
  if (isWinner && modifier === 'loser_penalty') return 'winner_bonus';
  if (!isWinner && modifier === 'winner_bonus') return 'loser_penalty';
  return modifier;
}

/** Derives the table-wide Time Bomb mode from the per-player modifiers. */
export function getTableTimeBombMode(scores: ScoreMap): TableTimeBombMode {
  const list = Object.values(scores);
  if (list.length === 0) return 'none';
  if (list.every((s) => s.timeBombModifier === 'expired_double')) {
    return 'exploded';
  }
  if (
    list.some(
      (s) =>
        s.timeBombModifier === 'winner_bonus' ||
        s.timeBombModifier === 'loser_penalty'
    )
  ) {
    return 'defused';
  }
  return 'none';
}

interface UseHandScoresOptions {
  isOpen: boolean;
  players: Player[];
  initialScores?: ScoreMap;
  /** Rule cards active for the round being scored. */
  activeRuleCardIds?: string[];
}

/**
 * State of the end-of-round calculator: one hand per player plus the
 * table-wide events (Doomsday, Time Bomb) that affect every hand.
 */
export function useHandScores({
  isOpen,
  players,
  initialScores,
  activeRuleCardIds,
}: UseHandScoresOptions) {
  const isDoubleSpecial = Boolean(
    activeRuleCardIds?.includes(DOUBLE_SPECIAL_RULE_CARD_ID)
  );
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>(
    players[0]?.id ?? ''
  );
  const [scores, setScores] = useState<ScoreMap>({});

  // (Re)initialise every time the calculator opens.
  useEffect(() => {
    if (!isOpen) return;

    setSelectedPlayerId((prev) =>
      players.length > 0 && !players.some((p) => p.id === prev)
        ? players[0].id
        : prev
    );

    const initial: ScoreMap = {};
    players.forEach((p) => {
      const base = initialScores?.[p.id] ?? { ...DEFAULT_HAND_SCORE };
      initial[p.id] = withTotal({ ...base, doubleSpecials: isDoubleSpecial });
    });
    setScores(initial);
  }, [isOpen, players, initialScores, isDoubleSpecial]);

  const currentScore = scores[selectedPlayerId] ?? emptyHand();
  const isTableDoomsday = Object.values(scores).some((s) => s.isDoomsday);
  const tableTimeBombMode = useMemo(
    () => getTableTimeBombMode(scores),
    [scores]
  );

  /** Applies `update` to every player's hand and recalculates the totals. */
  const updateAllHands = useCallback(
    (update: (hand: HandScore) => HandInput) => {
      setScores((prev) => {
        const next: ScoreMap = { ...prev };
        players.forEach((p) => {
          next[p.id] = withTotal(update(prev[p.id] ?? emptyHand()));
        });
        return next;
      });
    },
    [players]
  );

  const updateCurrentScore = useCallback(
    (updates: Partial<HandInput>) => {
      setScores((prev) => ({
        ...prev,
        [selectedPlayerId]: withTotal({
          ...(prev[selectedPlayerId] ?? emptyHand()),
          ...updates,
        }),
      }));
    },
    [selectedPlayerId]
  );

  /**
   * Several players can end a round at the same time (rulebook pp. 10, 15),
   * so marking a winner never un-marks the others. A winner holds no cards.
   */
  const toggleWinner = useCallback(() => {
    if (isTableDoomsday) return;
    soundEffects.playClick();
    setScores((prev) => {
      const hand = prev[selectedPlayerId] ?? emptyHand();
      const isWinner = !hand.isWinner;
      return {
        ...prev,
        [selectedPlayerId]: withTotal({
          ...hand,
          ...(isWinner ? EMPTY_HAND_CARDS : {}),
          isWinner,
          timeBombModifier: timeBombForWinnerFlag(
            hand.timeBombModifier,
            isWinner
          ),
        }),
      };
    });
  }, [isTableDoomsday, selectedPlayerId]);

  /** Doomsday (p. 13): the round ends, nobody wins, everyone scores 50. */
  const toggleDoomsday = useCallback(() => {
    const isDoomsday = !isTableDoomsday;
    soundEffects.playClick();
    updateAllHands((hand) => ({
      ...hand,
      isDoomsday,
      isWinner: isDoomsday ? false : hand.isWinner,
    }));
  }, [isTableDoomsday, updateAllHands]);

  const setTableTimeBomb = useCallback(
    (mode: TableTimeBombMode) => {
      soundEffects.playClick();
      updateAllHands((hand) => {
        let timeBombModifier: TimeBombModifier = 'none';
        if (mode === 'exploded') timeBombModifier = 'expired_double';
        else if (mode === 'defused') {
          timeBombModifier = hand.isWinner ? 'winner_bonus' : 'loser_penalty';
        }
        return { ...hand, timeBombModifier };
      });
    },
    [updateAllHands]
  );

  const resetCurrentPlayer = useCallback(() => {
    soundEffects.playClick();
    setScores((prev) => ({
      ...prev,
      [selectedPlayerId]: withTotal({
        ...DEFAULT_HAND_SCORE,
        isDoomsday: isTableDoomsday,
        doubleSpecials: isDoubleSpecial,
      }),
    }));
  }, [selectedPlayerId, isTableDoomsday, isDoubleSpecial]);

  return {
    scores,
    selectedPlayerId,
    setSelectedPlayerId,
    currentScore,
    isDoubleSpecial,
    isTableDoomsday,
    tableTimeBombMode,
    updateCurrentScore,
    toggleWinner,
    toggleDoomsday,
    setTableTimeBomb,
    resetCurrentPlayer,
  };
}
