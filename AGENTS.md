# Agent Instructions

## Tech Stack & Scripts

- **Framework & Runtime**: React 18.3, TypeScript 5.7, Vite 6, Tailwind CSS 4.3, `vite-plugin-pwa` 2. Node.js ≥ 22.12.
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
  - `validate`: `npm run type-check && npm run lint && npm run format:check && npm run test`
  - `prepare`: `husky`

## Architecture Map

- `src/components/`: Modular UI (card-dictionary, common, events, layout, rule-cards, scoreboard, scoring, setup)
- `src/hooks/`: State & lifecycle management (`useGameState`, `useHandScores`, `useAppModals`, `useUndoToast`, `useTheme`, `useModalA11y`)
- `src/utils/`: Pure game domain logic (`scoring`, `stats`, `events`), storage, card search, i18n, colours, sound
- `src/data/`: Card data (`cards/`, `events/`, `powerCards`, `ruleCards`), translations (`translations/`), rules summary text, rulebook PDF links
- `src/types/`: Core TypeScript interfaces and domain models (`game.ts`, `rules.ts`)
- `src/test/`: Test environment configuration (`setup.ts`)
- `public/`: Static assets, PWA manifest, icons
- `public/rules/`: Official Rulefactory rulebook PDFs (EN, DE, FR, IT)
- `docs/`: Project documentation (keep in sync with behaviour changes)

## Domain Rules (Must Not Regress)

- Rule values come from the official rulebook in `public/rules/` and are locked in by tests: card points (7 / 13 / 17 / 42), point-limit presets, power-card 1ST/2ND timings, and the end-of-game rule (the limit must be **exceeded**: `isOverScoreLimit`).
- Non-official behaviour (danger zone, late joiners, round limit) must be labelled as a house rule.
- Untrusted state (storage, imports, undo snapshots) must pass through `sanitizeGameState()`.
- Asset URLs must use `import.meta.env.BASE_URL`.

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
