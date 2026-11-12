---
trigger: glob
globs:
  - '**/*.md'
---

# Markdown & Documentation Guidelines

- **Tooling**: Prettier formats Markdown (spacing, lists, tables); markdownlint-cli2 checks structure (`.markdownlint-cli2.jsonc`, Prettier-compatible style). Check with `npm run lint:md` and `npm run format:check`; autofix with `npm run format:md` only when asked to format.
- **Links**: Use relative paths (`../src/...`, `docs/FEATURES.md`); every `#anchor` must match an existing heading (MD051).
- **Structure**: One `#` title per file, no skipped heading levels, fenced code blocks with a language (`bash`, `ts`, `text`).
- **Sync**: When behaviour changes, update the matching doc: rules in `docs/GAME_RULES.md` (with page numbers), user flows in `docs/FEATURES.md`, structure in `docs/ARCHITECTURE.md`, scripts in `docs/SETUP.md` and `AGENTS.md`, and add an `[Unreleased]` entry to `CHANGELOG.md`.
- **Rules Language**: Quote the rulebook only briefly and paraphrase; label non-official behaviour as a _house rule_.
