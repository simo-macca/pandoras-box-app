import { CardItem } from '@/types/rules';
import { CARD_POINTS } from '@/utils/scoring';

/** Unique special cards with their own point values (rulebook p. 11). */
export const UNIQUE_SPECIAL_CARDS: CardItem[] = [
  {
    id: 'mimicry',
    name: {
      en: 'Mimicry',
      de: 'Mimicry',
      it: 'Mimicry',
      fr: 'Mimicry',
    },
    points: CARD_POINTS.MIMICRY,
    category: 'unique',
    subCategory: 'unique',
    badgeColor: 'bg-teal-600/20 text-teal-400 border-teal-500/40',
    icon: 'CopyCheck',
    description: {
      en: 'Copies the entire effect (and colour) of any special card (except unique special cards). Determine its effect when played. Worth 7 points at the end of a round.',
      de: 'Kopiert den gesamten Effekt (und die Farbe) einer beliebigen Spezialkarte (ausser einzigartigen). Effekt beim Ausspielen bestimmen. Zählt 7 Punkte am Rundenende.',
      it: 'Copia l’intero effetto (e colore) di qualsiasi carta speciale (eccetto le speciali uniche). Decidi l’effetto appena la giochi. Vale 7 punti a fine round.',
      fr: 'Copie l’effet complet (et la couleur) de n’importe quelle carte spéciale (sauf spéciales uniques). Déterminez l’effet au moment de la poser. Vaut 7 points en fin de manche.',
    },
    tip: {
      en: 'Versatile chameleon card: can duplicate Skip, Gift, Exchange, or Fantastic Four.',
      de: 'Vielseitige Chamäleon-Karte: kann Skip, Gift, Exchange oder Fantastic Four imitieren.',
      it: 'Carta camaleonte versatilisima: può duplicare Skip, Gift, Exchange o Fantastic Four.',
      fr: 'Carte caméléon polyvalente : peut copier Skip, Gift, Exchange ou Fantastic Four.',
    },
  },
  {
    id: 'curse',
    name: {
      en: 'Curse',
      de: 'Curse',
      it: 'Curse',
      fr: 'Curse',
    },
    points: CARD_POINTS.CURSE,
    category: 'unique',
    subCategory: 'unique',
    badgeColor: 'bg-purple-600/20 text-purple-400 border-purple-500/40',
    icon: 'Skull',
    description: {
      en: 'Not playable! Can only be given away, exchanged, or discarded if an event calls for it. Worth 13 points at the end of a round.',
      de: 'Nicht ausspielbar! Darf nur verschenkt, getauscht oder durch Ereignisse abgeworfen werden. Zählt 13 Punkte am Rundenende.',
      it: 'Non giocabile! Può solo essere regalata, scambiata o scartata se un evento lo richiede. Vale 13 punti a fine round.',
      fr: 'Injouable ! Peut uniquement être donnée, échangée ou défaussée si un événement l’exige. Vaut 13 points en fin de manche.',
    },
    tip: {
      en: 'Pass it with Gift or Exchange before someone ends the round!',
      de: 'Gib sie rechtzeitig per Gift oder Exchange ab, bevor jemand die Runde beendet!',
      it: 'Cedila con Gift o Exchange prima che qualcuno chiuda la manche!',
      fr: 'Transmettez-la vite avec Gift ou Exchange avant la fin de manche !',
    },
  },
  {
    id: 'the-end',
    name: {
      en: 'The End',
      de: 'The End',
      it: 'The End',
      fr: 'The End',
    },
    points: CARD_POINTS.THE_END,
    category: 'unique',
    subCategory: 'unique',
    badgeColor: 'bg-red-700/20 text-red-400 border-red-600/40',
    icon: 'Hourglass',
    description: {
      en: 'Playable only as your last hand card (on any card). When played, the round comes to an unconditional end: "Nice Try" cannot be played and active events are ignored. Worth 17 points at round end if trapped in hand.',
      de: 'Nur als allerletzte Handkarte spielbar (auf jede beliebige Karte). Beendet die Runde bedingungslos: "Nice Try" ist wirkungslos und aktive Ereignisse werden ignoriert. Zählt 17 Punkte, falls auf der Hand verblieben.',
      it: 'Giocabile solo come ultima carta in mano (su qualsiasi carta). Chiude la manche incondizionatamente: "Nice Try" non può essere giocata e gli eventi attivi vengono ignorati. Vale 17 punti se resta in mano.',
      fr: 'Jouable uniquement comme toute dernière carte en main (sur n’importe quelle carte). Met fin immédiatement à la manche : "Nice Try" est impossible et les événements actifs sont ignorés. Vaut 17 points en main.',
    },
    tip: {
      en: 'Guaranteed win once you reach 1 card, but costly if caught holding it.',
      de: 'Garantiert den Rundenabschluss bei 1 Karte, aber teuer, wenn man darauf sitzen bleibt.',
      it: 'Garantisce la vittoria del round se rimani a 1 carta, ma costa caro se resta in mano.',
      fr: 'Garantit la fin de manche à 1 carte, mais pénalisante si conservée en main.',
    },
  },
  {
    id: 'fuck-you',
    name: {
      en: 'Fuck You',
      de: 'Fuck You',
      it: 'Fuck You',
      fr: 'Fuck You',
    },
    points: CARD_POINTS.FUCK_YOU,
    category: 'unique',
    subCategory: 'unique',
    badgeColor:
      'bg-red-500 text-white font-extrabold shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    icon: 'Zap',
    description: {
      en: 'Playable only when you have exactly ten cards in your hand (including "Fuck You"). Slid under the top card of the discard pile with no further effect. Cannot be passed via Gift/Exchange. Worth 42 points at round end!',
      de: 'Nur spielbar bei exakt 10 Handkarten (inklusive "Fuck You"). Wird unter die oberste Karte des Ablagestapels geschoben ohne weiteren Effekt. Darf nicht per Gift/Exchange weitergegeben werden. Zählt 42 Punkte am Rundenende!',
      it: 'Giocabile solo se hai esattamente 10 carte in mano (inclusa "Fuck You"). Si infila sotto la prima carta degli scarti senza effetti. Non può essere ceduta con Gift/Exchange. Vale 42 punti a fine round!',
      fr: 'Jouable uniquement avec exactement 10 cartes en main (avec "Fuck You"). Glissée sous la défausse sans autre effet. Ne peut pas être donnée par Gift/Exchange. Vaut 42 points en fin de manche !',
    },
    tip: {
      en: 'The most dangerous card in the game! Holding it when the round ends usually leads to defeat.',
      de: 'Die gefährlichste Karte im Spiel! Bleibt man am Rundenende darauf sitzen, droht die Niederlage.',
      it: 'La carta più temuta del gioco! Restare con questa carta in mano a fine round è devastante.',
      fr: 'La carte la plus redoutée ! Rester avec en fin de manche mène presque toujours à la défaite.',
    },
  },
];
