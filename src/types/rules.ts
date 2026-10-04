import { Language } from './game';

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

export const OFFICIAL_PDF_LINKS: Record<Language, string> = {
  en: 'https://rulefactory.ch/wp-content/uploads/2020/11/Pandoras_Box_Gesamtregelwerk_EN_web.pdf',
  de: 'https://rulefactory.ch/wp-content/uploads/2020/11/Pandoras_Box_Gesamtregelwerk_DE_web.pdf',
  fr: 'https://rulefactory.ch/wp-content/uploads/2020/11/Pandoras_Box_Gesamtregelwerk_FR.pdf',
  it: 'https://rulefactory.ch/wp-content/uploads/2020/11/Pandoras_Box_Gesamtregelwerk_IT_web.pdf',
};

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
