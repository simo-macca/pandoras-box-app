import { Language } from '@/types/game';
import { TranslationStrings } from './types';
import { en } from './en';
import { de } from './de';
import { it } from './it';
import { fr } from './fr';

export type { TranslationStrings } from './types';

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en,
  de,
  it,
  fr,
};
