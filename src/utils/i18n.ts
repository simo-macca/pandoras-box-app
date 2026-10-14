import { Language } from '../types/game';
import { LocalizedMap } from '../types/rules';

export function getLocalizedText(
  map?: Partial<LocalizedMap> | null,
  language: Language = 'en',
  fallbackLanguage: Language = 'en'
): string {
  if (!map) return '';
  return map[language] || map[fallbackLanguage] || '';
}

export function matchesSearchQuery(
  fields: (string | undefined | null)[],
  query: string
): boolean {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return true;

  return fields.some((field) =>
    field ? field.toLowerCase().includes(normalizedQuery) : false
  );
}
