import { HandScore, SeppukuOutcome, TimeBombModifier } from '@/types/game';

export const CARD_POINTS = {
  SPECIAL: 7,
  CURSE: 13,
  THE_END: 17,
  FUCK_YOU: 42,
  MIMICRY: 7,
  DOOMSDAY: 50,
  TIME_BOMB_BONUS: 10,
  TIME_BOMB_PENALTY: 10,
} as const;

export const SCORE_PRESETS = {
  few: {
    short: 137,
    medium: 154,
    long: 179,
  },
  many: {
    short: 113,
    medium: 137,
    long: 154,
  },
} as const;

/** Seppuku event (rulebook p. 16), applied to the total score. */
export const SEPPUKU_POINTS: Record<SeppukuOutcome, number> = {
  risk_number: -21,
  risk_special: 42,
  no_risk: 21,
};

/** Id of the Pandora's Box rule card that doubles special-card points. */
export const DOUBLE_SPECIAL_RULE_CARD_ID = 'double-special';

export function getRecommendedPresets(playerCount: number) {
  return playerCount <= 4 ? SCORE_PRESETS.few : SCORE_PRESETS.many;
}

export const DEFAULT_HAND_SCORE: Omit<HandScore, 'totalPoints'> = {
  isWinner: false,
  numberCards: {},
  specialCardsCount: 0,
  curseCount: 0,
  theEndCount: 0,
  fuckYouCount: 0,
  mimicryCount: 0,
  isDoomsday: false,
  timeBombModifier: 'none' as TimeBombModifier,
  customModifier: 0,
};

/**
 * Unique special cards exist once in the whole game (rulebook p. 22), so a
 * hand can hold at most one of each.
 */
export const UNIQUE_CARD_LIMIT = 1;

/**
 * Points a player writes down for one round (lower is better).
 *
 * - Doomsday (p. 13): everyone scores 50, hand cards are not counted.
 * - Winners (no cards left, p. 5) score 0. Several winners are possible
 *   (pp. 10, 15).
 * - Otherwise: number cards at face value, specials 7, Mimicry 7, Curse 13,
 *   The End 17, Fuck You 42 (pp. 5, 11). The rule card "Double Special"
 *   doubles every special card.
 * - Time Bomb (p. 17): a player who ends the round in time gets −10 and the
 *   others add 10 to their hand points; if nobody does, hand points double.
 * - `customModifier` is a free adjustment that is always applied last, so the
 *   players can record effects the calculator does not model (Double
 *   Taxation, The End is nigh, Lucky Bastard protecting from Doomsday, ...).
 */
export function calculateHandPoints(
  hand: Omit<HandScore, 'totalPoints'> | HandScore
): number {
  const adjustment = hand.customModifier || 0;

  if (hand.isDoomsday) {
    return CARD_POINTS.DOOMSDAY + adjustment;
  }

  if (hand.isWinner) {
    const timeBomb =
      hand.timeBombModifier === 'winner_bonus'
        ? -CARD_POINTS.TIME_BOMB_BONUS
        : 0;
    return timeBomb + adjustment;
  }

  let total = 0;
  Object.entries(hand.numberCards ?? {}).forEach(([numStr, count]) => {
    const num = parseInt(numStr, 10);
    if (!isNaN(num) && count) {
      total += num * count;
    }
  });

  const specialTotal =
    (hand.specialCardsCount || 0) * CARD_POINTS.SPECIAL +
    (hand.curseCount || 0) * CARD_POINTS.CURSE +
    (hand.theEndCount || 0) * CARD_POINTS.THE_END +
    (hand.fuckYouCount || 0) * CARD_POINTS.FUCK_YOU +
    (hand.mimicryCount || 0) * CARD_POINTS.MIMICRY;
  total += hand.doubleSpecials ? specialTotal * 2 : specialTotal;

  // The winner-only bonus never applies to a player who still holds cards.
  if (hand.timeBombModifier === 'expired_double') {
    total *= 2;
  } else if (hand.timeBombModifier === 'loser_penalty') {
    total += CARD_POINTS.TIME_BOMB_PENALTY;
  }

  return total + adjustment;
}
