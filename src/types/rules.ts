import { Language } from '@/types/game';

export type EventSeverity = 'positive' | 'negative' | 'chaos' | 'neutral';
export type EventScope = 'global' | 'targeted';

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
  scope?: EventScope;
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
