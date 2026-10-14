import { HandScore, TimeBombModifier } from '../types/game';

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

export function calculateHandPoints(
  hand: Omit<HandScore, 'totalPoints'> | HandScore
): number {
  if (hand.isDoomsday) {
    return CARD_POINTS.DOOMSDAY;
  }

  if (hand.isWinner) {
    let pts = 0;
    if (hand.timeBombModifier === 'winner_bonus') {
      pts -= CARD_POINTS.TIME_BOMB_BONUS;
    }
    pts += hand.customModifier || 0;
    return Math.max(0, pts);
  }

  let total = 0;
  if (hand.numberCards) {
    Object.entries(hand.numberCards).forEach(([numStr, count]) => {
      const num = parseInt(numStr, 10);
      if (!isNaN(num) && count) {
        total += num * count;
      }
    });
  }

  total += (hand.specialCardsCount || 0) * CARD_POINTS.SPECIAL;
  total += (hand.curseCount || 0) * CARD_POINTS.CURSE;
  total += (hand.theEndCount || 0) * CARD_POINTS.THE_END;
  total += (hand.fuckYouCount || 0) * CARD_POINTS.FUCK_YOU;
  total += (hand.mimicryCount || 0) * CARD_POINTS.MIMICRY;

  if (hand.timeBombModifier === 'expired_double') {
    total *= 2;
  } else if (hand.timeBombModifier === 'loser_penalty') {
    total += CARD_POINTS.TIME_BOMB_PENALTY;
  } else if (hand.timeBombModifier === 'winner_bonus') {
    total -= CARD_POINTS.TIME_BOMB_BONUS;
  }

  total += hand.customModifier || 0;
  return Math.max(0, total);
}
