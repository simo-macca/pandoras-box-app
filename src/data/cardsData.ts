import { CardItem } from '../types/rules';

export const SPECIAL_CARD_POINTS = 7;
export const CURSE_POINTS = 13;
export const THE_END_POINTS = 17;
export const FUCK_YOU_POINTS = 42;
export const MIMICRY_POINTS = 7;
export const POWER_CARD_POINTS = 0;

export const CARDS_DATA: CardItem[] = [
  // STANDARD SPECIALS (7 Points each)
  {
    id: 'skip',
    name: {
      en: 'Skip',
      de: 'Aussetzen',
      it: 'Salta',
      fr: 'Passe ton tour',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-amber-500/15 text-amber-500 dark:text-amber-300 border-amber-500/30',
    icon: 'UserX',
    description: {
      en: 'Target player skips their next turn immediately.',
      de: 'Die gewählte Person muss ihren nächsten Spielzug komplett aussetzen.',
      it: 'Il giocatore bersaglio perde completamente il suo prossimo turno.',
      fr: 'Le joueur ciblé passe entièrement son prochain tour.',
    },
    tip: {
      en: 'Crucial to stop someone who just announced "Last Card"!',
      de: 'Ideal, um jemanden mit "Letzter Karte" vor dem Sieg zu stoppen!',
      it: 'Essenziale per fermare chi è a "Ultima carta"!',
      fr: 'Essentiel pour bloquer quelqu’un qui a "Dernière carte" !',
    },
  },
  {
    id: 'gift',
    name: {
      en: 'Gift',
      de: 'Geschenk',
      it: 'Regalo',
      fr: 'Cadeau',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-emerald-500/15 text-emerald-500 dark:text-emerald-300 border-emerald-500/30',
    icon: 'Gift',
    description: {
      en: 'Give 2 cards from your hand to another player. You choose the cards; the recipient cannot refuse.',
      de: 'Gib 2 Karten aus deiner Hand an eine andere Person ab. Du wählst die Karten frei aus.',
      it: 'Dai 2 carte dalla tua mano a un altro giocatore. Scegli tu quali carte regalare.',
      fr: 'Donnez 2 cartes de votre main à un adversaire de votre choix.',
    },
    tip: {
      en: 'Dump high-point cards or Fuck You onto leading opponents.',
      de: 'Perfekt, um hohe Zahlenkarten oder die Fuck You loszuwerden.',
      it: 'Ottima per rifilare carte ad alto valore o la Fuck You ai primi in classifica.',
      fr: 'Idéal pour refiler des cartes lourdes ou la Fuck You au meneur.',
    },
  },
  {
    id: 'exchange',
    name: {
      en: 'Exchange',
      de: 'Tausch',
      it: 'Scambio',
      fr: 'Échange',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-blue-500/15 text-blue-500 dark:text-blue-300 border-blue-500/30',
    icon: 'ArrowLeftRight',
    description: {
      en: 'Trade 1 card from your hand blindly or openly with an opponent.',
      de: 'Tausche 1 Handkarte mit einer beliebigen anderen Person.',
      it: 'Scambia 1 carta dalla tua mano con un avversario a tua scelta.',
      fr: 'Échangez 1 carte de votre main avec un autre joueur.',
    },
    tip: {
      en: 'Can be used to steal an opponent’s suspected winning card.',
      de: 'Kann genutzt werden, um dem Gegner eine Schlüsselkarte wegzuschnappen.',
      it: 'Usala per sottrarre l’ultima carta a un rivale sul punto di chiudere.',
      fr: 'Utile pour voler une carte décisive à un adversaire.',
    },
  },
  {
    id: 'second-chance',
    name: {
      en: '2nd Chance',
      de: '2. Chance',
      it: '2ª Possibilità',
      fr: '2e Chance',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-cyan-500/15 text-cyan-500 dark:text-cyan-300 border-cyan-500/30',
    icon: 'RotateCcw',
    description: {
      en: 'You immediately get to take another turn right away.',
      de: 'Du bist sofort noch einmal an der Reihe und darfst einen weiteren Zug machen.',
      it: 'Hai immediatamente diritto a giocare un altro turno di seguito.',
      fr: 'Vous avez immédiatement le droit de rejouer un tour complet.',
    },
    tip: {
      en: 'Chain cards together to empty your hand fast.',
      de: 'Hervorragend, um Handkarten schnell abzubauen.',
      it: 'Perfetta per concatenare carte e svuotare la mano in un colpo solo.',
      fr: 'Idéal pour enchaîner et vider votre main en un instant.',
    },
  },
  {
    id: 'colour-swap',
    name: {
      en: 'Colour Swap',
      de: 'Farbtausch',
      it: 'Cambio Colore',
      fr: 'Changement de Couleur',
    },
    points: 7,
    category: 'special',
    subCategory: '2-colour',
    badgeColor:
      'bg-purple-500/15 text-purple-500 dark:text-purple-300 border-purple-500/30',
    icon: 'Pipette',
    description: {
      en: 'Changes the active color of the discard pile to the other color depicted on the card.',
      de: 'Wechselt die Spielfarbe auf die andere abgebildete Farbe der Karte.',
      it: 'Cambia il colore attivo del mazzo scarti nell’altro colore raffigurato.',
      fr: 'Change la couleur active vers la seconde couleur présente sur la carte.',
    },
    tip: {
      en: 'Disrupts the color sequence opponents are hoarding.',
      de: 'Stört die Farbreihenfolge der Mitspielenden gezielt.',
      it: 'Rompe la serie di colore su cui gli avversari facevano affidamento.',
      fr: 'Brise la série de couleurs sur laquelle misaient vos rivaux.',
    },
  },
  {
    id: 'thief',
    name: {
      en: 'Thief',
      de: 'Dieb',
      it: 'Ladro',
      fr: 'Voleur',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-rose-500/15 text-rose-500 dark:text-rose-300 border-rose-500/30',
    icon: 'Grab',
    description: {
      en: 'Steal 1 random card from an opponent’s hand and add it to yours.',
      de: 'Ziehe 1 zufällige Karte aus der Hand einer anderen Person.',
      it: 'Ruba 1 carta a caso dalla mano di un avversario e aggiungila alla tua.',
      fr: 'Volez 1 carte au hasard dans la main d’un adversaire.',
    },
    tip: {
      en: 'Risky, but you might draw something powerful or snatch their last card.',
      de: 'Kann dem Gegner den Matchball entreißen.',
      it: 'Può sventare la chiusura di un giocatore ad una carta sola.',
      fr: 'Peut priver un adversaire de sa dernière carte salvatrice.',
    },
  },
  {
    id: 'troublemaker',
    name: {
      en: 'Troublemaker',
      de: 'Unruhestifter',
      it: 'Attaccabrighe',
      fr: 'Fauteur de Troubles',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-red-500/15 text-red-500 dark:text-red-300 border-red-500/30',
    icon: 'Flame',
    description: {
      en: 'Target player must draw 2 cards immediately from the draw deck.',
      de: 'Die gewählte Person muss sofort 2 Karten vom Nachziehstapel ziehen.',
      it: 'Il giocatore designato deve pescare immediatamente 2 carte dal mazzo.',
      fr: 'Le joueur ciblé doit immédiatement piocher 2 cartes du talon.',
    },
    tip: {
      en: 'Direct offensive hit against opponents who are nearly empty-handed.',
      de: 'Harter Treffer gegen Personen mit wenigen Handkarten.',
      it: 'Attacco diretto micidiale contro chi ha pochissime carte.',
      fr: 'Coup dur pour les adversaires sur le point de gagner.',
    },
  },
  {
    id: 'recharge',
    name: {
      en: 'Recharge',
      de: 'Aufladen',
      it: 'Ricarica',
      fr: 'Recharge',
    },
    points: 7,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-yellow-500/15 text-yellow-500 dark:text-yellow-300 border-yellow-500/30',
    icon: 'BatteryCharging',
    description: {
      en: 'Recharge your Power Cards (Supercharge expansion) or choose the active colour.',
      de: 'Lade deine Powerkarten wieder auf oder bestimme die nächste Spielfarbe.',
      it: 'Ricarica le tue carte potere Supercharge o scegli il prossimo colore.',
      fr: 'Rechargez vos cartes pouvoir Supercharge ou déterminez la couleur.',
    },
  },
  {
    id: 'fantastic',
    name: {
      en: 'Fantastic',
      de: 'Fantastisch',
      it: 'Fantastico',
      fr: 'Fantastique',
    },
    points: 7,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-indigo-500/15 text-indigo-500 dark:text-indigo-300 border-indigo-500/30',
    icon: 'Star',
    description: {
      en: 'Wild card! Can be played on anything. You choose the next colour.',
      de: 'Joker! Kann auf jede Karte gelegt werden. Du bestimmst die nächste Spielfarbe.',
      it: 'Jolly universale! Si gioca su qualsiasi carta. Scegli tu il prossimo colore.',
      fr: 'Joker ! Peut être posé sur n’importe quelle carte. Vous choisissez la couleur.',
    },
  },
  {
    id: 'fantastic-four',
    name: {
      en: 'Fantastic Four',
      de: 'Fantastische Vier',
      it: 'Fantastici Quattro',
      fr: 'Quatre Fantastiques',
    },
    points: 7,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-violet-500/15 text-violet-500 dark:text-violet-300 border-violet-500/30',
    icon: 'Sparkles',
    description: {
      en: 'Wild card: Choose colour, and target player draws 4 cards!',
      de: 'Joker: Bestimme die Farbe, und eine gewählte Person zieht 4 Strafkarten!',
      it: 'Jolly: Scegli il colore e fai pescare 4 carte penalità a un giocatore!',
      fr: 'Joker : Choisissez la couleur, et un joueur ciblé pioche 4 cartes !',
    },
  },
  {
    id: 'counterattack',
    name: {
      en: 'Counterattack',
      de: 'Konter',
      it: 'Contrattacco',
      fr: 'Contre-attaque',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-orange-500/15 text-orange-500 dark:text-orange-300 border-orange-500/30',
    icon: 'ShieldAlert',
    description: {
      en: 'Defend against an attack and bounce the effect back to the attacker or someone else.',
      de: 'Wehrt einen gegnerischen Angriff ab und leitet ihn zurück oder weiter.',
      it: 'Blocca un attacco e rimanda l’effetto all’aggressore o a un altro giocatore.',
      fr: 'Bloque une attaque et renvoie l’effet à l’attaquant ou à un tiers.',
    },
  },
  {
    id: 'equality',
    name: {
      en: 'Equality',
      de: 'Gleichheit',
      it: 'Uguaglianza',
      fr: 'Égalité',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-teal-500/15 text-teal-500 dark:text-teal-300 border-teal-500/30',
    icon: 'Equal',
    description: {
      en: 'All players who have fewer cards than you must draw until they have as many cards as you do.',
      de: 'Alle Personen mit weniger Karten als du ziehen auf deine Handkartenzahl auf.',
      it: 'Tutti i giocatori con meno carte di te devono pescare fino a pareggiarti.',
      fr: 'Tous les joueurs ayant moins de cartes que vous piochent jusqu’à égalité.',
    },
  },
  {
    id: 'inequality',
    name: {
      en: 'Inequality',
      de: 'Ungleichheit',
      it: 'Disuguaglianza',
      fr: 'Inégalité',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-amber-600/15 text-amber-600 dark:text-amber-400 border-amber-600/30',
    icon: 'Scale',
    description: {
      en: 'Forces card redistribution creating stark imbalances across the table.',
      de: 'Erzeugt drastische Ungleichheiten bei der Kartenverteilung.',
      it: 'Genera forti squilibri nella distribuzione delle carte al tavolo.',
      fr: 'Crée un déséquilibre frappant dans les mains des joueurs.',
    },
  },
  {
    id: 'lucky-bastard',
    name: {
      en: 'Lucky Bastard',
      de: 'Glückspilz',
      it: 'Bastardo Fortunato',
      fr: 'Veinard',
    },
    points: 7,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-lime-500/15 text-lime-600 dark:text-lime-300 border-lime-500/30',
    icon: 'Clover',
    description: {
      en: 'Discards your hand down to match whoever holds the lowest card count.',
      de: 'Passe deine Handkartenzahl nach unten an die niedrigste am Tisch an.',
      it: 'Scarta carte fino a raggiungere la mano più piccola al tavolo.',
      fr: 'Défaussez des cartes pour égaler la main la plus courte de la table.',
    },
  },
  {
    id: 'nice-try',
    name: {
      en: 'Nice Try',
      de: 'Netter Versuch',
      it: 'Bel Tentativo',
      fr: 'Bien Essayé',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-pink-500/15 text-pink-500 dark:text-pink-300 border-pink-500/30',
    icon: 'ThumbsDown',
    description: {
      en: 'Cancels the played card effect completely right before it resolves.',
      de: 'Neutralisiert den soeben gespielten Karteneffekt vollständig.',
      it: 'Annulla all’istante l’effetto della carta appena calata.',
      fr: 'Annule instantanément l’effet de la carte qui vient d’être posée.',
    },
  },
  {
    id: 'special-favours',
    name: {
      en: 'Special Favours',
      de: 'Gefälligkeit',
      it: 'Favori Speciali',
      fr: 'Faveurs Spéciales',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 border-emerald-600/30',
    icon: 'Handshake',
    description: {
      en: 'Demand a card of a specified colour or number from any opponent.',
      de: 'Verlange von einer Person eine bestimmte Farbe oder Zahl.',
      it: 'Esigi da un avversario una carta di un colore o numero specifico.',
      fr: 'Exigez d’un joueur une carte d’une couleur ou d’un chiffre précis.',
    },
  },
  {
    id: 'edison',
    name: {
      en: 'Edison',
      de: 'Edison',
      it: 'Edison',
      fr: 'Edison',
    },
    points: 7,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-yellow-400/15 text-yellow-600 dark:text-yellow-300 border-yellow-400/30',
    icon: 'Lightbulb',
    description: {
      en: 'Invent a new rule or condition valid until Edison is covered by another card.',
      de: 'Erfinde eine Spielregel, die gilt, bis Edison überdeckt wird.',
      it: 'Stabilisci una regola provvisoria valida finché Edison non viene coperto.',
      fr: 'Inventez une règle valable jusqu’à ce qu’Edison soit recouvert.',
    },
  },
  {
    id: 'update',
    name: {
      en: 'Update',
      de: 'Update',
      it: 'Update',
      fr: 'Mise à Jour',
    },
    points: 7,
    category: 'special',
    subCategory: '1-colour',
    badgeColor:
      'bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-600/30',
    icon: 'RefreshCw',
    description: {
      en: 'All players must refresh their hands by discarding 1 card and drawing 1 card.',
      de: 'Alle Mitspielenden legen 1 Karte ab und ziehen 1 neue Karte.',
      it: 'Tutti i giocatori scartano 1 carta e ne pescano 1 nuova dal mazzo.',
      fr: 'Tous les joueurs défaussent 1 carte et en piochent 1 nouvelle.',
    },
  },
  {
    id: 'diy',
    name: {
      en: 'Do It Yourself',
      de: 'Selbermacher',
      it: 'Fai Da Te',
      fr: 'Fais-le Toi-même',
    },
    points: 7,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-stone-500/15 text-stone-600 dark:text-stone-300 border-stone-500/30',
    icon: 'Wrench',
    description: {
      en: 'Choose any standard special card effect and trigger it immediately.',
      de: 'Kopiere den Effekt einer beliebigen regulären Spezialkarte.',
      it: 'Replica l’effetto di una qualsiasi carta speciale standard a tua scelta.',
      fr: 'Copiez l’effet d’une carte spéciale standard de votre choix.',
    },
  },

  // UNIQUE SPECIAL CARDS (Curse = 13, The End = 17, Fuck You = 42, Mimicry = 7)
  {
    id: 'curse',
    name: {
      en: 'Curse',
      de: 'Fluch',
      it: 'Maledizione',
      fr: 'Malédiction',
    },
    points: 13,
    category: 'unique',
    subCategory: 'unique',
    badgeColor: 'bg-purple-600/20 text-purple-400 border-purple-500/40',
    icon: 'Skull',
    description: {
      en: 'Worth 13 penalty points! Curses the recipient to draw +1 penalty whenever they draw.',
      de: 'Zählt 13 Strafpunkte! Verflucht die Person: bei jedem Ziehen +1 Zusatzkarte.',
      it: 'Vale 13 punti penalità! Maledice chi la riceve: pesca +1 carta ogni volta.',
      fr: 'Vaut 13 points de pénalité ! Le joueur maudit pioche 1 carte en plus à chaque pioche.',
    },
    tip: {
      en: 'Get rid of this before the round ends at all costs!',
      de: 'Werde diese Karte unbedingt vor dem Rundenende los!',
      it: 'Sbarazzatene a ogni costo prima che il round finisca!',
      fr: 'Débarrassez-vous-en à tout prix avant la fin de manche !',
    },
  },
  {
    id: 'the-end',
    name: {
      en: 'The End',
      de: 'Das Ende',
      it: 'La Fine',
      fr: 'La Fin',
    },
    points: 17,
    category: 'unique',
    subCategory: 'unique',
    badgeColor: 'bg-red-700/20 text-red-400 border-red-600/40',
    icon: 'Hourglass',
    description: {
      en: 'Worth 17 penalty points! When played, the round ends in exactly 3 turns if not countered.',
      de: 'Zählt 17 Strafpunkte! Leitet das vorzeitige Ende der Spielrunde ein.',
      it: 'Vale 17 punti penalità! Fa scattare il conto alla rovescia finale della manche.',
      fr: 'Vaut 17 points de pénalité ! Enclenche la fin prématurée de la manche.',
    },
    tip: {
      en: 'Dangerous to hold, devastating to time properly.',
      de: 'Riskant auf der Hand, aber ein mächtiger Rundenschluss.',
      it: 'Pesante da tenere in mano, ma micidiale al momento giusto.',
      fr: 'Très pénalisante en main, mais dévastatrice bien jouée.',
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
    points: 42,
    category: 'unique',
    subCategory: 'unique',
    badgeColor:
      'bg-red-500 text-white font-extrabold shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    icon: 'Zap',
    description: {
      en: 'The most infamous card: 42 PENALTY POINTS! Can only be passed under strict conditions.',
      de: 'Die berüchtigtste Karte: Satte 42 STRAFPUNKTE! Kann nur unter Bedingungen abgegeben werden.',
      it: 'La carta più temuta: ben 42 PUNTI PENALITÀ! Cedibile solo a condizioni specifiche.',
      fr: 'La carte la plus redoutée : 42 POINTS DE PÉNALITÉ ! Très difficile à céder.',
    },
    tip: {
      en: 'Holding this when the round ends usually leads to catastrophic defeat!',
      de: 'Bleibt man am Rundenende darauf sitzen, droht die sofortige Niederlage!',
      it: 'Restare con questa carta in mano a fine round è letale per la vittoria!',
      fr: 'Garder cette carte en fin de manche est presque synonyme de défaite !',
    },
  },
  {
    id: 'mimicry',
    name: {
      en: 'Mimicry',
      de: 'Mimikry',
      it: 'Mimetismo',
      fr: 'Mimétisme',
    },
    points: 7,
    category: 'unique',
    subCategory: 'unique',
    badgeColor: 'bg-teal-600/20 text-teal-400 border-teal-500/40',
    icon: 'CopyCheck',
    description: {
      en: 'Copies any played card’s property or color. Worth 7 penalty points at round end.',
      de: 'Kopiert die Eigenschaft oder Farbe einer beliebigen Karte. Zählt 7 Strafpunkte.',
      it: 'Copia colore ed effetto di una qualsiasi carta giocata. Vale 7 punti penalità.',
      fr: 'Copie l’effet ou la couleur d’une carte jouée. Vaut 7 points de pénalité.',
    },
  },
];
