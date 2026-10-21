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
- **Component Tests**: Use `@testing-library/react` and `userEvent.setup()` for user interactions.
- **Queries**: Prioritize accessible queries (`screen.getByRole`, `screen.getByText`) with `@testing-library/jest-dom`.
- **Mocks**: Mock props and callback triggers with `vi.fn()`; avoid mocking internal React internals.
- **Fixtures**: Construct explicit `defaultProps` and state fixtures typed against `src/types/game.ts`.
