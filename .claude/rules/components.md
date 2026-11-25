---
paths:
  - 'src/components/**/*.tsx'
  - 'src/App.tsx'
---

# UI Component Guidelines

- **Declaration**: Export named components as `export const ComponentName: React.FC<ComponentNameProps> = ({ ... }) => { ... }`.
- **Props**: Define strict typing using `interface ComponentNameProps` at the top of the file.
- **Styling**: Style with Tailwind CSS utilities and the shared component classes in `src/index.css` (`card`, `btn` + variants, `segmented`, `option`, `input`, `modal-*`, `callout-*`, `eyebrow`, `section-title`). Prefer an existing class over repeating long utility strings; add a new class there when a pattern repeats. Build conditional class names with template literals (no extra class-merging dependency).
- **Dialogs**: Render through `Modal` (`@/components/common/Modal`) for the shared header, bottom-sheet layout on phones and sticky footer.
- **Icons**: Use `lucide-react` for UI icons.
- **Localization**: Accept `language: Language` prop and resolve strings via `TRANSLATIONS[language]`. New keys go in `src/data/translations/types.ts` (required, never optional) and in `en.ts`, `de.ts`, `it.ts`, `fr.ts`. Card names stay in English in every language.
- **Modals & Drawers**: Keep modals controlled via explicit props (`isOpen`, `onClose`); avoid local open/close state. Call `useModalA11y(isOpen, onClose)` and set `role="dialog"` + `aria-modal="true"`.
- **Composition**: Keep components small (aim for < 250 lines). Move stateful logic into a hook in `src/hooks/` (e.g. `useHandScores`) and repeated markup into a sub-component in the same feature folder (e.g. `RoundHistoryEntry`, `SeppukuPlayerChoice`). Feature folders: `card-dictionary`, `common`, `events`, `layout`, `rule-cards`, `scoreboard`, `scoring`, `setup`.
- **Rule values in UI**: Read points and presets from `CARD_POINTS`, `SCORE_PRESETS` and `SEPPUKU_POINTS` (`@/utils/scoring`); never type them as literals.
