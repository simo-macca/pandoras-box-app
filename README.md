# Frantic: Pandora's Box – Digital Companion App

[![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38bdf8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-5.0.4-facc15.svg?style=flat&logo=vitest)](https://vitest.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#disclaimer--credits)

An intuitive, responsive web companion app designed for the card game **[Frantic](https://rulefactory.ch/)** and its official expansion **Pandora's Box**, created by **Rulefactory**.

Say goodbye to messy pen-and-paper scoring, manual card-counting errors, forgotten special rules, and lost rulebooks. This companion app automates round scoring, tracks leaderboard standings with elimination danger zones, draws Pandora's Box Rule Cards with simulated dice rolls, and provides an instant multilingual encyclopedia for every card, event, and power card in the game.

---

## Documentation Hub

Explore the modular project documentation:

| Document                                                   | Description                                                                                                                    |
| :--------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **[Setup & Local Development](docs/SETUP.md)**             | Prerequisites, installation, npm scripts, automated testing, and Husky/lint-staged pre-commit pipeline.                        |
| **[System Architecture](docs/ARCHITECTURE.md)**            | Modular architecture, state engine (`useGameState`), domain calculators (`scoring.ts`, `stats.ts`), audio, and test structure. |
| **[Application Features](docs/FEATURES.md)**               | Comprehensive walkthrough of all 9 core features, scoring tools, offline capabilities, and UI workflows.                       |
| **[Game Rules Reference](docs/GAME_RULES.md)**             | Official Frantic and Pandora's Box rules reference, penalty scoring breakdown, and target presets.                             |
| **[Developer & Contributing Guide](docs/CONTRIBUTING.md)** | How-to guides for adding cards, modifying translations, updating scoring logic, running tests, and code standards.             |
| **[Deployment Guide](docs/DEPLOYMENT.md)**                 | Production builds, previewing, and hosting instructions for Netlify, Vercel, and custom servers.                               |

---

## Key Features at a Glance

- **Automated Hand Point Calculator**: Quick selectors for numbered cards (1–10), standard specials (7 pts), Curse (13 pts), The End (17 pts), Fuck You (42 pts), Mimicry (7 pts), and event modifiers (Doomsday 50 pts, Time Bomb table & player modifiers).
- **"Identity Theft" Event Action**: Quick-action button on the scoreboard that automatically swaps cumulative scores between the player with the lowest score and the player with the highest score, featuring deterministic tie-breaking, round counter preservation, and full JSON export/import persistence.
- **Live Leaderboard & Elimination Alerts**: Dynamically ranks players (lowest penalty points lead!), tracks round wins, and flags players in the **Danger Zone** ($\ge 80\%$ of target score).
- **Rule Card Drawer**: Digital randomizer with rolling sound effects and animations for all 15 Pandora's Box Rule Cards, with an active banner reminder pinned to the scoreboard.
- **Multilingual Card Encyclopedia**: Instant search and filtering across **23 Special Cards**, **44 Event Cards**, **12 Supercharge Power Cards**, and **15 Rule Cards** with tactical tips and timing guides.
- **Official Rules Alignment**: Strictly aligned card timing (e.g., Recycling 1st, Special Charge 2nd), global vs. targeted event scopes, and table-wide Doomsday and Time Bomb state invariants.
- **Offline PDF Manuals**: Local serving and in-browser viewing of official Rulefactory manuals and overview cards in 4 languages (**EN**, **DE**, **FR**, **IT**).
- **Zero-Asset Procedural Audio**: Realistic dice rolls, clicks, and victory fanfare synthesized via the Web Audio API without binary audio downloads.
- **State Persistence & Backup**: Local auto-save via `localStorage`, plus complete JSON match export and import for device migration or tournament records.
- **Mobile-First & Theming**: Fully responsive layout with Dark, Light, and System theme switching.
- **Automated Test Suite**: 19 test suites and 134 unit tests covering utilities, hooks, static game data, and UI components via Vitest and React Testing Library.

_For a detailed breakdown of all capabilities, see the [Application Features Guide](docs/FEATURES.md)._

---

## Game Rules Alignment & Logic Integrity

The application's rules engine, event resolution logic, and card taxonomies are synchronized against official Rulefactory rulebooks:

- **Power Card Timing Integrity**:
  - **Recycling**: Verified as `timing: '1st'` (triggered _before_ the hand card effect; draws 1 card from discard pile) per Rulefactory rulebook p. 19.
  - **Special Charge**: Verified as `timing: '2nd'` (triggered _after_ the hand card effect; draws 2 cards) per Rulefactory rulebook p. 20.
  - Descriptions and timing tips localized across English, German, Italian, and French.
- **Event Scope Taxonomy**:
  - Classified all 44 event cards into **Global** (table-wide effects affecting all players simultaneously) and **Targeted** (single-player or dueling actions), complete with UI badges and localized tags.
- **Table-Level Global Event Synchronization**:
  - **Doomsday (D20 = 20)**: Enforced table-wide invariant where all players receive exactly 50 points, round winner toggle is disabled, and table state is preserved upon individual player resets.
  - **Time Bomb (D20 = 17)**: Integrated table-wide mode selector that automatically applies point doubling (`expired_double`) across all players or assigns winner bonus (-10 pts) and opponent penalties (+10 pts) on defusal.
- **Round Snapshot Isolation**:
  - Active rule cards and round modifiers are snapshotted immutably per round in `useGameState`, preventing temporary state leakage across rounds.

---

## Quick Start

### For Players (Game Night)

1. **Setup Match**: Tap **Match Setup** to configure 2–8 players, choose pawn colors, and pick a score limit preset (_Short_, _Medium_, or _Long_).
2. **Draw Rule Card** _(Pandora's Box)_: Go to the **Rule Cards** tab and tap **Draw Random Rule Card**, then tap **Activate for Round**.
3. **Play Round**: Play your physical cards following standard Frantic rules.
4. **Log Scores**: When the round concludes, tap **Score Round** (`+`). Select the round winner (0 pts) and log remaining cards for each player.
5. **Crown Winner**: When a player crosses the score limit, the app celebrates the winner with confetti and fanfare!

_Read the complete [Game Night Quick-Start Guide](docs/FEATURES.md#game-night-quick-start-guide)._

### For Developers

```bash
# 1. Clone the repository
git clone https://github.com/simonemaccario/pandoras-box-app.git
cd pandoras-box-app

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Run test suite
npm run test
```

Open `http://localhost:5173` in your browser.

_Read the complete [Setup Guide](docs/SETUP.md)._

---

## Technology Stack

| Layer          | Technology                                                                                                                                           | Details                                                 |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------ |
| **Framework**  | [React 18](https://react.dev/)                                                                                                                       | Component-based Single Page Application                 |
| **Language**   | [TypeScript 5](https://www.typescriptlang.org/)                                                                                                      | Strict static typing and interface contracts            |
| **Build Tool** | [Vite 6](https://vitejs.dev/)                                                                                                                        | Fast HMR dev server and optimized production bundler    |
| **Testing**    | [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), [jest-dom](https://github.com/testing-library/jest-dom), jsdom | Automated unit, hook, and UI component testing          |
| **Styling**    | [Tailwind CSS 4](https://tailwindcss.com/)                                                                                                           | Responsive design tokens with dark mode support         |
| **Audio**      | [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)                                                                      | Procedural synthesizer in `src/utils/sound.ts`          |
| **Icons**      | [Lucide React](https://lucide.dev/)                                                                                                                  | Modern scalable vector UI iconography                   |
| **Effects**    | [canvas-confetti](https://github.com/catdad/canvas-confetti)                                                                                         | Canvas particle celebrations for game-over victory      |
| **Hosting**    | [Netlify](https://www.netlify.com/)                                                                                                                  | Static SPA hosting via [`netlify.toml`](./netlify.toml) |

_Read the complete [System Architecture](docs/ARCHITECTURE.md)._

---

## Scoring Rules Quick Reference

In Frantic, points represent **penalty points**. The player with the **lowest score** when someone hits the target limit wins!

| Card Type                  | Examples                                                          |            Penalty Points             |
| :------------------------- | :---------------------------------------------------------------- | :-----------------------------------: |
| **Number Cards**           | `1` to `10` (any colour or black)                                 |       **Face value (1–10 pts)**       |
| **Standard Specials**      | _Skip, Gift, Exchange, Second Chance, Colour Swap, Thief, etc._   |               **7 pts**               |
| **Wish / Unique Specials** | _Fantastic, Fantastic Four, Equality, Inequality, Nice Try, etc._ |               **7 pts**               |
| **Mimicry**                | _Mimicry_                                                         |               **7 pts**               |
| **Curse**                  | _Curse_ (unplayable)                                              |              **13 pts**               |
| **The End**                | _The End_ (playable only as last card)                            |              **17 pts**               |
| **Fuck You**               | _Fuck You_ (playable only with 10 cards in hand)                  |              **42 pts**               |
| **Power Cards**            | _Adrenaline, Teleport, Deflector, etc._                           |               **0 pts**               |
| **Doomsday Modifier**      | Round ends immediately                                            |      **50 pts for all players**       |
| **Identity Theft Event**   | Scores swapped between lowest and highest players                 | **Net 0 pts (Round count unchanged)** |

_Read the complete [Game Rules Reference](docs/GAME_RULES.md)._

---

## Official Rulebook PDFs

Official rulebooks and player overview cards in [`rules/`](./rules/):

| Language    | Complete Rulebook                                                            | Overview Cards                                           |
| :---------- | :--------------------------------------------------------------------------- | :------------------------------------------------------- |
| **English** | [Download EN Rulebook](rules/Pandoras_Box_Gesamtregelwerk_EN_web.pdf)        | [Download EN Cards](rules/Uebersichtskarten_EN_web.pdf)  |
| **German**  | [Download DE Gesamtregelwerk](rules/Pandoras_Box_Gesamtregelwerk_DE_web.pdf) | [Download DE Karten](rules/Uebersichtskarten_DE_web.pdf) |
| **French**  | [Download FR Règles](rules/Pandoras_Box_Gesamtregelwerk_FR.pdf)              | [Download FR Cartes](rules/Uebersichtskarten_FR_web.pdf) |
| **Italian** | [Download IT Regolamento](rules/Pandoras_Box_Gesamtregelwerk_IT_web.pdf)     | [Download IT Carte](rules/Uebersichtskarten_IT_web.pdf)  |

---

## Available Scripts

| Command                | Action                                                                 |
| :--------------------- | :--------------------------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server with HMR.                           |
| `npm run build`        | Compiles TypeScript and bundles production assets into `dist/`.        |
| `npm run preview`      | Locally serves the production build.                                   |
| `npm run test`         | Executes the automated test suite once via Vitest.                     |
| `npm run test:watch`   | Runs Vitest in interactive watch mode for TDD / active development.    |
| `npm run lint`         | Runs ESLint for syntax, code quality, and React Hook rules.            |
| `npm run type-check`   | Type-checks the codebase via `tsc --noEmit` without emitting files.    |
| `npm run format`       | Auto-formats code and reorders Tailwind classes with Prettier.         |
| `npm run format:check` | Verifies code adheres to formatting standards without modifying files. |

---

## Disclaimer & Credits

> **Legal Disclaimer:**
> Pandora's Box is a game created and published by **Rulefactory**. This website is an unofficial, non-commercial companion tool designed solely for scorekeeping and rule reference. It is not affiliated with, endorsed, or sponsored by Rulefactory. All trademarks, logos, and copyrighted materials belong to their respective owners.

- **Frantic** and **Pandora's Box** are card games created and copyrighted by **[Rulefactory](https://rulefactory.ch/)** (Rulefactory GmbH).
- All official game names, card designs, rules, and trademarks belong to their respective creators and Rulefactory.
- This project is an unofficial, non-commercial open-source companion tool created by fans for fans.
- Official rulebook PDFs included in the [`rules/`](./rules/) directory are provided for offline reference during gameplay and remain the intellectual property of Rulefactory.
