import { CardItem } from '@/types/rules';
import { CARD_POINTS } from '@/utils/scoring';

/** Plain- and bi-coloured special cards (7 points each, rulebook pp. 6–7). */
export const COLOURED_SPECIAL_CARDS: CardItem[] = [
  {
    id: 'skip',
    name: {
      en: 'Skip',
      de: 'Skip',
      it: 'Skip',
      fr: 'Skip',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-amber-500/15 text-amber-500 dark:text-amber-300 border-amber-500/30',
    icon: 'UserX',
    description: {
      en: 'Attack: Select a player to be skipped in the next round. (Note: You are not allowed to select a player who is already being skipped in that round).',
      de: 'Angriff: Wähle eine Person, die in der nächsten Runde aussetzen muss. (Hinweis: Niemand darf gewählt werden, der in dieser Runde bereits aussetzen muss).',
      it: 'Attacco: Scegli un giocatore che deve saltare il prossimo round. (Nota: non puoi scegliere chi deve già saltare in questo round).',
      fr: 'Attaque : Choisissez un joueur qui passera son tour au prochain tour. (Note : Vous ne pouvez pas choisir un joueur qui passe déjà).',
    },
    tip: {
      en: 'Crucial to stop an opponent who is down to their last card and about to end the round!',
      de: 'Ideal, um jemanden mit nur noch einer Handkarte kurz vor dem Rundenende zu stoppen!',
      it: 'Essenziale per fermare chi ha un’ultima carta in mano e sta per chiudere il round!',
      fr: 'Essentiel pour bloquer un adversaire à qui il ne reste qu’une carte et qui va terminer la manche !',
    },
  },
  {
    id: 'gift',
    name: {
      en: 'Gift',
      de: 'Gift',
      it: 'Gift',
      fr: 'Gift',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-emerald-500/15 text-emerald-500 dark:text-emerald-300 border-emerald-500/30',
    icon: 'Gift',
    description: {
      en: 'Attack: Give two cards from your hand to another player. (Note: If you only have one card left, give just that card away. If played as your last card, still select a target player).',
      de: 'Angriff: Gib 2 Handkarten an eine andere Person ab. (Hinweis: Wer nur 1 Karte hat, gibt nur diese ab. Wird Gift als letzte Karte gespielt, wähle dennoch eine Zielperson).',
      it: 'Attacco: Dai 2 carte dalla tua mano a un altro giocatore. (Nota: se hai solo 1 carta, cedi solo quella. Se giocata come ultima carta, scegli comunque il bersaglio).',
      fr: 'Attaque : Donnez 2 cartes de votre main à un joueur. (Note : s’il ne vous reste qu’une carte, donnez-la. Jouée comme dernière carte, désignez quand même une cible).',
    },
    tip: {
      en: 'Dump high-point cards onto opponents. (Note: "Fuck You" cannot be given away with Gift).',
      de: 'Perfekt für hohe Punktkarten. (Hinweis: "Fuck You" darf nicht per Gift verschenkt werden).',
      it: 'Ottima per cedere carte pesanti. (Nota: "Fuck You" non può essere ceduta con Gift).',
      fr: 'Idéal pour refiler des points. (Note : "Fuck You" ne peut pas être donnée avec Gift).',
    },
  },
  {
    id: 'exchange',
    name: {
      en: 'Exchange',
      de: 'Exchange',
      it: 'Exchange',
      fr: 'Exchange',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-blue-500/15 text-blue-500 dark:text-blue-300 border-blue-500/30',
    icon: 'ArrowLeftRight',
    description: {
      en: 'Attack: Give someone two cards from your hand and draw two cards from the same person without looking before they put your cards in their hand. (If someone has only one card, the exchange is 2-for-1, 1-for-2, or 1-for-1).',
      de: 'Angriff: Gib einer Person 2 Handkarten und ziehe blind 2 Karten von derselben Person, bevor diese deine Karten aufnimmt. (Bei 1 Karte: 2 gegen 1, 1 gegen 2 oder 1 gegen 1).',
      it: 'Attacco: Dai 2 carte a un giocatore e pescane 2 dallo stesso alla cieca prima che prenda le tue. (Con 1 carta residua lo scambio è 2 a 1, 1 a 2 o 1 a 1).',
      fr: 'Attaque : Donnez 2 cartes à un joueur et piochez-en 2 à l’aveugle chez lui avant qu’il ne prenne vos cartes. (À 1 carte : échange 2 contre 1, 1 contre 2 ou 1 contre 1).',
    },
    tip: {
      en: 'Steal key cards while offloading high values. (Note: "Fuck You" cannot be passed with Exchange).',
      de: 'Klau dem Gegner Schlüsselkarten. (Hinweis: "Fuck You" darf nicht per Exchange weitergegeben werden).',
      it: 'Sottrai carte chiave al rivale. (Nota: "Fuck You" non può essere scambiata con Exchange).',
      fr: 'Privez l’adversaire de ses atouts. (Note : "Fuck You" ne peut être passée par Exchange).',
    },
  },
  {
    id: 'second-chance',
    name: {
      en: '2nd Chance',
      de: '2nd Chance',
      it: '2nd Chance',
      fr: '2nd Chance',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-cyan-500/15 text-cyan-500 dark:text-cyan-300 border-cyan-500/30',
    icon: 'RotateCcw',
    description: {
      en: 'You immediately take another turn: play a matching second card on "2nd Chance". If you cannot play an appropriate card or do not have a second card in hand, you must draw a card from the pile.',
      de: 'Du bist sofort noch einmal an der Reihe: Spiele eine passende zweite Karte darauf. Kannst du nicht bedienen oder hast keine zweite Karte, musst du eine Karte nachziehen.',
      it: 'Sei subito di nuovo di turno: gioca una seconda carta compatibile. Se non puoi o non hai una seconda carta in mano, devi pescare una carta dal mazzo.',
      fr: 'Vous rejouez immédiatement : posez une deuxième carte compatible. Si vous ne pouvez pas ou n’avez pas de seconde carte, vous devez piocher une carte.',
    },
    tip: {
      en: 'Great for chaining cards and shedding hand size rapidly.',
      de: 'Hervorragend, um Handkarten schnell in Serie abzubauen.',
      it: 'Ideale per concatenare giocate e liberarsi di carte in fretta.',
      fr: 'Parfait pour enchaîner les cartes et vider sa main.',
    },
  },
  {
    id: 'colour-swap',
    name: {
      en: 'Colour Swap',
      de: 'Colour Swap',
      it: 'Colour Swap',
      fr: 'Colour Swap',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '2-colour',
    badgeColor:
      'bg-purple-500/15 text-purple-500 dark:text-purple-300 border-purple-500/30',
    icon: 'Pipette',
    description: {
      en: 'Bi-coloured card: You can play this on either of the two colours depicted. The game then continues with the other colour.',
      de: 'Zweifarbige Karte: Kann auf eine der beiden abgebildeten Farben gelegt werden. Das Spiel läuft mit der anderen Farbe weiter.',
      it: 'Carta bicolore: può essere giocata su uno dei due colori raffigurati. Il gioco prosegue con l’altro colore.',
      fr: 'Carte bicolore : peut être posée sur l’une des deux couleurs représentées. Le jeu se poursuit avec l’autre couleur.',
    },
    tip: {
      en: 'Disrupts the color sequence your opponents are holding.',
      de: 'Stört gezielt die Farbstrategie der Mitspielenden.',
      it: 'Spezza il colore su cui gli avversari stavano accumulando carte.',
      fr: 'Brise la série de couleurs conservée par vos adversaires.',
    },
  },
  {
    id: 'thief',
    name: {
      en: 'Thief',
      de: 'Thief',
      it: 'Thief',
      fr: 'Thief',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-rose-500/15 text-rose-500 dark:text-rose-300 border-rose-500/30',
    icon: 'Grab',
    description: {
      en: 'Attack: Look at someone else’s hand of cards and put two of them into your own hand.',
      de: 'Angriff: Schau dir die Handkarten einer anderen Person an und nimm 2 davon auf deine eigene Hand.',
      it: 'Attacco: Guarda le carte in mano a un altro giocatore e prendine 2 da aggiungere alla tua mano.',
      fr: 'Attaque : Regardez la main d’un adversaire et prenez 2 de ses cartes pour les ajouter à votre main.',
    },
    tip: {
      en: 'Snatch an opponent’s winning card or inspect their hidden hand.',
      de: 'Reiß dem Gegner den Matchball weg und verschaff dir Einblick.',
      it: 'Sottrai l’ultima carta e scopri le strategie segrete del rivale.',
      fr: 'Volez la carte de la victoire et observez la main adverse.',
    },
  },
  {
    id: 'troublemaker',
    name: {
      en: 'Troublemaker',
      de: 'Troublemaker',
      it: 'Troublemaker',
      fr: 'Troublemaker',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-red-500/15 text-red-500 dark:text-red-300 border-red-500/30',
    icon: 'Flame',
    description: {
      en: 'Trigger an event immediately: Turn over the top event card from the event pile and execute its effect.',
      de: 'Löse sofort ein Ereignis aus: Decke die oberste Ereigniskarte auf und führe ihren Effekt aus.',
      it: 'Innesca subito un evento: gira la prima carta dal mazzo eventi ed eseguine l’effetto.',
      fr: 'Déclenche immédiatement un événement : retournez la première carte événement et appliquez son effet.',
    },
    tip: {
      en: 'Forces board chaos even without playing a black number card.',
      de: 'Erzwingt Chaos auf dem Tisch, ohne eine schwarze Zahlenkarte legen zu müssen.',
      it: 'Scatena il caos degli eventi senza bisogno di giocare un numero nero.',
      fr: 'Provoque le chaos d’un événement sans jouer de carte noire.',
    },
  },
  {
    id: 'recharge',
    name: {
      en: 'Recharge',
      de: 'Recharge',
      it: 'Recharge',
      fr: 'Recharge',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-yellow-500/15 text-yellow-500 dark:text-yellow-300 border-yellow-500/30',
    icon: 'BatteryCharging',
    description: {
      en: 'If possible, turn one of your own activated power cards back face down on the table. You can reuse it starting on your next turn.',
      de: 'Drehe eine deiner bereits aktivierten Powerkarten wieder verdeckt um. Sie ist ab deinem nächsten Spielzug wieder nutzbar.',
      it: 'Gira di nuovo a faccia in giù una delle tue carte potere già attivate. Potrai riutilizzarla a partire dal tuo prossimo turno.',
      fr: 'Retournez face cachée une de vos cartes pouvoir déjà activées. Elle redevient utilisable dès votre prochain tour.',
    },
    tip: {
      en: 'Essential in games using the Supercharge expansion.',
      de: 'Extrem wertvoll beim Spiel mit der Supercharge-Erweiterung.',
      it: 'Fondamentale quando si gioca con l’espansione Supercharge.',
      fr: 'Essentiel avec l’extension Supercharge.',
    },
  },
];
