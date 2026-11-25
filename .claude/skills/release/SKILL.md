---
name: release
description: "Cut a new release of Pandora's Box App: turn the CHANGELOG [Unreleased] section into a version, bump package.json and package-lock.json, commit and tag. Use only when the user explicitly asks to release or bump the version."
disable-model-invocation: true
---

# Release Pandora's Box App

The project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and [Semantic Versioning](https://semver.org/). Past releases: commit `chore(release): X.Y.Z` touching only `CHANGELOG.md`, `package.json` and `package-lock.json`, plus an annotated tag `vX.Y.Z` with the message `Release X.Y.Z`.

1. **Check**: `CHANGELOG.md` has a non-empty `## [Unreleased]` section and the working tree is clean. Otherwise stop and say why.
2. **Pick the version**: read the current version in `package.json`. Propose the bump from the `[Unreleased]` content (breaking changes → major; `### Added` or notable `### Changed` → minor; only `### Fixed` → patch) and ask me to confirm the number before changing anything.
3. **Branch**: `git switch -c chore/release-X.Y.Z` (if not already on a release branch).
4. **CHANGELOG**: rename `## [Unreleased]` to `## [X.Y.Z] – YYYY-MM-DD` (today's date, en dash as in earlier entries). Don't add a new empty `[Unreleased]` section. Don't touch older entries.
5. **Version**: `npm version X.Y.Z --no-git-tag-version` (updates `package.json` and `package-lock.json`). Then search the repo (excluding `node_modules`, `dist`, `package-lock.json`) for the old version string and report any other places that mention it; change them only if they describe the current version.
6. **Verify**: `npm run build`, then `npm run test` once.
7. **Review**: have the `reviewer` agent check the changes.
8. **Commit**: `git add CHANGELOG.md package.json package-lock.json` (plus any file from step 5), then `git commit -m "chore(release): X.Y.Z"`. The pre-commit hook runs as usual.
9. **Tag**: `git tag -a vX.Y.Z -m "Release X.Y.Z"`.
10. **Push**: push the branch and the tag (`git push -u origin chore/release-X.Y.Z` and `git push origin vX.Y.Z`). Merging into `main` happens only when I ask, with the `integrate` skill. Pushing `main` deploys to Netlify.
