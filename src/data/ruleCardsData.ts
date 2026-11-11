import { RuleCardItem } from '@/types/rules';

/**
 * The 15 official Pandora's Box rule cards.
 *
 * Source: Rulefactory digital rulebook, "Rule Cards" section
 * (https://rulefactory.ch/rulebook/frantic/en/rule-cards and the DE/IT/FR
 * pages), retrieved 2026-11-11. Card names are printed in English in every
 * language edition. Where Rulefactory's page has no text in a language
 * (e.g. "Mass Exchange" and "Double Special" exist only in German there), the
 * official text was translated faithfully.
 */
export const RULE_CARDS_DATA: RuleCardItem[] = [
  {
    id: 'fantastic-six',
    name: {
      en: 'Fantastic Six',
      de: 'Fantastic Six',
      it: 'Fantastic Six',
      fr: 'Fantastic Six',
    },
    description: {
      en: 'With “Fantastic Four” six cards can now be dealt.',
      de: 'Mit «Fantastic Four» können jetzt 6 Karten verteilt werden.',
      it: 'Con «Fantastic Four» possono essere distribuite ora 6 carte.',
      fr: 'Avec «Fantastic Four», ce sont maintenant 6 cartes qui peuvent être distribuées.',
    },
  },
  {
    id: 'always-lucky',
    name: {
      en: 'Always Lucky',
      de: 'Always Lucky',
      it: 'Always Lucky',
      fr: 'Always Lucky',
    },
    description: {
      en: 'Before every event, the initiator has to select someone who will not be affected by the event.',
      de: 'Vor jedem Ereignis muss der Auslöser jemanden aussuchen, der vom Ereignis ausgeschlossen wird.',
      it: 'Prima di ogni evento, la persona che lo ha provocato deve scegliere qualcuno che ne viene escluso.',
      fr: 'Avant chaque événement, la personne qui le déclenche doit choisir quelqu’un qui en sera exclu.',
    },
  },
  {
    id: 'mass-exchange',
    name: {
      en: 'Mass Exchange',
      de: 'Mass Exchange',
      it: 'Mass Exchange',
      fr: 'Mass Exchange',
    },
    description: {
      en: 'With “Exchange”, swap all cards.',
      de: 'Tausche bei «Exchange» alle Karten.',
      it: 'Con «Exchange» si scambiano tutte le carte.',
      fr: 'Avec «Exchange», on échange toutes les cartes.',
    },
  },
  {
    id: 'double-special',
    name: {
      en: 'Double Special',
      de: 'Double Special',
      it: 'Double Special',
      fr: 'Double Special',
    },
    description: {
      en: 'All special cards count double at the end of the round.',
      de: 'Alle Spezialkarten zählen am Ende doppelt.',
      it: 'Alla fine tutte le carte speciali contano il doppio.',
      fr: 'À la fin, toutes les cartes spéciales comptent double.',
    },
  },
  {
    id: 'double-trouble',
    name: {
      en: 'Double Trouble',
      de: 'Double Trouble',
      it: 'Double Trouble',
      fr: 'Double Trouble',
    },
    description: {
      en: 'One additional event is always triggered (e+1).',
      de: 'Es wird immer ein zusätzliches Ereignis ausgelöst (e+1).',
      it: 'Viene attivato sempre un evento in più (e+1).',
      fr: 'Un événement de plus est déclenché (e+1).',
    },
  },
  {
    id: 'gift-split',
    name: {
      en: 'Gift Split',
      de: 'Gift Split',
      it: 'Gift Split',
      fr: 'Gift Split',
    },
    description: {
      en: 'With “Gift”, the two cards given away have to be split up.',
      de: 'Bei «Gift» müssen die zwei geschenkten Karten aufgeteilt werden.',
      it: 'Con «Gift» le due carte regalate devono essere suddivise.',
      fr: 'Lors d’un «Gift», les deux cartes offertes sont départagées sur deux joueurs.',
    },
  },
  {
    id: 'your-choice',
    name: {
      en: 'Your Choice',
      de: 'Your Choice',
      it: 'Your Choice',
      fr: 'Your Choice',
    },
    description: {
      en: 'You can make up any rule you want. Recommendation: if a 10 is played, an event is triggered.',
      de: 'Es darf eine beliebige Regel erfunden werden. Empfehlung: Wenn eine 10 gespielt wird, wird ein Ereignis ausgelöst.',
      it: 'Può essere scelta una regola a piacere. Consiglio: se si gioca un 10 viene attivato un evento.',
      fr: 'On peut inventer une règle. Recommandation : lorsqu’un 10 est joué, cela déclenche un événement.',
    },
  },
  {
    id: 'thiefs-choice',
    name: {
      en: "Thief's Choice",
      de: "Thief's Choice",
      it: "Thief's Choice",
      fr: "Thief's Choice",
    },
    description: {
      en: 'As of now when “Thief” is played, you can decide before its execution whether one, two or three cards are drawn.',
      de: 'Ab sofort kann bei «Thief» jeweils vor Ausführen gewählt werden, ob man eine, zwei oder drei Karten zieht.',
      it: 'A partire da subito, prima di eseguire la carta «Thief» si può scegliere se pescare 1, 2 o 3 carte.',
      fr: 'Dès maintenant, on peut choisir si on tire 1, 2 ou 3 cartes avec «Thief».',
    },
  },
  {
    id: 'give-a-fuck',
    name: {
      en: 'Give a Fuck',
      de: 'Give a Fuck',
      it: 'Give a Fuck',
      fr: 'Give a Fuck',
    },
    description: {
      en: 'If a player has 13 or more cards in their hand, they can give the “Fuck You” card to someone else (as a turn).',
      de: 'Ab 13 Handkarten kann die «Fuck You»-Karte verschenkt werden (als Spielzug).',
      it: 'A partire da 13 carte in mano, la carta «Fuck You» può essere regalata (come mossa).',
      fr: 'À partir de 13 cartes en main, la carte «Fuck You» peut être offerte à un autre joueur (comme tour de jeu).',
    },
  },
  {
    id: 'the-nicest-try',
    name: {
      en: 'The Nicest Try',
      de: 'The Nicest Try',
      it: 'The Nicest Try',
      fr: 'The Nicest Try',
    },
    description: {
      en: 'Instead of three cards, the victim of “Nice Try” has to draw cards until they have the same number as the initiator of “Nice Try”.',
      de: 'Statt 3 Karten muss das Opfer von «Nice Try» so viele Spielkarten ziehen, wie der Auslöser von «Nice Try» in der Hand hat.',
      it: 'Invece di 3 carte, la vittima di «Nice Try» deve prendere tante carte quante ne ha in mano chi ha attivato «Nice Try».',
      fr: 'Au lieu de 3 cartes, la victime de «Nice Try» doit tirer autant de cartes que le joueur ayant déclenché «Nice Try» a en main.',
    },
  },
  {
    id: 'saboteur',
    name: { en: 'Saboteur', de: 'Saboteur', it: 'Saboteur', fr: 'Saboteur' },
    description: {
      en: '“Counterattack” can also be tossed in if you have not been personally attacked. You can execute the effect of the stolen special card yourself.',
      de: '«Counterattack» darf auch reingeworfen werden, wenn man nicht persönlich angegriffen wird. Du darfst den geklauten Spezialkarten-Effekt selber ausführen.',
      it: 'Puoi lanciare «Counterattack» anche se non sei stato attaccato personalmente. Puoi quindi eseguire tu stesso l’effetto della carta speciale rubata.',
      fr: '«Counterattack» peut aussi être jouée si l’on n’est pas attaqué personnellement. Tu peux toi-même exécuter l’effet de la carte spéciale volée.',
    },
  },
  {
    id: 'special-compulsion',
    name: {
      en: 'Special Compulsion',
      de: 'Special Compulsion',
      it: 'Special Compulsion',
      fr: 'Special Compulsion',
    },
    description: {
      en: 'All effects of open-wish special cards have to – if possible – be executed (i.e. Special Favours, Equality, etc.). Does not apply to “Counterattack” and “Nice Try”.',
      de: 'Alle Spezialeffekte bei wunschfähigen Spezialkarten müssen – wenn möglich – ausgeführt werden (also Special Favours, Equality etc.). Gilt nicht bei «Counterattack» und «Nice Try».',
      it: 'Tutti gli effetti speciali delle carte di richiesta, se possibile, devono essere eseguiti (per esempio Special Favours, Equality ecc.). Non vale per «Counterattack» e «Nice Try».',
      fr: 'Tous les effets spéciaux de cartes spéciales faisant l’objet d’un souhait doivent être réalisés dans la mesure du possible (Special Favours, Equality etc.). Ne vaut pas pour «Counterattack» et «Nice Try».',
    },
  },
  {
    id: 'santa-is-not-real',
    name: {
      en: 'Santa is not real',
      de: 'Santa is not real',
      it: 'Santa is not real',
      fr: 'Santa is not real',
    },
    description: {
      en: 'The round can’t come to an end with an open-wish special card. If someone still plays this type of card as their last, they have to draw two cards from the pile.',
      de: 'Die Runde kann nicht mit einer wunschfähigen Spezialkarte beendet werden. Spielt jemand trotzdem eine solche Karte als letzte, muss er zwei Karten vom Stapel ziehen.',
      it: 'La partita non può essere terminata con una carta speciale di richiesta. Se qualcuno tuttavia gioca una carta simile per ultima, deve prendere di nuovo due carte dal mazzo.',
      fr: 'La manche ne peut pas se terminer par une carte spéciale faisant l’objet d’un souhait. Si un joueur joue néanmoins une telle carte en dernier, il doit piocher deux cartes.',
    },
  },
  {
    id: 'safe-counter',
    name: {
      en: 'Safe Counter',
      de: 'Safe Counter',
      it: 'Safe Counter',
      fr: 'Safe Counter',
    },
    description: {
      en: 'As of now when “Counterattack” is played, it can no longer be countered with another “Counterattack”.',
      de: '«Counterattack» kann ab sofort nicht mehr mit einer weiteren «Counterattack» gekontert werden.',
      it: 'Da subito la carta «Counterattack» non può più essere contrastata da un’altra «Counterattack».',
      fr: 'Dès maintenant, une carte «Counterattack» ne peut plus être utilisée pour contrer une autre carte «Counterattack».',
    },
  },
  {
    id: 'the-end-is-nigh',
    name: {
      en: 'The End is nigh',
      de: 'The End is nigh',
      it: 'The End is nigh',
      fr: 'The End is nigh',
    },
    description: {
      en: 'You can play “The End” to end the game prematurely. Every player then has to count up their points. If the person who played “The End” has the fewest points, their points are discarded and they win. If another player has fewer points than the initiator, the only points that are counted are those belonging to the initiator – which are then tripled.',
      de: 'Du kannst «The End» auch spielen, um das Spiel vorzeitig zu beenden. Danach müssen alle ihre Punkte zählen. Hat der Spieler von «The End» die wenigsten Punkte, so verfallen diese und er gewinnt. Hat ein Mitspieler weniger Punkte als er, so werden nur die Punkte des Urhebers aufgeschrieben – und zwar dreifach.',
      it: 'Puoi giocare «The End» anche per chiudere la partita prima del tempo. Successivamente tutti devono contare i loro punti. Se il giocatore che ha calato «The End» ha il minor numero di punti, i punti non vengono contati e lui ha vinto. Se un altro giocatore ha meno punti di lui, vengono conteggiati solo i punti di chi ha giocato «The End», e cioè il triplo.',
      fr: 'Tu peux également jouer «The End» pour terminer la partie prématurément. Ensuite, tous les joueurs doivent compter leurs points. Si le joueur ayant joué la carte «The End» comptabilise le moins de points, ceux-ci sont tous annulés et il a gagné. Si un autre joueur a moins de points que lui, seuls les points du détenteur de la carte sont notés et ils sont triplés.',
    },
  },
];
