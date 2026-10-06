import { FAQItem } from '../types/rules';

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    titles: {
      en: 'Can "Fuck You" be passed using Gift or Exchange?',
      de: 'Darf «Fuck You» mit Gift oder Tausch weitergegeben werden?',
      it: 'La carta "Fuck You" può essere ceduta con Regalo o Scambio?',
      fr: 'La carte "Fuck You" peut-elle être transmise avec Cadeau ou Échange ?',
    },
    scenarios: {
      en: 'A player holds "Fuck You" (42 points) and plays a Gift or Exchange card, attempting to pass it to a rival.',
      de: 'Eine Person hat «Fuck You» auf der Hand und möchte sie mit Gift oder Tausch an eine andere Person abgeben.',
      it: 'Un giocatore ha in mano "Fuck You" e gioca una carta Regalo o Scambio per rifilarla a un avversario.',
      fr: 'Un joueur possède "Fuck You" et joue Cadeau ou Échange pour la transmettre à un adversaire.',
    },
    rulings: {
      en: 'No! The official rules strictly state that you are NOT allowed to employ special card effects (such as Gift or Exchange) to intentionally pass the "Fuck You" card on to other players. However, if it is drawn blindly from you (e.g. by Thief, Inequality, or an event), that is completely legal.',
      de: 'Nein! Laut Regelwerk ist es ausdrücklich verboten, «Fuck You» gezielt durch Spezialkarten-Effekte (wie Gift oder Tausch) an andere weiterzugeben. Wird sie jedoch blind gezogen (z. B. durch Dieb oder Ungleichheit), ist dies erlaubt.',
      it: 'No! Le regole ufficiali vietano categoricamente di cedere "Fuck You" usando gli effetti di carte speciali (come Regalo o Scambio). Tuttavia, se ti viene sottratta alla cieca (es. con Ladro o Disuguaglianza), il passaggio è valido.',
      fr: 'Non ! Le règlement officiel interdit expressément d’utiliser des cartes spéciales (Cadeau ou Échange) pour donner la carte "Fuck You". En revanche, si elle vous est tirée à l’aveugle (Voleur ou Inégalité), cela est légal.',
    },
    proTips: {
      en: 'Save "Fuck You" for when you accumulate exactly 10 hand cards to slide it legally under the discard pile.',
      de: 'Sammle gezielt bis zu 10 Handkarten, um «Fuck You» legal unter den Ablagestapel zu entsorgen.',
      it: 'Tienila fino ad avere esattamente 10 carte per infilarla legalmente sotto gli scarti.',
      fr: 'Attendez d’avoir 10 cartes en main pour vous en débarrasser légalement sous la défausse.',
    },
  },
  {
    id: 2,
    titles: {
      en: 'Can "Nice Try" stop someone who ends the round with "The End"?',
      de: 'Kann «Nice Try» einen Rundenabschluss mit «The End» verhindern?',
      it: '"Nice Try" può bloccare chi chiude il round con "The End"?',
      fr: '"Nice Try" peut-elle annuler une fin de manche avec "The End" ?',
    },
    scenarios: {
      en: 'A player plays "The End" as their last remaining hand card. An opponent attempts to toss in "Nice Try" to force them to draw 3 cards.',
      de: 'Jemand spielt «The End» als letzte Handkarte. Eine andere Person wirft «Nice Try» ein.',
      it: 'Un giocatore cala "The End" come sua ultima carta in mano. Un avversario lancia "Nice Try".',
      fr: 'Un joueur pose "The End" comme dernière carte. Un adversaire tente de poser "Nice Try".',
    },
    rulings: {
      en: 'No! When "The End" is played as the last card in hand, the round comes to an unconditional, immediate end. "Nice Try" cannot be played, and all active events (such as Time Bomb or Last Chance) are ignored.',
      de: 'Nein! Wird «The End» als letzte Karte gespielt, endet die Runde bedingungslos sofort. «Nice Try» kann nicht mehr eingeworfen werden und alle aktiven Ereignisse werden ignoriert.',
      it: 'No! Giocare "The End" come ultima carta chiude la manche in modo incondizionato e immediato. "Nice Try" non può essere usata e gli eventi attivi vengono ignorati.',
      fr: 'Non ! Jouer "The End" comme dernière carte met fin à la manche immédiatement et sans condition. "Nice Try" ne peut pas être jouée.',
    },
    proTips: {
      en: '"The End" guarantees total immunity to round-extending reactions.',
      de: '«The End» garantiert absolute Sicherheit vor reaktiven Karten am Rundenende.',
      it: '"The End" assicura la vittoria indisturbata del round.',
      fr: '"The End" assure une fin de manche incontestable.',
    },
  },
  {
    id: 3,
    titles: {
      en: 'Can a "Counterattack" be countered with another "Counterattack"?',
      de: 'Kann ein «Konter» mit einem weiteren «Konter» gekontert werden?',
      it: 'Un "Contrattacco" può essere respinto con un altro "Contrattacco"?',
      fr: 'Une "Contre-attaque" peut-elle être contrée par une autre "Contre-attaque" ?',
    },
    scenarios: {
      en: 'Player A attacks Player B with Fantastic Four. Player B counters with Counterattack, redirecting the 4 cards back to Player A. Can Player A also toss in Counterattack?',
      de: 'Person A greift Person B an. Person B kontert. Darf Person A ebenfalls einen Konter werfen?',
      it: 'Il Giocatore A attacca il Giocatore B. B usa Contrattacco. A può usare a sua volta Contrattacco?',
      fr: 'Le joueur A attaque le joueur B. B joue Contre-attaque. A peut-il aussi contre-attaquer ?',
    },
    rulings: {
      en: 'Yes! It is explicitly allowed to counter a "Counterattack" with another "Counterattack" card. The new counter completely absorbs the effect and allows its owner to redirect the full attack onto any player(s).',
      de: 'Ja! Es ist ausdrücklich erlaubt, einen «Konter» mit einem weiteren «Konter» zu erwidern. Der Angriff kann erneut auf beliebige Personen umgeleitet werden.',
      it: 'Sì! È espressamente consentito rispondere a un "Contrattacco" con un altro "Contrattacco". L’effetto viene assorbito e rimandato su qualsiasi bersaglio.',
      fr: 'Oui ! Il est expressément permis de contrer une "Contre-attaque" avec une autre "Contre-attaque".',
    },
  },
  {
    id: 4,
    titles: {
      en: 'Can Black be wished for, or followed by another black card?',
      de: 'Darf Schwarz gewünscht oder von Schwarz bedient werden?',
      it: 'Il Nero può essere richiesto con un desiderio o coperto da un altro nero?',
      fr: 'Le Noir peut-il être souhaité ou suivi d’une autre carte noire ?',
    },
    scenarios: {
      en: 'A player plays Fantastic or Fantastic Four and wishes for the colour "Black", or attempts to play a Black 4 on a Black 7.',
      de: 'Eine Person wünscht sich «Schwarz» oder versucht, eine schwarze 4 auf eine schwarze 7 zu legen.',
      it: 'Un giocatore desidera il "Nero" o prova a giocare un 4 Nero sopra un 7 Nero.',
      fr: 'Un joueur souhaite "Noir" ou tente de poser un 4 noir sur un 7 noir.',
    },
    rulings: {
      en: 'No! In Frantic, Black is not a colour! It can never be wished for and can never be followed by another black card unless both cards share the exact same number. A black card can only be followed by the matching number or by an open-wish special card.',
      de: 'Nein! Schwarz ist keine Farbe! Schwarz kann niemals gewünscht werden. Eine schwarze Karte kann nur durch dieselbe Zahl oder eine Wunschkarte bedient werden.',
      it: 'No! Nel regolamento di Frantic, il nero non è un colore! Non può mai essere desiderato e può essere coperto solo dallo stesso numero o da una carta speciale con richiesta.',
      fr: 'Non ! Le noir n’est pas une couleur ! Il ne peut jamais être souhaité et ne peut être recouvert que par le même chiffre ou une carte de souhait.',
    },
  },
  {
    id: 5,
    titles: {
      en: 'What happens if a player runs out of cards during an Event?',
      de: 'Was geschieht, wenn jemand während eines Ereignisses kartenleer wird?',
      it: 'Cosa succede se un giocatore esaurisce le carte durante un Evento?',
      fr: 'Que se passe-t-il si un joueur n’a plus de cartes pendant un Événement ?',
    },
    scenarios: {
      en: 'During the execution of an event (e.g. Recession, Mating Season, or Loot), a player discards their last card while other players still have steps to resolve.',
      de: 'Während eines Ereignisses (z. B. Rezession) wird jemand alle Karten los, während das Ereignis noch läuft.',
      it: 'Durante la risoluzione di un evento un giocatore scarta la sua ultima carta.',
      fr: 'Pendant un événement, un joueur défausse sa dernière carte alors que l’événement n’est pas terminé.',
    },
    rulings: {
      en: 'The round does NOT end immediately! The round only ends after the entire event has been completely executed (or resolved as far as possible). Subsequent steps in the event may cause that player to draw cards again before scoring.',
      de: 'Die Runde endet NICHT sofort! Das Ereignis wird erst vollständig und so gut wie möglich zu Ende geführt. Folgeeffekte können dazu führen, dass wieder Karten gezogen werden.',
      it: 'La manche NON finisce subito! L’evento deve essere completato per intero prima di dichiarare la fine del round.',
      fr: 'La manche ne prend PAS fin immédiatement ! L’événement doit être entièrement résolu au préalable.',
    },
  },
  {
    id: 6,
    titles: {
      en: 'What happens if you play "2nd Chance" without a matching card?',
      de: 'Was passiert, wenn man «2. Chance» ohne passende Karte spielt?',
      it: 'Cosa succede se giochi "2ª Possibilità" senza avere una carta valida?',
      fr: 'Que se passe-t-il si vous jouez "2e Chance" sans carte compatible ?',
    },
    scenarios: {
      en: 'A player plays "2nd Chance" on the discard pile but does not hold any card that matches its colour or symbol.',
      de: 'Eine Person spielt «2. Chance», hat aber keine passende zweite Handkarte.',
      it: 'Un giocatore gioca "2ª Possibilità" ma non possiede una seconda carta valida.',
      fr: 'Un joueur pose "2e Chance" mais n’a pas de seconde carte compatible.',
    },
    rulings: {
      en: 'According to the official rulebook, if you cannot play an appropriate second card or do not have a second card in your hand, you must draw a penalty card from the draw pile.',
      de: 'Laut Regelwerk gilt: Kannst du keine passende zweite Karte legen oder besitzt keine mehr, musst du 1 Karte vom Nachziehstapel ziehen.',
      it: 'Come da regolamento ufficiale: se non puoi giocare una seconda carta valida o non ne hai un’altra in mano, devi pescare una carta dal mazzo.',
      fr: 'Selon la règle officielle : si vous ne pouvez pas jouer de seconde carte compatible ou n’en avez pas, vous devez piocher une carte.',
    },
  },
];

export default FAQ_DATA;
