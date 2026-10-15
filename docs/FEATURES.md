# Application Features & Player Guide

This document outlines the core capabilities, scoring tools, card databases, and player workflows available in **Frantic: Pandora's Box – Digital Companion App**.

---

## Table of Contents

- [Game Night Quick-Start Guide](#game-night-quick-start-guide)
- [Feature Walkthrough](#feature-walkthrough)
  - [1. Real-time Leaderboard & Danger Zone](#1-real-time-leaderboard--danger-zone)
  - [2. Interactive Hand Point Calculator](#2-interactive-hand-point-calculator)
  - [3. Round History, Editing & Undo](#3-round-history-editing--undo)
  - [4. "Identity Theft" Event Action & Match History](#4-identity-theft-event-action--match-history)
  - [5. "Seppuku T" Event Action](#5-seppuku-t-event-action)
  - [6. Pandora's Box Rule Card Drawer](#6-pandoras-box-rule-card-drawer)
  - [7. Multilingual Rules & Card Encyclopedia](#7-multilingual-rules--card-encyclopedia)
  - [8. Match Configuration & Player Management](#8-match-configuration--player-management)
  - [9. Game Over Celebration & Statistics](#9-game-over-celebration--statistics)
  - [10. Audio Effects, Haptics & Dark Mode](#10-audio-effects-haptics--dark-mode)
  - [11. Data Persistence, Backup & Restore](#11-data-persistence-backup--restore)
- [Integrated PDF Rulebook Viewer](#integrated-pdf-rulebook-viewer)
- [Related Documentation](#related-documentation)

---

## Game Night Quick-Start Guide

Running a match during game night is fast and seamless:

1. **Configure Match**:
   - Open the app and tap **Match Setup** (or the gear icon).
   - Enter names for **2 to 8 players** and pick their pawn colors.
   - Choose a target score preset (**Short**, **Medium**, or **Long**) or set a custom point limit.
2. **Draw Pandora's Box Rule Card** _(if playing with expansion)_:
   - Go to the **Rule Cards** tab.
   - Tap **Draw Random Rule Card** to shuffle and reveal the global modifier for the upcoming round.
   - Tap **Activate for Round** to pin the rule banner to your scoreboard.
3. **Play Round**:
   - Play your physical cards following standard Frantic rules.
4. **Log Round Scores**:
   - When the round ends, tap the **Score Round** (`+`) button.
   - Switch between player tabs:
     - Tap **Round Winner (0 pts)** for the player who emptied their hand.
     - For other players, increment their remaining cards using the number grid and special card counters.
     - Toggle **Doomsday** or select **Time Bomb** modifiers if those events occurred.
   - Tap **Submit Round Scores**.
5. **Monitor Standings & Crown the Winner**:
   - Standings update immediately.
   - When any player reaches or exceeds the target score limit, the app launches celebratory confetti and announces the overall winner (the player with the fewest penalty points!).

---

## Feature Walkthrough

### 1. Real-time Leaderboard & Danger Zone

The central Scoreboard provides instant clarity on match standings:

- **Dynamic Sorting**: Players are sorted live by cumulative score. The player with the lowest penalty points holds 1st place.
- **Visual Progress Bar**: Each player card features a progress meter showing their distance to the score limit.
- **Danger Zone Warning**: When a player reaches or exceeds 80% of the target threshold, their card switches to a high-contrast warning state (yellow/red glow).
- **Match Metrics**: Header stats display current round number, match leader, target score, and rounds won per player.

---

### 2. Interactive Hand Point Calculator

Accessible via the floating `+` button or navigation bar, the hand calculator eliminates manual math errors:

- **Player Tabs**: Quickly swipe or click between players in the match.
- **One-Tap Winner**: Instantly assigns 0 points and marks the player as the round winner.
- **Number Grid (1–10)**: Tap `+` or `-` buttons to log standard number cards.
- **Special Card Counters**: Dedicated steppers for:
  - Standard Specials (7 pts each)
  - Mimicry (7 pts each)
  - Curse (13 pts each)
  - The End (17 pts each)
  - Fuck You (42 pts each)
- **Event Modifier Toggles**:
  - **Doomsday (50 pts)**: Overrides hand score to 50 pts for all participants.
  - **Time Bomb**: Choose from _Winner Bonus (-10 pts)_, _Loser Penalty (+10 pts)_, or _Expired Explosion (Double Points)_.
- **Direct Freeform Numeric Modifiers**: Unrestricted manual numeric input allows typing positive or negative modifiers directly (e.g., `-15`, `+25`), eliminating cumbersome click steppers.
- **Unrestricted Negative Scores**: Round scores and total scores fully support negative numbers without artificial 0-clamping.
- **Live Calculation**: The computed score updates in real time as you adjust card quantities.

---

### 3. Round History, Editing & Undo

Mistakes at the table happen. The companion app offers full retrospective editing:

- **Chronological Log**: View a full breakdown of every round played in reverse chronological order.
- **Round Details**: Highlights round winners, Doomsday triggers, and Time Bomb penalties.
- **Full Edit Mode**: Tap the edit pencil icon on any past round to open the hand calculator populated with that round's data, allowing correction of card counts.
- **Undo / Delete**: Instantly revert the most recent round or delete specific rounds with confirmation dialogs.

---

### 4. "Identity Theft" Event Action & Match History

When the chaotic **Identity Theft** event card is triggered during gameplay:

- **One-Tap Execution**: Tap the **Identity Theft** button located directly on the Scoreboard actions toolbar.
- **Automated Score Swap**: Automatically identifies the player with the lowest score and the player with the highest score, and swaps their cumulative penalty points.
- **Deterministic Tie-Breaking**: If multiple players are tied for the lowest score or the highest score, ties are deterministically resolved by choosing the first matching player in the roster order (`gameState.players`).
- **Identical Scores Protection**: When all player scores are currently identical (e.g., at the start of a match or after a perfectly tied round), the Identity Theft button is automatically disabled and safely no-ops.
- **Round Counter Preservation**: Triggering the Identity Theft event records a dedicated transaction without incrementing or advancing the match round counter (subsequent rounds retain their proper sequence numbers).
- **Match History & Persistence**: The event is recorded in the match history/log with an `Identity Theft` event badge, swapped player names, and point deltas. The swap is preserved in exported JSON match files, restoring exact scores and state history upon re-import.
- **Instant Undo & Delete**: Accidental clicks can be immediately reverted via the undo toast notification or by deleting the event entry from the history table.

---

### 5. "Seppuku T" Event Action & In-Place Editing

When the **SEPPUKU T** event card (by D'Sinead Conception) is revealed:

- **Turn-Order Modal**: Tap the **Seppuku T** button on the Scoreboard to launch the dedicated event modal. Players make their choices sequentially in turn order.
- **Enhanced Rules UI & Action Cards**:
  - **Rules Logic Callout**: A prominent banner reminds players of the card mechanics and stakes before committing.
  - **Descriptive Action Cards**: Replaced cramped buttons with structured, high-contrast action cards displaying the action name, draw criteria ("Flipped 1–10", "Flipped action/special", "Declined to draw"), and high-contrast score delta pills:
    - **Risk Taken — Number card drawn**: `-21 pts` immediately applied to the player's cumulative score.
    - **Risk Taken — Non-number / Special card drawn**: `+42 pts` immediately applied to the player's cumulative score.
    - **No Risk / Refused**: `+21 pts` immediately applied to the player's cumulative score.
- **Immediate Scoreboard Updates**: Adjustments update rankings and leader standings instantly.
- **Round Counter Preservation**: Like Identity Theft, Seppuku T executes as a standalone event entry (`eventType: 'seppuku'`) without advancing the completed round counter.
- **In-Place Retroactive Editing**: Mistakes at the table can be corrected anytime! Tap the **Edit** pencil icon on any Seppuku T entry in the Match History table to reopen the modal in dedicated Edit Mode with previously selected choices prefilled. Updating saves changes in-place, recalculating scores immediately without creating duplicate entries.
- **Full History & Persistence**: Detailed player choices and outcomes are stored in event metadata, displayed in round history with color-coded outcome badges (`Number (-21)`, `Special (+42)`, `No Risk (+21)`), and preserved across JSON exports and re-imports.

---

### 6. Pandora's Box Rule Card Drawer

Bring the expansion's dynamic rules to life digitally:

- **Rolling Dice Animation**: Tap **Draw Random Rule Card** to initiate rolling animations and procedural tumbling sound effects.
- **Active Rule Banner**: Pinned active rule cards remain visible at the top of the scoreboard so all players can reference the active modifier throughout the round.
- **Complete Card Gallery**: Browse all 15 Rule Cards (_Blind Date_, _Double Trouble_, _Color Blind_, _Blackout_, _Anarchy_, etc.) with flavor text and detailed rulings.

---

### 7. Multilingual Rules & Card Encyclopedia

A comprehensive reference dictionary for card game nights:

- **Fast Search & Filter**: Search by card name or effect, filterable by:
  - **Specials**: All 23 base and expansion special cards with tactical tips.
  - **Events**: All 15 black-card events with severity ratings (Positive, Negative, Chaos, Neutral).
  - **Power Cards**: All 12 Supercharge cards with 1st/2nd activation timing guides.
  - **Rule Cards**: All 15 Pandora's Box round modifiers.
- **Localized Content**: All card titles, descriptions, and strategic advice are available in **English**, **German**, **Italian**, and **French**.
- **FAQ & Edge Cases**: Built-in answers to frequently contested card interactions.

---

### 8. Match Configuration & Player Management

Customizable match settings to fit any table:

- **2 to 8 Players**: Accommodates standard groups and large party sessions.
- **10 Vibrant Colors**: Choose from Red, Blue, Green, Yellow, Purple, Orange, White, Black, Cyan, and Pink with custom avatars.
- **Official Score Limits**: Quick-select buttons for Short, Medium, and Long matches automatically adjusted for player count.
- **Custom Target Limits**: Set any custom score limit from 50 to 999 points.
- **Total Round Limit**: Configure an optional fixed maximum round count (presets: 5, 10, 15, 20 rounds or custom limit). The match automatically concludes when the round limit is reached, declaring the lowest scorer the winner.
- **Mid-Game Roster Adjustments**: Edit player names, avatar colors, and round limits mid-match without resetting rounds.
- **Mid-Game Late Joiners**: Add new players to an active game at any point. The companion app automatically assigns their starting penalty points according to the rule:
  $$\text{Starting Score} = \max(\text{Current Player Scores}) + 1$$
  This ensures fair competition while seamlessly integrating new participants into the leaderboard.

---

### 9. Game Over Celebration & Statistics

When the elimination threshold is reached:

- **Automated Detection**: Triggered immediately when any player's cumulative score equals or exceeds the target.
- **Confetti Explosion**: Full-screen celebratory particle bursts powered by `canvas-confetti`.
- **Fanfare Chime**: Audio fanfare synthesized dynamically via the Web Audio API.
- **Podium Breakdown**: Displays final rankings, total points, and rounds won.
- **Play Again**: Resets scores and round history while preserving player names and colors for the next rematch.

---

### 10. Audio Effects, Haptics & Dark Mode

Engineered for a responsive, tactile mobile experience:

- **Zero-Asset Procedural Audio**: Uses Web Audio API oscillators to create dice rolls, tap feedback, and fanfares without downloading audio files.
- **Haptic Vibration**: Provides subtle physical feedback on mobile browsers supporting `navigator.vibrate`.
- **Independent Mute Controls**: Sound and haptics can be toggled on or off independently via the Navbar or Settings modal.
- **Theme Modes**: Choose between Light mode, Dark mode, or automatic System preference.

---

### 11. Data Persistence, Backup & Restore

Keep your tournament logs safe:

- **Automatic Auto-Save**: Saves state to `localStorage` (`frantic_game_state_v2`) after every action.
- **JSON Match Export**: Download a timestamped `.json` file containing match configurations, player profiles, and round logs.
- **JSON Match Import**: Restore past games or transfer ongoing sessions from mobile to desktop browsers.

---

## Integrated PDF Rulebook Viewer

The app provides offline access to official Rulefactory rulebooks in all 4 supported languages located in [`rules/`](../rules/):

| Language    | Complete Rulebook                                                                             | Quick Reference Cards                                                   |
| :---------- | :-------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **English** | [`Pandoras_Box_Gesamtregelwerk_EN_web.pdf`](../rules/Pandoras_Box_Gesamtregelwerk_EN_web.pdf) | [`Uebersichtskarten_EN_web.pdf`](../rules/Uebersichtskarten_EN_web.pdf) |
| **German**  | [`Pandoras_Box_Gesamtregelwerk_DE_web.pdf`](../rules/Pandoras_Box_Gesamtregelwerk_DE_web.pdf) | [`Uebersichtskarten_DE_web.pdf`](../rules/Uebersichtskarten_DE_web.pdf) |
| **French**  | [`Pandoras_Box_Gesamtregelwerk_FR.pdf`](../rules/Pandoras_Box_Gesamtregelwerk_FR.pdf)         | [`Uebersichtskarten_FR_web.pdf`](../rules/Uebersichtskarten_FR_web.pdf) |
| **Italian** | [`Pandoras_Box_Gesamtregelwerk_IT_web.pdf`](../rules/Pandoras_Box_Gesamtregelwerk_IT_web.pdf) | [`Uebersichtskarten_IT_web.pdf`](../rules/Uebersichtskarten_IT_web.pdf) |

Players can open and view these rulebooks directly in their browser or download them for offline access.

---

## Related Documentation

- **[Game Rules Reference](GAME_RULES.md)**: Full summary of Frantic and Pandora's Box mechanics.
- **[System Architecture](ARCHITECTURE.md)**: State management and engineering design.
- **[Setup & Local Development](SETUP.md)**: How to run the companion app locally.
- **[Contributing Guide](CONTRIBUTING.md)**: Adding new cards, translations, and features.
