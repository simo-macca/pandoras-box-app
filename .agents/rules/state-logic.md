---
trigger: glob
globs:
  - 'src/hooks/**/*.{ts,tsx}'
  - 'src/utils/**/*.ts'
  - 'src/types/**/*.ts'
  - 'src/data/**/*.ts'
---

# State & Domain Logic Guidelines

- **Separation**: Custom hooks (`use*.ts`) manage React state & lifecycle; domain utils (`scoring.ts`, `stats.ts`, `events.ts`, `cardSearch.ts`) must remain pure functions without React imports. Hooks call the pure builders (e.g. `createIdentityTheftEntry`, `getGameOverUpdate`) instead of re-implementing them.
- **Hook Conventions**: Prefix hooks with `use` and return typed state or action bundles.
- **Domain Models**: Import shared game types (`Player`, `RoundEntry`, `GameState`) from `@/types/game`.
- **Imports**: Use the `@/` alias (→ `src/`) for every import outside the current folder, e.g. `import { TRANSLATIONS } from '@/data/translations'`. Keep `./` only for files in the same folder. Never use `../`; ESLint (`no-restricted-imports`) rejects it.
- **Persistence & Audio**: Delegate storage calls to `src/utils/storage.ts` and sound playback to `src/utils/sound.ts`. Validate any external state with `sanitizeGameState()`.
- **Immutability**: Maintain immutable data flow; update game history and player stats via pure transformations.
- **Scoring Formulas**: All point calculations must reside in `src/utils/scoring.ts`; standings and the end-of-game rule (`isOverScoreLimit`) in `src/utils/stats.ts`; score-changing events (Identity Theft, Seppuku, late joiners) in `src/utils/events.ts`.
- **Rules Fidelity**: Card data must match the official rulebook (`public/rules/`); cite the page when changing a rule value. Card `points` reference `CARD_POINTS`, never literals. Data lives in `data/cards/` (by card type), `data/events/` (by expansion), `powerCards.ts`, `ruleCards.ts`; the Rules-tab text in `rulesGuideContent.ts`.
- **Layering**: `types/` imports nothing from `data/`, `utils/` or `components/`; `utils/` and `hooks/` never import from `components/`.
