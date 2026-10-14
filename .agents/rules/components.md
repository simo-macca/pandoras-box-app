---
trigger: glob
globs: 'src/components/**/*.tsx'
---

# UI Component Guidelines

- **Declaration**: Export named components as `export const ComponentName: React.FC<ComponentNameProps> = ({ ... }) => { ... }`.
- **Props**: Define strict typing using `interface ComponentNameProps` at the top of the file.
- **Styling**: Style exclusively with Tailwind CSS utilities; combine conditionally with `clsx` and `tailwind-merge`.
- **Icons**: Use `lucide-react` for UI icons.
- **Localization**: Accept `language: Language` prop and resolve strings via `UI_TRANSLATIONS[language]`.
- **Modals & Drawers**: Keep modals controlled via explicit props (`isOpen`, `onClose`); avoid local open/close state.
- **Composition**: Keep components modular; break complex views into dedicated subdirectories.
