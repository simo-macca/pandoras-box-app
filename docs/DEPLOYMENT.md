# Deployment & Production Build Guide

This guide describes how to build, test, and deploy **Frantic: Pandora's Box – Digital Companion App** across various hosting platforms.

---

## Table of Contents

- [Overview](#overview)
- [Building for Production](#building-for-production)
- [Local Production Preview](#local-production-preview)
- [Hosting Providers](#hosting-providers)
  - [1. Netlify (Configured)](#1-netlify-configured)
  - [2. Vercel](#2-vercel)
  - [3. GitHub Pages](#3-github-pages)
  - [4. Custom Web Server (Nginx / Apache / Caddy)](#4-custom-web-server-nginx--apache--caddy)
- [Performance & Security Considerations](#performance--security-considerations)
- [Related Documentation](#related-documentation)

---

## Overview

The companion app is bundled into a lightweight, fully static Single Page Application (HTML, CSS, JavaScript, and static PDF rulebook assets). It does not require a persistent backend server, making it fast, secure, and cost-effective to host anywhere.

---

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This command executes:

1. `tsc -b`: Incremental TypeScript compilation to verify type safety.
2. `vite build`: Minification, tree-shaking, and bundling of assets into the `dist/` directory.

### Build Output Structure

```text
dist/
├── index.html                   # Entry point with pre-rendered headers
├── assets/                      # Bundled JS and CSS with content hashes
├── rules/                       # Static PDF rulebooks in 4 languages
└── ...                          # Public static icons and manifests
```

---

## Local Production Preview

To test the generated production build before deploying:

```bash
npm run preview
```

Vite will serve the contents of `dist/` on a local port (e.g., `http://localhost:4173/`). This allows you to verify bundle minification, audio playback, theme toggles, and PDF linking in an environment that matches production.

---

## Hosting Providers

### 1. Netlify (Configured)

The repository includes a pre-configured [`netlify.toml`](../netlify.toml) file:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Automated Deployment Steps

1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Netlify will automatically detect `netlify.toml` and configure the build settings.
3. Every push to the `main` branch will trigger a production deployment. Pull requests will receive deploy previews.

---

### 2. Vercel

To deploy on [Vercel](https://vercel.com/):

1. Import the project repository into the Vercel dashboard.
2. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Click **Deploy**.

---

### 3. GitHub Pages

To host on GitHub Pages:

1. Update `base` in [`vite.config.ts`](../vite.config.ts) if your repository is not hosted at the domain root:
   ```typescript
   export default defineConfig({
     base: '/pandoras-box-app/',
     // ...
   });
   ```
2. Create a GitHub Actions workflow `.github/workflows/deploy.yml` that runs `npm run build` and deploys `dist/` to the `gh-pages` branch.

---

### 4. Custom Web Server (Nginx / Apache / Caddy)

Because the app is an SPA, all path routes should fallback to `index.html`.

#### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name frantic-companion.example.com;
    root /var/www/pandoras-box-app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression for static assets
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

---

## Performance & Security Considerations

- **Client-Side State**: Match data is persisted locally in the user's browser `localStorage`. No sensitive user credentials or personal identifying information are stored.
- **Rulebook PDFs**: Large PDF files in `rules/` are served with static cache headers to minimize bandwidth usage.
- **Content Security**: No external scripts or unverified third-party analytics are loaded at runtime.

---

## Related Documentation

- **[Local Development Setup](SETUP.md)**
- **[System Architecture](ARCHITECTURE.md)**
- **[Application Features](FEATURES.md)**
- **[Contributing Guide](CONTRIBUTING.md)**
