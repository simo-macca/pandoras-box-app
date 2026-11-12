import { EventItem } from '@/types/rules';
import { BASE_GAME_EVENTS } from './base';
import { TROUBLEMAKER_EVENTS } from './troublemaker';
import { SUPERCHARGE_EVENTS } from './supercharge';
import { PANDORAS_BOX_EVENTS } from './pandorasBox';

/** All 44 event cards (rulebook p. 22), in the order of the rulebook. */
export const EVENTS_DATA: EventItem[] = [
  ...BASE_GAME_EVENTS,
  ...TROUBLEMAKER_EVENTS,
  ...SUPERCHARGE_EVENTS,
  ...PANDORAS_BOX_EVENTS,
];

export {
  BASE_GAME_EVENTS,
  TROUBLEMAKER_EVENTS,
  SUPERCHARGE_EVENTS,
  PANDORAS_BOX_EVENTS,
};
