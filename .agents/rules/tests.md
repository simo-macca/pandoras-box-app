---
trigger: glob
globs:
  - 'src/**/__tests__/**/*.test.ts'
  - 'src/**/__tests__/**/*.test.tsx'
  - 'src/test/**/*.ts'
---

# Testing Guidelines

- **Runner**: Import test primitives (`describe`, `it`, `expect`, `vi`) from `'vitest'`.
- **Location**: Co-locate tests inside `__tests__/` subdirectories matching `*.test.ts` or `*.test.tsx`.
- **Imports**: Import the module under test from the parent folder with `../` (e.g. `import { useGameState } from '../useGameState'`); everything else via the `@/` alias (e.g. `@/types/game`, `@/utils/scoring`). Module paths in `vi.mock()` must use the same form as the import.
- **Component Tests**: Use `@testing-library/react` and `userEvent.setup()` for user interactions.
- **Queries**: Prioritize accessible queries (`screen.getByRole`, `screen.getByText`) with `@testing-library/jest-dom`.
- **Mocks**: Mock props and callback triggers with `vi.fn()`; avoid mocking internal React internals.
- **Fixtures**: Construct explicit `defaultProps` and state fixtures typed against `src/types/game.ts`.
- **Rules Tests**: Name the rulebook page in the test name when a test locks in a rule (e.g. `'allows several winners in the same round (rulebook pp. 10, 15)'`).
- **Running**: Don't run the suite after every edit; the pre-commit hook runs it on each commit and `npm run test` runs once at the end of a task.
