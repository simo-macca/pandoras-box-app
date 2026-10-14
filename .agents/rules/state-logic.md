---
trigger: glob
globs: 'src/{hooks,utils}/**/*.ts'
---

# State & Domain Logic Guidelines

- **Separation**: Custom hooks (`use*.ts`) manage React state & lifecycle; domain utils (`scoring.ts`, `stats.ts`) must remain pure functions without React imports.
- **Hook Conventions**: Prefix hooks with `use` and return typed state or action bundles.
- **Domain Models**: Import shared game types (`Player`, `RoundEntry`, `GameState`) from `src/types/game.ts`.
- **Persistence & Audio**: Delegate storage calls to `src/utils/storage.ts` and sound playback to `src/utils/sound.ts`.
- **Immutability**: Maintain immutable data flow; update game history and player stats via pure transformations.
- **Scoring Formulas**: All point calculations and round evaluation logic must reside in `src/utils/scoring.ts`.
