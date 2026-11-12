# Setup & Local Development

How to install, run, test and verify the project locally.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Local Development](#local-development)
- [Available Scripts](#available-scripts)
- [Automated Testing](#automated-testing)
- [Quality Pipeline](#quality-pipeline)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool    | Version                                | Check           |
| :------ | :------------------------------------- | :-------------- |
| Node.js | **22.12 or later** (Node 22 LTS or 24) | `node -v`       |
| npm     | 10 or later (bundled with Node)        | `npm -v`        |
| Git     | any recent version                     | `git --version` |

> [!NOTE]
> Vitest 5, jsdom 30, ESLint 10 and lint-staged 17 require Node 22.12+. The minimum is declared in `package.json` (`engines`).

---

## Installation

```bash
git clone https://github.com/simo-macca/pandoras-box-app.git
cd pandoras-box-app
npm ci          # installs the exact versions from package-lock.json
```

The `prepare` script installs the [Husky](https://typicode.github.io/husky/) Git hooks automatically.

---

## Local Development

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`). Changes in `src/` reload instantly.

Useful while debugging: _DevTools → Application → Local Storage_ shows `frantic_game_state_v2`, `frantic_lang_v2` and `frantic_theme_mode`. Clearing them resets the app.

The service worker is only generated for production builds. To test offline behaviour, run `npm run build && npm run preview`, open the app once, then switch DevTools → Network to _Offline_ and reload.

---

## Available Scripts

| Command                | Description                                                          |
| :--------------------- | :------------------------------------------------------------------- |
| `npm run dev`          | Start the Vite dev server with hot reload.                           |
| `npm run build`        | Type-check (`tsc -b`) and build into `dist/` (incl. service worker). |
| `npm run preview`      | Serve `dist/` locally (`http://localhost:4173/`).                    |
| `npm run test`         | Run all tests once (Vitest).                                         |
| `npm run test:watch`   | Run tests in watch mode.                                             |
| `npm run lint`         | ESLint, including React Hooks rules.                                 |
| `npm run lint:md`      | Lint Markdown files with markdownlint-cli2.                          |
| `npm run type-check`   | TypeScript check without output (`tsc --noEmit`).                    |
| `npm run format`       | Format everything with Prettier (sorts Tailwind classes).            |
| `npm run format:check` | Check formatting without writing.                                    |
| `npm run format:md`    | Format and autofix Markdown (Prettier, then markdownlint `--fix`).   |
| `npm run validate`     | type-check → lint → lint:md → format:check → test (CI minus build).  |

---

## Automated Testing

```bash
npm run test                                       # whole suite
npm run test:watch                                 # watch mode
npx vitest run src/utils/__tests__/scoring.test.ts # one file
npx vitest run -t "calculateHandPoints"            # by test name
```

| Folder                         | Covers                                                               |
| :----------------------------- | :------------------------------------------------------------------- |
| `src/utils/__tests__/`         | Scoring, standings, storage and state sanitisation, i18n, colours    |
| `src/data/__tests__/`          | Card data integrity, translations, official power-card timings       |
| `src/hooks/__tests__/`         | Game engine, modals, theme, modal accessibility                      |
| `src/components/**/__tests__/` | User flows: setup, calculator, leaderboard, history, Seppuku, drawer |

---

## Quality Pipeline

### On every commit (Husky)

`.husky/pre-commit` runs:

1. `npx lint-staged` — `eslint --fix` + `prettier --write` on staged `*.ts(x)`; `markdownlint-cli2 --fix` + `prettier --write` on staged `*.md`; `prettier --write` on staged `*.json, *.css, *.html`;
2. `npm run type-check`;
3. `npm run test`.

The commit is blocked if any step fails.

### On every push / pull request (GitHub Actions)

[`.github/workflows/ci.yml`](../.github/workflows/ci.yml) runs `npm ci`, type-check, lint, Markdown lint, format check, tests and a production build on Node 22.

---

## Environment Variables

All optional; set them in the shell or in a local `.env` file (git-ignored).

| Variable        | Used for                                                                                      | Default                    |
| :-------------- | :-------------------------------------------------------------------------------------------- | :------------------------- |
| `BASE_PATH`     | Public base path, e.g. `/pandoras-box-app/` for a GitHub Pages project site.                  | `/`                        |
| `VITE_SITE_URL` | Absolute site URL for Open Graph / Twitter images and the canonical link (no trailing slash). | Netlify's `URL`, else `""` |

---

## Troubleshooting

**`EBADENGINE` warnings or syntax errors during install/test** — upgrade Node:

```bash
nvm install 22
nvm use 22
```

**Husky hooks don't run** — reinstall them:

```bash
npm run prepare
chmod +x .husky/pre-commit
```

**Port 5173 already in use** — run on another port: `npm run dev -- --port 3000`.

**An old version keeps loading after a deploy** — the service worker updates on the next load; reload once more, or in DevTools → Application → Service Workers click _Update_.

---

## Next Steps

- [Architecture](ARCHITECTURE.md)
- [Features & Player Guide](FEATURES.md)
- [Contributing](CONTRIBUTING.md)
- [Deployment](DEPLOYMENT.md)
