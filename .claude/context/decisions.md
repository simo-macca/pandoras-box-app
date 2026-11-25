# Decisions Log

Newest first. One entry per significant change or decision.

## 2026-11-25: Release skill

- Release steps captured in `.claude/skills/release/SKILL.md` (manual `/release` only), following the existing `chore(release): X.Y.Z` + annotated `vX.Y.Z` tag pattern.

## 2026-11-25: Agent instructions moved to Claude Code layout

- `AGENTS.md` → `CLAUDE.md`; `.agents/rules/` → `.claude/rules/` (`paths:` frontmatter); architecture map → `.claude/context/overview.md`.
- General workflow rules (branches, commits, pushing, formatters, imports, UI) now live in the global `~/.claude/CLAUDE.md`.
- Pinned versions and the full script list replaced by a pointer to `package.json`.
- Tests now use `@/` for the module under test too; existing tests with `../` stay until edited.
- `AGENTS.md` kept as a one-line pointer for other AI tools. Originals backed up in `~/dev/agent-config-backup-2026-11-25/`.
- CHANGELOG `[Unreleased]` entry added for the move.
