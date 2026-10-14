import { describe, it, expect } from 'vitest';
import { getLocalizedText, matchesSearchQuery } from '../i18n';
import { LocalizedMap } from '../../types/rules';

describe('i18n utils', () => {
  describe('getLocalizedText', () => {
    const textMap: LocalizedMap = {
      en: 'English Text',
      de: 'Deutscher Text',
      it: 'Testo Italiano',
      fr: 'Texte Français',
    };

    it('returns the text for the requested language', () => {
      expect(getLocalizedText(textMap, 'de')).toBe('Deutscher Text');
      expect(getLocalizedText(textMap, 'it')).toBe('Testo Italiano');
      expect(getLocalizedText(textMap, 'fr')).toBe('Texte Français');
      expect(getLocalizedText(textMap, 'en')).toBe('English Text');
    });

    it('falls back to the fallbackLanguage if the target language is missing', () => {
      const partialMap: Partial<LocalizedMap> = {
        en: 'Fallback Text',
      };
      expect(getLocalizedText(partialMap, 'de', 'en')).toBe('Fallback Text');
    });

    it('returns empty string when map is undefined, null, or values are missing', () => {
      expect(getLocalizedText(undefined)).toBe('');
      expect(getLocalizedText(null)).toBe('');
      expect(getLocalizedText({}, 'fr')).toBe('');
    });
  });

  describe('matchesSearchQuery', () => {
    it('returns true when query is empty or only whitespace', () => {
      expect(matchesSearchQuery(['Card Title', 'Description'], '')).toBe(true);
      expect(matchesSearchQuery(['Card Title'], '   ')).toBe(true);
    });

    it('matches query case-insensitively across fields', () => {
      const fields = ['Pandora Box', 'Open at your own risk'];
      expect(matchesSearchQuery(fields, 'box')).toBe(true);
      expect(matchesSearchQuery(fields, 'PANDORA')).toBe(true);
      expect(matchesSearchQuery(fields, 'RISK')).toBe(true);
    });

    it('returns false when no field matches the query', () => {
      const fields = ['Pandora Box', 'Rule description'];
      expect(matchesSearchQuery(fields, 'Dragon')).toBe(false);
    });

    it('handles null, undefined, or empty fields safely', () => {
      const fields = [undefined, null, '', 'Special Attack'];
      expect(matchesSearchQuery(fields, 'attack')).toBe(true);
      expect(matchesSearchQuery([undefined, null], 'test')).toBe(false);
    });
  });
});
