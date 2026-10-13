# Getting Started & Development Setup

This guide walks you through setting up **Frantic: Pandora's Box – Digital Companion App** on your local development machine, running the development server, using available npm scripts, and understanding the automated code quality pipeline.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Local Development](#local-development)
- [Available Scripts](#available-scripts)
- [Code Quality & Pre-commit Pipeline](#code-quality--pre-commit-pipeline)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Prerequisites

Before setting up the project, make sure you have installed:

- **Node.js**: `v18.0.0` or higher (Node `20.x` LTS or later recommended).
  - Verify with: `node -v`
- **npm**: `v9.0.0` or higher (bundled with Node.js) or an alternative package manager such as `pnpm` or `yarn`.
  - Verify with: `npm -v`
- **Git**: Installed and configured for version control.
  - Verify with: `git --version`

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/simonemaccario/pandoras-box-app.git
   cd pandoras-box-app
   ```

2. **Install project dependencies**:

   ```bash
   npm install
   ```

   > [!NOTE]
   > The `prepare` script will automatically trigger on install, setting up [Husky](https://typicode.github.io/husky/) git hooks in `../.husky/`.

---

## Local Development

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Once the server boots, Vite displays the local network URL (typically `http://localhost:5173/`). Open this URL in your web browser.

- Changes made to files in `../src/` are hot-reloaded instantly without losing state where supported.
- Open your browser's Developer Tools (`F12` / `Cmd+Option+I`) to inspect console logs, Web Audio API activity, and `localStorage` state under Application > Local Storage (`frantic_game_state_v2`).

---

## Available Scripts

The following npm scripts are defined in [`package.json`](../package.json):

| Command                | Description                                                                              |
| :--------------------- | :--------------------------------------------------------------------------------------- |
| `npm run dev`          | Boots the Vite development server with Hot Module Replacement (HMR).                     |
| `npm run build`        | Runs TypeScript compilation (`tsc -b`) and bundles production assets into `dist/`.       |
| `npm run preview`      | Serves the production build locally to verify deployment readiness.                      |
| `npm run lint`         | Runs ESLint across the codebase to check code quality and React Hooks rules.             |
| `npm run type-check`   | Runs TypeScript type checking (`tsc --noEmit`) without generating output files.          |
| `npm run format`       | Automatically formats the codebase using Prettier, including Tailwind CSS class sorting. |
| `npm run format:check` | Checks whether all files adhere to Prettier formatting without modifying them.           |
| `npm run prepare`      | Configures Husky git hooks for local development.                                        |

---

## Code Quality & Pre-commit Pipeline

To maintain high code quality and prevent regressions, this repository employs an automated pre-commit workflow orchestrated by **Husky** and **lint-staged**:

### Automated Pre-commit Checks

When you run `git commit`, the hook in `../.husky/pre-commit` triggers the following tasks automatically:

1. **TypeScript & React Files (`*.{ts,tsx}`)**:
   - `eslint --fix`: Fixes auto-fixable lint issues and flags syntax or rule violations.
   - `prettier --write`: Formats code and reorders Tailwind CSS utility classes.
2. **Styles, Data & Markdown (`*.{json,css,html,md}`)**:
   - `prettier --write`: Enforces uniform code style, indentation, and formatting.
3. **Type Safety**:
   - `tsc --noEmit`: Verifies that no type errors exist before allowing the commit to proceed.

### Manual Verification

You can manually trigger these verification checks at any time prior to committing:

```bash
# Verify TypeScript types
npm run type-check

# Verify linting
npm run lint

# Check formatting
npm run format:check
```

---

## Troubleshooting

### Node.js Version Mismatch

- **Issue**: Errors mentioning unsupported Node version or unexpected token syntax during build.
- **Resolution**: Upgrade your Node.js version to Node 20 LTS using [nvm](https://github.com/nvm-sh/nvm):
  ```bash
  nvm install 20
  nvm use 20
  ```

### Husky Hooks Not Executing

- **Issue**: Pre-commit hooks do not run on `git commit`.
- **Resolution**: Reinitialize Husky manually:
  ```bash
  npm run prepare
  chmod +x .husky/pre-commit
  ```

### Vite Port Collision

- **Issue**: Vite warns that port `5173` is already in use and selects another port (e.g. `5174`).
- **Resolution**: Stop any running process on port 5173 or specify a custom port in `vite.config.ts` or via CLI:
  ```bash
  npm run dev -- --port 3000
  ```

---

## Next Steps

- **[System Architecture](ARCHITECTURE.md)**: Explore the codebase layout, custom hooks, and pure functions.
- **[App Features](FEATURES.md)**: Understand the application's capabilities and user workflows.
- **[Contributing Guide](CONTRIBUTING.md)**: Learn how to add cards, modify scoring rules, or add translations.
- **[Deployment](DEPLOYMENT.md)**: Learn how to build and host the app on Netlify, Vercel, or custom static servers.
