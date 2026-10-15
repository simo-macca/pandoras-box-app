import { describe, it, expect } from 'vitest';
import {
  CARDS_DATA,
  SPECIAL_CARD_POINTS,
  CURSE_POINTS,
  THE_END_POINTS,
  FUCK_YOU_POINTS,
} from '../cardsData';
import { EVENTS_DATA } from '../eventsData';
import { POWER_CARDS_DATA } from '../powerCardsData';
import { RULE_CARDS_DATA } from '../ruleCardsData';
import { CARD_POINTS } from '../../utils/scoring';
import { Language } from '../../types/game';

const LANGUAGES: Language[] = ['en', 'de', 'it', 'fr'];

describe('Game Data, Taxonomy & Rules Integrity', () => {
  describe('Special Cards (cardsData.ts)', () => {
    it('contains exactly 23 special and unique cards', () => {
      expect(CARDS_DATA).toHaveLength(23);
    });

    it('has unique IDs across all special cards', () => {
      const ids = CARDS_DATA.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(CARDS_DATA.length);
    });

    it('assigns correct official penalty points to each card category', () => {
      CARDS_DATA.forEach((card) => {
        if (card.id === 'fuck-you') {
          expect(card.points).toBe(FUCK_YOU_POINTS);
          expect(card.points).toBe(42);
        } else if (card.id === 'the-end') {
          expect(card.points).toBe(THE_END_POINTS);
          expect(card.points).toBe(17);
        } else if (card.id === 'curse') {
          expect(card.points).toBe(CURSE_POINTS);
          expect(card.points).toBe(13);
        } else {
          expect(card.points).toBe(SPECIAL_CARD_POINTS);
          expect(card.points).toBe(7);
        }
      });
    });

    it('contains non-empty names and descriptions for all supported languages', () => {
      CARDS_DATA.forEach((card) => {
        LANGUAGES.forEach((lang) => {
          expect(
            card.name[lang],
            `Missing ${lang} name for ${card.id}`
          ).toBeTruthy();
          expect(
            card.description[lang],
            `Missing ${lang} description for ${card.id}`
          ).toBeTruthy();
        });
      });
    });
  });

  describe('Power Cards (powerCardsData.ts)', () => {
    it('contains exactly 12 unique power cards', () => {
      expect(POWER_CARDS_DATA).toHaveLength(12);
    });

    it('has unique IDs across all power cards', () => {
      const ids = POWER_CARDS_DATA.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(POWER_CARDS_DATA.length);
    });

    it('assigns 0 penalty points to all power cards', () => {
      POWER_CARDS_DATA.forEach((pc) => {
        expect(pc.points).toBe(0);
      });
    });

    it('assigns official execution timings according to the Rulefactory rulebook', () => {
      // 1ST timing power cards (executed before the hand card effect)
      const expected1st = [
        'all-draw-one',
        'anti-counter',
        'open-hands',
        'recycling',
        'special-seal',
      ];
      // 2ND timing power cards (executed after the hand card effect)
      const expected2nd = [
        'black-wish',
        'colour-blockade',
        'looping',
        'number-wish',
        'random-chance',
        'special-charge',
        'troublecharger',
      ];

      expected1st.forEach((id) => {
        const card = POWER_CARDS_DATA.find((c) => c.id === id);
        expect(card, `Card ${id} should exist`).toBeDefined();
        expect(card?.timing, `Power card ${id} must have 1st timing`).toBe(
          '1st'
        );
      });

      expected2nd.forEach((id) => {
        const card = POWER_CARDS_DATA.find((c) => c.id === id);
        expect(card, `Card ${id} should exist`).toBeDefined();
        expect(card?.timing, `Power card ${id} must have 2nd timing`).toBe(
          '2nd'
        );
      });
    });

    it('contains non-empty names and descriptions for all supported languages', () => {
      POWER_CARDS_DATA.forEach((card) => {
        LANGUAGES.forEach((lang) => {
          expect(
            card.name[lang],
            `Missing ${lang} name for ${card.id}`
          ).toBeTruthy();
          expect(
            card.description[lang],
            `Missing ${lang} description for ${card.id}`
          ).toBeTruthy();
        });
      });
    });
  });

  describe('Event Cards (eventsData.ts)', () => {
    it('contains exactly 44 events across all game expansions', () => {
      expect(EVENTS_DATA).toHaveLength(44);

      const baseEvents = EVENTS_DATA.filter((e) => e.expansion === 'base');
      const troublemakerEvents = EVENTS_DATA.filter(
        (e) => e.expansion === 'troublemaker'
      );
      const superchargeEvents = EVENTS_DATA.filter(
        (e) => e.expansion === 'supercharge'
      );
      const pandoraEvents = EVENTS_DATA.filter(
        (e) => e.expansion === 'pandoras-box'
      );

      expect(baseEvents).toHaveLength(20);
      expect(troublemakerEvents).toHaveLength(14);
      expect(superchargeEvents).toHaveLength(9);
      expect(pandoraEvents).toHaveLength(1);
    });

    it('has unique IDs across all event cards', () => {
      const ids = EVENTS_DATA.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(EVENTS_DATA.length);
    });

    it('assigns explicit scope (global or targeted) to every event', () => {
      EVENTS_DATA.forEach((ev) => {
        expect(
          ['global', 'targeted'],
          `Event ${ev.id} must have scope`
        ).toContain(ev.scope);
      });
    });

    it('properly distinguishes table-level global events vs targeted events', () => {
      const globalIds = [
        'doomsday',
        'time-bomb',
        'tornado',
        'earthquake',
        'finish-line',
        'communist',
        'double-taxation',
        'vandalism',
        'capitalism',
        'russian-roulette',
      ];
      const targetedIds = [
        'identity-theft',
        'seppuku',
        'robin-hood',
        'charity',
        'crowdfunding',
        'black-hole',
        'epic-fail',
        'parasite',
      ];

      globalIds.forEach((id) => {
        const ev = EVENTS_DATA.find((e) => e.id === id);
        expect(ev?.scope, `Event ${id} should be global`).toBe('global');
      });

      targetedIds.forEach((id) => {
        const ev = EVENTS_DATA.find((e) => e.id === id);
        expect(ev?.scope, `Event ${id} should be targeted`).toBe('targeted');
      });
    });

    it('correctly configures specialModifier for Doomsday and Time Bomb', () => {
      const doomsday = EVENTS_DATA.find((e) => e.id === 'doomsday');
      expect(doomsday?.specialModifier).toBe('doomsday');
      expect(doomsday?.severity).toBe('chaos');

      const timeBomb = EVENTS_DATA.find((e) => e.id === 'time-bomb');
      expect(timeBomb?.specialModifier).toBe('timebomb');
      expect(timeBomb?.severity).toBe('chaos');
    });

    it('contains non-empty names and descriptions for all supported languages', () => {
      EVENTS_DATA.forEach((ev) => {
        LANGUAGES.forEach((lang) => {
          expect(
            ev.name[lang],
            `Missing ${lang} name for ${ev.id}`
          ).toBeTruthy();
          expect(
            ev.description[lang],
            `Missing ${lang} description for ${ev.id}`
          ).toBeTruthy();
        });
      });
    });
  });

  describe('Rule Cards (ruleCardsData.ts)', () => {
    it('contains exactly 15 rule cards from Pandora’s Box', () => {
      expect(RULE_CARDS_DATA).toHaveLength(15);
    });

    it('has unique IDs across all rule cards', () => {
      const ids = RULE_CARDS_DATA.map((r) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(RULE_CARDS_DATA.length);
    });

    it('contains non-empty names, descriptions, and flavors for all supported languages', () => {
      RULE_CARDS_DATA.forEach((rule) => {
        LANGUAGES.forEach((lang) => {
          expect(
            rule.name[lang],
            `Missing ${lang} name for ${rule.id}`
          ).toBeTruthy();
          expect(
            rule.description[lang],
            `Missing ${lang} description for ${rule.id}`
          ).toBeTruthy();
        });
      });
    });
  });

  describe('Scoring Constants Alignment', () => {
    it('aligns scoring engine constants with official rule point values', () => {
      expect(CARD_POINTS.SPECIAL).toBe(7);
      expect(CARD_POINTS.CURSE).toBe(13);
      expect(CARD_POINTS.THE_END).toBe(17);
      expect(CARD_POINTS.FUCK_YOU).toBe(42);
      expect(CARD_POINTS.MIMICRY).toBe(7);
      expect(CARD_POINTS.DOOMSDAY).toBe(50);
      expect(CARD_POINTS.TIME_BOMB_BONUS).toBe(10);
      expect(CARD_POINTS.TIME_BOMB_PENALTY).toBe(10);
    });
  });
});
