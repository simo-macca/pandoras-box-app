---
trigger: glob
globs:
  - 'src/components/**/*.tsx'
  - 'src/App.tsx'
---

# UI Component Guidelines

- **Declaration**: Export named components as `export const ComponentName: React.FC<ComponentNameProps> = ({ ... }) => { ... }`.
- **Props**: Define strict typing using `interface ComponentNameProps` at the top of the file.
- **Styling**: Style exclusively with Tailwind CSS utilities; build conditional class names with template literals (no extra class-merging dependency).
- **Icons**: Use `lucide-react` for UI icons.
- **Imports**: Use the `@/` alias (→ `src/`) for every import outside the current folder, e.g. `import { TRANSLATIONS } from '@/data/translations'`. Keep `./` only for files in the same folder. Never use `../`; ESLint (`no-restricted-imports`) rejects it.
- **Localization**: Accept `language: Language` prop and resolve strings via `TRANSLATIONS[language]`; never hard-code user-facing text or add `|| 'English fallback'`. New keys go in `src/data/translations/types.ts` (required, never optional) and in `en.ts`, `de.ts`, `it.ts`, `fr.ts`. Card names stay in English in every language.
- **Modals & Drawers**: Keep modals controlled via explicit props (`isOpen`, `onClose`); avoid local open/close state. Call `useModalA11y(isOpen, onClose)` and set `role="dialog"` + `aria-modal="true"`.
- **Accessibility**: Icon-only buttons need an `aria-label`.
- **Composition**: Keep components small (aim for < 250 lines). Move stateful logic into a hook in `src/hooks/` (e.g. `useHandScores`) and repeated markup into a sub-component in the same feature folder (e.g. `RoundHistoryEntry`, `SeppukuPlayerChoice`). Feature folders: `card-dictionary`, `common`, `events`, `layout`, `rule-cards`, `scoreboard`, `scoring`, `setup`.
- **Rule values in UI**: Read points and presets from `CARD_POINTS`, `SCORE_PRESETS` and `SEPPUKU_POINTS` (`@/utils/scoring`); never type them as literals.
