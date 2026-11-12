import { Language } from '@/types/game';
import {
  CardItem,
  EventItem,
  LocalizedMap,
  PowerCardItem,
  RuleCardItem,
} from '@/types/rules';
import { CARDS_DATA } from '@/data/cards';
import { EVENTS_DATA } from '@/data/events';
import { POWER_CARDS_DATA } from '@/data/powerCardsData';
import { RULE_CARDS_DATA } from '@/data/ruleCardsData';
import { matchesSearchQuery } from '@/utils/i18n';

export type DictionaryCategory =
  'all' | 'specials' | 'events' | 'power' | 'rules';

export interface DictionaryResults {
  specials: CardItem[];
  events: EventItem[];
  power: PowerCardItem[];
  rules: RuleCardItem[];
  total: number;
}

/** Searches both the current language and English (names are printed in English). */
const localizedFields = (
  language: Language,
  ...maps: (LocalizedMap | undefined)[]
) => maps.flatMap((map) => [map?.[language], map?.en]);

function filterSection<
  T extends { name: LocalizedMap; description: LocalizedMap },
>(
  items: T[],
  enabled: boolean,
  query: string,
  language: Language,
  extra: (item: T) => (LocalizedMap | undefined)[] = () => []
): T[] {
  if (!enabled) return [];
  return items.filter((item) =>
    matchesSearchQuery(
      localizedFields(language, item.name, item.description, ...extra(item)),
      query
    )
  );
}

/** Filters the card dictionary by category and free-text search. */
export function searchDictionary(
  category: DictionaryCategory,
  query: string,
  language: Language
): DictionaryResults {
  const show = (c: DictionaryCategory) => category === 'all' || category === c;

  const specials = filterSection(
    CARDS_DATA,
    show('specials'),
    query,
    language,
    (c) => [c.tip]
  );
  const events = filterSection(EVENTS_DATA, show('events'), query, language);
  const power = filterSection(POWER_CARDS_DATA, show('power'), query, language);
  const rules = filterSection(
    RULE_CARDS_DATA,
    show('rules'),
    query,
    language,
    (r) => [r.flavor]
  );

  return {
    specials,
    events,
    power,
    rules,
    total: specials.length + events.length + power.length + rules.length,
  };
}
