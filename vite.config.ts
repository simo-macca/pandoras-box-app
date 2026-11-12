/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';
import { readFileSync } from 'node:fs';

// Single source of truth for the version shown in the app.
const { version: appVersion } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf-8')
) as { version: string };

/**
 * Replaces the `__SITE_URL__` placeholder in index.html with the absolute
 * public URL of the deployment, so Open Graph / Twitter images resolve when the
 * link is shared. Resolution order:
 *   1. VITE_SITE_URL (set it manually, e.g. in a GitHub Actions workflow)
 *   2. URL (injected automatically by Netlify at build time)
 *   3. empty string → root-relative URLs (local development)
 */
function siteUrlPlugin(siteUrl: string): Plugin {
  const normalized = siteUrl.replace(/\/+$/, '');
  return {
    name: 'site-url-placeholder',
    transformIndexHtml(html) {
      return html.replace(/__SITE_URL__/g, normalized);
    },
  };
}

/**
 * Emits robots.txt (always) and sitemap.xml (when the public URL is known).
 * Both need the absolute deployment URL, which only exists at build time.
 */
function crawlerFilesPlugin(siteUrl: string): Plugin {
  const normalized = siteUrl.replace(/\/+$/, '');
  return {
    name: 'crawler-files',
    apply: 'build',
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /'];
      if (normalized) {
        robots.push('', `Sitemap: ${normalized}/sitemap.xml`);
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: [
            '<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
            '  <url>',
            `    <loc>${normalized}/</loc>`,
            `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
            '    <changefreq>monthly</changefreq>',
            '  </url>',
            '</urlset>',
            '',
          ].join('\n'),
        });
      }
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `${robots.join('\n')}\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Use BASE_PATH=/pandoras-box-app/ when deploying to a GitHub Pages
  // project site. Netlify and custom domains serve from the root.
  const base = env.BASE_PATH || '/';
  const basePath = base.replace(/\/+$/, '');
  const siteUrl = env.VITE_SITE_URL || (env.URL ? `${env.URL}${basePath}` : '');

  return {
    base,
    define: {
      __APP_VERSION__: JSON.stringify(appVersion),
    },
    plugins: [
      tailwindcss(),
      react(),
      siteUrlPlugin(siteUrl),
      crawlerFilesPlugin(siteUrl),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        // The hand-written public/site.webmanifest is kept as the source of truth.
        manifest: false,
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,webmanifest,pdf}'],
          globIgnores: ['**/og-image.*'],
          // The largest rulebook PDF is ~1.4 MB.
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
          navigateFallback: 'index.html',
          navigateFallbackDenylist: [/\/rules\//],
          cleanupOutdatedCaches: true,
        },
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          // Third-party code changes rarely: keep it in its own long-cached chunk.
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(
                  id
                )
              ) {
                return 'react-vendor';
              }
              return 'vendor';
            }
            return undefined;
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      pool: 'vmThreads',
      setupFiles: ['./src/test/setup.ts'],
    },
  };
});
