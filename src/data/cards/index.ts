import { CardItem } from '@/types/rules';
import { COLOURED_SPECIAL_CARDS } from './colouredSpecials';
import { OPEN_WISH_SPECIAL_CARDS } from './openWishSpecials';
import { UNIQUE_SPECIAL_CARDS } from './uniqueSpecials';

/** All 23 special cards (rulebook p. 22). Power cards are listed separately. */
export const CARDS_DATA: CardItem[] = [
  ...COLOURED_SPECIAL_CARDS,
  ...OPEN_WISH_SPECIAL_CARDS,
  ...UNIQUE_SPECIAL_CARDS,
];

export {
  COLOURED_SPECIAL_CARDS,
  OPEN_WISH_SPECIAL_CARDS,
  UNIQUE_SPECIAL_CARDS,
};
