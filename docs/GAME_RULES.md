# Game Rules Reference

A concise summary of the official rules for **Frantic** and its add-ons (**Troublemaker**, **Supercharge** and **Pandora's Box**) by **[Rulefactory](https://rulefactory.ch/)**, focused on what matters for scoring. Page numbers refer to the official English rulebook _Frantic Pandora's Box_ (© 2020 Rulefactory), included in [`public/rules/`](../public/rules/Pandoras_Box_Gesamtregelwerk_EN_web.pdf).

> [!IMPORTANT]
> The rulebook is the authority. This page is a summary; if anything here differs from the rulebook, the rulebook wins — please [open an issue](https://github.com/simo-macca/pandoras-box-app/issues).

---

## Table of Contents

- [Goal of the Game](#goal-of-the-game)
- [Game Preparation](#game-preparation)
- [Taking Turns](#taking-turns)
- [Ending a Round & Scoring](#ending-a-round--scoring)
- [End of the Game](#end-of-the-game)
- [Black Cards & Events](#black-cards--events)
- [Events That Change the Score](#events-that-change-the-score)
- [Supercharge Power Cards](#supercharge-power-cards)
- [Pandora's Box Rule Cards](#pandoras-box-rule-cards)
- [App-Specific House Rules](#app-specific-house-rules)
- [Official Rulebook PDFs](#official-rulebook-pdfs)

---

## Goal of the Game

Every round, try to get rid of all your hand cards as quickly as possible. When one player is out of cards, the round ends and the cards left in everyone else's hand count as points — which is bad. Points add up round after round; **the player with the fewest points wins** (p. 4).

---

## Game Preparation

- Separate the playing cards (black back) from the event cards (white back) and shuffle both decks.
- Deal **7 cards** to each player. To shorten rounds you may deal fewer, but never fewer than 4.
- **Dealer**: in the first round, the owner of the game; afterwards, the player who lost the last round (scored the most points).
- The dealer turns over the top card of the draw pile and treats it **as if they had played it**, with all its effects. It starts the discard pile.
- Play proceeds **anticlockwise**.
- **Supercharge**: each player also receives 2 power cards, face down on the table.
- **Rule cards** (Pandora's Box): before each round, shuffle the rule card deck and draw one or more cards.

### Recommended point limits (p. 4)

| Players | Short | Medium | Long |
| :------ | :---: | :----: | :--: |
| 2–4     |  137  |  154   | 179  |
| 5–8     |  113  |  137   | 154  |

Any other limit may be agreed: as a general rule, the bigger the group, the lower the limit. The app offers these presets and accepts any custom limit of 50 points or more.

---

## Taking Turns

- On your turn you may play **one** card from your hand.
- If you can't or don't want to play, draw a card from the draw pile. **Even after drawing, you may still play a card.**
- Which cards you may play depends on the top card of the discard pile (see the card descriptions in the rulebook, pp. 5–11).

---

## Ending a Round & Scoring

A round ends when (p. 5):

- one player has no cards left in their hand, **or**
- a player has to draw a card but the draw pile is used up.

Every player who still holds cards adds up their points and adds them to their total:

| Card                                       | Points            | Source |
| :----------------------------------------- | :---------------- | :----- |
| Coloured and black number cards            | Face value (1–10) | p. 5   |
| Plain-/bi-coloured special cards           | 7                 | p. 5   |
| Open-wish special cards                    | 7                 | p. 5   |
| Mimicry                                    | 7                 | p. 11  |
| Curse                                      | 13                | p. 11  |
| The End                                    | 17                | p. 11  |
| Fuck You                                   | 42                | p. 11  |
| Power cards (Supercharge — not hand cards) | 0                 | p. 5   |

> [!NOTE]
> Card names are printed in **English in every language edition** (DE, FR, IT included), so the app uses the English names everywhere.

The 23 special cards are: _2nd Chance, Skip, Gift, Exchange, Thief, Troublemaker, Colour Swap, Recharge_ (plain-/bi-coloured); _Fantastic, Fantastic Four, Counterattack, Equality, Inequality, Nice Try, Lucky Bastard, Special Favours, Edison, Update, Do It Yourself_ (open-wish); _Fuck You, Mimicry, Curse, The End_ (unique).

- **Several winners** are possible: _Nice Try_ (p. 10) and _Parasite_ (p. 15) mention rounds where several players get rid of their cards at once. Each of them scores 0.
- **Unique cards** — _Fuck You_, _Mimicry_, _Curse_ and _The End_ — exist once in the whole game (p. 22), so a hand can hold at most one of each.

---

## End of the Game

Rounds are played **until someone exceeds the set point limit**. The person with the **lowest score** wins (p. 5).

Reaching the limit exactly does **not** end the game — the app follows this rule.

---

## Black Cards & Events

- A black number card can be played only on the same number or on a matching number wish. **Black is not a colour**: it can't be wished for and a black card can't be followed by another black card except with the same number (p. 5).
- Every time a black number card is played, the top event card is turned over and executed (p. 12). _Troublemaker_ also triggers an event.
- Effects that hit several players are executed in order of play, starting with the person on the right of whoever triggered the event. If several players qualify for an effect, it affects the first person in the order of play (p. 12).
- There are **44 event cards**: 20 in the base game, 14 in Troublemaker, 9 in Supercharge and 1 in Pandora's Box (p. 22).

---

## Events That Change the Score

These are the events the app handles directly. All other events affect the cards in play, not the score sheet.

| Event                       | Official effect                                                                                                                                                                                                                               | In the app                                                              |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **Doomsday** (p. 13)        | The round ends immediately. Everyone scores 50 points; hand cards are not counted.                                                                                                                                                            | _Doomsday_ toggle in the round calculator                               |
| **Finish Line** (p. 14)     | The round ends immediately; everyone adds up their hand points.                                                                                                                                                                               | Score the round normally                                                |
| **Time Bomb** (p. 17)       | Everyone has three turns left. If someone ends the round before that, 10 points are subtracted from their total and everyone else adds 10 to their hand points. If no one ends the round within three turns, all players' points are doubled. | _Time Bomb_ selector: _defused_ (−10 winners / +10 others) / _exploded_ |
| **Double Taxation** (p. 14) | When writing down points: every player immediately adds the value of their three highest hand cards to their total score.                                                                                                                     | Free numeric adjustment                                                 |
| **Identity Theft** (p. 14)  | When writing down points: the person with the highest score swaps their score with the person with the lowest score.                                                                                                                          | _Identity Theft_ button                                                 |
| **Seppuku** (p. 16)         | When writing down points: each player, in order of play, decides whether to take the risk and turn over the top draw-pile card. Number card: −21 points. Any other card: +42 points. Refusing: +21 points.                                    | _Seppuku_ dialog                                                        |
| **Parasite** (p. 15)        | When someone ends the round, the person on their left may discard two cards before counting.                                                                                                                                                  | Enter the remaining cards only                                          |

Notes:

- **The End** (p. 11): if a player ends the round by playing _The End_, all active events (such as Time Bomb) are ignored and _Nice Try_ can no longer be played.
- **Lucky Bastard** (p. 10): a player protected by Lucky Bastard is not affected by the event; if the event ends the round (e.g. Doomsday), that player writes down no points. The free adjustment is applied even on Doomsday, so enter `-50` for that player.
- **Ties** for Identity Theft are resolved like every other event: the first qualifying person in the order of play. The app uses the order of the player list, so enter players in seating order.

---

## Supercharge Power Cards

Power cards are activated (turned face up), not played, and only during your own turn together with a hand card. One activation per turn; an activated card can't be used again unless recharged. They are never hand cards and score 0 points (pp. 5, 18).

The symbol in the corner of the card determines when its effect is executed relative to a special card played with it (pp. 19–20):

| Timing                         | Power cards                                                                                 |
| :----------------------------- | :------------------------------------------------------------------------------------------ |
| **1ST** — before the hand card | All Draw One, Anti Counter, Open Hands, Special Charge, Special Seal                        |
| **2ND** — after the hand card  | Black Wish, Colour Blockade, Looping, Number Wish, Random Chance, Recycling, Troublecharger |

---

## Pandora's Box Rule Cards

Rule cards are optional. Before each round, shuffle the rule card deck and draw one or more cards; the rules for that round are modified accordingly (p. 21). The app lets you activate as many rule cards as you drew. _Do It Yourself_ and the _Pandora's Box_ event let you define your own effect before the game starts (pp. 9, 15).

The add-on contains **15 rule cards**. The summaries below paraphrase Rulefactory's [digital rulebook](https://rulefactory.ch/rulebook/frantic/en/rule-cards); the app shows the official wording.

| Rule card              | Effect (summary)                                                                                      |
| :--------------------- | :---------------------------------------------------------------------------------------------------- |
| **Fantastic Six**      | _Fantastic Four_ deals six cards.                                                                     |
| **Always Lucky**       | Before every event, whoever triggers it picks one player who is not affected.                         |
| **Mass Exchange**      | _Exchange_ swaps all cards.                                                                           |
| **Double Special**     | All special cards count double at the end of the round. → **applied automatically by the calculator** |
| **Double Trouble**     | One additional event is always triggered.                                                             |
| **Gift Split**         | The two cards given with _Gift_ must be split between players.                                        |
| **Your Choice**        | Make up your own rule (suggestion: playing a 10 triggers an event).                                   |
| **Thief's Choice**     | With _Thief_, choose before resolving whether to take one, two or three cards.                        |
| **Give a Fuck**        | With 13 or more cards in hand, a player may give _Fuck You_ away as their turn.                       |
| **The Nicest Try**     | The victim of _Nice Try_ draws until they hold as many cards as its initiator, instead of three.      |
| **Saboteur**           | _Counterattack_ may be thrown in without being attacked; you may then use the stolen effect yourself. |
| **Special Compulsion** | Open-wish special effects must be executed whenever possible (not _Counterattack_ / _Nice Try_).      |
| **Santa is not real**  | A round can't end on an open-wish special card; whoever tries draws two cards.                        |
| **Safe Counter**       | _Counterattack_ can no longer be countered by another _Counterattack_.                                |
| **The End is nigh**    | _The End_ may end the game early; scoring changes (see below).                                        |

**The End is nigh — scoring.** Everyone counts their points. If the player who played _The End_ has the fewest points, their points are discarded and they win. Otherwise only that player's points are written down — tripled. Enter this with the free adjustment in the calculator.

## App-Specific House Rules

These are **not** official rules; they are conveniences of the app:

- **Danger zone**: a player whose total reaches 80 % of the limit is highlighted.
- **Late joiners**: a player added to a running match starts at _highest current score + 1_.
- **Round limit**: an optional maximum number of rounds; when it is reached, the lowest score wins.
- **Continue after game over**: you may keep playing past the limit and end the match manually.

---

## Official Rulebook PDFs

| Language | Complete rulebook                                                                    | Overview cards                                                         |
| :------- | :----------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| English  | [Rulebook (EN)](../public/rules/Pandoras_Box_Gesamtregelwerk_EN_web.pdf)             | [Overview cards (EN)](../public/rules/Uebersichtskarten_EN_web.pdf)    |
| German   | [Gesamtregelwerk (DE)](../public/rules/Pandoras_Box_Gesamtregelwerk_DE_web.pdf)      | [Übersichtskarten (DE)](../public/rules/Uebersichtskarten_DE_web.pdf)  |
| French   | [Règles complètes (FR)](../public/rules/Pandoras_Box_Gesamtregelwerk_FR.pdf)         | [Cartes d'aperçu (FR)](../public/rules/Uebersichtskarten_FR_web.pdf)   |
| Italian  | [Regolamento completo (IT)](../public/rules/Pandoras_Box_Gesamtregelwerk_IT_web.pdf) | [Carte riassuntive (IT)](../public/rules/Uebersichtskarten_IT_web.pdf) |

Source: [rulefactory.ch/en/rules](https://rulefactory.ch/en/rules/). Rulefactory has since published a 4th-edition rule sheet for the base game; this app follows the _Pandora's Box_ complete rulebook.

---

## Related Documentation

- [Features & Player Guide](FEATURES.md)
- [Architecture — domain logic](ARCHITECTURE.md#domain-logic-scoringts-statsts)
- [Contributing](CONTRIBUTING.md)
