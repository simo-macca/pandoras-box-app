import { describe, it, expect } from 'vitest';
import {
  CARD_POINTS,
  SCORE_PRESETS,
  DEFAULT_HAND_SCORE,
  getRecommendedPresets,
  calculateHandPoints,
} from '../scoring';

describe('scoring utils', () => {
  describe('constants & presets', () => {
    it('defines official card points correctly', () => {
      expect(CARD_POINTS.SPECIAL).toBe(7);
      expect(CARD_POINTS.CURSE).toBe(13);
      expect(CARD_POINTS.THE_END).toBe(17);
      expect(CARD_POINTS.FUCK_YOU).toBe(42);
      expect(CARD_POINTS.MIMICRY).toBe(7);
      expect(CARD_POINTS.DOOMSDAY).toBe(50);
      expect(CARD_POINTS.TIME_BOMB_BONUS).toBe(10);
      expect(CARD_POINTS.TIME_BOMB_PENALTY).toBe(10);
    });

    it('returns correct score presets based on player count', () => {
      // <= 4 players
      expect(getRecommendedPresets(2)).toEqual(SCORE_PRESETS.few);
      expect(getRecommendedPresets(3)).toEqual(SCORE_PRESETS.few);
      expect(getRecommendedPresets(4)).toEqual(SCORE_PRESETS.few);
      expect(SCORE_PRESETS.few).toEqual({ short: 137, medium: 154, long: 179 });

      // > 4 players
      expect(getRecommendedPresets(5)).toEqual(SCORE_PRESETS.many);
      expect(getRecommendedPresets(8)).toEqual(SCORE_PRESETS.many);
      expect(SCORE_PRESETS.many).toEqual({
        short: 113,
        medium: 137,
        long: 154,
      });
    });
  });

  describe('calculateHandPoints', () => {
    it('returns DOOMSDAY points (50) when isDoomsday is true', () => {
      const score = calculateHandPoints({
        ...DEFAULT_HAND_SCORE,
        isDoomsday: true,
        specialCardsCount: 3,
        numberCards: { '10': 2 },
      });
      expect(score).toBe(CARD_POINTS.DOOMSDAY);
    });

    it('calculates winner score as 0 by default', () => {
      const score = calculateHandPoints({
        ...DEFAULT_HAND_SCORE,
        isWinner: true,
      });
      expect(score).toBe(0);
    });

    it('calculates winner score with time bomb bonus (clamped at 0)', () => {
      const score = calculateHandPoints({
        ...DEFAULT_HAND_SCORE,
        isWinner: true,
        timeBombModifier: 'winner_bonus',
      });
      expect(score).toBe(0);
    });

    it('calculates winner score with positive custom modifier', () => {
      const score = calculateHandPoints({
        ...DEFAULT_HAND_SCORE,
        isWinner: true,
        customModifier: 5,
      });
      expect(score).toBe(5);
    });

    it('calculates regular hand with number cards', () => {
      const score = calculateHandPoints({
        ...DEFAULT_HAND_SCORE,
        numberCards: {
          '1': 2, // 2
          '5': 1, // 5
          '9': 3, // 27
        },
      });
      expect(score).toBe(34);
    });

    it('calculates special cards correctly', () => {
      const score = calculateHandPoints({
        ...DEFAULT_HAND_SCORE,
        specialCardsCount: 2, // 2 * 7 = 14
        curseCount: 1, // 1 * 13 = 13
        theEndCount: 1, // 1 * 17 = 17
        fuckYouCount: 1, // 1 * 42 = 42
        mimicryCount: 2, // 2 * 7 = 14
      });
      // 14 + 13 + 17 + 42 + 14 = 100
      expect(score).toBe(100);
    });

    it('handles time bomb modifiers on losers', () => {
      const baseHand = {
        ...DEFAULT_HAND_SCORE,
        numberCards: { '10': 2 }, // 20 pts
      };

      // expired_double: 20 * 2 = 40
      expect(
        calculateHandPoints({
          ...baseHand,
          timeBombModifier: 'expired_double',
        })
      ).toBe(40);

      // loser_penalty: 20 + 10 = 30
      expect(
        calculateHandPoints({
          ...baseHand,
          timeBombModifier: 'loser_penalty',
        })
      ).toBe(30);

      // winner_bonus on loser: 20 - 10 = 10
      expect(
        calculateHandPoints({
          ...baseHand,
          timeBombModifier: 'winner_bonus',
        })
      ).toBe(10);
    });

    it('applies customModifier and clamps total points at 0', () => {
      const handWithBonus = {
        ...DEFAULT_HAND_SCORE,
        numberCards: { '5': 1 }, // 5
        customModifier: 10,
      };
      expect(calculateHandPoints(handWithBonus)).toBe(15);

      const handClamped = {
        ...DEFAULT_HAND_SCORE,
        numberCards: { '2': 1 }, // 2
        customModifier: -20,
      };
      expect(calculateHandPoints(handClamped)).toBe(0);
    });

    it('handles empty hand and ignores non-numeric card keys', () => {
      const emptyScore = calculateHandPoints(DEFAULT_HAND_SCORE);
      expect(emptyScore).toBe(0);

      const scoreWithInvalidKey = calculateHandPoints({
        ...DEFAULT_HAND_SCORE,
        numberCards: { abc: 5, '4': 2 } as unknown as Record<number, number>,
      });
      expect(scoreWithInvalidKey).toBe(8);
    });
  });
});
