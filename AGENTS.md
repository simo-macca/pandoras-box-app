# Agent Instructions

## Tech Stack & Scripts

- **Framework & Runtime**: React 18.3, TypeScript 5.7, Vite 6.1, Tailwind CSS 4.3.
- **Exact Scripts**:
  - `dev`: `vite`
  - `build`: `tsc -b && vite build`
  - `preview`: `vite preview`
  - `lint`: `eslint .`
  - `type-check`: `tsc --noEmit`
  - `test`: `vitest run`
  - `test:watch`: `vitest`
  - `format`: `prettier --write .`
  - `format:check`: `prettier --check .`
  - `prepare`: `husky`

## Architecture Map

- `src/components/`: Modular UI (common, layout, scoreboard, scoring, setup, rules, events)
- `src/hooks/`: State & lifecycle management (`useGameState`, `useTheme`, `useAppModals`)
- `src/utils/`: Pure game domain logic, scoring calculation, storage, i18n, sound
- `src/data/`: Static game card data, translations (`UI_TRANSLATIONS`), rules constants
- `src/types/`: Core TypeScript interfaces and domain models (`game.ts`, `rules.ts`)
- `src/test/`: Test environment configuration (`setup.ts`)
- `rules/`: Official game rule PDFs (multilingual)
- `public/`: Static public assets and web manifest

## Command & Tool Policy (Strict)

- **Code Formatter**: NEVER run any code formatter (e.g. Prettier, `npm run format`, `eslint --fix`) unless explicitly requested in prompt.
- **Always Allowed**: `npm run build`, `git status`, `git add <specific-files>`, and `git commit`.
- **`npm run test` Policy**: Allowed ONLY ONCE at the very end of a task to verify functionality. Never run repeatedly after intermediate edits.
- **`git push` Policy**: Allowed IF AND ONLY IF the current branch is NOT `main` (or `master`). Pushing directly to `main` is strictly forbidden, UNLESS the user explicitly approves the **Integration & Cleanup** workflow (rebase + `git merge --ff-only`), in which case pushing the updated `main` and deleting the remote branch (`git push origin --delete <branch>`) are authorized solely for that operation.

## Large-Task & Multi-File Protocol

For major changes, new features, or multi-file refactoring:

1. **Plan First & Wait**: Do NOT edit code yet. Present a concise, numbered implementation plan with files and checkpoints; STOP and wait for approval.
2. **Create a Branch**: Immediately after plan approval, create/switch to a branch (`git checkout -b <type>/<short-name>`). Never work directly on `main`.
3. **Incremental Checkpoint Commits**: Execute step-by-step; stage relevant files (`git add`) and commit atomically (`git commit`) after each logical milestone.
4. **Final Verification & Push**: Run `npm run build` and `npm run test` once. Commit fixes and `git push` feature branch (verify branch is not `main`).
