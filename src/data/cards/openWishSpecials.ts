import { CardItem } from '@/types/rules';
import { CARD_POINTS } from '@/utils/scoring';

/** Open-wish special cards (7 points each, rulebook pp. 8–10). */
export const OPEN_WISH_SPECIAL_CARDS: CardItem[] = [
  {
    id: 'fantastic',
    name: {
      en: 'Fantastic',
      de: 'Fantastic',
      it: 'Fantastic',
      fr: 'Fantastic',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-indigo-500/15 text-indigo-500 dark:text-indigo-300 border-indigo-500/30',
    icon: 'Star',
    description: {
      en: 'Playable on all playing cards. Wish for a number or a colour (except for black). Has no special effect.',
      de: 'Auf jede Spielkarte legbar. Wünsche dir eine Zahl oder eine Farbe (ausser Schwarz). Kein Sondereffekt.',
      it: 'Giocabile su qualsiasi carta. Esprimi il desiderio per un numero o un colore (eccetto il nero). Nessun effetto speciale.',
      fr: 'Jouable sur n’importe quelle carte. Souhaitez un chiffre ou une couleur (sauf noir). Aucun effet spécial.',
    },
    tip: {
      en: 'Universal wildcard to steer the game to your advantage.',
      de: 'Der universelle Joker, um das Spiel in deine Wunschfarbe zu lenken.',
      it: 'Il jolly universale per impostare il colore che preferisci.',
      fr: 'Le joker universel pour orienter la partie à votre avantage.',
    },
  },
  {
    id: 'fantastic-four',
    name: {
      en: 'Fantastic Four',
      de: 'Fantastic Four',
      it: 'Fantastic Four',
      fr: 'Fantastic Four',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-violet-500/15 text-violet-500 dark:text-violet-300 border-violet-500/30',
    icon: 'Sparkles',
    description: {
      en: 'Attack: Mandatory to distribute four cards from the draw pile to your fellow players as you wish (select all recipients before they start drawing). + Wish for a number or colour (except black).',
      de: 'Angriff: Du musst 4 Karten vom Nachziehstapel beliebig an Mitspielende verteilen (wähle alle Zielpersonen vor dem Ziehen). + Wünsche dir eine Zahl oder Farbe (ausser Schwarz).',
      it: 'Attacco: Obbligatorio distribuire 4 carte dal mazzo ai compagni di gioco a tua scelta (nomina tutti i bersagli prima della pesca). + Desidera un numero o colore (non nero).',
      fr: 'Attaque : Obligatoire de distribuer 4 cartes de la pioche aux joueurs selon votre choix (désignez-les avant qu’ils ne piochent). + Souhaitez un chiffre ou une couleur (sauf noir).',
    },
    tip: {
      en: 'You can pile all 4 cards onto one rival or spread them among multiple players.',
      de: 'Du kannst alle 4 Karten auf eine Person konzentrieren oder beliebig aufteilen.',
      it: 'Puoi infliggere tutte e 4 le carte a un rivale o dividerle tra più giocatori.',
      fr: 'Vous pouvez donner les 4 cartes à un même rival ou les répartir.',
    },
  },
  {
    id: 'counterattack',
    name: {
      en: 'Counterattack',
      de: 'Counterattack',
      it: 'Counterattack',
      fr: 'Counterattack',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-orange-500/15 text-orange-500 dark:text-orange-300 border-orange-500/30',
    icon: 'ShieldAlert',
    description: {
      en: 'Optional reaction: Toss this card in when selected as the victim of an attack. The attack has no impact and you take over its full effect against any player(s). Does not count as your turn. Still wish for a colour. (Can be countered by another Counterattack).',
      de: 'Optional als Reaktion: Wirf diese Karte ein, wenn du Ziel eines Angriffs wirst. Der Angriff verpufft und du führst den vollen Effekt gegen beliebige Personen aus. Zählt nicht als Zug. Wünsche dir eine Farbe.',
      it: 'Reazione opzionale: cala subito questa carta quando subisci un attacco. L’attacco viene annullato e ne esegui tu l’effetto contro chiunque. Non conta come turno. Desidera un colore.',
      fr: 'Réaction optionnelle : Jouez cette carte dès qu’une attaque vous vise. L’attaque est annulée et vous appliquez l’effet complet contre qui vous voulez. Ne compte pas comme un tour. Souhaitez une couleur.',
    },
    tip: {
      en: 'The ultimate shield and reversal against hostile attacks.',
      de: 'Der mächtigste Schutzschild, um böse Angriffe direkt zurückzuschlagen.',
      it: 'Lo scudo definitivo per ribaltare gli attacchi contro i rivali.',
      fr: 'Le bouclier suprême pour renvoyer les attaques aux adversaires.',
    },
  },
  {
    id: 'equality',
    name: {
      en: 'Equality',
      de: 'Equality',
      it: 'Equality',
      fr: 'Equality',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-teal-500/15 text-teal-500 dark:text-teal-300 border-teal-500/30',
    icon: 'Equal',
    description: {
      en: 'Optional (attack): Select a person with fewer cards than you. That player must draw cards from the draw pile until they have the same number of cards in their hand as you. Wish for a colour.',
      de: 'Optional (Angriff): Wähle eine Person mit weniger Handkarten als du. Sie muss so viele Karten nachziehen, bis sie gleich viele Karten wie du hat. Wünsche dir eine Farbe.',
      it: 'Opzionale (attacco): Scegli un giocatore con meno carte di te. Quel giocatore deve pescare dal mazzo finché non ha lo stesso numero di carte che hai tu. Desidera un colore.',
      fr: 'Optionnel (attaque) : Choisissez un joueur ayant moins de cartes que vous. Il doit piocher jusqu’à avoir exactement le même nombre de cartes que vous. Souhaitez une couleur.',
    },
    tip: {
      en: 'Devastating against a leader sitting on 1 or 2 cards.',
      de: 'Vernichtend gegen Führende, die nur noch 1 oder 2 Karten auf der Hand haben.',
      it: 'Devastante contro chi è in testa con solo 1 o 2 carte rimaste.',
      fr: 'Dévastateur contre un meneur qui n’a plus qu’une ou deux cartes.',
    },
  },
  {
    id: 'inequality',
    name: {
      en: 'Inequality',
      de: 'Inequality',
      it: 'Inequality',
      fr: 'Inequality',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-amber-600/15 text-amber-600 dark:text-amber-400 border-amber-600/30',
    icon: 'Scale',
    description: {
      en: 'Optional (attack): Select someone with fewer or equal cards to you. That person must draw cards from your hand without looking until they have more cards in hand than you. Wish for a colour.',
      de: 'Optional (Angriff): Wähle jemanden mit gleich vielen oder weniger Karten. Diese Person muss blind Karten von deiner Hand ziehen, bis sie mehr Karten hat als du. Wünsche dir eine Farbe.',
      it: 'Opzionale (attacco): Scegli chi ha meno o pari carte rispetto a te. Quella persona deve pescare alla cieca dalla tua mano finché non ha più carte di te. Desidera un colore.',
      fr: 'Optionnel (attaque) : Choisissez un joueur ayant moins ou autant de cartes. Il doit tirer à l’aveugle dans votre main jusqu’à avoir plus de cartes que vous. Souhaitez une couleur.',
    },
    tip: {
      en: 'Allows you to dump multiple hand cards directly into a leading opponent’s hand.',
      de: 'Ermöglicht es, mehrere Handkarten direkt an einen Konkurrenten abzugeben.',
      it: 'Ti permette di sfoltire drasticamente la tua mano a spese di un rivale.',
      fr: 'Permet d’alléger considérablement votre main au détriment d’un rival.',
    },
  },
  {
    id: 'lucky-bastard',
    name: {
      en: 'Lucky Bastard',
      de: 'Lucky Bastard',
      it: 'Lucky Bastard',
      fr: 'Lucky Bastard',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-lime-500/15 text-lime-600 dark:text-lime-300 border-lime-500/30',
    icon: 'Clover',
    description: {
      en: 'Optional reaction: Playable at any time right before an event is revealed. The upcoming event does not affect you. (If the event ends the round, you score 0 points). Does not count as a turn. Wish for a colour.',
      de: 'Optional als Reaktion: Jederzeit direkt vor dem Aufdecken eines Ereignisses spielbar. Das kommende Ereignis betrifft dich nicht. (Endet die Runde, schreibst du 0 Punkte). Zählt nicht als Zug. Wünsche dir eine Farbe.',
      it: 'Reazione opzionale: giocabile in qualsiasi momento subito prima di rivelare un evento. L’evento in arrivo non ti colpisce (se chiude la manche, segni 0 punti). Non conta come turno. Desidera un colore.',
      fr: 'Réaction optionnelle : Jouable à tout moment juste avant qu’un événement ne soit révélé. L’événement ne vous affecte pas (s’il termine la manche, vous marquez 0 pt). Ne compte pas comme un tour. Souhaitez une couleur.',
    },
    tip: {
      en: 'Total immunity to catastrophic events like Doomsday, Time Bomb, or Tornado.',
      de: 'Volle Immunität gegen zerstörerische Ereignisse wie Doomsday oder Tornado.',
      it: 'Immunità totale contro eventi disastrosi come Doomsday o Tornado.',
      fr: 'Immunité totale contre les événements dévastateurs.',
    },
  },
  {
    id: 'nice-try',
    name: {
      en: 'Nice Try',
      de: 'Nice Try',
      it: 'Nice Try',
      fr: 'Nice Try',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-pink-500/15 text-pink-500 dark:text-pink-300 border-pink-500/30',
    icon: 'ThumbsDown',
    description: {
      en: 'Optional reaction: Play immediately when a player gets rid of their last card (after all effects and events in the turn resolve). That player must draw three new cards from the pile. The round continues without interruption. Does not count as a turn. Wish for a colour.',
      de: 'Optional als Reaktion: Sofort spielbar, wenn jemand die letzte Handkarte ablegt (nachdem alle Effekte/Ereignisse des Zuges abgeschlossen sind). Diese Person muss 3 Karten nachziehen. Die Runde geht weiter. Zählt nicht als Zug. Wünsche dir eine Farbe.',
      it: 'Reazione opzionale: giocabile appena un giocatore finisce le carte in mano (dopo aver risolto tutti gli effetti del turno). Quel giocatore deve pescare 3 nuove carte e la manche continua. Non conta come turno. Desidera un colore.',
      fr: 'Réaction optionnelle : Jouable dès qu’un joueur pose sa dernière carte (après résolution des effets). Il doit piocher 3 nouvelles cartes et la manche continue. Ne compte pas comme un tour. Souhaitez une couleur.',
    },
    tip: {
      en: 'Denies instant victory to someone about to close the round!',
      de: 'Verhindert den vorzeitigen Rundensieg eines Mitspielenden im allerletzten Moment!',
      it: 'Nega la vittoria immediata a chi credeva di aver già chiuso la manche!',
      fr: 'Empêche la victoire immédiate d’un joueur au tout dernier moment !',
    },
  },
  {
    id: 'special-favours',
    name: {
      en: 'Special Favours',
      de: 'Special Favours',
      it: 'Special Favours',
      fr: 'Special Favours',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 border-emerald-600/30',
    icon: 'Handshake',
    description: {
      en: 'Optional (attack): Select a person. Exchange all of your special cards (everything except number cards) with each other, irrespective of quantity. (Note: "Fuck You" can only be exchanged if you did not play Special Favours). Wish for a colour.',
      de: 'Optional (Angriff): Wähle eine Person. Tauscht alle eure Spezialkarten (alles ausser Zahlenkarten) untereinander aus, unabhängig von der Anzahl. (Hinweis: "Fuck You" darf nur getauscht werden, wenn du die Karte nicht gespielt hast). Wünsche dir eine Farbe.',
      it: 'Opzionale (attacco): Scegli una persona. Scambiatevi tutte le rispettive carte speciali (tutto tranne i numeri), indipendentemente dal numero. (Nota: "Fuck You" si può scambiare solo se non sei stato tu a giocare Special Favours). Desidera un colore.',
      fr: 'Optionnel (attaque) : Choisissez un joueur. Échangez toutes vos cartes spéciales respectives (tout sauf les cartes numéro), quel que soit leur nombre. (Note : "Fuck You" ne peut être échangée que si vous n’avez pas joué la carte). Souhaitez une couleur.',
    },
    tip: {
      en: 'Trade away 0 specials to steal all specials from a stacked opponent.',
      de: 'Tausche 0 Spezialkarten und kassiere alle Spezialkarten deines Opfers ein.',
      it: 'Cedi 0 speciali e fai man bassa di tutte le speciali dell’avversario.',
      fr: 'Donnez 0 spéciale et emparez-vous de toutes celles de votre adversaire.',
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
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-yellow-400/15 text-yellow-600 dark:text-yellow-300 border-yellow-400/30',
    icon: 'Lightbulb',
    description: {
      en: 'Optional (attack): Select two players (you can select yourself) and swap one power card between them. Both swapped power cards are placed face down. Wish for a colour.',
      de: 'Optional (Angriff): Wähle zwei Personen (auch dich selbst) und tausche je eine Powerkarte zwischen ihnen aus. Beide getauschten Powerkarten werden verdeckt abgelegt. Wünsche dir eine Farbe.',
      it: 'Opzionale (attacco): Scegli due giocatori (anche te stesso) e scambia una carta potere tra loro. Entrambe le carte potere scambiate vengono rimesse a faccia in giù. Desidera un colore.',
      fr: 'Optionnel (attaque) : Choisissez deux joueurs (vous y compris) et échangez une carte pouvoir entre eux. Les deux cartes pouvoir échangées sont remises face cachée. Souhaitez une couleur.',
    },
    tip: {
      en: 'Swap a used power card of yours for a fresh face-down one from an opponent.',
      de: 'Tausche deine verbrauchte Powerkarte gegen eine frische gegnerische ein.',
      it: 'Scambia una tua carta potere già usata con una fresca dell’avversario.',
      fr: 'Échangez un pouvoir utilisé contre un pouvoir frais d’un adversaire.',
    },
  },
  {
    id: 'update',
    name: {
      en: 'Update',
      de: 'Update',
      it: 'Update',
      fr: 'Update',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-blue-600/15 text-blue-600 dark:text-blue-400 border-blue-600/30',
    icon: 'RefreshCw',
    description: {
      en: 'Optional: Draw a power card face down from the power card deck and place it face down on the table. Put one of your other power cards back into the deck and shuffle it. Wish for a colour.',
      de: 'Optional: Ziehe eine Powerkarte verdeckt vom Powerkarten-Stapel und lege sie verdeckt ab. Mische eine deiner anderen Powerkarten zurück ins Deck. Wünsche dir eine Farbe.',
      it: 'Opzionale: Pesca una carta potere dal mazzo e posizionala coperta sul tavolo. Rimetti una delle tue altre carte potere nel mazzo e rimescolalo. Desidera un colore.',
      fr: 'Optionnel : Piochez une carte pouvoir face cachée et posez-la sur la table. Remettez une de vos autres cartes pouvoir dans la pioche et mélangez. Souhaitez une couleur.',
    },
    tip: {
      en: 'Cycle an already activated power card back into the deck for an unused one.',
      de: 'Tausche eine bereits aktivierte Powerkarte gegen eine unverbrauchte neue aus.',
      it: 'Rimpiazza una carta potere già consumata con una nuova e pronta all’uso.',
      fr: 'Remplacez une carte pouvoir déjà activée par une carte neuve.',
    },
  },
  {
    id: 'diy',
    name: {
      en: 'Do It Yourself',
      de: 'Do It Yourself',
      it: 'Do It Yourself',
      fr: 'Do It Yourself',
    },
    points: CARD_POINTS.SPECIAL,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-stone-500/15 text-stone-600 dark:text-stone-300 border-stone-500/30',
    icon: 'Wrench',
    description: {
      en: 'With this special card, you can determine the effect yourself before starting the game. (Official suggestion: immediately draw an additional rule card). Wish for a colour.',
      de: 'Bei dieser Spezialkarte bestimmt ihr den Effekt vor Spielbeginn selbst. (Offizieller Vorschlag: sofort eine zusätzliche Regelkarte aufdecken). Wünsche dir eine Farbe.',
      it: 'Con questa carta speciale decidete l’effetto voi stessi prima della partita. (Suggerimento ufficiale: pesca subito un’ulteriore carta regola). Desidera un colore.',
      fr: 'Avec cette carte, déterminez vous-même l’effet avant la partie. (Suggestion officielle : tirez immédiatement une carte règle supplémentaire). Souhaitez une couleur.',
    },
    tip: {
      en: 'Create a house rule or link it to drawing an extra rule card!',
      de: 'Erfindet eine eigene Hausregel oder koppelt sie an eine neue Regelkarte!',
      it: 'Inventa una regola della casa o collegala all’estrazione di una carta regola!',
      fr: 'Créez une règle maison ou liez-la au tirage d’une carte règle !',
    },
  },
];
