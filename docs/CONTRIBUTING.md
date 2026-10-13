# Contributing & Developer How-To Guide

Thank you for contributing to **Frantic: Pandora's Box – Digital Companion App**! This guide contains instructions for setting up your workflow, adhering to code style standards, and extending game datasets, scoring rules, and translations.

---

## Table of Contents

- [Code of Conduct & Contribution Workflow](#code-of-conduct--contribution-workflow)
- [Coding Standards & Tooling](#coding-standards--tooling)
- [Developer How-To Guides](#developer-how-to-guides)
  - [1. Adding or Updating Cards, Events, or Rule Cards](#1-adding-or-updating-cards-events-or-rule-cards)
  - [2. Adding or Modifying Translations](#2-adding-or-modifying-translations)
  - [3. Modifying Scoring Rules & Hand Calculations](#3-modifying-scoring-rules--hand-calculations)
  - [4. Creating New UI Components](#4-creating-new-ui-components)
- [Verification & Pre-commit Quality Pipeline](#verification--pre-commit-quality-pipeline)
- [Submitting Pull Requests](#submitting-pull-requests)
- [Related Documentation](#related-documentation)

---

## Code of Conduct & Contribution Workflow

1. **Fork and Clone**:
   ```bash
   git clone https://github.com/simonemaccario/pandoras-box-app.git
   cd pandoras-box-app
   git checkout -b feature/your-feature-name
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Develop & Verify**:
   - Write clean, type-safe TypeScript code.
   - Run type checks and lint checks before committing.
4. **Push & Open PR**:
   - Push to your fork and submit a Pull Request targeting the `main` branch.

---

## Coding Standards & Tooling

To ensure consistency across the project:

- **TypeScript**:
  - Always provide explicit type annotations for function signatures, data structures, and hook returns.
  - Avoid `any`. Use strict interfaces defined in [`../src/types/`](../src/types/).
- **ESLint**:
  - Adhere to the ESLint configuration in [`../eslint.config.js`](../eslint.config.js).
  - React Hooks rules (`rules-of-hooks`, `exhaustive-deps`) are strictly enforced.
- **Prettier & Tailwind**:
  - Code is automatically formatted using Prettier.
  - Tailwind CSS classes are automatically sorted via `prettier-plugin-tailwindcss`.
- **Portable Links**:
  - Never commit machine-specific absolute file paths (e.g., `C:\...` or `/Users/...`).
  - Use valid relative Markdown paths (`./docs/...`, `../src/...`) for all internal links.

---

## Developer How-To Guides

### 1. Adding or Updating Cards, Events, or Rule Cards

All card definitions reside in [`../src/data/`](../src/data/):

| Dataset           | Location                                                      | Interface Model                                              |
| :---------------- | :------------------------------------------------------------ | :----------------------------------------------------------- |
| **Special Cards** | [`src/data/cardsData.ts`](../src/data/cardsData.ts)           | `Card` in [`src/types/rules.ts`](../src/types/rules.ts)      |
| **Event Cards**   | [`src/data/eventsData.ts`](../src/data/eventsData.ts)         | `EventCard` in [`src/types/rules.ts`](../src/types/rules.ts) |
| **Power Cards**   | [`src/data/powerCardsData.ts`](../src/data/powerCardsData.ts) | `PowerCard` in [`src/types/rules.ts`](../src/types/rules.ts) |
| **Rule Cards**    | [`src/data/ruleCardsData.ts`](../src/data/ruleCardsData.ts)   | `RuleCard` in [`src/types/rules.ts`](../src/types/rules.ts)  |

#### Example: Adding a New Card Definition

To add or modify an entry, adhere to the typed schema:

```typescript
// Example entry for src/data/cardsData.ts
{
  id: 'card-identifier',
  name: {
    en: 'Card Name',
    de: 'Kartenname',
    it: 'Nome della carta',
    fr: 'Nom de la carte',
  },
  points: 7,
  category: 'special',
  description: {
    en: 'Card effect description...',
    de: 'Beschreibung des Karteneffekts...',
    it: 'Descrizione dell\'effetto della carta...',
    fr: 'Description de l\'effet de la carte...',
  },
  tip: {
    en: 'Tactical tip for gameplay...',
    de: 'Taktischer Tipp...',
    it: 'Consiglio strategico...',
    fr: 'Conseil tactique...',
  }
}
```

> [!IMPORTANT]
> All multilingual strings (`en`, `de`, `it`, `fr`) are required to prevent missing translation fallbacks in the encyclopedia.

---

### 2. Adding or Modifying Translations

UI translations are typed and stored in [`../src/data/translations.ts`](../src/data/translations.ts):

1. **Add new string key to `TranslationStrings` interface**:
   ```typescript
   export interface TranslationStrings {
     // ...
     newFeatureLabel: string;
   }
   ```
2. **Add translations to all 4 languages in `TRANSLATIONS`**:
   ```typescript
   export const TRANSLATIONS: Record<
     'en' | 'de' | 'it' | 'fr',
     TranslationStrings
   > = {
     en: {
       // ...
       newFeatureLabel: 'Feature Title',
     },
     de: {
       // ...
       newFeatureLabel: 'Funktionstitel',
     },
     it: {
       // ...
       newFeatureLabel: 'Titolo Funzionalità',
     },
     fr: {
       // ...
       newFeatureLabel: 'Titre de la Fonctionnalité',
     },
   };
   ```
3. TypeScript will immediately alert you if any language dictionary lacks the required key.

---

### 3. Modifying Scoring Rules & Hand Calculations

Scoring logic is decoupled into pure functions and typed models:

1. **Update Calculation Logic**:
   Modify `calculateHandPoints()` in [`../src/hooks/useGameState.ts`](../src/hooks/useGameState.ts). Ensure all calculation branches return non-negative integer point values.
2. **Update Type Definitions**:
   If introducing a new card type or modifier, update `HandScore` in [`../src/types/game.ts`](../src/types/game.ts).
3. **Update UI Inputs**:
   - Add stepper or toggle controls in [`../src/components/scoring/SpecialCounters.tsx`](../src/components/scoring/SpecialCounters.tsx).
   - Verify modal score preview binds to updated fields in [`../src/components/scoring/HandCalculatorModal.tsx`](../src/components/scoring/HandCalculatorModal.tsx).

---

### 4. Creating New UI Components

- Place shared UI widgets in [`../src/components/common/`](../src/components/common/).
- Place view-specific components in their respective subdirectories (`scoring/`, `scoreboard/`, `rulecards/`, `rules/`, `setup/`, `layout/`).
- Use Tailwind CSS utility classes and ensure components render properly in both Light and Dark themes.

---

## Verification & Pre-commit Quality Pipeline

Run these verification commands prior to staging your commit:

```bash
# 1. Type verification (zero compiler errors allowed)
npm run type-check

# 2. Lint verification
npm run lint

# 3. Prettier check
npm run format:check
```

To auto-format files:

```bash
npm run format
```

---

## Submitting Pull Requests

1. Commit your changes with descriptive, conventional commit messages:
   ```bash
   git commit -m "feat(scoring): add support for custom tournament modifier"
   ```
2. Push your branch to GitHub.
3. Open a Pull Request with a clear description of the problem solved, changes made, and testing steps performed.

---

## Related Documentation

- **[Local Development Setup](SETUP.md)**
- **[System Architecture](ARCHITECTURE.md)**
- **[Game Rules Reference](GAME_RULES.md)**
- **[Deployment Guide](DEPLOYMENT.md)**
