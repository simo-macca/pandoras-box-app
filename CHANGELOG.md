# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed — rules accuracy

- **Doomsday** (p. 13) no longer ignores the free adjustment, so a player protected by _Lucky Bastard_ (p. 10) can cancel the 50 points.
- **Several winners** can be marked in the same round (_Nice Try_ p. 10, _Parasite_ p. 15).
- **Several rule cards** can be active per round (p. 21); the drawer only draws cards that are not active yet, and the scoreboard and history show all of them.
- **Unique cards** (Curse, The End, Fuck You, Mimicry) are capped at one per hand: each exists once in the game (p. 22).
- **Time Bomb** (p. 17): the −10 bonus is offered only to winners and +10 only to the others.
- **Danger Zone** help text said "within 20 points of the limit"; it now describes the 80 % house rule. The round limit is labelled as a house rule.
- The Italian rules summary called the points "negative"; the app subtitle said "Official" in every language.

### Fixed — bugs

- Undo ignores snapshots that fail validation instead of restoring them unchecked.
- The game-over dialog shows the stored winner instead of the current first row.
- CODEOWNERS moved from `.github/workflows/` (ignored by GitHub) to `.github/` with a `*` pattern.
- Rounds without a Time Bomb value no longer show the bomb icon in the history.
- The rule card shuffle timer is cleared when the tab closes.
- Translation keys that existed only as hard-coded English fallbacks (table events, Time Bomb labels, event scopes, dictionary texts) are now translated in all languages.
- The web manifest no longer advertises a "d20 event roller".

### Changed — code structure

- Translations split into `src/data/translations/` (one file per language); every key is required.
- Card data split into `src/data/cards/` and `src/data/events/`; points reference `CARD_POINTS`.
- Pure event logic in `src/utils/events.ts`; game-over detection in `getGameOverUpdate()`.
- Calculator state in the new `useHandScores` hook; large components (calculator, rules guide, history, setup, dictionary, Seppuku, rule card drawer) split into smaller ones.
- Folders renamed: `components/rulecards` → `components/rule-cards`, `components/rules` → `components/card-dictionary`; `powerCardsData.ts` → `powerCards.ts`, `ruleCardsData.ts` → `ruleCards.ts`, `rulesConstants.ts` → `rulebookLinks.ts`.
- Removed the unused Tailwind JS config, unused types and backward-compatibility aliases.

## [1.1.0] – 2026-11-11

### Fixed — rules accuracy

- **Power-card timings**: _Recycling_ is now **2ND** and _Special Charge_ **1ST**, as printed in the official rulebook (pp. 19–20, all four languages). Descriptions and tests updated.
- **End of the game**: the match now ends when a player **exceeds** the point limit (rulebook p. 5). Landing exactly on the limit no longer ends the game.
- **Seppuku**: renamed from "Seppuku T" — the "T" in the rulebook marks the Troublemaker add-on, not part of the card name.
- **Rule cards**: replaced 13 invented rule cards with the **15 official Pandora's Box rule cards** and Rulefactory's wording in EN/DE/IT/FR (source: Rulefactory digital rulebook). Removed made-up flavour quotes.
- **Card names**: German, Italian and French names were invented (e.g. "Weltuntergang", "Maledizione", "Spezialladung"). The official rulebooks print **English names in every language**; all 99 cards now use them, including inside descriptions, tips, labels and the rules guide. Removed corner symbols from names ("All Draw One (+1)" → "All Draw One").
- **Double Special** rule card is now applied by the round calculator (all special cards count double), with a notice in the dialog.
- **Skip tip** no longer refers to a "Last Card" announcement, which does not exist in Frantic.
- Game-limit help text in all languages now says "exceeds" instead of "reaches or exceeds".

### Fixed — bugs

- Deleting a round now re-anchors later event entries (Identity Theft, Seppuku, late joiners) to the correct round number.
- Editing a round can no longer pick up an event entry with the same round number.
- The danger-zone marker on player cards now sits at 80 % of the limit, matching the danger-zone logic (it was drawn at "limit − 20").
- The modal fade-in animation was never applied (`animate-fade-in` was undefined).
- Light-mode users no longer see a dark flash on load; the theme is applied before first paint.
- Selecting 137 points with 5–8 players is now labelled _medium_, not _short_.
- Blank player names are replaced with "Player N" on save.
- Progress percentage can no longer go negative with negative totals.

### Added

- **Offline PWA**: service worker (via `vite-plugin-pwa`) precaches the app and all rulebook PDFs; the app is installable and works without a connection.
- **State validation**: `sanitizeGameState()` validates saved state, imported backups and undo snapshots; corrupted data no longer crashes the app.
- **Accessibility**: all dialogs close with Esc, lock background scroll and expose `role="dialog"` / `aria-modal`; icon buttons have translated labels; `prefers-reduced-motion` is respected; pinch-zoom is no longer disabled.
- **Translations** for previously hard-coded English strings (theme toggle, danger zone, score-limit presets, round-limit field, close/clear buttons).
- **Hosting flexibility**: configurable base path (`BASE_PATH`) for GitHub Pages; absolute Open Graph / canonical URLs injected at build time (`VITE_SITE_URL`, or Netlify's `URL`).
- GitHub Actions CI, `npm run validate`, MIT `LICENSE` (code only), `CHANGELOG.md`, Netlify cache and security headers.
- 18 new regression tests (170 in total), including official names, the rule-card list and Double Special scoring.

### Changed

- Rulebook PDFs moved from `rules/` to `public/rules/`; the custom Vite plugin that served and copied them was removed.
- SEO metadata: removed claims about a "d20 dice roller" that the app does not have; removed non-standard meta tags; corrected structured data.
- Web manifest uses relative URLs and separate icon purposes.
- `package.json`: description, license, repository, `engines` (Node ≥ 22.12).
- Documentation rewritten for accuracy (README and all files in `docs/`).

### Removed

- Unused code: `D20DiceRoller`, `RulesSummary`, `SearchBar`, `ScoreLimitPresets`, `faqData`, legacy types.
- Unused dependencies `clsx` and `tailwind-merge`.
- `tsconfig.tsbuildinfo` from version control.

### Known issue

- _The End is nigh_ (end-game scoring that depends on all players) must be entered with the free adjustment.

## [1.0.0]

- Initial release.
