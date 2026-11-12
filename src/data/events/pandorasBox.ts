import { EventItem } from '@/types/rules';

/** Pandora's Box (1 event whose effect the players define, p. 15). */
export const PANDORAS_BOX_EVENTS: EventItem[] = [
  {
    id: 'pandoras-box-event',
    name: {
      en: "Pandora's Box",
      de: "Pandora's Box",
      it: "Pandora's Box",
      fr: "Pandora's Box",
    },
    severity: 'chaos',
    scope: 'global',
    expansion: 'pandoras-box',
    icon: 'Package',
    description: {
      en: 'Determine the effect yourself before the game starts. (Official suggestion: Shuffle active rule cards back into the deck and draw new ones).',
      de: 'Bestimmt den Effekt vor Spielbeginn selbst. (Vorschlag: Aktive Regelkarten zurückmischen und neue Regelkarten aufdecken).',
      it: 'Determina l’effetto prima della partita. (Suggerimento: rimescola le carte regola attive nel mazzo e pescane di nuove).',
      fr: 'Déterminez l’effet vous-même avant la partie. (Suggestion : remélangez les règles actives et tirez-en de nouvelles).',
    },
  },
];
