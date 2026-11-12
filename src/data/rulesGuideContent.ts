import { LocalizedMap } from '@/types/rules';

/**
 * Localized text of the in-app rules summary (Rules tab). Page numbers refer
 * to the official English rulebook in public/rules/.
 *
 * `**text**` marks bold text; it is rendered by the RichText component.
 */
export const RULES_GUIDE = {
  goal: {
    title: {
      en: 'Goal of the Game',
      de: 'Ziel des Spiels',
      it: 'Scopo del Gioco',
      fr: 'But du Jeu',
    },
    // p. 4
    body: {
      en: 'In Frantic – the mischievous card game – you try to **get rid of your entire hand of cards as quickly as possible**. As soon as one player is out of cards, the round ends and the cards left in everyone else’s hands count as **points** (which is bad!). Round after round, you add up your points until someone **exceeds the set point limit**. The person with the **fewest points wins**!',
      de: 'Bei Frantic versucht ihr in jeder Runde, **möglichst schnell alle Handkarten loszuwerden**. Sobald eine Person keine Karten mehr hat, endet die Runde und die verbliebenen Handkarten der anderen werden als **Punkte** gezählt (was schlecht ist!). Runde für Runde addiert ihr eure Punkte, bis jemand das **Punktelimit überschreitet**. Dann gewinnt die Person mit den **wenigsten Punkten**!',
      it: 'In Frantic – il subdolo gioco di carte – l’obiettivo di ogni round è **sbarazzarsi il più rapidamente possibile di tutte le carte in mano**. Non appena un giocatore resta senza carte, il round termina e le carte rimaste in mano agli altri contano come **punti** (ed è un male!). Round dopo round i punti si sommano finché qualcuno **supera il punteggio limite**: a quel punto **vince chi ha il punteggio più basso**!',
      fr: 'Dans Frantic, vous tentez de **vous débarrasser le plus vite possible de toutes vos cartes en main**. Dès qu’un joueur n’a plus de cartes, la manche prend fin et les cartes restantes des autres comptent comme des **points** (ce qui est mauvais !). Manche après manche, les points s’accumulent jusqu’à ce qu’un joueur **dépasse la limite de points**. Le joueur avec **le moins de points gagne** !',
    },
  },
  preparation: {
    title: {
      en: 'Preparation & Official Point Limits',
      de: 'Vorbereitung & Offizielle Punktelimits',
      it: 'Preparazione & Limiti Ufficiali',
      fr: 'Préparation & Limites Officielles',
    },
    fewPlayers: {
      en: '2–4 Players',
      de: '2–4 Spieler',
      it: '2–4 Giocatori',
      fr: '2–4 Joueurs',
    },
    manyPlayers: {
      en: '5–8 Players',
      de: '5–8 Spieler',
      it: '5–8 Giocatori',
      fr: '5–8 Joueurs',
    },
    // p. 4
    items: [
      {
        label: {
          en: 'Hand cards:',
          de: 'Handkarten:',
          it: 'Carte iniziali:',
          fr: 'Cartes en main :',
        },
        text: {
          en: 'Deal 7 cards to each player (to shorten rounds you may deal fewer, but never fewer than 4).',
          de: 'Teile allen 7 Handkarten aus (für kürzere Runden weniger, aber nie weniger als 4).',
          it: 'Distribuisci 7 carte a ciascun giocatore (per round più brevi anche meno, ma mai meno di 4).',
          fr: 'Distribuez 7 cartes à chaque joueur (moins pour raccourcir les manches, mais jamais moins de 4).',
        },
      },
      {
        label: {
          en: 'Dealer:',
          de: 'Geber:',
          it: 'Mazziere:',
          fr: 'Donneur :',
        },
        text: {
          en: 'Round 1: the owner of the game. Afterwards, the person who lost the last round (scored the most points).',
          de: 'In Runde 1 die Person, der das Spiel gehört. Danach die Person, welche die letzte Runde verloren hat (meiste Punkte).',
          it: 'Al round 1 il proprietario del gioco. Nei round successivi, chi ha perso l’ultimo round (più punti).',
          fr: 'Manche 1 : le propriétaire du jeu. Ensuite, le perdant de la manche précédente (le plus de points).',
        },
      },
      {
        label: {
          en: 'Discard pile:',
          de: 'Ablagestapel:',
          it: 'Inizio scarti:',
          fr: 'Défausse :',
        },
        text: {
          en: 'Turn over the top card of the draw pile and treat it as if the dealer had played it, with all its effects.',
          de: 'Decke die oberste Karte des Nachziehstapels auf und behandle sie, als hätte der Geber sie mit allen Effekten gespielt.',
          it: 'Gira la prima carta del mazzo: considerala giocata dal mazziere, con tutti i suoi effetti.',
          fr: 'Retournez la première carte de la pioche et traitez-la comme si le donneur l’avait jouée, avec tous ses effets.',
        },
      },
      {
        label: {
          en: 'Direction:',
          de: 'Spielrichtung:',
          it: 'Senso di gioco:',
          fr: 'Sens du jeu :',
        },
        text: {
          en: 'The game is played anticlockwise.',
          de: 'Es wird im Gegenuhrzeigersinn gespielt.',
          it: 'Si gioca in senso antiorario.',
          fr: 'Le jeu se déroule dans le sens antihoraire.',
        },
      },
    ] as { label: LocalizedMap; text: LocalizedMap }[],
  },
  turns: {
    title: {
      en: 'Taking Turns & Round End',
      de: 'Spielzug & Rundenende',
      it: 'Svolgimento del Turno & Fine Round',
      fr: 'Tour de Jeu & Fin de Manche',
    },
    // p. 4
    body: {
      en: 'On your turn you may play one card from your hand; which cards you may play depends on the top card of the discard pile. If you can’t or don’t want to play, draw a card from the draw pile. Even after drawing, you may still play a card.',
      de: 'In deinem Zug darfst du eine Handkarte spielen; welche, hängt von der obersten Karte des Ablagestapels ab. Kannst oder willst du nicht spielen, ziehst du eine Karte. Auch nach dem Ziehen darfst du noch eine Karte spielen.',
      it: 'Nel tuo turno puoi giocare una carta dalla mano; quali carte puoi giocare dipende dalla carta in cima agli scarti. Se non puoi o non vuoi giocare, pesca una carta. Anche dopo aver pescato puoi ancora giocare una carta.',
      fr: 'À votre tour, vous pouvez jouer une carte de votre main ; les cartes jouables dépendent de la carte du dessus de la défausse. Si vous ne pouvez ou ne voulez pas jouer, piochez une carte. Même après avoir pioché, vous pouvez encore jouer une carte.',
    },
    endTitle: {
      en: 'The round ends when:',
      de: 'Die Runde endet, wenn:',
      it: 'Il round termina quando:',
      fr: 'La manche prend fin lorsque :',
    },
    // p. 5
    endConditions: [
      {
        en: 'one player has no cards left in their hand;',
        de: 'eine Person keine Handkarten mehr hat;',
        it: 'un giocatore non ha più carte in mano;',
        fr: 'un joueur n’a plus de cartes en main ;',
      },
      {
        en: 'a player has to draw a card, but the draw pile is used up.',
        de: 'eine Person ziehen muss, der Nachziehstapel aber aufgebraucht ist.',
        it: 'un giocatore deve pescare, ma il mazzo è esaurito.',
        fr: 'un joueur doit piocher, mais la pioche est épuisée.',
      },
    ] as LocalizedMap[],
  },
  points: {
    title: {
      en: 'Round-End Point Values',
      de: 'Punktewerte am Rundenende',
      it: 'Valori dei Punti a Fine Round',
      fr: 'Décompte des Points',
    },
    numberCards: {
      en: 'Number cards (coloured & black)',
      de: 'Zahlenkarten (farbig & schwarz)',
      it: 'Carte numero (colorate & nere)',
      fr: 'Cartes numéro (couleur & noires)',
    },
    specialCards: {
      en: 'Plain-/bi-coloured & open-wish special cards',
      de: 'Ein-/zweifarbige & Wunsch-Spezialkarten',
      it: 'Carte speciali mono/bicolore & a richiesta libera',
      fr: 'Cartes spéciales uni/bicolores & à souhait libre',
    },
    curse: {
      en: 'Unplayable',
      de: 'Nicht spielbar',
      it: 'Non giocabile',
      fr: 'Injouable',
    },
    theEnd: {
      en: 'Last card only',
      de: 'Nur als letzte Karte',
      it: 'Solo come ultima carta',
      fr: 'Dernière carte uniquement',
    },
    mimicry: {
      en: 'Imitates specials',
      de: 'Imitiert Spezialkarten',
      it: 'Imita altre speciali',
      fr: 'Imite les spéciales',
    },
    fuckYou: {
      en: 'Playable with exactly 10 cards',
      de: 'Nur bei genau 10 Karten spielbar',
      it: 'Giocabile solo con 10 carte',
      fr: 'Jouable avec exactement 10 cartes',
    },
    // p. 5
    powerCardsNote: {
      en: 'Power cards (Supercharge) are not hand cards and count 0 points.',
      de: 'Powerkarten (Supercharge) sind keine Handkarten und zählen 0 Punkte.',
      it: 'Le carte Power (Supercharge) non sono carte in mano e valgono 0 punti.',
      fr: 'Les cartes pouvoir (Supercharge) ne sont pas des cartes en main et valent 0 point.',
    },
  },
  blackCards: {
    title: {
      en: 'Black Cards & Events',
      de: 'Schwarze Karten & Ereignisse',
      it: 'Carte Nere & Eventi',
      fr: 'Cartes Noires & Événements',
    },
    // p. 12
    body: {
      en: 'Every time a **black number card** is played, an **event card is triggered**: turn over the top event card and execute its effect.',
      de: 'Jedes Mal, wenn eine **schwarze Zahlenkarte** gespielt wird, wird ein **Ereignis ausgelöst**: Decke die oberste Ereigniskarte auf und führe sie aus.',
      it: 'Ogni volta che viene giocata una **carta numero nera**, si **attiva un evento**: si scopre la prima carta evento e se ne esegue l’effetto.',
      fr: 'Chaque fois qu’une **carte numéro noire** est jouée, un **événement est déclenché** : retournez la première carte événement et appliquez son effet.',
    },
    ruleTitle: {
      en: 'Golden rule on black cards:',
      de: 'Goldene Regel für schwarze Karten:',
      it: 'Regola d’oro sulle carte nere:',
      fr: 'Règle d’or des cartes noires :',
    },
    // p. 5
    rule: {
      en: '**Black is not a colour**: it can’t be wished for or followed by another black card. A black card can only be followed by the **same number** or by an **open-wish special card** (e.g. Fantastic).',
      de: '**Schwarz ist keine Farbe**: Es kann weder gewünscht noch von einer anderen schwarzen Karte gefolgt werden. Auf eine schwarze Karte darf nur **dieselbe Zahl** oder eine **Wunsch-Spezialkarte** (z. B. Fantastic) folgen.',
      it: 'Il **nero non è un colore**: non può essere richiesto né seguito da un’altra carta nera. Una carta nera può essere seguita solo dallo **stesso numero** o da una **carta speciale a richiesta libera** (es. Fantastic).',
      fr: 'Le **noir n’est pas une couleur** : il ne peut être ni souhaité ni suivi d’une autre carte noire. Une carte noire ne peut être suivie que du **même chiffre** ou d’une **carte spéciale à souhait libre** (ex. Fantastic).',
    },
  },
  powerCards: {
    title: {
      en: 'Power Cards (Supercharge)',
      de: 'Powerkarten (Supercharge)',
      it: 'Carte Power (Supercharge)',
      fr: 'Cartes Pouvoir (Supercharge)',
    },
    // p. 18
    body: {
      en: 'Power cards lie face down on the table (not in your hand) and are **activated by turning them over** during your own turn, when you play a hand card. The symbol in the corner decides the order:',
      de: 'Powerkarten liegen verdeckt auf dem Tisch (nicht auf der Hand) und werden im eigenen Zug beim Ausspielen einer Handkarte **durch Aufdecken aktiviert**. Das Symbol in der Ecke bestimmt die Reihenfolge:',
      it: 'Le carte Power restano coperte sul tavolo (non in mano) e si **attivano scoprendole** nel proprio turno mentre si gioca una carta. Il simbolo nell’angolo indica l’ordine:',
      fr: 'Les cartes pouvoir restent face cachée sur la table (pas en main) et sont **activées en les retournant** pendant votre tour, en jouant une carte. Le symbole dans le coin indique l’ordre :',
    },
    firstLabel: {
      en: 'Before the hand card',
      de: 'Vor der Handkarte',
      it: 'Prima della carta',
      fr: 'Avant la carte',
    },
    // pp. 19–20
    first: {
      en: 'The power effect is executed BEFORE the hand card (e.g. All Draw One, Special Charge, Special Seal).',
      de: 'Der Power-Effekt wird VOR der Handkarte ausgeführt (z. B. All Draw One, Special Charge, Special Seal).',
      it: 'L’effetto Power viene eseguito PRIMA della carta giocata (es. All Draw One, Special Charge, Special Seal).',
      fr: 'L’effet pouvoir est appliqué AVANT la carte jouée (ex. All Draw One, Special Charge, Special Seal).',
    },
    secondLabel: {
      en: 'After the hand card',
      de: 'Nach der Handkarte',
      it: 'Dopo la carta',
      fr: 'Après la carte',
    },
    second: {
      en: 'The power effect is executed AFTER the hand card (e.g. Black Wish, Colour Blockade, Troublecharger).',
      de: 'Der Power-Effekt wird NACH der Handkarte ausgeführt (z. B. Black Wish, Colour Blockade, Troublecharger).',
      it: 'L’effetto Power viene eseguito DOPO la carta giocata (es. Black Wish, Colour Blockade, Troublecharger).',
      fr: 'L’effet pouvoir est appliqué APRÈS la carte jouée (ex. Black Wish, Colour Blockade, Troublecharger).',
    },
  },
} satisfies Record<string, Record<string, unknown>>;
