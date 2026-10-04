# 🃏 Frantic: Pandora's Box – Digital Companion App

[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38bdf8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An intuitive, responsive web companion app designed for the card game **[Frantic](https://rulefactory.ch/)** and its official expansion **Pandora's Box**, created by **Rulefactory**.

Say goodbye to messy pen-and-paper scoring, manual card counting errors, forgotten special rules, and lost rulebooks. This companion app automates round scoring, tracks leaderboard standings with elimination danger zones, draws Pandora's Box Rule Cards, and provides an instant multilingual encyclopedia for every card, event, and power card in the game.

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🎮 Quick Start Guide (For Players)](#-quick-start-guide-for-players)
- [📜 Game Rules Reference](#-game-rules-reference)
  - [Goal & Winning Conditions](#goal--winning-conditions)
  - [Game Setup & Direction of Play](#game-setup--direction-of-play)
  - [Turn Flow & Ending a Round](#turn-flow--ending-a-round)
  - [The Golden Rule: Black Cards & Events](#the-golden-rule-black-cards--events)
  - [Round-End Scoring Breakdown](#round-end-scoring-breakdown)
  - [Official Score Limit Presets](#official-score-limit-presets)
  - [Pandora's Box Expansion Rules](#pandoras-box-expansion-rules)
- [📱 App Functionality Walkthrough](#-app-functionality-walkthrough)
  - [1. Real-time Leaderboard & Danger Zone](#1-real-time-leaderboard--danger-zone)
  - [2. Interactive Hand Point Calculator](#2-interactive-hand-point-calculator)
  - [3. Round History, Editing & Undo](#3-round-history-editing--undo)
  - [4. Pandora's Box Rule Card Drawer](#4-pandoras-box-rule-card-drawer)
  - [5. Multilingual Rules & Card Encyclopedia](#5-multilingual-rules--card-encyclopedia)
  - [6. Match Configuration & Player Management](#6-match-configuration--player-management)
  - [7. Game Over Celebration & Statistics](#7-game-over-celebration--statistics)
  - [8. Audio Effects, Haptics & Dark Mode](#8-audio-effects-haptics--dark-mode)
  - [9. Data Persistence, Backup & Restore](#9-data-persistence-backup--restore)
- [📂 Project Folder Structure](#-project-folder-structure)
- [💻 Developer Guide](#-developer-guide)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Development](#installation--local-development)
  - [Available Scripts](#available-scripts)
  - [Architecture & Core Concepts](#architecture--core-concepts)
  - [How-To Guides for Developers](#how-to-guides-for-developers)
    - [Adding or Updating Cards, Events, or Rule Cards](#adding-or-updating-cards-events-or-rule-cards)
    - [Adding or Modifying Translations](#adding-or-modifying-translations)
    - [Modifying Scoring Logic](#modifying-scoring-logic)
- [🌐 Deployment](#-deployment)
- [⚖️ Disclaimer & Credits](#️-disclaimer--credits)

---

## ✨ Key Features

- **Automated Hand Calculator**: Quick selectors for numbered cards (1–10), standard specials (7 pts), Curse (13 pts), The End (17 pts), Fuck You (42 pts), Mimicry (7 pts), and special event modifiers (Doomsday 50 pts, Time Bomb penalties/bonuses).
- **Live Leaderboard & Elimination Alerts**: Tracks each player's cumulative score, ranking (lowest score leads!), rounds won, and alerts players when entering the **Danger Zone** (≥ 80% of limit) or becoming eliminated.
- **Rule Card Drawer**: Digital randomizer with rolling animations and sound effects for all 15 Pandora's Box Rule Cards, with an active banner reminder on the scoreboard.
- **Card & Event Encyclopedia**: Instant search and category filtering across all **23 Special Cards**, **15 Event Cards**, **12 Supercharge Power Cards**, and **15 Rule Cards** with tactical tips and timing guides.
- **Official Rules & PDF Viewer**: Built-in rules summary covering setup, turn flow, and edge cases, plus local serving of the official PDF manuals and overview cards in 4 languages with native in-browser viewing and direct download.
- **Full Multilingual Support (i18n)**: Entire UI and card database fully localized in **English (EN)**, **German (DE)**, **Italian (IT)**, and **French (FR)**.
- **Zero-Asset Synthetic Audio & Haptics**: Realistic dice roll, click, and victory sounds synthesized dynamically via the Web Audio API without requiring external audio files.
- **State Persistence & Backup**: Automatic local persistence via `localStorage`, plus complete JSON match export and import for device migration or tournament records.
- **Responsive & PWA-Ready**: Optimized for mobile devices, tablets, and desktops with smooth Dark / Light / System theme switching.

---

## 🎮 Quick Start Guide (For Players)

Using the companion during your game night is simple:

1. **Start a Match**:
   - Open the app. Click **Match Setup** (or the Settings icon).
   - Configure **2 to 8 players**, assign their names and color tokens.
   - Choose your game length preset (**Short**, **Medium**, **Long**) or enter a custom target score.
2. **Draw a Rule Card (Pandora's Box expansion)**:
   - Navigate to the **Rule Cards** tab.
   - Tap **Draw Random Rule Card** to decide the special rule that modifies the upcoming round.
   - Tap **Activate for Round** to display the active rule pinned to the top of your Scoreboard.
3. **Play the Round**:
   - Play your physical cards on the table following standard Frantic rules.
4. **Log the Round**:
   - When someone plays their last card or the draw pile runs out, tap **Score Round** (`+`).
   - Switch between players using the colored tabs:
     - Tap **Round Winner (0 pts)** for whoever shed all their cards.
     - For other players, tap the numbered card counters and special card buttons representing the cards left in their hands.
     - Toggle event modifiers if **Doomsday** occurred or **Time Bomb** exploded.
   - Tap **Submit Round Scores**.
5. **Track Standings & Crown the Winner**:
   - The scoreboard ranks players with the lowest score at the top.
   - If any player crosses the target score limit, the app launches celebratory confetti and crowns the winner with the lowest total score!

---

## 📜 Game Rules Reference

Below is a summary of the official rules of **Frantic** and the **Pandora's Box** expansion to help players resolve disputes instantly at the table.

### Goal & Winning Conditions

- **Core Goal**: Get rid of all cards in your hand as fast as possible.
- **Points are bad**: In Frantic, points represent **penalty points**.
- **Game End**: Round after round, players accumulate penalty points. The game terminates immediately at the end of any round where at least one player **reaches or exceeds the Target Score Limit**.
- **Winning**: The player with the **lowest total score** wins the game!

### Game Setup & Direction of Play

- **Player Count**: 2 to 8 players.
- **Starting Hand**: Deal **7 cards** to each player (or at least 4 in custom variants).
- **Direction**: Play proceeds strictly **anti-clockwise** (counter-clockwise).
- **Dealer**:
  - In Round 1: The owner of the game deals.
  - In subsequent rounds: The player who scored the most points (the "loser") in the preceding round deals.
- **First Discard**: The dealer turns over the top card of the draw pile to start the discard pile. **The effect of this initial card is triggered immediately as if played by the dealer!**

### Turn Flow & Ending a Round

1. On your turn, play **1 card** from your hand matching the top card of the discard pile by:
   - **Colour**, **Number**, or **Symbol**.
2. If you cannot or choose not to play a card, draw **1 card** from the draw pile. If the drawn card is playable, you may play it immediately.
3. **"Last Card" Rule**: When you have only 1 card left in hand, you must announce _"Last Card!"_ before the next player takes their turn. If caught forgetting, you must draw **4 penalty cards**.
4. **A round ends immediately when**:
   - A player successfully plays their final card (they score **0 points** for the round).
   - A player must draw a card, but the draw pile is completely exhausted.

### The Golden Rule: Black Cards & Events

- **Black is NOT a colour**:
  - You cannot choose "black" when playing a wish card (e.g., Fantastic).
  - You cannot play a black card simply because the previous card was black.
  - A black card can only be played on top of another card if it matches the **exact number**, or if played via a special open-wish card.
- **Event Activation**: Whenever any player plays a **black numbered card**, an **Event Card** is drawn immediately from the Event deck and its effect takes place before play continues.

### Round-End Scoring Breakdown

When a round concludes, players calculate penalty points for the cards remaining in their hands:

| Card Type                   | Examples                                                                                  |      Penalty Points       | Notes                                                 |
| :-------------------------- | :---------------------------------------------------------------------------------------- | :-----------------------: | :---------------------------------------------------- |
| **Number Cards**            | `1` to `10` (any colour or black)                                                         | **Face value (1–10 pts)** | A `7` is 7 pts, a `10` is 10 pts, etc.                |
| **Standard Specials**       | _Skip, Gift, Exchange, Second Chance, Colour Swap, Thief, Troublemaker, Recharge_         |         **7 pts**         | Includes 1-colour and 2-colour variants               |
| **Wish / Unique Specials**  | _Fantastic, Fantastic Four, Equality, Inequality, Nice Try, Lucky Bastard, Counterattack_ |         **7 pts**         | All standard special effects                          |
| **Mimicry**                 | _Mimicry_                                                                                 |         **7 pts**         | Copies any special card                               |
| **Curse**                   | _Curse_                                                                                   |        **13 pts**         | **Unplayable**: Cannot be discarded normally!         |
| **The End**                 | _The End_                                                                                 |        **17 pts**         | Can only be played as your **very last card**         |
| **Fuck You**                | _Fuck You_                                                                                |        **42 pts**         | Can only be played when holding **exactly 10 cards**! |
| **Supercharge Power Cards** | _Adrenaline, Teleport, Deflector, etc._                                                   |         **0 pts**         | Power cards never grant penalty points                |

#### Special Event Scoring Modifiers

- **Doomsday**: If the Doomsday event triggers and is not cancelled, the round ends immediately and **every player receives 50 points**!
- **Time Bomb**:
  - **Winner Bonus**: Player holding the bomb who wins receives **-10 points**.
  - **Loser Penalty**: Player holding the bomb when another player finishes receives **+10 points**.
  - **Expired**: If the bomb explodes before anyone finishes, the holder's round score is **doubled (x2)**.

### Official Score Limit Presets

The official rules specify target score thresholds according to the number of participants:

| Group Size        | Short Game | Medium Game (Standard) | Long Game |
| :---------------- | :--------: | :--------------------: | :-------: |
| **2 – 4 Players** | `137 pts`  |       `154 pts`        | `179 pts` |
| **5 – 8 Players** | `113 pts`  |       `137 pts`        | `154 pts` |

_Tip: The companion app automatically detects player count and suggests the official presets._

### Pandora's Box Expansion Rules

The **Pandora's Box** expansion adds two key mechanics:

1. **Rule Cards (15 Cards)**:
   - At the beginning of each round, draw 1 Rule Card.
   - That rule modifies the gameplay for **everyone** throughout the entire round (e.g., _Blind Date_, _Double Trouble_, _Color Blind_, _Blackout_, _Anarchy_).
2. **Supercharge Power Cards**:
   - Power cards are placed face down in front of each player (not in their hand).
   - They can be triggered during a player's turn when playing a hand card:
     - **1ST Timing**: Activates **before** the hand card resolves (e.g., _Adrenaline_, _Teleport_).
     - **2ND Timing**: Activates **after** the hand card resolves (e.g., _Deflector_, _Troublecharger_).
   - Power cards score **0 penalty points** at the end of the round.

---

## 📱 App Functionality Walkthrough

### 1. Real-time Leaderboard & Danger Zone

- **Live Sorting**: Players are ordered dynamically with the lowest penalty score at Rank 1.
- **Visual Progress Bar**: Shows the percentage toward the elimination target limit.
- **Danger Zone Warning**: Automatically turns yellow/red when a player reaches 80% or more of the score limit.
- **Key Metrics**: Displays leader name, points remaining before elimination, and rounds won.

### 2. Interactive Hand Point Calculator

- Tap **Score Round** from anywhere to open the modal.
- Switch seamlessly between player tabs.
- **One-Tap Winner**: Zeroes out hand scores and marks the player as the round winner.
- **Grid Incrementer**: Tap `+` or `-` on buttons 1 through 10 for number cards.
- **Special Card Counters**: Dedicated counters for 7-pt Specials, Curse (13 pt), The End (17 pt), Fuck You (42 pt), and Mimicry (7 pt).
- **Event Modifier Toggles**: 1-click Doomsday (50 pts) and Time Bomb dropdown selection.
- **Instant Total Calculation**: Score is updated live as you adjust counters.

### 3. Round History, Editing & Undo

- View every recorded round in reverse chronological order.
- Inspect the breakdown of points scored by each player per round.
- Highlights round winners, Doomsday rounds, and Time Bomb victims.
- **Full Edit Mode**: Tap the edit pencil icon to modify any previous round's card entries.
- **Undo / Delete**: Instantly revert the last round or delete specific rounds with confirmation protection.

### 4. Pandora's Box Rule Card Drawer

- Tap the **Rule Cards** navigation tab.
- Click **Draw Random Rule Card** to initiate a rolling dice shuffle sound effect and animation.
- Select **Activate for Round** to pin the drawn card as the active rule.
- Pinned rule cards display as an interactive banner above the scoreboard with full descriptions and flavor quotes.
- Browse the full gallery of all 15 Rule Cards at any time.

### 5. Multilingual Rules & Card Encyclopedia

- Access the **Rules & Directory** tab for a searchable, filterable card glossary.
- Categorized into:
  - **All**: Search across every item in the game.
  - **Specials**: Detailed descriptions and pro tips for all base and expansion specials.
  - **Events**: Severity ratings (Positive, Negative, Chaos, Neutral) for all black-card events.
  - **Power Cards**: Charges and 1st/2nd activation timing guides.
  - **Rule Cards**: All 15 global modifiers from Pandora's Box.
- Serves local official rulebook PDFs and overview cards in EN, DE, FR, and IT directly in new tabs with built-in viewer and direct download capabilities.

### 6. Match Configuration & Player Management

- Support for **2 to 8 players**.
- Choice of **10 vibrant pawn colors** (Red, Blue, Green, Yellow, Purple, Orange, White, Black, Cyan, Pink) with distinct glow rings and avatars.
- Quick preset selection for Short, Medium, and Long matches, plus custom point values (from 10 to 999 pts).
- Mid-game player editing (add/remove players or change names without losing round history).

### 7. Game Over Celebration & Statistics

- Automatic trigger when any player's cumulative score equals or exceeds the target threshold.
- Interactive multi-burst confetti celebration powered by `canvas-confetti`.
- Victory fanfare chime via Web Audio.
- Final leaderboard standings showing podium finishes and round win counts.
- **Play Again** button to start a fresh match with the same players.

### 8. Audio Effects, Haptics & Dark Mode

- **Procedural Synthesizer**: Uses Web Audio API oscillators to generate click, roll, and fanfare effects without relying on audio MP3/WAV files.
- **Haptic Vibration**: Supports device vibration feedback on mobile browsers.
- **Mute Controls**: Sound and haptics can be toggled independently in the Settings modal or Navbar.
- **Theme Modes**: Supports Light mode, Dark mode, and automatic System preference.

### 9. Data Persistence, Backup & Restore

- **Auto-save**: Every action is saved automatically to `localStorage` (`frantic_game_state_v2`).
- **Export Match**: Downloads a formatted JSON file with complete player, config, and round history data.
- **Import Match**: Upload a previously saved JSON file to restore any past game or transfer state between mobile and desktop devices.

---

## 📂 Project Folder Structure

```text
frantic-pandoras-box-companion/
├── index.html                   # HTML entry point with metadata, icons, and viewport config
├── netlify.toml                 # Netlify deployment configuration & redirect rules
├── package.json                 # Project dependencies, scripts, and metadata
├── postcss.config.js            # PostCSS configuration for Tailwind CSS
├── tailwind.config.js           # Tailwind configuration (custom colors, safe-area, dark mode)
├── tsconfig.json                # TypeScript compiler configuration
├── tsconfig.tsbuildinfo         # Incremental build cache
├── vite.config.ts               # Vite build and plugin setup
│
├── public/                      # Static web assets (favicons, manifests)
│
├── rules/                       # Official Rulefactory PDF rulebooks
│   ├── Pandoras_Box_Gesamtregelwerk_EN_web.pdf   # Complete English rulebook
│   ├── Pandoras_Box_Gesamtregelwerk_DE_web.pdf   # Complete German rulebook
│   ├── Pandoras_Box_Gesamtregelwerk_FR.pdf       # Complete French rulebook
│   ├── Pandoras_Box_Gesamtregelwerk_IT_web.pdf   # Complete Italian rulebook
│   ├── Uebersichtskarten_EN_web.pdf              # English overview cards
│   ├── Uebersichtskarten_DE_web.pdf              # German overview cards
│   ├── Uebersichtskarten_FR_web.pdf              # French overview cards
│   └── Uebersichtskarten_IT_web.pdf              # Italian overview cards
│
└── src/
    ├── App.tsx                  # Main application container, tab router & modal orchestrator
    ├── main.tsx                 # React DOM mount point & strict mode wrapper
    ├── index.css                # Global CSS, Tailwind imports, custom scrollbar utilities
    │
    ├── components/
    │   ├── common/              # Reusable UI primitives
    │   │   └── HelpTooltip.tsx       # Informational popover tooltip component
    │   │
    │   ├── events/              # Event-related components
    │   │   └── D20DiceRoller.tsx     # Dice roller utility placeholder
    │   │
    │   ├── layout/              # App chrome and persistent navigation
    │   │   ├── LanguageSelector.tsx  # Dropdown / modal to switch between EN, DE, IT, FR
    │   │   ├── Navbar.tsx            # Header with round info, sound toggle, PDF link & settings
    │   │   ├── SettingsModal.tsx     # Preferences (Theme, Sound, Haptics, JSON Export/Import, Reset)
    │   │   ├── TabNavigation.tsx     # Desktop tab bar and mobile bottom navigation bar
    │   │   └── ThemeToggle.tsx       # Quick Light / Dark / System theme switcher button
    │   │
    │   ├── rulecards/           # Pandora's Box Rule Card features
    │   │   ├── ActiveRuleCardBanner.tsx # Pinned active rule banner for the current round
    │   │   └── RuleCardDrawer.tsx       # Random card selector with animation & full card gallery
    │   │
    │   ├── rules/               # Rule reference and card dictionary
    │   │   ├── CardDictionary.tsx    # Filterable & searchable card/event/power card browser
    │   │   ├── RulesGuide.tsx        # Structured guide to Frantic rules, setup, turn flow & scoring
    │   │   ├── RulesSummary.tsx      # Re-export alias for rule dictionary
    │   │   └── SearchBar.tsx         # Search bar input with clear button
    │   │
    │   ├── scoreboard/          # Main game overview and history
    │   │   ├── GameOverModal.tsx     # Victory celebration modal with canvas-confetti & rankings
    │   │   ├── Leaderboard.tsx       # Scoreboard container (Stats cards, Player cards, History table)
    │   │   ├── PlayerCard.tsx        # Individual player score tile with progress bar & badges
    │   │   └── RoundHistoryTable.tsx # Detailed chronological round logs with edit and undo controls
    │   │
    │   ├── scoring/             # End-of-round point calculators
    │   │   ├── HandCalculatorModal.tsx # Multi-player hand point calculator modal
    │   │   ├── NumberGrid.tsx          # 1–10 number card counter grid
    │   │   ├── RoundScoringModal.tsx   # Backward-compatible alias for HandCalculatorModal
    │   │   └── SpecialCounters.tsx     # Stepper controls for Specials, Curse, The End, Fuck You, Mimicry
    │   │
    │   └── setup/               # Pre-game configuration modals
    │       ├── GameSetupModal.tsx      # Match setup dialog (player roster, score preset selection)
    │       ├── PlayerConfig.tsx        # Player addition, deletion, name editing & color selector
    │       ├── ScoreLimitPresets.tsx   # Preset selector component for official score limits
    │       └── ScoreLimitSelector.tsx  # Interactive score target slider / button group
    │
    ├── data/                    # Game static datasets and localized content
    │   ├── cardsData.ts         # All standard and unique special cards (points, tips, translations)
    │   ├── eventsData.ts        # All 15 event cards (severity, descriptions, translations)
    │   ├── faqData.ts           # Frequently asked questions and official rulings
    │   ├── powerCardsData.ts    # Supercharge power cards (1st/2nd timing, descriptions)
    │   ├── ruleCardsData.ts     # 15 Pandora's Box Rule Cards (rules, flavor text, translations)
    │   └── translations.ts      # Complete UI translation dictionaries for EN, DE, IT, FR
    │
    ├── hooks/                   # Custom React hooks
    │   ├── useGameState.ts      # Core game engine (players, scores, rounds, auto-save, stats, undo)
    │   └── useTheme.ts          # Dark / Light / System theme management hook
    │
    ├── types/                   # TypeScript interfaces and type definitions
    │   ├── game.ts              # Core game types (Player, HandScore, RoundEntry, GameConfig, GameState)
    │   └── rules.ts             # Card, Event, PowerCard, and RuleCard data types
    │
    └── utils/                   # Helper utilities
        ├── colors.ts            # 10 player color themes (hex codes, tailwind classes, glows)
        └── sound.ts             # Web Audio API procedural sound synthesizer & haptics engine
```

---

## 💻 Developer Guide

### Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)

### Installation & Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/simonemaccario/frantic-pandoras-box-companion.git
   cd frantic-pandoras-box-companion
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

### Available Scripts

| Command                | Description                                                                        |
| :--------------------- | :--------------------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server with Hot Module Replacement (HMR).              |
| `npm run build`        | Runs TypeScript compilation (`tsc -b`) and bundles production assets into `dist/`. |
| `npm run preview`      | Serves the production build locally for verification.                              |
| `npm run lint`         | Runs ESLint to check for code quality and React Hooks rules.                       |
| `npm run type-check`   | Runs TypeScript type checking (`tsc --noEmit`) without emitting build files.       |
| `npm run format`       | Formats all codebase files using Prettier and sorts Tailwind CSS classes.          |
| `npm run format:check` | Checks if files adhere to Prettier formatting without modifying them.              |
| `npm run prepare`      | Initializes Husky git hooks (`.husky/pre-commit`).                                 |

### Automated Pre-commit Pipeline

This project enforces automated quality checks before any commit is finalized:

- **Husky & lint-staged**: Automatically executes on `git commit`.
- **`*.{ts,tsx}`**: Runs `eslint --fix` and `prettier --write` on staged files.
- **`*.{json,css,html,md}`**: Runs `prettier --write` on staged files (including automatic Tailwind class sorting).
- **Type Checking**: Executes `npm run type-check` (`tsc --noEmit`) to prevent committing broken types.

---

### Architecture & Core Concepts

#### 1. State Management (`useGameState.ts`)

The entire application state is governed by the `useGameState` custom hook located in [`src/hooks/useGameState.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/hooks/useGameState.ts).

- **Single Source of Truth**: Stores players, game config (target score), rounds history, active rule card, and game-over state in a single `GameState` object.
- **Computed Stats**: Uses `useMemo` to compute `playerStats` (cumulative scores, rankings, leader flag, danger zone status, points remaining, and round win tallies).
- **Local Persistence**: Automatically synchronizes state changes to `localStorage` under `frantic_game_state_v2`.
- **Immutability & History**: All actions (`addRound`, `editRound`, `deleteRound`, `undoLastRound`) produce new state references, allowing safe re-renders and full undo capabilities.

#### 2. Hand Calculation Engine

Hand points are computed deterministically using the pure function `calculateHandPoints()` in [`src/hooks/useGameState.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/hooks/useGameState.ts):

```typescript
export function calculateHandPoints(
  hand: Omit<HandScore, 'totalPoints'> | HandScore
): number {
  if (hand.isDoomsday) return 50;
  if (hand.isWinner) {
    let pts = hand.timeBombModifier === 'winner_bonus' ? -10 : 0;
    return Math.max(0, pts + (hand.customModifier || 0));
  }

  let total = 0;
  // Sum face values of number cards (1 to 10)
  if (hand.numberCards) {
    Object.entries(hand.numberCards).forEach(([numStr, count]) => {
      total += parseInt(numStr, 10) * count;
    });
  }
  // Add special card points
  total += (hand.specialCardsCount || 0) * 7;
  total += (hand.curseCount || 0) * 13;
  total += (hand.theEndCount || 0) * 17;
  total += (hand.fuckYouCount || 0) * 42;
  total += (hand.mimicryCount || 0) * 7;

  // Apply Time Bomb modifier
  if (hand.timeBombModifier === 'expired_double') total *= 2;
  else if (hand.timeBombModifier === 'loser_penalty') total += 10;
  else if (hand.timeBombModifier === 'winner_bonus') total -= 10;

  total += hand.customModifier || 0;
  return Math.max(0, total);
}
```

#### 3. Procedural Sound System (`sound.ts`)

To keep the bundle lightweight and eliminate external network requests or audio asset licensing issues, [`src/utils/sound.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/utils/sound.ts) generates sound effects using standard Web Audio API oscillators:

- **`playDiceRoll()`**: Plays rapid decaying frequency bursts simulating tumbling dice, paired with vibration haptics.
- **`playClick()`**: High-frequency click impulse for button taps.
- **`playWinner()` / `playDiceFinish()`**: Arpeggiated chord fanfare for game over celebrations.

#### 4. Theming & Colors (`colors.ts` & `useTheme.ts`)

Player colors are managed through [`src/utils/colors.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/utils/colors.ts). Each color provides hex values, badges, avatars, and ring-glow styles that automatically adapt to both light and dark backgrounds.

---

### How-To Guides for Developers

#### Adding or Updating Cards, Events, or Rule Cards

All card definitions are organized inside `src/data/`:

- **Special Cards**: [`src/data/cardsData.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/data/cardsData.ts)
- **Events**: [`src/data/eventsData.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/data/eventsData.ts)
- **Power Cards**: [`src/data/powerCardsData.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/data/powerCardsData.ts)
- **Rule Cards**: [`src/data/ruleCardsData.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/data/ruleCardsData.ts)

To add a new card, add an entry matching the corresponding interface from [`src/types/rules.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/types/rules.ts):

```typescript
{
  id: 'card-identifier',
  name: {
    en: 'English Name',
    de: 'Deutscher Name',
    it: 'Nome Italiano',
    fr: 'Nom Français',
  },
  points: 7,
  category: 'special',
  description: {
    en: 'Card effect description...',
    de: 'Kartenbeschreibung...',
    it: 'Descrizione dell\'effetto...',
    fr: 'Description de l\'effet...',
  },
  tip: {
    en: 'Strategic tip for players...',
    de: 'Strategischer Tipp...',
    it: 'Consiglio tattico...',
    fr: 'Conseil stratégique...',
  }
}
```

#### Adding or Modifying Translations

Translations are typed and maintained in [`src/data/translations.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/data/translations.ts):

1. Locate the `TRANSLATIONS` record object.
2. Edit or add keys under the corresponding language (`en`, `de`, `it`, `fr`).
3. If introducing a new UI key, update the `TranslationStrings` interface so that TypeScript enforces key consistency across all 4 languages.

#### Modifying Scoring Logic

If a new house rule or expansion changes point calculations:

1. Update `calculateHandPoints()` in [`src/hooks/useGameState.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/hooks/useGameState.ts).
2. Update the corresponding input counters in [`src/components/scoring/SpecialCounters.tsx`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/components/scoring/SpecialCounters.tsx) and [`src/components/scoring/HandCalculatorModal.tsx`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/components/scoring/HandCalculatorModal.tsx).
3. Update the `HandScore` type in [`src/types/game.ts`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/src/types/game.ts).

---

## 🌐 Deployment

The application is bundled into static HTML/CSS/JS and can be hosted on any static hosting provider.

### Netlify (Configured)

The repository includes a [`netlify.toml`](file:///Users/simonemaccario/Desktop/frantic-pandoras-box-companion/netlify.toml) file:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Simply connect your GitHub repository to Netlify and deployments will trigger automatically on pushes to `main`.

### Vercel / GitHub Pages

- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## ⚖️ Disclaimer & Credits

> **Legal Disclaimer:**
> Pandora's Box is a game created and published by Rulefactory. This website is an unofficial, non-commercial companion tool designed solely for scorekeeping and rule reference. It is not affiliated with, endorsed, or sponsored by Rulefactory. All trademarks, logos, and copyrighted materials belong to their respective owners.

- **Frantic** and **Pandora's Box** are card games created and copyrighted by **[Rulefactory](https://rulefactory.ch/)** (Rulefactory GmbH).
- All official game names, card designs, rules, and trademarks belong to their respective creators and Rulefactory.
- This project is an unofficial, non-commercial open-source companion tool created by fans for fans to enhance gameplay experiences.
- Official rulebook PDFs included in the `rules/` directory are provided for offline reference during gameplay and remain the intellectual property of Rulefactory.
