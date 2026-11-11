# Contributing

Thank you for helping improve the app! This guide covers the workflow, coding standards and the most common changes.

---

## Table of Contents

- [Workflow](#workflow)
- [Coding Standards](#coding-standards)
- [How-To Guides](#how-to-guides)
  - [1. Adding or Updating Cards, Events or Rule Cards](#1-adding-or-updating-cards-events-or-rule-cards)
  - [2. Adding or Changing Translations](#2-adding-or-changing-translations)
  - [3. Changing Scoring Rules](#3-changing-scoring-rules)
  - [4. Creating UI Components](#4-creating-ui-components)
  - [5. Writing Tests](#5-writing-tests)
- [Before You Open a Pull Request](#before-you-open-a-pull-request)

---

## Workflow

1. **Fork** the repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/pandoras-box-app.git
   cd pandoras-box-app
   npm ci
   git checkout -b feat/short-description
   ```
2. **Develop** with tests for every behaviour change.
3. **Verify** with `npm run validate` (and `npm run build` for build-related changes).
4. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/), e.g. `fix(scoring): …`, `feat(events): …`, `docs: …`.
5. **Open a pull request** against `main` describing the problem, the change and how you tested it. CI must be green.

---

## Coding Standards

- **TypeScript** — strict mode; type function signatures and hook return values; avoid `any`. Shared models live in [`src/types/`](../src/types/).
- **Pure domain logic** — scoring and standings belong in [`src/utils/scoring.ts`](../src/utils/scoring.ts) and [`src/utils/stats.ts`](../src/utils/stats.ts), without React imports.
- **Rules fidelity** — any rule value must be backed by the official rulebook. Cite the page in a comment or test name. Mark non-official behaviour as a _house rule_ in the UI and in [GAME_RULES.md](GAME_RULES.md#app-specific-house-rules).
- **Untrusted data** — anything read from storage or files goes through `sanitizeGameState()`.
- **Localisation** — no hard-coded user-facing text in components; add keys to `translations.ts` in all four languages.
- **Accessibility** — buttons need accessible names (`aria-label` for icon-only buttons); dialogs use `useModalA11y` plus `role="dialog"` / `aria-modal="true"`.
- **Imports** — use the `@/` alias (it points to `src/`) for anything outside the current folder: `import { calculateHandPoints } from '@/utils/scoring'`. Keep `./` for files in the same folder. In `__tests__/`, the module under test may be imported from the parent folder with `../`. ESLint rejects any other `../` import. The alias is defined in both `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.alias`); keep them in sync.
- **Asset URLs** — build them from `import.meta.env.BASE_URL`, never as hard-coded `/…` paths.
- **Formatting** — Prettier with `prettier-plugin-tailwindcss` (class sorting). ESLint enforces React Hooks rules.
- **Links in docs** — relative paths only (`../src/...`), no machine-specific paths.

---

## How-To Guides

### 1. Adding or Updating Cards, Events or Rule Cards

| Dataset       | File                                                          | Type (in [`src/types/rules.ts`](../src/types/rules.ts)) |
| :------------ | :------------------------------------------------------------ | :------------------------------------------------------ |
| Special cards | [`src/data/cardsData.ts`](../src/data/cardsData.ts)           | `CardItem`                                              |
| Event cards   | [`src/data/eventsData.ts`](../src/data/eventsData.ts)         | `EventItem`                                             |
| Power cards   | [`src/data/powerCardsData.ts`](../src/data/powerCardsData.ts) | `PowerCardItem`                                         |
| Rule cards    | [`src/data/ruleCardsData.ts`](../src/data/ruleCardsData.ts)   | `RuleCardItem`                                          |

Example `CardItem`:

```ts
{
  id: 'card-identifier',
  // Card names are printed in English in every edition: keep them identical.
  name: { en: 'Card Name', de: 'Card Name', it: 'Card Name', fr: 'Card Name' },
  points: 7,
  category: 'special',          // 'special' | 'unique' | 'power' | 'number'
  subCategory: '1-colour',
  description: { en: '…', de: '…', it: '…', fr: '…' },
  tip: { en: '…', de: '…', it: '…', fr: '…' },
}
```

All four languages are required; `gameData.test.ts` fails otherwise. Names must be the official English card name in every language (`officialNames.test.ts` enforces this); only descriptions and tips are translated, and they should refer to other cards by their English names. If you change counts (e.g. the number of events), update the integrity tests and the docs.

### 2. Adding or Changing Translations

UI strings live in [`src/data/translations.ts`](../src/data/translations.ts) and are grouped by area (`common`, `nav`, `tabs`, `setup`, `scoreboard`, `scoring`, `rulecards`, `rules`, `settings`, `events`):

1. add the key to the right group in the `TranslationStrings` interface:
   ```ts
   export interface TranslationStrings {
     // …
     common: {
       // …
       newLabel: string;
     };
   }
   ```
2. add the value under `en`, `de`, `it` and `fr` in `TRANSLATIONS`;
3. use it in a component: `TRANSLATIONS[language].common.newLabel`.

TypeScript reports any language that is missing the key.

### 3. Changing Scoring Rules

1. Update `calculateHandPoints()` or `CARD_POINTS` in [`src/utils/scoring.ts`](../src/utils/scoring.ts). Results may be negative (Time Bomb, Seppuku, free adjustments).
2. If you add a new input, extend `HandScore` in [`src/types/game.ts`](../src/types/game.ts) and, if needed, `sanitizeGameState()` in [`src/utils/storage.ts`](../src/utils/storage.ts).
3. Add the control in [`SpecialCounters.tsx`](../src/components/scoring/SpecialCounters.tsx) or [`ScoringModifiers.tsx`](../src/components/scoring/ScoringModifiers.tsx) and wire it in [`HandCalculatorModal.tsx`](../src/components/scoring/HandCalculatorModal.tsx).
4. Add cases to [`scoring.test.ts`](../src/utils/__tests__/scoring.test.ts).

The end-of-game condition is `isOverScoreLimit()` in [`stats.ts`](../src/utils/stats.ts) (official rule: the limit must be **exceeded**).

### 4. Creating UI Components

- Shared widgets go in `src/components/common/`; feature components in their folder (`scoring/`, `scoreboard/`, `rulecards/`, `rules/`, `setup/`, `layout/`, `events/`).
- Declare `export const Name: React.FC<NameProps> = (…) => …` with the props interface at the top.
- Accept `language: Language` and read strings from `TRANSLATIONS[language]`.
- Check both light and dark themes and a narrow mobile viewport.

### 5. Writing Tests

- Place tests in a `__tests__/` folder next to the code (`*.test.ts` / `*.test.tsx`).
- Use React Testing Library with `userEvent.setup()`; prefer accessible queries (`getByRole`, `getByLabelText`, `getByText`).
- Mock callbacks with `vi.fn()`; build typed fixtures from `src/types/game.ts`.
- `src/test/setup.ts` clears the DOM and `localStorage` after each test.

---

## Before You Open a Pull Request

```bash
npm run validate   # type-check, lint, format check, tests
npm run build      # if you touched config, assets or dependencies
```

The pre-commit hook runs lint-staged, the type-check and the tests automatically; CI repeats everything and builds the app.

---

## Related Documentation

- [Setup & Local Development](SETUP.md)
- [Architecture](ARCHITECTURE.md)
- [Game Rules Reference](GAME_RULES.md)
- [Deployment](DEPLOYMENT.md)
