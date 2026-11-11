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
- **Localization**: Accept `language: Language` prop and resolve strings via `TRANSLATIONS[language]`; never hard-code user-facing text.
- **Modals & Drawers**: Keep modals controlled via explicit props (`isOpen`, `onClose`); avoid local open/close state. Call `useModalA11y(isOpen, onClose)` and set `role="dialog"` + `aria-modal="true"`.
- **Accessibility**: Icon-only buttons need an `aria-label`.
- **Composition**: Keep components modular; break complex views into dedicated subdirectories.
