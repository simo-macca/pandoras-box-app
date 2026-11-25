---
paths:
  - 'src/**/__tests__/**/*.test.ts'
  - 'src/**/__tests__/**/*.test.tsx'
  - 'src/test/**/*.ts'
---

# Testing Guidelines

- **Runner**: Import test primitives (`describe`, `it`, `expect`, `vi`) from `'vitest'`.
- **Location**: Co-locate tests inside `__tests__/` subdirectories matching `*.test.ts` or `*.test.tsx`.
- **Imports**: Use the `@/` alias for everything, including the module under test (e.g. `import { useGameState } from '@/hooks/useGameState'`). Module paths in `vi.mock()` must use the same form as the import. Existing tests that still use `../` are switched to `@/` when you edit them.
- **Component Tests**: Use `@testing-library/react` and `userEvent.setup()` for user interactions.
- **Queries**: Prioritize accessible queries (`screen.getByRole`, `screen.getByText`) with `@testing-library/jest-dom`.
- **Mocks**: Mock props and callback triggers with `vi.fn()`; avoid mocking internal React internals.
- **Fixtures**: Construct explicit `defaultProps` and state fixtures typed against `src/types/game.ts`.
- **Rules Tests**: Name the rulebook page in the test name when a test locks in a rule (e.g. `'allows several winners in the same round (rulebook pp. 10, 15)'`).
