# Frantic: Pandora's Box – Companion App

[![CI](https://github.com/simo-macca/pandoras-box-app/actions/workflows/ci.yml/badge.svg)](https://github.com/simo-macca/pandoras-box-app/actions/workflows/ci.yml)
[![React](https://img.shields.io/badge/React-18-61dafb.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8.svg?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-offline_ready-5a0fc8.svg?style=flat)](docs/FEATURES.md#11-offline-use-persistence-backup--restore)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An unofficial, offline-first web companion for the card game **[Frantic](https://rulefactory.ch/)** and its add-on **Pandora's Box**, both created by **Rulefactory**.

The app replaces pen-and-paper scoring at the table: it calculates every player's hand points at the end of a round, keeps a live leaderboard, handles the score-changing events (Doomsday, Time Bomb, Identity Theft, Seppuku), helps you draw Pandora's Box rule cards, and puts a searchable, multilingual card dictionary and the official rulebooks in your pocket — all without an account, a backend, or an internet connection once installed.

> [!NOTE]
> This is a fan project. It is not affiliated with, endorsed by, or sponsored by Rulefactory. See [Disclaimer & Credits](#disclaimer--credits).

---

## Documentation

| Document                                        | Contents                                                                         |
| :---------------------------------------------- | :------------------------------------------------------------------------------- |
| **[Setup & Local Development](docs/SETUP.md)**  | Prerequisites, installation, npm scripts, tests and the pre-commit pipeline.     |
| **[Architecture](docs/ARCHITECTURE.md)**        | Project structure, state engine, domain logic, persistence, PWA and test layout. |
| **[Features & Player Guide](docs/FEATURES.md)** | Game-night quick start and a walkthrough of every feature.                       |
| **[Game Rules Reference](docs/GAME_RULES.md)**  | Scoring rules, point limits and event modifiers, with rulebook page references.  |
| **[Contributing](docs/CONTRIBUTING.md)**        | Coding standards and how to add cards, translations and scoring rules.           |
| **[Deployment](docs/DEPLOYMENT.md)**            | Netlify (current), GitHub Pages and other static hosts.                          |

---

## Features at a Glance

- **Hand point calculator** — steppers for number cards 1–10 and for every special card value: coloured and open-wish specials (7), Mimicry (7), Curse (13), The End (17), Fuck You (42). The round winner scores 0.
- **Table-wide event modifiers** — Doomsday (everyone scores 50), Time Bomb defused (winner −10, everyone else +10) or exploded (all hand points doubled), plus a free numeric adjustment per player (e.g. `-15`, `+25`). Negative scores are fully supported.
- **Identity Theft** — one tap swaps the total score of the player with the highest score and the player with the lowest score, as written on the card.
- **Seppuku** — a guided dialog for each player's choice: number card −21, any other card +42, refusal +21. Entries can be edited afterwards.
- **Live leaderboard** — lowest score leads; players at 80 % of the limit are flagged in a _danger zone_; the match ends as soon as someone **exceeds** the limit, as the official rules prescribe.
- **Rule card drawer** with the 15 official Pandora's Box rule cards and a reminder banner on the scoreboard; _Double Special_ is applied automatically when scoring.
- **Card dictionary** — 23 special cards, 44 event cards, 12 Supercharge power cards (with official 1ST / 2ND timing) and 15 rule cards, searchable in English, German, Italian and French. Card names stay in English, as on the printed cards.
- **Official rulebooks** — the Rulefactory rulebook and overview cards in EN, DE, FR and IT, viewable in the browser.
- **Mid-game changes** — edit names, colours, the point limit and an optional round limit while a match is running; late joiners start at _highest current score + 1_ (a house rule, clearly labelled as such).
- **Undo everywhere** — every action shows an undo toast; any past round can be edited or deleted.
- **Offline & private** — installable Progressive Web App; all data stays in the browser (`localStorage`) and can be exported/imported as JSON.
- **Polished UX** — responsive mobile-first layout, light/dark/system theme without flash, keyboard support (Esc closes dialogs), procedural sound effects and optional haptics.
- **Quality gates** — strict TypeScript, ESLint, Prettier, 170 automated tests (Vitest + React Testing Library) and GitHub Actions CI.

---

## Quick Start

### At the table

1. Tap **Players** to set up 2–8 players, their colours and the point limit (official _short / medium / long_ presets, or a custom value).
2. _(Pandora's Box)_ Open **Rule Cards**, draw a card and activate it for the round.
3. Play the round with your physical cards.
4. Tap **Score Round**, mark the round winner and enter the cards left in everyone else's hand. Apply Doomsday or Time Bomb if they happened, then save.
5. As soon as someone exceeds the limit, the player with the lowest score wins — confetti included.

The full walkthrough is in the [Features & Player Guide](docs/FEATURES.md#game-night-quick-start).

### For developers

Requires **Node.js 22.12 or later**.

```bash
git clone https://github.com/simo-macca/pandoras-box-app.git
cd pandoras-box-app
npm ci
npm run dev        # http://localhost:5173
npm run validate   # type-check + lint + format check + tests
```

See [Setup & Local Development](docs/SETUP.md) for details.

---

## Scoring Quick Reference

Points are **penalty points**: the lowest total wins. Values are taken from the official rulebook (pp. 5 and 11).

| Card / event                              | Points                                           |
| :---------------------------------------- | :----------------------------------------------- |
| Number cards (coloured or black)          | Face value (1–10)                                |
| Plain-/bi-coloured and open-wish specials | 7                                                |
| Mimicry                                   | 7                                                |
| Curse                                     | 13                                               |
| The End                                   | 17                                               |
| Fuck You                                  | 42                                               |
| Power cards (Supercharge)                 | 0                                                |
| **Doomsday**                              | Everyone scores 50; hand cards are not counted   |
| **Time Bomb** – round ended in time       | Player who ended it −10; everyone else hand + 10 |
| **Time Bomb** – nobody ended it in time   | Everyone's hand points are doubled               |
| **Identity Theft**                        | Highest and lowest total scores are swapped      |
| **Seppuku**                               | Number card −21 · other card +42 · refused +21   |

More detail, including official point-limit presets, is in the [Game Rules Reference](docs/GAME_RULES.md).

---

## Technology

| Area        | Choice                                                                            |
| :---------- | :-------------------------------------------------------------------------------- |
| UI          | React 18, TypeScript (strict), Tailwind CSS 4, Lucide icons                       |
| Build & PWA | Vite 6, `vite-plugin-pwa` (Workbox service worker, full offline precache)         |
| Testing     | Vitest, React Testing Library, jest-dom, jsdom                                    |
| Quality     | ESLint (typescript-eslint, react-hooks), Prettier, Husky + lint-staged, GitHub CI |
| Feedback    | Web Audio API (procedural sounds), `react-hot-toast`, `canvas-confetti`           |
| Hosting     | Any static host — configured for [Netlify](netlify.toml); GitHub Pages supported  |

---

## Scripts

| Command                | Action                                                    |
| :--------------------- | :-------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with hot reload.                |
| `npm run build`        | Type-check and build the production bundle into `dist/`.  |
| `npm run preview`      | Serve the production build locally.                       |
| `npm run test`         | Run the test suite once.                                  |
| `npm run test:watch`   | Run the test suite in watch mode.                         |
| `npm run lint`         | Lint the codebase with ESLint.                            |
| `npm run type-check`   | Type-check with `tsc --noEmit`.                           |
| `npm run format`       | Format all files with Prettier (sorts Tailwind classes).  |
| `npm run format:check` | Check formatting without writing.                         |
| `npm run validate`     | Run type-check, lint, format check and tests in sequence. |

---

## Official Rulebooks

The PDFs in [`public/rules/`](public/rules/) are the official files published by Rulefactory on [rulefactory.ch/en/rules](https://rulefactory.ch/en/rules/).

| Language | Complete rulebook                                                            | Overview cards                                               |
| :------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------- |
| English  | [Rulebook (EN)](public/rules/Pandoras_Box_Gesamtregelwerk_EN_web.pdf)        | [Overview (EN)](public/rules/Uebersichtskarten_EN_web.pdf)   |
| German   | [Gesamtregelwerk (DE)](public/rules/Pandoras_Box_Gesamtregelwerk_DE_web.pdf) | [Übersicht (DE)](public/rules/Uebersichtskarten_DE_web.pdf)  |
| French   | [Règles (FR)](public/rules/Pandoras_Box_Gesamtregelwerk_FR.pdf)              | [Aperçu (FR)](public/rules/Uebersichtskarten_FR_web.pdf)     |
| Italian  | [Regolamento (IT)](public/rules/Pandoras_Box_Gesamtregelwerk_IT_web.pdf)     | [Panoramica (IT)](public/rules/Uebersichtskarten_IT_web.pdf) |

---

## Disclaimer & Credits

> **Frantic** and **Pandora's Box** are card games created and published by **[Rulefactory GmbH](https://rulefactory.ch/)** (Wil, Switzerland). Concept: Fabian Engeler, Pascal Frick, Pierre Lippuner, Stefan Weisskopf. Design: Pierre Lippuner.
>
> This is an unofficial, non-commercial fan project for scorekeeping and rules reference. It is not affiliated with, endorsed by, or sponsored by Rulefactory. All game names, rules, card texts, artwork, trademarks and the rulebook PDFs remain the property of Rulefactory. Event cards credited to community authors (e.g. _Seppuku_ by D'Sinead Conception) keep their original attribution.

The **source code** is released under the [MIT License](LICENSE). The licence does not extend to Rulefactory's material.
