# Pandora's Box App

Offline score-keeper PWA for the card game Frantic / Pandora's Box (Rulefactory). React + TypeScript + Vite + Tailwind CSS, deployed on Netlify.

- Architecture and folder map: [`.claude/context/overview.md`](.claude/context/overview.md)
- Decisions log: [`.claude/context/decisions.md`](.claude/context/decisions.md)
- Path-scoped rules (loaded automatically): [`.claude/rules/`](.claude/rules/): `components.md`, `state-logic.md`, `tests.md`, `docs.md`

## Stack & Scripts

- Versions and the full script list: see `package.json`.
- Node.js ≥ 22.12 (Node 24 LTS in CI, Netlify and `.nvmrc`).
- Tailwind CSS 4 uses the CSS-first config in `src/index.css`; there is no JS config.
- Key scripts:
  - `npm run build`: `tsc -b && vite build`
  - `npm run test`: `vitest run`
  - `npm run validate`: type-check + lint + lint:md + format:check + test
  - Read-only checks: `npm run lint`, `npm run lint:md`, `npm run type-check`, `npm run format:check`
  - Formatters (`npm run format`, `npm run format:md`, `eslint --fix`, `markdownlint-cli2 --fix`): only as the global formatter rule allows.

## Domain Rules (Must Not Regress)

- Rule values come from the official rulebook in `public/rules/` and are locked in by tests: card points (7 / 13 / 17 / 42), point-limit presets, power-card 1ST/2ND timings, and the end-of-game rule (the limit must be **exceeded**: `isOverScoreLimit`).
- Scoring (rulebook pp. 5, 10–17, 21–22): several players may win the same round; one or more rule cards may be active per round; Curse, The End, Fuck You and Mimicry are capped at one per hand (`UNIQUE_CARD_LIMIT`); the free adjustment is always applied, also on Doomsday; the Time Bomb −10 bonus is for winners only.
- Non-official behaviour (danger zone, late joiners, round limit) must be labelled as a house rule in the UI and in `docs/GAME_RULES.md`.
- Every translation key is required in all four languages (`src/data/translations/`); never add `|| 'English fallback'` in components.
- Untrusted state (storage, imports, undo snapshots) must pass through `sanitizeGameState()`.
- Asset URLs must use `import.meta.env.BASE_URL`.
- Imports: the `@/` alias (→ `src/`) for everything outside the current folder; `./` only for the same folder.

## Command & Tool Policy

- **Pre-commit hook**: `git commit` triggers `.husky/pre-commit`, which formats staged files (lint-staged), type-checks and runs the full test suite. This is expected and does not count as running a formatter or as the one allowed `npm run test`.
- **`npm run test`**: only ONCE at the very end of a task; never after intermediate edits.
- **Before pushing a feature branch**: `npm run build` and `npm run test` once; commit any fixes.
- **Docs**: `docs/` must stay in sync with behaviour changes; user-visible changes get an `[Unreleased]` entry in `CHANGELOG.md`.
