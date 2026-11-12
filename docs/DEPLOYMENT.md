# Deployment

The app builds to a fully static folder (`dist/`) — HTML, CSS, JavaScript, a service worker and the rulebook PDFs — and can be hosted on any static host.

---

## Table of Contents

- [Building for Production](#building-for-production)
- [Local Production Preview](#local-production-preview)
- [Netlify](#netlify)
- [Release Checklist](#release-checklist)

---

## Building for Production

```bash
npm run build
```

1. `tsc -b` — type-check.
2. `vite build` — bundle, minify and hash assets; copy `public/` (icons, manifest, `rules/*.pdf`); generate the service worker.

```text
dist/
├── index.html             # Meta tags with absolute Open Graph URLs
├── assets/                # Hashed JS and CSS
├── rules/                 # Official rulebook PDFs
├── sw.js, workbox-*.js    # Service worker (offline precache)
├── registerSW.js
├── robots.txt, sitemap.xml # Generated at build time (sitemap only when the URL is known)
└── site.webmanifest, icons, og-image.*
```

Build-time variables (see [SETUP.md](SETUP.md#environment-variables)):

- `BASE_PATH` — base path when the site is not at the domain root;
- `VITE_SITE_URL` — absolute public URL used for social previews, the canonical link and `sitemap.xml` (plus the `Sitemap:` line in `robots.txt`). On Netlify it is filled in automatically from Netlify's `URL` variable. Without it, the build still emits `robots.txt` but skips the sitemap.

---

## Local Production Preview

```bash
npm run preview   # http://localhost:4173/
```

Check theme switching, the rulebook links, installation (_Install app_ in Chrome/Edge) and offline mode (DevTools → Network → _Offline_, then reload).

---

## Netlify

[//]: # '(current setup)'

[`netlify.toml`](../netlify.toml) contains everything Netlify needs:

- build command `npm run build`, publish folder `dist`, Node 22;
- `Content-Type: application/pdf` and `Content-Disposition: inline` for `/rules/*`;
- long-term caching for hashed `/assets/*`, `no-cache` for `sw.js`;
- basic security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`);
- SPA fallback to `index.html`.

Connect the repository in Netlify; every push to `main` deploys to production and pull requests get deploy previews. No further configuration is needed — Netlify's `URL` is used for the Open Graph tags.

[//]: # '---'
[//]: #
[//]: # '## GitHub Pages'
[//]: #
[//]: # 'GitHub Pages serves a project site under a sub-path (`https://<user>.github.io/pandoras-box-app/`). The build supports this through `BASE_PATH`.'
[//]: #
[//]: # '1. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.'
[//]: # '2. Add `.github/workflows/deploy-pages.yml`:'
[//]: #
[//]: # '   ```yaml'
[//]: # '   name: Deploy to GitHub Pages'
[//]: #
[//]: # '   on:'
[//]: # '     push:'
[//]: # '       branches: [main]'
[//]: # '     workflow_dispatch:'
[//]: #
[//]: # '   permissions:'
[//]: # '     contents: read'
[//]: # '     pages: write'
[//]: # '     id-token: write'
[//]: #
[//]: # '   concurrency:'
[//]: # '     group: pages'
[//]: # '     cancel-in-progress: true'
[//]: #
[//]: # '   jobs:'
[//]: # '     build:'
[//]: # '       runs-on: ubuntu-latest'
[//]: # '       steps:'
[//]: # '         - uses: actions/checkout@v4'
[//]: # '         - uses: actions/setup-node@v4'
[//]: # '           with:'
[//]: # '             node-version: 22'
[//]: # '             cache: npm'
[//]: # '         - run: npm ci'
[//]: # '         - run: npm run test'
[//]: # '         - run: npm run build'
[//]: # '           env:'
[//]: # '             BASE_PATH: /${{ github.event.repository.name }}/'
[//]: # '             VITE_SITE_URL: https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}'
[//]: # '         # SPA fallback: GitHub Pages serves 404.html for unknown paths'
[//]: # '         - run: cp dist/index.html dist/404.html'
[//]: # '         - uses: actions/upload-pages-artifact@v3'
[//]: # '           with:'
[//]: # '             path: dist'
[//]: #
[//]: # '     deploy:'
[//]: # '       needs: build'
[//]: # '       runs-on: ubuntu-latest'
[//]: # '       environment:'
[//]: # '         name: github-pages'
[//]: # '         url: ${{ steps.deployment.outputs.page_url }}'
[//]: # '       steps:'
[//]: # '         - id: deployment'
[//]: # '           uses: actions/deploy-pages@v4'
[//]: # '   ```'
[//]: #
[//]: # '3. Push to `main`. The site appears at `https://<user>.github.io/pandoras-box-app/`.'
[//]: #
[//]: # '> [!NOTE]'
[//]: # "> GitHub Pages does not support custom response headers, so the `netlify.toml` headers (PDF inline display, cache rules, security headers) don't apply. PDFs still open in the browser by default, and the service worker handles offline caching."
[//]: #
[//]: # 'For a custom domain, add it under **Settings → Pages**, set `BASE_PATH: /` and `VITE_SITE_URL` to the domain.'
[//]: #
[//]: # '---'
[//]: #
[//]: # '## Other Hosts'
[//]: #
[//]: # '**Vercel / Cloudflare Pages** — framework preset _Vite_, build command `npm run build`, output `dist`, Node 22. Set `VITE_SITE_URL` to the production URL.'
[//]: #
[//]: # '**Nginx**'
[//]: #
[//]: # '```nginx'
[//]: # 'server {'
[//]: # '    listen 80;'
[//]: # '    server_name frantic.example.com;'
[//]: # '    root /var/www/pandoras-box-app/dist;'
[//]: # '    index index.html;'
[//]: #
[//]: # '    location / {'
[//]: # '        try_files $uri $uri/ /index.html;'
[//]: # '    }'
[//]: #
[//]: # '    location = /sw.js {'
[//]: # '        add_header Cache-Control "no-cache";'
[//]: # '    }'
[//]: #
[//]: # '    location /assets/ {'
[//]: # '        add_header Cache-Control "public, max-age=31536000, immutable";'
[//]: # '    }'
[//]: #
[//]: # '    gzip on;'
[//]: # '    gzip_types text/css application/javascript application/json image/svg+xml;'
[//]: # '}'
[//]: # '```'

---

## Release Checklist

1. `npm run validate` and `npm run build` pass locally; CI is green.
2. `npm run preview`: smoke-test scoring, an event, export/import, and offline reload.
3. Bump `version` in `package.json` and tag the release (`git tag v1.x.y`).
4. After deploying, check the social preview with a link-preview tool and run a Lighthouse audit (PWA, accessibility, performance).

---

## Related Documentation

- [Setup & Local Development](SETUP.md)
- [Architecture](ARCHITECTURE.md)
- [Features & Player Guide](FEATURES.md)
