# Features & Player Guide

What the app does and how to use it at the table.

---

## Table of Contents

- [Game-Night Quick Start](#game-night-quick-start)
- [Feature Walkthrough](#feature-walkthrough)
  - [1. Leaderboard & Danger Zone](#1-leaderboard--danger-zone)
  - [2. Round Calculator](#2-round-calculator)
  - [3. Round History, Editing & Undo](#3-round-history-editing--undo)
  - [4. Identity Theft](#4-identity-theft)
  - [5. Seppuku](#5-seppuku)
  - [6. Pandora's Box Rule Card Drawer](#6-pandoras-box-rule-card-drawer)
  - [7. Card Dictionary & Rules Guide](#7-card-dictionary--rules-guide)
  - [8. Match Setup & Player Management](#8-match-setup--player-management)
  - [9. End of the Match](#9-end-of-the-match)
  - [10. Sound, Haptics, Theme & Language](#10-sound-haptics-theme--language)
  - [11. Offline Use, Persistence, Backup & Restore](#11-offline-use-persistence-backup--restore)
- [Official Rulebooks in the App](#official-rulebooks-in-the-app)
- [Known Limitations](#known-limitations)

---

## Game-Night Quick Start

1. **Set up the match** — tap **Players** in the top bar.
   - Add **2 to 8 players** (enter them in seating order — event tie-breaks follow this order) and give each a colour.
   - Pick an official point limit (_short_, _medium_, _long_ — the labels follow the player count) or type a custom limit (minimum 50).
   - Optionally set a maximum number of rounds (house rule).
2. **Draw rule cards** _(Pandora's Box, optional)_ — open **Rule Cards**, tap **Draw Random Rule Card** and activate it. Repeat if you play with more than one rule card per round; the active cards stay pinned above the scoreboard.
3. **Play the round** with your physical cards.
4. **Score the round** — tap **Score Round**:
   - pick each player in turn;
   - mark the player who ran out of cards as **Round Winner** (0 points) — several players can win the same round;
   - for everyone else, enter the cards left in hand with the number grid and the special-card counters;
   - if they happened, set **Doomsday** or **Time Bomb** (defused / exploded) — they apply to the whole table;
   - tap **Save Round Scores**.
5. **Watch the standings.** As soon as a player **exceeds** the limit, the match ends and the player with the lowest total wins.

---

## Feature Walkthrough

### 1. Leaderboard & Danger Zone

- Players are ranked by total score; the **lowest score leads**.
- Each player card shows the total, the points left before the limit, rounds won and a progress bar.
- **Danger zone** (house rule): players at **80 %** of the limit or more are highlighted; the marker on each progress bar shows that threshold.
- Summary cards show the current leader, the game limit and how many players are in the danger zone.

### 2. Round Calculator

Opened with **Score Round**. The total updates live as you enter cards.

- **Round winner** — one tap; the player scores 0 and their card inputs are cleared. Several players can be winners of the same round (e.g. after _Nice Try_ or an event that empties more than one hand).
- **Number cards 1–10** — a stepper per value.
- **Special cards** — counters for:
  - plain-/bi-coloured and open-wish specials — 7 points each;
  - Mimicry — 7; Curse — 13; The End — 17; Fuck You — 42. These four cards exist once in the game, so their counters stop at 1.
- **Table events** (apply to every player at once):
  - **Doomsday** — everyone scores 50; the winner toggle is disabled. The free adjustment still applies (e.g. `-50` for a player protected by _Lucky Bastard_).
  - **Time Bomb defused** — the round winners get −10, everyone else +10 on top of their hand. The per-player selector only offers the option that fits the player (−10 for winners, +10 for the others).
  - **Time Bomb exploded** — every player's hand points are doubled.
- **Free adjustment** — type any positive or negative number (e.g. `-15`, `+25`) for cases such as Double Taxation, _The End is nigh_ or Lucky Bastard. It is always added last.
- **Negative scores** are allowed for rounds and for totals.
- **Reset** clears the selected player's inputs.

### 3. Round History, Editing & Undo

- Every round and event appears in the match history with winners, events and all the rule cards that were active.
- **Edit** a past round to reopen the calculator with that round's data.
- **Delete** any entry (with an inline confirmation) or **undo** the most recent one.
- After every action an **Undo** toast is shown for 5 seconds.

### 4. Identity Theft

When the _Identity Theft_ event is revealed and you are writing down points:

- tap **Identity Theft** in the scoreboard toolbar;
- the totals of the player with the **highest** score and the player with the **lowest** score are swapped;
- ties go to the first qualifying player in the player list (the official tie rule uses the order of play);
- the button is disabled when all totals are equal;
- the swap is stored as a history entry that does not count as a round, can be undone or deleted, and survives export/import.

### 5. Seppuku

When the _Seppuku_ event (Troublemaker, by D'Sinead Conception) is revealed and you are writing down points:

- tap **Seppuku** in the scoreboard toolbar;
- for each player, select the outcome:
  - took the risk, **number card** turned over → **−21**;
  - took the risk, **any other card** → **+42**;
  - **refused** → **+21**;
- the points are applied immediately as a history entry that does not count as a round;
- use the **edit** icon on the entry to correct a choice afterwards — the entry is updated in place.

### 6. Pandora's Box Rule Card Drawer

- **Draw Random Rule Card** shuffles with an animation and a sound effect.
- Activate the drawn card to pin it above the scoreboard. **Several rule cards can be active at once** (the rulebook allows one or more per round); _Draw_ only picks from cards that are not active yet, and _Clear all_ removes them. The active cards are saved with each round.
- Browse all **15 official rule cards** with Rulefactory's wording in all four languages.
- **Double Special** is scored automatically: while it is active, the calculator doubles every special card and shows a notice.

### 7. Card Dictionary & Rules Guide

- **Rules guide** — goal, turns, scoring, black cards and power-card timing in a compact format.
- **Dictionary** — search by name or effect and filter by type:
  - **23 special cards** with tips;
  - **44 event cards**, tagged by add-on (base, Troublemaker, Supercharge, Pandora's Box) and by scope (whole table vs. targeted players);
  - **12 Supercharge power cards** with their official **1ST / 2ND** timing;
  - **15 rule cards**.
- All content is available in **English, German, Italian and French**. Card names stay in English in every language, exactly as on the printed cards.

### 8. Match Setup & Player Management

- **2–8 players**, each with a unique colour out of 8 (red, blue, green, yellow, purple, orange, cyan, pink).
- **Official point limits** for 2–4 and 5–8 players, or a custom limit (minimum 50).
- **Optional round limit** (house rule; quick picks 5/10/15/20 or a custom value): when reached, the lowest score wins.
- **Change settings during a match** — names, colours, limits — without losing the history.
- **Late joiners** (house rule): a player added to a running match starts at _highest current score + 1_, recorded as a history entry.
- Blank names are replaced with _Player N_ when saving.

### 9. End of the Match

- Triggered automatically when a player **exceeds** the limit (or the round limit is reached).
- Confetti, a fanfare and the final ranking with totals and rounds won.
- **Play again** keeps the players and clears the scores; **Continue** lets you keep playing and end the match later.

### 10. Sound, Haptics, Theme & Language

- Sounds are synthesised with the Web Audio API — no audio files to download.
- Vibration feedback on devices that support it.
- Sound and haptics can be switched off independently in **Settings**.
- **Light**, **dark** or **system** theme, applied before the first paint (no flash).
- Interface language: English, German, Italian or French.
- Dialogs close with **Esc**; buttons carry accessible labels.

### 11. Offline Use, Persistence, Backup & Restore

- **Installable PWA** — after the first visit the app, including all rulebook PDFs, is cached by a service worker and works without a connection. Use _Add to Home Screen_ / _Install app_ in your browser.
- **Auto-save** to the browser's `localStorage` after every action. Nothing is sent to a server.
- **Export** the match as a dated `.json` file and **import** it on another device. Imported and saved data is validated; a corrupted file is rejected instead of breaking the app.

---

## Official Rulebooks in the App

The **Rulebook** banner in the dictionary opens the official Rulefactory rulebook and overview cards in the selected language (EN, DE, FR, IT). The files live in [`public/rules/`](../public/rules/) and are listed in the [Game Rules Reference](GAME_RULES.md#official-rulebook-pdfs).

---

## Known Limitations

- **The End is nigh** changes end-of-game scoring in a way that depends on all players' points; enter it with the free adjustment.
- **Event entries store point deltas.** If you edit an earlier round after an Identity Theft, the swap is not recalculated.
- Data is stored per browser and device; use export/import to move a match.

---

## Related Documentation

- [Game Rules Reference](GAME_RULES.md)
- [Architecture](ARCHITECTURE.md)
- [Setup & Local Development](SETUP.md)
