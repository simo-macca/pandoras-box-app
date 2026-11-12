import { describe, it, expect } from 'vitest';
import { CARDS_DATA } from '../cards';
import { EVENTS_DATA } from '../events';
import { POWER_CARDS_DATA } from '../powerCardsData';
import { RULE_CARDS_DATA } from '../ruleCardsData';
import { calculateHandPoints, DEFAULT_HAND_SCORE } from '@/utils/scoring';

const LANGS = ['en', 'de', 'it', 'fr'] as const;

describe('official card names (Rulefactory prints English names in every edition)', () => {
  it.each([
    ['special cards', CARDS_DATA],
    ['event cards', EVENTS_DATA],
    ['power cards', POWER_CARDS_DATA],
    ['rule cards', RULE_CARDS_DATA],
  ])('%s use the same English name in every language', (_label, items) => {
    items.forEach((item) => {
      LANGS.forEach((lang) => {
        expect(item.name[lang], `${item.id} (${lang})`).toBe(item.name.en);
      });
    });
  });

  it('does not include corner symbols in names', () => {
    [...EVENTS_DATA, ...POWER_CARDS_DATA].forEach((item) => {
      expect(item.name.en).not.toMatch(/\(\+/);
    });
  });

  it('contains exactly the 15 official Pandora’s Box rule cards', () => {
    expect(RULE_CARDS_DATA.map((r) => r.name.en).sort()).toEqual(
      [
        'Always Lucky',
        'Double Special',
        'Double Trouble',
        'Fantastic Six',
        'Gift Split',
        'Give a Fuck',
        'Mass Exchange',
        'Saboteur',
        'Safe Counter',
        'Santa is not real',
        'Special Compulsion',
        'The End is nigh',
        'The Nicest Try',
        "Thief's Choice",
        'Your Choice',
      ].sort()
    );
  });
});

describe('rule card "Double Special" scoring', () => {
  it('doubles every special card but not number cards', () => {
    const hand = {
      ...DEFAULT_HAND_SCORE,
      numberCards: { 5: 1 },
      specialCardsCount: 1,
      curseCount: 1,
      fuckYouCount: 1,
    };
    expect(calculateHandPoints(hand)).toBe(5 + 7 + 13 + 42);
    expect(calculateHandPoints({ ...hand, doubleSpecials: true })).toBe(
      5 + 2 * (7 + 13 + 42)
    );
  });

  it('combines with an exploded Time Bomb (all points doubled afterwards)', () => {
    const hand = {
      ...DEFAULT_HAND_SCORE,
      numberCards: { 3: 1 },
      specialCardsCount: 1,
      doubleSpecials: true,
      timeBombModifier: 'expired_double' as const,
    };
    expect(calculateHandPoints(hand)).toBe((3 + 14) * 2);
  });
});
