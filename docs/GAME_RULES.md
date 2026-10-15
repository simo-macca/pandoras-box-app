# Frantic & Pandora's Box Game Rules Reference

This guide provides a comprehensive summary of the official game rules for **Frantic** and its expansion **Pandora's Box**, developed by **[Rulefactory](https://rulefactory.ch/)**. It serves as an instant reference for resolving disputes at the table.

---

## Table of Contents

- [Goal & Winning Conditions](#goal--winning-conditions)
- [Game Setup & Direction of Play](#game-setup--direction-of-play)
- [Turn Flow & Ending a Round](#turn-flow--ending-a-round)
- [The Golden Rule: Black Cards & Events](#the-golden-rule-black-cards--events)
- [Round-End Scoring Breakdown](#round-end-scoring-breakdown)
  - [Card Point Values Table](#card-point-values-table)
  - [Special Event Scoring Modifiers](#special-event-scoring-modifiers)
- [Official Score Limit Presets](#official-score-limit-presets)
- [Pandora's Box Expansion Rules](#pandoras-box-expansion-rules)
  - [Rule Cards (15 Cards)](#rule-cards-15-cards)
  - [Supercharge Power Cards (12 Cards)](#supercharge-power-cards-12-cards)
- [Official Rulebook PDF Downloads](#official-rulebook-pdf-downloads)
- [Related Documentation](#related-documentation)

---

## Goal & Winning Conditions

- **Core Objective**: Shed all the cards in your hand as quickly as possible.
- **Points are Penalties**: In Frantic, points accumulated at the end of each round represent **penalty points**. You want your score to remain as low as possible.
- **Game Termination**: The game ends at the conclusion of any round in which at least one player reaches or exceeds the agreed **Target Score Limit**.
- **Victory**: The player who holds the **lowest cumulative score** when the game terminates is crowned the winner!

---

## Game Setup & Direction of Play

- **Player Count**: 2 to 8 players.
- **Hand Deal**: Deal **7 cards** to each player (deal at least 4 in shorter variants).
- **Direction of Play**: Play moves strictly **anti-clockwise** (counter-clockwise).
- **The Dealer**:
  - **Round 1**: The owner of the game deals.
  - **Subsequent Rounds**: The player who accumulated the highest score (the "loser") in the preceding round deals.
- **Initial Discard**: The dealer flips the top card of the draw pile face-up to initiate the discard pile.
  > [!IMPORTANT]
  > **The effect of this initial card triggers immediately as if played by the dealer!**

---

## Turn Flow & Ending a Round

1. On your turn, play **1 card** from your hand matching the top card of the discard pile by:
   - **Colour**, **Number**, or **Symbol**.
2. If you cannot or choose not to play a card, draw **1 card** from the draw pile. If the card drawn is playable, you may play it immediately.
3. **The "Last Card" Rule**:
   - When you have only **1 card remaining** in hand, you must audibly announce: **"Last Card!"** before the next player takes their turn.
   - If another player catches you forgetting to announce this, you must draw **4 penalty cards**.
4. **Round End Triggers**:
   - A player successfully sheds their final card. That player scores **0 points** for the round.
   - A player must draw a card, but the draw pile is completely exhausted.

---

## The Golden Rule: Black Cards & Events

### Black is NOT a Colour

- You cannot name "black" when playing a colour-wishing card (e.g., _Fantastic_).
- You cannot play a black card simply because the previous top card was black.
- A black card can only be played if:
  - It matches the **exact number** of the top discard card, OR
  - It is played via an open-wish special card.

### Event Activation

- Whenever any player plays a **black numbered card**, an **Event Card** is immediately drawn from the Event deck.
- The event's effect resolves completely before normal play resumes.

---

## Round-End Scoring Breakdown

When a round ends, players calculate penalty points for the cards remaining in their hands:

### Card Point Values Table

| Card Type                   | Examples                                                                                  |      Penalty Points       | Rule Constraints                                        |
| :-------------------------- | :---------------------------------------------------------------------------------------- | :-----------------------: | :------------------------------------------------------ |
| **Number Cards**            | `1` through `10` (any colour or black)                                                    | **Face value (1–10 pts)** | A `7` is 7 pts, a `10` is 10 pts, etc.                  |
| **Standard Specials**       | _Skip, Gift, Exchange, Second Chance, Colour Swap, Thief, Troublemaker, Recharge_         |         **7 pts**         | Includes single-colour and dual-colour versions.        |
| **Wish / Unique Specials**  | _Fantastic, Fantastic Four, Equality, Inequality, Nice Try, Lucky Bastard, Counterattack_ |         **7 pts**         | Standard special point value.                           |
| **Mimicry**                 | _Mimicry_                                                                                 |         **7 pts**         | Copies another special card effect.                     |
| **Curse**                   | _Curse_                                                                                   |        **13 pts**         | **Unplayable**: Cannot be discarded normally from hand! |
| **The End**                 | _The End_                                                                                 |        **17 pts**         | Can only be played as your **very last card** in hand.  |
| **Fuck You**                | _Fuck You_                                                                                |        **42 pts**         | Can only be played when holding **exactly 10 cards**!   |
| **Supercharge Power Cards** | _Adrenaline, Teleport, Deflector, etc._                                                   |         **0 pts**         | Power cards never grant penalty points.                 |

### Special Event Scoring Modifiers

Certain events alter round scoring outcomes:

- **Doomsday**:
  - If the Doomsday event resolves without being cancelled, the round ends instantly.
  - **Every player receives 50 penalty points** regardless of the cards in their hand.
- **Time Bomb**:
  - **Winner Bonus**: If the player holding the active Time Bomb finishes their hand first, they receive a **-10 point bonus**.
  - **Loser Penalty**: If another player finishes while you are holding the Time Bomb, you receive a **+10 point penalty**.
  - **Expired Explosion**: If the bomb timer expires before anyone sheds their hand, the holder's round penalty score is **doubled ($\times 2$)**.
- **Identity Theft**:
  - Swaps cumulative scores between the player with the lowest score and the player with the highest score.
  - Deterministic tie-breaking selects the first matching player in the roster order.
  - Does not advance the round counter.
- **Seppuku T**:
  - Created by D'Sinead Conception: each player chooses in turn order whether to commit Seppuku.
  - **Risk Taken — Number card drawn**: `-21 pts`.
  - **Risk Taken — Non-number / Special card drawn**: `+42 pts`.
  - **No Risk / Refused**: `+21 pts`.
  - Applied directly to cumulative scores without advancing the round counter.
- **Mid-Game Late Joiners**:
  - When a new player joins an active match, their initial score is set to:
    $$\text{Starting Score} = \max(\text{Current Scores}) + 1$$
- **Unrestricted Negative Scores**:
  - Scores are never artificially clamped to zero. Negative round scores and negative cumulative totals are fully permitted.

---

## Official Score Limit Presets

Target score thresholds from the official rulebook scale according to participant count:

| Player Count      | Short Game | Medium Game (Standard) | Long Game |
| :---------------- | :--------: | :--------------------: | :-------: |
| **2 – 4 Players** | `137 pts`  |       `154 pts`        | `179 pts` |
| **5 – 8 Players** | `113 pts`  |       `137 pts`        | `154 pts` |

> [!TIP]
> The companion app automatically detects player count during setup and suggests the appropriate official presets.

---

## Pandora's Box Expansion Rules

The **Pandora's Box** expansion introduces two dynamic mechanisms:

### Rule Cards (15 Cards)

At the beginning of each round, draw **1 Rule Card**:

- The rule card applies globally to **all players** for the entire round.
- Examples include:
  - _Blind Date_: Players play cards face-down without seeing them.
  - _Double Trouble_: Every penalty card draw is doubled.
  - _Color Blind_: Cards can only be played by matching numbers, ignoring colours.
  - _Blackout_: Black cards can be played on any card.
  - _Anarchy_: Players take turns whenever they wish rather than in order.

### Supercharge Power Cards (12 Cards)

Power cards are dealt face-down in front of each player:

- They do not count toward your hand limit and score **0 penalty points** at round end.
- Can be activated during a player's turn when playing a hand card:
  - **1ST Timing**: Activates **before** the played hand card resolves (e.g., _Adrenaline_, _Teleport_).
  - **2ND Timing**: Activates **after** the played hand card resolves (e.g., _Deflector_, _Troublecharger_).

---

## Official Rulebook PDF Downloads

Official PDF manuals in the [`rules/`](../rules/) directory:

- **English**:
  - [Complete Rulebook (EN)](../rules/Pandoras_Box_Gesamtregelwerk_EN_web.pdf)
  - [Overview Cards (EN)](../rules/Uebersichtskarten_EN_web.pdf)
- **German**:
  - [Gesamtregelwerk (DE)](../rules/Pandoras_Box_Gesamtregelwerk_DE_web.pdf)
  - [Übersichtskarten (DE)](../rules/Uebersichtskarten_DE_web.pdf)
- **French**:
  - [Règles complètes (FR)](../rules/Pandoras_Box_Gesamtregelwerk_FR.pdf)
  - [Cartes d'aperçu (FR)](../rules/Uebersichtskarten_FR_web.pdf)
- **Italian**:
  - [Regolamento completo (IT)](../rules/Pandoras_Box_Gesamtregelwerk_IT_web.pdf)
  - [Carte riassuntive (IT)](../rules/Uebersichtskarten_IT_web.pdf)

---

## Related Documentation

- [Application Features Guide](FEATURES.md)
- [Hand Point Calculator Engine](ARCHITECTURE.md#2-hand-calculation-engine)
- [Developer Contributing Guide](CONTRIBUTING.md)
