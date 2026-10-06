import { CardItem } from '../types/rules';

export const SPECIAL_CARD_POINTS = 7;
export const CURSE_POINTS = 13;
export const THE_END_POINTS = 17;
export const FUCK_YOU_POINTS = 42;
export const MIMICRY_POINTS = 7;
export const POWER_CARD_POINTS = 0;

export const CARDS_DATA: CardItem[] = [
  // COLOURED & BI-COLOURED SPECIAL CARDS (7 Points each)
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
      en: 'Attack: Select a player to be skipped in the next round. (Note: You are not allowed to select a player who is already being skipped in that round).',
      de: 'Angriff: Wähle eine Person, die in der nächsten Runde aussetzen muss. (Hinweis: Niemand darf gewählt werden, der in dieser Runde bereits aussetzen muss).',
      it: 'Attacco: Scegli un giocatore che deve saltare il prossimo round. (Nota: non puoi scegliere chi deve già saltare in questo round).',
      fr: 'Attaque : Choisissez un joueur qui passera son tour au prochain tour. (Note : Vous ne pouvez pas choisir un joueur qui passe déjà).',
    },
    tip: {
      en: 'Crucial to stop an opponent who announced "Last Card" or is about to win!',
      de: 'Ideal, um jemanden mit "Letzter Karte" vor dem Sieg zu stoppen!',
      it: 'Essenziale per fermare chi ha annunciato "Ultima carta"!',
      fr: 'Essentiel pour bloquer un adversaire qui a annoncé "Dernière carte" !',
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
      en: 'Attack: Give two cards from your hand to another player. (Note: If you only have one card left, give just that card away. If played as your last card, still select a target player).',
      de: 'Angriff: Gib 2 Handkarten an eine andere Person ab. (Hinweis: Wer nur 1 Karte hat, gibt nur diese ab. Wird Gift als letzte Karte gespielt, wähle dennoch eine Zielperson).',
      it: 'Attacco: Dai 2 carte dalla tua mano a un altro giocatore. (Nota: se hai solo 1 carta, cedi solo quella. Se giocata come ultima carta, scegli comunque il bersaglio).',
      fr: 'Attaque : Donnez 2 cartes de votre main à un joueur. (Note : s’il ne vous reste qu’une carte, donnez-la. Jouée comme dernière carte, désignez quand même une cible).',
    },
    tip: {
      en: 'Dump high-point cards onto opponents. (Note: "Fuck You" cannot be given away with Gift).',
      de: 'Perfekt für hohe Punktkarten. (Hinweis: "Fuck You" darf nicht per Gift verschenkt werden).',
      it: 'Ottima per cedere carte pesanti. (Nota: "Fuck You" non può essere ceduta con Regalo).',
      fr: 'Idéal pour refiler des points. (Note : "Fuck You" ne peut pas être donnée avec Cadeau).',
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
      en: 'Attack: Give someone two cards from your hand and draw two cards from the same person without looking before they put your cards in their hand. (If someone has only one card, the exchange is 2-for-1, 1-for-2, or 1-for-1).',
      de: 'Angriff: Gib einer Person 2 Handkarten und ziehe blind 2 Karten von derselben Person, bevor diese deine Karten aufnimmt. (Bei 1 Karte: 2 gegen 1, 1 gegen 2 oder 1 gegen 1).',
      it: 'Attacco: Dai 2 carte a un giocatore e pescane 2 dallo stesso alla cieca prima che prenda le tue. (Con 1 carta residua lo scambio è 2 a 1, 1 a 2 o 1 a 1).',
      fr: 'Attaque : Donnez 2 cartes à un joueur et piochez-en 2 à l’aveugle chez lui avant qu’il ne prenne vos cartes. (À 1 carte : échange 2 contre 1, 1 contre 2 ou 1 contre 1).',
    },
    tip: {
      en: 'Steal key cards while offloading high values. (Note: "Fuck You" cannot be passed with Exchange).',
      de: 'Klau dem Gegner Schlüsselkarten. (Hinweis: "Fuck You" darf nicht per Tausch weitergegeben werden).',
      it: 'Sottrai carte chiave al rivale. (Nota: "Fuck You" non può essere scambiata con Scambio).',
      fr: 'Privez l’adversaire de ses atouts. (Note : "Fuck You" ne peut être passée par Échange).',
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
      de: 'Aufladen',
      it: 'Ricarica',
      fr: 'Recharge',
    },
    points: 7,
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

  // OPEN-WISH SPECIAL CARDS (7 Points each - Wish for a colour / number)
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
      de: 'Konter',
      it: 'Contrattacco',
      fr: 'Contre-attaque',
    },
    points: 7,
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
      de: 'Gleichheit',
      it: 'Uguaglianza',
      fr: 'Égalité',
    },
    points: 7,
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
      de: 'Ungleichheit',
      it: 'Disuguaglianza',
      fr: 'Inégalité',
    },
    points: 7,
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
      de: 'Netter Versuch',
      it: 'Bel Tentativo',
      fr: 'Bien Essayé',
    },
    points: 7,
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
      de: 'Gefälligkeit',
      it: 'Favori Speciali',
      fr: 'Faveurs Spéciales',
    },
    points: 7,
    category: 'special',
    subCategory: 'open-wish',
    badgeColor:
      'bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 border-emerald-600/30',
    icon: 'Handshake',
    description: {
      en: 'Optional (attack): Select a person. Exchange all of your special cards (everything except number cards) with each other, irrespective of quantity. (Note: "Fuck You" can only be exchanged if you did not play Special Favours). Wish for a colour.',
      de: 'Optional (Angriff): Wähle eine Person. Tauscht alle eure Spezialkarten (alles ausser Zahlenkarten) untereinander aus, unabhängig von der Anzahl. (Hinweis: "Fuck You" darf nur getauscht werden, wenn du die Karte nicht gespielt hast). Wünsche dir eine Farbe.',
      it: 'Opzionale (attacco): Scegli una persona. Scambiatevi tutte le rispettive carte speciali (tutto tranne i numeri), indipendentemente dal numero. (Nota: "Fuck You" si può scambiare solo se non sei stato tu a giocare Favori Speciali). Desidera un colore.',
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
    points: 7,
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
      fr: 'Mise à Jour',
    },
    points: 7,
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

  // UNIQUE SPECIAL CARDS
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
      en: 'Copies the entire effect (and colour) of any special card (except unique special cards). Determine its effect when played. Worth 7 points at the end of a round.',
      de: 'Kopiert den gesamten Effekt (und die Farbe) einer beliebigen Spezialkarte (ausser einzigartigen). Effekt beim Ausspielen bestimmen. Zählt 7 Punkte am Rundenende.',
      it: 'Copia l’intero effetto (e colore) di qualsiasi carta speciale (eccetto le speciali uniche). Decidi l’effetto appena la giochi. Vale 7 punti a fine round.',
      fr: 'Copie l’effet complet (et la couleur) de n’importe quelle carte spéciale (sauf spéciales uniques). Déterminez l’effet au moment de la poser. Vaut 7 points en fin de manche.',
    },
    tip: {
      en: 'Versatile chameleon card: can duplicate Skip, Gift, Exchange, or Fantastic Four.',
      de: 'Vielseitige Chamäleon-Karte: kann Skip, Gift, Exchange oder Fantastic Four imitieren.',
      it: 'Carta camaleonte versatilisima: può duplicare Salta, Regalo, Scambio o Fantastici 4.',
      fr: 'Carte caméléon polyvalente : peut copier Passe ton tour, Cadeau ou Quatre Fantastiques.',
    },
  },
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
      en: 'Not playable! Can only be given away, exchanged, or discarded if an event calls for it. Worth 13 points at the end of a round.',
      de: 'Nicht ausspielbar! Darf nur verschenkt, getauscht oder durch Ereignisse abgeworfen werden. Zählt 13 Punkte am Rundenende.',
      it: 'Non giocabile! Può solo essere regalata, scambiata o scartata se un evento lo richiede. Vale 13 punti a fine round.',
      fr: 'Injouable ! Peut uniquement être donnée, échangée ou défaussée si un événement l’exige. Vaut 13 points en fin de manche.',
    },
    tip: {
      en: 'Pass it with Gift or Exchange before someone ends the round!',
      de: 'Gib sie rechtzeitig per Gift oder Tausch ab, bevor jemand die Runde beendet!',
      it: 'Cedila con Regalo o Scambio prima che qualcuno chiuda la manche!',
      fr: 'Transmettez-la vite avec Cadeau ou Échange avant la fin de manche !',
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
    points: 42,
    category: 'unique',
    subCategory: 'unique',
    badgeColor:
      'bg-red-500 text-white font-extrabold shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    icon: 'Zap',
    description: {
      en: 'Playable only when you have exactly ten cards in your hand (including "Fuck You"). Slid under the top card of the discard pile with no further effect. Cannot be passed via Gift/Exchange. Worth 42 points at round end!',
      de: 'Nur spielbar bei exakt 10 Handkarten (inklusive "Fuck You"). Wird unter die oberste Karte des Ablagestapels geschoben ohne weiteren Effekt. Darf nicht per Gift/Tausch weitergegeben werden. Zählt 42 Punkte am Rundenende!',
      it: 'Giocabile solo se hai esattamente 10 carte in mano (inclusa "Fuck You"). Si infila sotto la prima carta degli scarti senza effetti. Non può essere ceduta con Regalo/Scambio. Vale 42 punti a fine round!',
      fr: 'Jouable uniquement avec exactement 10 cartes en main (avec "Fuck You"). Glissée sous la défausse sans autre effet. Ne peut pas être donnée par Cadeau/Échange. Vaut 42 points en fin de manche !',
    },
    tip: {
      en: 'The most dangerous card in the game! Holding it when the round ends usually leads to defeat.',
      de: 'Die gefährlichste Karte im Spiel! Bleibt man am Rundenende darauf sitzen, droht die Niederlage.',
      it: 'La carta più temuta del gioco! Restare con questa carta in mano a fine round è devastante.',
      fr: 'La carte la plus redoutée ! Rester avec en fin de manche mène presque toujours à la défaite.',
    },
  },
];
