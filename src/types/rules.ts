import { Language } from './game';
export {
  OFFICIAL_PDF_LINKS,
  OVERVIEW_CARDS_PDF_LINKS,
} from '../data/rulesConstants';

export type CardTiming = 'play' | 'passing' | 'landing' | 'reaction' | 'white';
export type EventSeverity = 'positive' | 'negative' | 'chaos' | 'neutral';

export type LocalizedMap = Record<Language, string>;

export interface CardItem {
  id: string;
  name: LocalizedMap;
  points: number;
  category: 'special' | 'unique' | 'power' | 'number';
  subCategory?: string;
  badgeColor?: string;
  icon?: string;
  description: LocalizedMap;
  tip?: LocalizedMap;
}

export interface EventItem {
  id: string;
  name: LocalizedMap;
  specialModifier?: string;
  severity: EventSeverity;
  expansion?: string;
  icon?: string;
  description: LocalizedMap;
}

export interface PowerCardItem {
  id: string;
  points: number;
  timing?: '1st' | '2nd';
  charges?: number;
  name: LocalizedMap;
  description: LocalizedMap;
}

export interface RuleCardItem {
  id: string;
  name: LocalizedMap;
  description: LocalizedMap;
  flavor?: LocalizedMap;
  icon?: string;
}

// Backward-compatible interfaces
export interface GameCard {
  id: string;
  names: Record<Language, string>;
  timing: CardTiming;
  descriptions: Record<Language, string>;
  timingDetails: Record<Language, string>;
  badgeColor?: string;
  iconName?: string;
  examples?: Record<Language, string>;
}

export interface BoardEvent {
  number: number;
  names: Record<Language, string>;
  descriptions: Record<Language, string>;
  clarifications?: Record<Language, string>;
  severity: EventSeverity;
  iconName?: string;
}

export interface FAQItem {
  id: number;
  titles: Record<Language, string>;
  scenarios: Record<Language, string>;
  rulings: Record<Language, string>;
  proTips?: Record<Language, string>;
}
